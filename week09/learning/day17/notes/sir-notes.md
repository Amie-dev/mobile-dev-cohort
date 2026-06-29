# Google + GitHub Auth in Expo — Step‑by‑Step Guide

A complete, beginner‑friendly walkthrough for adding **Google** and **GitHub** login
to an Expo app, from creating the app all the way to a working sign‑in screen.

Every code block in this guide is a **complete file** you can copy‑paste as‑is.

---

## 0. The big picture (read this first)

We do **not** put OAuth secrets inside the mobile app. A phone app can be
decompiled, so a `client_secret` shipped in the app would be stolen instantly.

Instead we use a tiny **backend** that lives inside the same Expo project using
**Expo Router API routes** (the `+api.ts` files). The app talks to *our* backend,
and only our backend talks to Google/GitHub with the secret.

### The full login flow

```
[App] expo-auth-session
   |  1. user taps "Continue with Google"
   v
[Our API] /api/auth/authorize     <-- builds the real Google/GitHub URL
   |  2. redirect to Google/GitHub login page
   v
[Google / GitHub]
   |  3. user approves, provider redirects back with ?code=...
   v
[Our API] /api/auth/callback      <-- receives the code
   |  4. redirect back into the app:  expoauthentication://?code=...
   v
[App] receives code
   |  5. POST { code, provider } to our token endpoint
   v
[Our API] /api/auth/token         <-- exchanges code for tokens USING the secret,
   |                                   fetches user profile, signs a JWT
   |  6. returns { accessToken }
   v
[App] stores JWT in SecureStore, decodes it -> user is logged in
```

!d824e6bb-c96d-4f1d-9a3f-56d02e236de2.png

Why this shape?

- **`/authorize`** keeps provider URLs + public client IDs in one place.
- **`/callback`** is the single fixed URL we register with Google/GitHub. It just
bounces the `code` back into the app via the app's deep link (`scheme`).
- **`/token`** is the only place the **client secret** is used. It runs on the
server, never on the device.
- The app ends up with a **JWT we signed ourselves**, so the rest of the app only
needs to trust our own token, not Google's/GitHub's.

---

## 1. Create the Expo app

> Expo changes between versions. This guide targets **Expo SDK 55**. Always check
the exact versioned docs: https://docs.expo.dev/versions/v55.0.0/
> 

```bash
npx create-expo-app@latest expo-authentication
cd expo-authentication
```

This gives you an Expo Router project. In this guide all the app code lives under
`src/app` and shared code under `src/constants`. The context file lives in
`context/auth-context.tsx`.

---

## 2. Install the dependencies

```bash
npx expo install expo-auth-session expo-web-browser expo-crypto expo-secure-store expo-linking
npx expo install expo-image react-native-safe-area-context
npm install jose
```

What each package does:

- **`expo-auth-session`** — the OAuth client. Builds the auth request, opens the
browser, and handles the redirect back into the app. Gives us `useAuthRequest`,
`makeRedirectUri`, and the `DiscoveryDocument` type.
- **`expo-web-browser`** — opens the system in‑app browser for the login page and
closes it automatically when the redirect comes back.
- **`expo-crypto`** — needed by `expo-auth-session` for PKCE (the code
challenge/verifier, explained later).
- **`expo-secure-store`** — encrypted on‑device storage (Keychain on iOS,
Keystore on Android). We store the signed JWT here.
- **`expo-linking`** — deep‑linking support so `expoauthentication://` can reopen
the app.
- **`jose`** — sign and decode JWTs (works on both server and client).
- **`expo-image` / `react-native-safe-area-context`** — only used by the UI
screens in this guide.

---

## 3. Configure `app.json`

Two things matter for auth: a custom URL **`scheme`** (so the provider can reopen
your app) and **`web.output: "server"`** (so the `+api.ts` routes actually run as
a server).

Full file:

```json
{
  "expo": {
    "name": "expo-authentication",
    "slug": "expo-authentication",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "expoauthentication",
    "userInterfaceStyle": "automatic",
    "ios": {
      "icon": "./assets/expo.icon"
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "predictiveBackGestureEnabled": false,
      "package": "com.codebysuraj.expoauthentication"
    },
    "web": {
      "output": "server",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#208AEF",
          "android": {
            "image": "./assets/images/splash-icon.png",
            "imageWidth": 76
          }
        }
      ],
      "expo-secure-store"
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "7495c2b4-9593-48fb-9b90-8e1d572bbb1c"
      }
    },
    "owner": "codebysuraj"
  }
}
```

Key fields:

- **`scheme: "expoauthentication"`** — defines the deep link `expoauthentication://`.
This is how the provider/our callback reopens the app. It must match the
redirect URL used in `callback+api.ts`.
- **`web.output: "server"`** — turns the project into a server build so API routes
(`+api.ts`) are real HTTP endpoints. Without this, `/api/auth/...` won't exist.
- **`plugins: ["expo-secure-store"]`** — required config plugin for secure storage.

---

## 4. Get the OAuth credentials

You need a **Client ID** and **Client Secret** from each provider. Both providers
must be told the exact **callback URL**, which for local development is:

```
http://localhost:8081/api/auth/callback
```

> When you deploy, you replace `http://localhost:8081` with your real hosted URL
(see the `BASE_URL` note in Step 6) and add that callback in the provider too.
> 

### Google

1. Go to https://console.cloud.google.com/apis/credentials
2. **Create Credentials → OAuth client ID**.
3. Application type: **Web application** (our backend does the exchange, so a web
    
    client with a secret is what we want).
    
4. Under **Authorized redirect URIs**, add:
    
    `http://localhost:8081/api/auth/callback`
    
5. Copy the **Client ID** and **Client Secret**.

### GitHub

1. Go to https://github.com/settings/developers → **New OAuth App**.
2. **Homepage URL**: `http://localhost:8081`
3. **Authorization callback URL**: `http://localhost:8081/api/auth/callback`
4. Create it, then **Generate a new client secret**.
5. Copy the **Client ID** and **Client Secret**.

---

## 5. Environment variables — `.env`

Create a `.env` file in the project root. These have **no** `EXPO_PUBLIC_` prefix
on purpose: that keeps them **server‑only**, so they are never bundled into the
app the user downloads.

```bash
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

JWT_SECRET=change-this-to-a-long-random-string
```

- **`_CLIENT_ID` / `_CLIENT_SECRET`** — identify your app to Google/GitHub. The
secret proves the token request really comes from you. **Secret = server only.**
- **`JWT_SECRET`** — the random key we use to sign our own JWT. Anyone with this
key can forge logins, so keep it secret and use a long random value in
production.

> Important: a variable **without** `EXPO_PUBLIC_` is only readable on the server
(inside `+api.ts`). That is exactly what we want for secrets.
> 

---

## 6. Constants — `src/constants/index.ts`

A single place that reads the env vars and defines the provider URLs.

Full file:

```tsx
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export const BASE_URL = `http://localhost:8081`;

export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
export const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";

export const JWT_SECRET = process.env.JWT_SECRET;
```

- **`BASE_URL`** — the root of your own backend. In dev it's `http://localhost:8081`
(Expo's default port). The app and the API routes both use it. **In production,
change this to your deployed URL** (e.g. an EAS Hosting URL).
- **`GOOGLE_AUTH_URL` / `GITHUB_AUTH_URL`** — the providers' login pages where the
user actually approves access.

---

## 7. API route #1 — `src/app/api/auth/authorize+api.ts`

This is where the app sends the user to start login. Its job: take the request
from `expo-auth-session` and build the **real** Google/GitHub authorization URL,
then redirect to it.

> File naming: in Expo Router, a file ending in `+api.ts` is a server route. The
path `src/app/api/auth/authorize+api.ts` becomes the endpoint
`/api/auth/authorize`. Exporting a `GET` function handles GET requests.
> 

Full file:

```tsx
import { BASE_URL, GITHUB_AUTH_URL, GITHUB_CLIENT_ID, GOOGLE_AUTH_URL, GOOGLE_CLIENT_ID } from "@/constants";

export async function GET(request: Request) {
    const url = new URL(request.url);

    const provider = url.searchParams.get("provider") ?? "google";
    const redirectUri = url.searchParams.get("redirect_uri");
    const state = url.searchParams.get("state");
    const codeChallenge = url.searchParams.get("code_challenge");
    const codeChallengeMethod = url.searchParams.get("code_challenge_method");

    if (!redirectUri || !state) {
        return Response.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const callbackUri = `${BASE_URL}/api/auth/callback`;

    if (provider === "github") {
        if (!GITHUB_CLIENT_ID) {
            return Response.json({ error: "Missing GitHub client id" }, { status: 400 });
        }

        const params = new URLSearchParams({
            client_id: GITHUB_CLIENT_ID,
            redirect_uri: callbackUri,
            scope: "read:user user:email",
            state,
            allow_signup: "true",
        });

        return Response.redirect(`${GITHUB_AUTH_URL}?${params.toString()}`);
    }

    if (!GOOGLE_CLIENT_ID) {
        return Response.json({ error: "Missing Google client id" }, { status: 400 });
    }

    const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: callbackUri,
        response_type: "code",
        scope: "openid profile email",
        state,
        prompt: "select_account",
        ...(codeChallenge && { code_challenge: codeChallenge }),
        ...(codeChallengeMethod && { code_challenge_method: codeChallengeMethod }),
    });

    return Response.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
}
```

### What each query parameter means

These come *into* our route from `expo-auth-session`:

- **`provider`** — `"google"` or `"github"`. We added this ourselves via
`extraParams` (Step 9) so one endpoint can serve both providers. Defaults to
`"google"`.
- **`redirect_uri`** — where the app wants to end up. We validate it's present but
we redirect to our own fixed `callbackUri` instead (the provider only knows our
callback URL).
- **`state`** — a random anti‑CSRF value generated by `expo-auth-session`. We pass
it through unchanged; the provider returns it so the app can confirm the
response matches the request it started.
- **`code_challenge` / `code_challenge_method`** — the **PKCE** values (Google
only here). PKCE = "Proof Key for Code Exchange." The app hashes a random secret
(`code_verifier`) into a `code_challenge`. Later, the token step must present the
original verifier. This stops an attacker who steals the `code` from using it.

These go *out* to the provider:

- **`client_id`** — your public app identifier at Google/GitHub.
- **`redirect_uri: callbackUri`** — the URL the provider sends the user back to.
Must exactly match what you registered in Step 4.
- **`scope`** — what data you're asking for. Google: `openid profile email`.
GitHub: `read:user user:email` (read profile + access email addresses).
- **`response_type: "code"`** (Google) — use the Authorization Code flow: the
provider returns a short‑lived `code` that the server exchanges for tokens.
- **`prompt: "select_account"`** (Google) — always show the account picker.
- **`allow_signup: "true"`** (GitHub) — let users create a GitHub account during login.

The `...(codeChallenge && {...})` spread means: only include those keys **if** they
exist. GitHub here doesn't use PKCE, so they're omitted for it.

---

## 8. API route #2 — `src/app/api/auth/callback+api.ts`

After the user approves on Google/GitHub, the provider redirects to our registered
callback (`/api/auth/callback`) with a `code` and the `state`. A browser tab can't
hand data straight to a native app — so this route bounces those values back into
the app using the custom `scheme` deep link (`expoauthentication://`).

Full file:

```tsx

export async function GET(request: Request) {
    const url = new URL(request.url);

    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");

    const redirectUri = "expoauthentication://";

    const params = new URLSearchParams({
        code: code || "",
        state: state || "",
    });

    return Response.redirect(`${redirectUri}?${params.toString()}`);
}
```

### What's happening

- **`code`** — the one‑time authorization code from the provider. It is **not** a
login token yet; it must be exchanged on the server (next step).
- **`state`** — echoed back from the provider. `expo-auth-session` compares it to
the value it generated to ensure the response is legitimate.
- **`redirectUri = "expoauthentication://"`** — the app's deep link. This **must**
match the `scheme` in `app.json`. When the browser hits this URL, the OS reopens
your app and `expo-auth-session` receives the `code` and `state`.

That's the entire job of this route: receive from the provider, forward into the app.

---

## 9. API route #3 — `src/app/api/auth/token+api.ts`

This is the secure heart of the system. The app sends the `code` here; this route
exchanges it with the provider **using the client secret**, fetches the user's
profile, then signs and returns **our own JWT**.

Full file:

```tsx
import { BASE_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET } from "@/constants";
import * as jose from 'jose';

interface NormalizedUser {
    sub: string;
    name: string;
    email: string;
    picture: string;
}

const CALLBACK_URI = `${BASE_URL}/api/auth/callback`;

export async function POST(request: Request) {
    try {
        const formData = new URLSearchParams(await request.text());
        const code = formData.get("code");
        const codeVerifier = formData.get("code_verifier");
        const provider = formData.get("provider") ?? "google";

        if (!code) {
            return Response.json({ error: "Missing code" }, { status: 400 });
        }

        const user =
            provider === "github"
                ? await exchangeGithub(code)
                : await exchangeGoogle(code, codeVerifier);

        if (!user) {
            return Response.json({ error: "Token exchange failed" }, { status: 400 });
        }

        const secret = new TextEncoder().encode(JWT_SECRET);
        const accessToken = await new jose.SignJWT({
            sub: user.sub,
            name: user.name,
            email: user.email,
            picture: user.picture,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("7d")
            .setIssuedAt()
            .sign(secret);

        return Response.json({ accessToken, user });
    } catch (error) {
        console.error("Error exchanging code for token:", error);
        return Response.json({ error: "Failed to exchange code for token" }, { status: 500 });
    }
}

async function exchangeGoogle(code: string, codeVerifier: string | null): Promise<NormalizedUser | null> {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            code,
            client_id: GOOGLE_CLIENT_ID!,
            client_secret: GOOGLE_CLIENT_SECRET!,
            redirect_uri: CALLBACK_URI,
            grant_type: "authorization_code",
            ...(codeVerifier && { code_verifier: codeVerifier }),
        }),
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok || !tokens.access_token) {
        console.error("Google token exchange failed:", tokens);
        return null;
    }

    const userResponse = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
            Authorization: `Bearer ${tokens.access_token}`,
        },
    });

    const userInfo = await userResponse.json();

    return {
        sub: String(userInfo.sub),
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
    };
}

async function exchangeGithub(code: string): Promise<NormalizedUser | null> {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
        },
        body: new URLSearchParams({
            code,
            client_id: GITHUB_CLIENT_ID!,
            client_secret: GITHUB_CLIENT_SECRET!,
            redirect_uri: CALLBACK_URI,
        }),
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok || !tokens.access_token) {
        console.error("GitHub token exchange failed:", tokens);
        return null;
    }

    const headers = {
        Authorization: `Bearer ${tokens.access_token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "expo-authentication",
    };

    const userResponse = await fetch("https://api.github.com/user", { headers });
    const userInfo = await userResponse.json();

    let email: string | undefined = userInfo.email;
    if (!email) {
        const emailResponse = await fetch("https://api.github.com/user/emails", { headers });
        if (emailResponse.ok) {
            const emails = await emailResponse.json();
            if (Array.isArray(emails)) {
                const primary = emails.find((e: any) => e.primary && e.verified) ?? emails[0];
                email = primary?.email;
            }
        }
    }

    return {
        sub: String(userInfo.id),
        name: userInfo.name ?? userInfo.login,
        email: email ?? "",
        picture: userInfo.avatar_url,
    };
}
```

### The POST handler, step by step

- **`request.text()` + `URLSearchParams`** — the app sends the body as
`application/x-www-form-urlencoded`, so we parse it into key/value pairs.
- **`code`** — the authorization code to exchange. Required.
- **`code_verifier`** — the PKCE secret (Google). The original of the
`code_challenge` sent in Step 7. The provider checks they match.
- **`provider`** — `"google"` or `"github"`, decides which exchange function runs.
- **`NormalizedUser`** — we squash Google's and GitHub's different profile shapes
into one consistent object (`sub`, `name`, `email`, `picture`) so the rest of the
app doesn't care which provider was used. `sub` = the provider's unique user id.

### Signing our own JWT

```tsx
const secret = new TextEncoder().encode(JWT_SECRET);
const accessToken = await new jose.SignJWT({ sub, name, email, picture })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(secret);
```

- **`SignJWT({...})`** — the payload (claims) we put inside the token: the user's
basic info.
- **`setProtectedHeader({ alg: "HS256" })`** — sign with HMAC‑SHA256 using our
`JWT_SECRET`.
- **`setExpirationTime("7d")`** — token is valid 7 days; after that the user must
log in again.
- **`setIssuedAt()`** — records when it was created.
- **`.sign(secret)`** — produces the final signed string. Because only our server
knows `JWT_SECRET`, nobody can forge a valid token.

### `exchangeGoogle` / `exchangeGithub`

Both do the same two things:

1. **Exchange the code for a provider access token** by POSTing to the provider's
    
    token endpoint with `client_id`, `client_secret`, `redirect_uri`, and the `code`.
    
    - `grant_type: "authorization_code"` (Google) tells Google which OAuth flow.
    - `redirect_uri` must match the one used earlier or the provider rejects it.
    - GitHub needs `Accept: application/json` or it returns a form‑encoded body.
2. **Fetch the user profile** with that provider token (`Bearer` auth) and map it
    
    into `NormalizedUser`.
    

GitHub extra step: a user's email can be private, so if `userInfo.email` is empty
we call `/user/emails` and pick the **primary + verified** address. GitHub also
**requires** a `User-Agent` header on every API request.

---

## 10. The auth context — `context/auth-context.tsx`

This is the client side. It wires up `expo-auth-session` to our discovery
endpoints, runs the login, stores the JWT, and exposes a simple `useAuth()` hook
to the rest of the app.

Full file:

```tsx
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';

import { BASE_URL } from '@/constants';
import { AuthRequestConfig, DiscoveryDocument, makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as SecureStore from 'expo-secure-store';
import * as jose from 'jose';

WebBrowser.maybeCompleteAuthSession();

interface AuthUser{
    name: string;
    email: string;
    picture: string;
}

type Provider = "google" | "github";

interface AuthContextType{
    user: AuthUser | null;
    signIn: (provider?: Provider) => Promise<void>;
    signOut: () => Promise<void>;
    isLoading: boolean;
    isReady: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const googleConfig:AuthRequestConfig = {
    clientId:"google",
    scopes:["openid","profile","email"],
    redirectUri:makeRedirectUri(),
    extraParams:{ provider:"google" },
}

const githubConfig:AuthRequestConfig = {
    clientId:"github",
    scopes:["read:user","user:email"],
    redirectUri:makeRedirectUri(),
    usePKCE:false,
    extraParams:{ provider:"github" },
}

const discovery:DiscoveryDocument = {
    authorizationEndpoint: `${BASE_URL}/api/auth/authorize`,
    tokenEndpoint: `${BASE_URL}/api/auth/token`,
}

export const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [user , setUser] = React.useState<AuthUser | null>(null);
    const [accessToken , setAccessToken] = React.useState<string | null>(null);
    const [googleRequest , googleResponse , googlePromptAsync] = useAuthRequest(googleConfig , discovery);
    const [githubRequest , githubResponse , githubPromptAsync] = useAuthRequest(githubConfig , discovery);
    const [isLoading , setIsLoading] = React.useState(false);
    const [isReady , setIsReady] = React.useState(false);

    React.useEffect(()=>{
        if(googleResponse?.type === "success"){
            handleAuthResponse(googleResponse.params.code, "google", googleRequest?.codeVerifier)
        }
    },[googleResponse])

    React.useEffect(()=>{
        if(githubResponse?.type === "success"){
            handleAuthResponse(githubResponse.params.code, "github", githubRequest?.codeVerifier)
        }
    },[githubResponse])

    React.useEffect(()=>{
        restoreSession();
    },[])

    const restoreSession = async () => {
        try {
            const storedToken = await SecureStore.getItemAsync("accessToken");

            if(storedToken){
                const decoded = jose.decodeJwt(storedToken);
                const exp = (decoded as any).exp;
                const now = Math.floor(Date.now() / 1000);

                if(exp && now < exp){
                    setAccessToken(storedToken);
                    setUser(decoded as unknown as AuthUser);
                }
            }
        } catch (error) {

        } finally {
            setIsReady(true);
        }
    }

    const handleAuthResponse = async (code:string, provider:Provider, codeVerifier?:string) => {
        try {
            setIsLoading(true);
            const formData = new URLSearchParams();

            formData.append("code", code);
            formData.append("provider", provider);
            if(codeVerifier){
                formData.append("code_verifier", codeVerifier);
            }

            const tokenResponse = await fetch(`${BASE_URL}/api/auth/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            });

            const tokens = await tokenResponse.json();

            if (!tokenResponse.ok || typeof tokens.accessToken !== "string") {
                console.error("Token exchange failed:", tokens);
                return;
            }

            await SecureStore.setItemAsync("accessToken", tokens.accessToken);
            setAccessToken(tokens.accessToken);
            const decoded = jose.decodeJwt(tokens.accessToken);
            setUser(decoded as unknown as AuthUser);

        } catch (error) {
            console.error("Error handling auth response:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const signIn = async(provider:Provider = "google") => {
       try {
        if(provider === "github"){
            if(!githubRequest) return;
            await githubPromptAsync();
        } else {
            if(!googleRequest) return;
            await googlePromptAsync();
        }
       } catch (error) {
        console.error("Error signing in:", error);
       }
    }

    const signOut = async() => {
        await SecureStore.deleteItemAsync("accessToken");
        setUser(null);
        setAccessToken(null);
    }

    return (
        <AuthContext.Provider value={{user, signIn, signOut, isLoading, isReady}}>
            {children}
        </AuthContext.Provider>

    )
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
```

### Pieces explained

- **`WebBrowser.maybeCompleteAuthSession()`** — called once at the top. It finishes
the auth session when the browser redirects back, especially needed on web.
- **`AuthUser` / `Provider`** — simple types for the logged‑in user and which
provider is allowed.
- **`googleConfig` / `githubConfig`** (`AuthRequestConfig`):
    - **`clientId`** — here it's just `"google"`/`"github"` because the *real*
    client IDs live on the server. `expo-auth-session` requires the field, so we
    pass a placeholder; the actual ID is added by our `/authorize` route.
    - **`scopes`** — same scopes we request server‑side.
    - **`redirectUri: makeRedirectUri()`** — generates the app's deep link
    (`expoauthentication://`) from your `app.json` `scheme`. This is where the app
    expects to be reopened.
    - **`extraParams: { provider }`** — extra query params added to the `/authorize`
    request so the server knows which provider to use.
    - **`usePKCE: false`** (GitHub) — GitHub OAuth Apps don't support PKCE, so we
    turn it off. Google keeps PKCE on (default).
- **`discovery: DiscoveryDocument`** — normally points at a provider's well‑known
URLs. Here we point it at **our own** `/api/auth/authorize` and `/api/auth/token`
so the whole flow goes through our backend.
- **`useAuthRequest(config, discovery)`** — returns `[request, response, promptAsync]`:
    - `request` — the prepared auth request (contains the PKCE `codeVerifier`).
    - `response` — populated after the browser returns (`type: "success"` etc.).
    - `promptAsync()` — opens the browser to start login.

### The effects

- The two `useEffect`s watch `googleResponse` / `githubResponse`. When one becomes
`"success"`, they call `handleAuthResponse` with the returned `code` and the
request's `codeVerifier` (PKCE).
- The third `useEffect` runs `restoreSession()` once on app start.

### `restoreSession`

Reads the saved JWT from SecureStore, decodes it, checks the `exp` (expiry) claim
against the current time, and if still valid restores the user — so users stay
logged in across app restarts. `isReady` flips to `true` when done so the UI can
stop showing a loading spinner.

### `handleAuthResponse`

Takes the `code`, builds a form body (`code`, `provider`, and `code_verifier` if
present), POSTs it to `/api/auth/token`, then on success stores the returned
`accessToken` in SecureStore, decodes it, and sets the user.

### `signIn` / `signOut`

- **`signIn(provider)`** — calls the right `promptAsync()` to open the browser.
Defaults to Google.
- **`signOut()`** — deletes the stored token and clears the user.

### `useAuth`

A convenience hook. Throws if used outside `<AuthProvider>` so mistakes are caught
early.

---

## 11. Root layout — `src/app/_layout.tsx`

Wraps the app in `AuthProvider` and uses Expo Router's `Stack.Protected` to show
either the home screen (logged in) or the login screen (logged out).

Full file:

```tsx
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { AuthProvider, useAuth } from "../../context/auth-context";

function RootNavigator() {
  const { user, isReady } = useAuth();

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="index" />
      </Stack.Protected>

      <Stack.Protected guard={!user}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
```

- **`isReady` guard** — while `restoreSession` runs we show a spinner so we don't
flash the login screen at an already‑logged‑in user.
- **`Stack.Protected guard={!!user}`** — only mounts the `index` (home) screen when
there's a user.
- **`Stack.Protected guard={!user}`** — only mounts `login` when there's no user.
Switching `user` automatically navigates between them.

---

## 12. Login screen — `src/app/login.tsx`

Two buttons that call `signIn("google")` and `signIn("github")`.

Full file:

```tsx
import { Image } from "expo-image";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../../context/auth-context";

export default function Login() {
  const { signIn, isLoading } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B1120" }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <View style={{ alignItems: "center", gap: 16 }}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 28,
              borderCurve: "continuous",
              backgroundColor: "#208AEF",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 32px rgba(32, 138, 239, 0.45)",
            }}
          >
            <Image source="sf:lock.shield.fill" tintColor="#fff" style={{ width: 48, height: 48 }} />
          </View>
          <Text style={{ color: "#fff", fontSize: 30, fontWeight: "700" }}>Welcome back</Text>
          <Text
            style={{ color: "#94A3B8", fontSize: 16, textAlign: "center", lineHeight: 22 }}
          >
            Sign in with your Google account to continue.
          </Text>
        </View>

        <View style={{ width: "100%", gap: 14 }}>
          <Pressable
            onPress={() => signIn("google")}
            disabled={isLoading}
            style={({ pressed }) => ({
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              height: 56,
              borderRadius: 16,
              borderCurve: "continuous",
              backgroundColor: "#fff",
              opacity: pressed || isLoading ? 0.7 : 1,
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
            })}
          >
            {isLoading ? (
              <ActivityIndicator color="#0B1120" />
            ) : (
              <>
                <Image
                  source={{ uri: "https://www.google.com/favicon.ico" }}
                  style={{ width: 22, height: 22 }}
                />
                <Text style={{ color: "#0B1120", fontSize: 17, fontWeight: "600" }}>
                  Continue with Google
                </Text>
              </>
            )}
          </Pressable>

          <Pressable
            onPress={() => signIn("github")}
            disabled={isLoading}
            style={({ pressed }) => ({
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              height: 56,
              borderRadius: 16,
              borderCurve: "continuous",
              backgroundColor: "#1F2937",
              borderWidth: 1,
              borderColor: "#334155",
              opacity: pressed || isLoading ? 0.7 : 1,
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
            })}
          >
            <Image
              source="sf:chevron.left.forwardslash.chevron.right"
              tintColor="#fff"
              style={{ width: 20, height: 20 }}
            />
            <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600" }}>
              Continue with GitHub
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
```

- **`useAuth()`** gives `signIn` and `isLoading`.
- Each `Pressable` calls `signIn` with the chosen provider; `isLoading` disables
the buttons and shows a spinner during the token exchange.

---

## 13. Home screen — `src/app/index.tsx`

Shows the logged‑in user's avatar, name, email, and a sign‑out button.

Full file:

```tsx
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../../context/auth-context";

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B1120" }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            gap: 16,
            paddingVertical: 40,
            paddingHorizontal: 24,
            borderRadius: 24,
            borderCurve: "continuous",
            backgroundColor: "#111A2E",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)",
          }}
        >
          <Image
            source={{ uri: user?.picture }}
            placeholder="sf:person.crop.circle.fill"
            style={{
              width: 112,
              height: 112,
              borderRadius: 56,
              backgroundColor: "#1E293B",
            }}
            contentFit="cover"
          />
          <Text selectable style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>
            {user?.name}
          </Text>
          <Text selectable style={{ color: "#94A3B8", fontSize: 16 }}>
            {user?.email}
          </Text>
        </View>

        <Pressable
          onPress={signOut}
          style={({ pressed }) => ({
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            height: 56,
            borderRadius: 16,
            borderCurve: "continuous",
            backgroundColor: "#EF4444",
            opacity: pressed ? 0.7 : 1,
            boxShadow: "0 6px 20px rgba(239, 68, 68, 0.35)",
          })}
        >
          <Image
            source="sf:rectangle.portrait.and.arrow.right"
            tintColor="#fff"
            style={{ width: 20, height: 20 }}
          />
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600" }}>Sign out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
```

- **`user?.picture` / `name` / `email`** come straight from the JWT we decoded.
- **`signOut`** clears the token and the protected‑route guard sends the user back
to login.

---

## 14. Run and test

```bash
npx expo start
```

Because the API routes need a server, run on a build that can hit
`http://localhost:8081`:

- **Web** — press `w`. Easiest for a first test; everything is on `localhost:8081`.
- **iOS / Android** — use a **development build** (`expo-dev-client` is already in
the project) rather than Expo Go, so the custom `scheme` deep link works.

Try it:

1. Open the app → you see the **login** screen (no user yet).
2. Tap **Continue with Google** → browser opens the Google account picker.
3. Approve → you're redirected through `/api/auth/callback` back into the app.
4. The app exchanges the code at `/api/auth/token`, stores the JWT, and shows the
    
    **home** screen with your name, email, and photo.
    
5. Close and reopen the app → `restoreSession` keeps you logged in.
6. Tap **Sign out** → back to login.

Repeat with **Continue with GitHub**.

---

## 15. Troubleshooting

- **`redirect_uri_mismatch`** — the callback registered with the provider doesn't
exactly match `http://localhost:8081/api/auth/callback`. Fix it in the Google
Cloud / GitHub OAuth app settings (no trailing slash, exact scheme + port).
- **App doesn't reopen after approving** — your `scheme` in `app.json`
(`expoauthentication`) must match the `redirectUri` in `callback+api.ts`
(`expoauthentication://`). Rebuild the dev client after changing the scheme.
- **"Missing Google/GitHub client id"** — the `.env` isn't loaded or the names
don't match `src/constants/index.ts`. Restart `expo start` after editing `.env`.
- **GitHub returns no email** — make sure the `user:email` scope is present; the
code already falls back to `/user/emails`.
- **API route 404** — confirm `web.output` is `"server"` in `app.json`, and the
file is named exactly `authorize+api.ts` (the `+api` suffix is required).
- **`401` from GitHub API** — GitHub requires the `User-Agent` header; it's already
set in `exchangeGithub`.

---

## 16. Security notes & going to production

- **Secrets stay on the server.** `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_SECRET`,
and `JWT_SECRET` have **no** `EXPO_PUBLIC_` prefix, so they never ship in the
app bundle. Never add that prefix to a secret.
- **Use a strong `JWT_SECRET`** in production (a long random string), and keep it
out of git.
- **Change `BASE_URL`.** `http://localhost:8081` only works in dev. When you deploy
the API routes (for example to **EAS Hosting**), set `BASE_URL` to that public
URL and add `<that-url>/api/auth/callback` to both providers' allowed callbacks.
- **Token storage.** The JWT lives in `expo-secure-store` (Keychain/Keystore), not
plain `AsyncStorage`, so it's encrypted at rest.
- **Verify the JWT on protected requests.** This guide signs a JWT and decodes it
on the client for display. For any *protected* server endpoint you add later,
verify the token with `jose.jwtVerify(token, secret)` instead of just decoding
it — decoding does not check the signature.

---

## Quick file checklist

```
app.json                              # scheme + web.output: server
.env                                  # server-only secrets
src/constants/index.ts                # ids, secrets, base url
src/app/api/auth/authorize+api.ts     # build provider auth URL
src/app/api/auth/callback+api.ts      # bounce code back into the app
src/app/api/auth/token+api.ts         # exchange code -> sign our JWT
context/auth-context.tsx              # client OAuth + session + useAuth()
src/app/_layout.tsx                   # AuthProvider + protected routes
src/app/login.tsx                     # Google / GitHub buttons
src/app/index.tsx                     # logged-in home + sign out
```

That's the whole system. The mental model to remember: **the app never sees a
secret — it only ever talks to your own three API routes, and those routes do the
private work and hand back a JWT you control.**

# Better Auth + Expo (SDK 55) — Setup Notes

Implementation notes for the **Better Auth** flow in this project. This is a second,
independent auth stack alongside the `expo-auth-session` flow documented in
`OAUTH_NOTES.md`.

Built against **Expo SDK 55** (RN 0.83, React 19.2) using the
Better Auth Expo integration.

## How it works (the big picture)

Unlike `expo-auth-session` (which runs OAuth on the device), Better Auth runs a small
**server** that owns the OAuth flow and the database. In this project that server is hosted
**inside the Expo app** via an Expo Router **API route**. The React Native client talks to it
over HTTP.

```
[ RN app ]  --HTTP-->  [ Expo API route /api/auth/* ]  -->  [ Postgres ]
 auth-client.ts            auth.ts (betterAuth)              user/session/account/verification
```

## What's in the project

| File | Purpose |
| --- | --- |
| `src/lib/auth.ts` | The Better Auth **server** instance (providers, DB, account linking, trusted origins) |
| `src/lib/auth-client.ts` | The **client** (`createAuthClient` + `expoClient` plugin) |
| `src/app/api/auth/[...auth]+api.ts` | Expo API route that mounts `auth.handler` for GET/POST |
| `src/components/better-auth-panel.tsx` | UI: email/password + Google/GitHub buttons + session card |
| `src/app/login.tsx` | "Expo Auth / Better Auth" tab switcher that renders the panel |
| `better-auth_migrations/*.sql` | Generated SQL schema (artifact from the CLI) |
| `.env` | `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, provider IDs/secrets |

## Packages

| Package | Side | Why |
| --- | --- | --- |
| `better-auth` | server + client | Core library |
| `@better-auth/expo` | server (`expo()` plugin) + client (`expoClient`) | Deep-link OAuth + secure cookie handling |
| `pg` | server | Postgres driver (Kysely adapter uses it) |
| `expo-secure-store` | client | Stores session/cookies securely (Keychain / encrypted prefs) |
| `expo-network` | client | **Required** by `@better-auth/expo/client` for online/offline detection |
| `expo-linking`, `expo-web-browser`, `expo-constants` | client | Social OAuth deep-link + in-app browser |

> **Metro:** No custom `metro.config.js` is needed. SDK 53+ enables `package.json` exports in
Metro by default, which is what Better Auth relies on. A custom config that disables exports
(or stubs modules) will break the bundle — a previous one caused the app to crash on launch.
> 

## Server config — `src/lib/auth.ts`

```tsx
export const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL }), // Kysely/pg adapter
  emailAndPassword: { enabled: true },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github", "email-password"], // link same-email accounts
    },
  },
  plugins: [expo()],
  socialProviders: {
    github: { clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! },
    google: { clientId: "...", clientSecret: "..." },
  },
  trustedOrigins: [
    "expoauthentication://",                 // app scheme (from app.json) — production deep link
    ...(process.env.NODE_ENV === "development"
      ? ["exp://", "exp://**", "exp://192.168.*.*:*/**"] // dev: Expo Go / LAN
      : []),
  ],
});
```

Key points:

- **`baseURL`/secret** come from env: `BETTER_AUTH_URL` and `BETTER_AUTH_SECRET` (read automatically).
- **`basePath`** defaults to `/api/auth` — that's why the API route lives at `app/api/auth/[...auth]`.
- **`trustedOrigins`** must include the app's deep-link scheme, or social sign-in fails with
`Invalid origin`.

## Client config — `src/lib/auth-client.ts`

```tsx
export const authClient = createAuthClient({
  baseURL: "http://localhost:8081",          // must reach the API route
  plugins: [expoClient({ scheme: "expoauthentication", storage: SecureStore })],
});
```

- On a **physical device**, `localhost` points at the phone, not your machine. Use your LAN IP
(e.g. `http://192.168.x.x:8081`) or derive it from `Constants.expoConfig.hostUri`.
- `useSession()`, `signIn.email()`, `signUp.email()`, `signIn.social({ provider, callbackURL })`,
and `signOut()` are the main client methods.
- On native, `signIn.social` opens the in-app browser and does **not** auto-navigate — handle
navigation yourself after it resolves.

## Database

Uses Postgres via a `pg.Pool` → Better Auth's built-in **Kysely** adapter. Tables created:
`user`, `session`, `account`, `verification` (+ indexes).

`.env`:

```
DATABASE_URL=postgresql://postgres:<password>@localhost:5432/postgres
```

### Migrations

Because we use the Kysely adapter, the CLI can apply the schema **directly** (the `.sql` file
under `better-auth_migrations/` is just a generated artifact and is optional):

```bash
# Apply schema directly to the DB (re-run after changing the auth config):
npx @better-auth/cli migrate --config src/lib/auth.ts -y

# Or only generate the SQL file:
npx @better-auth/cli generate --config src/lib/auth.ts
```

> `--config src/lib/auth.ts` is required because the config isn't in a default location.
> 

## OAuth provider setup

Better Auth handles OAuth **on the server**, so providers redirect to the server callback:

```
{BETTER_AUTH_URL}/api/auth/callback/{provider}
```

| Provider | Console | Callback / Redirect URI (dev) |
| --- | --- | --- |
| Google | console.cloud.google.com → Credentials → **Web application** client | `http://localhost:8081/api/auth/callback/google` |
| GitHub | github.com/settings/developers → **OAuth App** | `http://localhost:8081/api/auth/callback/github` |
- Google: also set **Authorized JavaScript origin** = `http://localhost:8081`.
- GitHub: **Homepage URL** = `http://localhost:8081`; one callback URL per app.
- For real devices/production, swap `localhost:8081` for your LAN IP or deployed HTTPS host and
register that callback too.

## Common errors & fixes (hit during setup)

| Error | Cause | Fix |
| --- | --- | --- |
| App closes on launch; `Unable to resolve "expo-network"` | `@better-auth/expo/client` needs `expo-network`, which wasn't installed | `npx expo install expo-network` (native module → rebuild dev client) |
| App crashed when importing Better Auth | Custom `metro.config.js` interfered with package exports | Delete it; SDK 55 enables exports by default |
| `Invalid origin: expoauthentication://` | App scheme not in `trustedOrigins` | Add `"expoauthentication://"` (+ `exp://` for dev) |
| `account_not_linked` | Email already exists under another provider; auto-link not allowed | Enable `account.accountLinking` with `trustedProviders` |
| `state_mismatch: verification not found` | OAuth `state` consumed by a failed/retried attempt, or server restarted mid-flow | Fix the underlying failure, retry once cleanly; clear `verification` table if wedged |
| `Social provider google is missing clientId` | Read from wrong env var (`NEXT_PUBLIC_GOOGLE_CLIENT_ID`) | Use `GOOGLE_CLIENT_ID` / move creds to `.env` |

### Useful cleanup SQL (dev only)

```sql
DELETE FROM "verification";                          -- clear stale OAuth state
DELETE FROM "user" WHERE email = 'test@example.com'; -- cascades to session/account
```

## Running it

1. Ensure Postgres is up and `DATABASE_URL` is set, then run migrations (above).
2. `npx expo start --clear` (clear cache after dependency/metro changes).
3. **Native module added (`expo-network`)** → rebuild the dev client: `npx expo run:android` / `run:ios`.
    
    OAuth does not work in stock Expo Go.
    
4. Open the app → **Better Auth** tab → email/password or a social provider.

## Security checklist

- [ ]  
    
    Move hardcoded Google `clientId`/`clientSecret` in `auth.ts` into `.env` (don't commit secrets).
    
- [ ]  
    
    Keep `.env` out of version control; rotate the leaked Google/GitHub secrets if they were committed.
    
- [ ]  
    
    `BETTER_AUTH_SECRET` is a strong random value (`openssl rand -base64 32`).
    
- [ ]  
    
    `trustedOrigins` uses the specific app scheme in production (no `exp://` wildcards).
    
- [ ]  
    
    Only verified-email providers in `accountLinking.trustedProviders`.
    
- [ ]  
    
    Provider callback URLs registered exactly, for every host you run on.