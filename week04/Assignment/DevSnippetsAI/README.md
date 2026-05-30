
# DevSnippetsAI

DevSnippetsAI is a modern offline-first mobile application built with Expo, React Native, and TypeScript. It helps developers save, organize, manage, and understand reusable code snippets directly on their device.

The app is designed as a practical developer utility where snippets, files, preferences, and AI configuration are managed using the right local storage tools.

---

## Features

### Snippet Management

- Create code snippets
- Edit snippets
- Delete snippets
- Search snippets
- Mark snippets as favorites
- Store title, code content, extension/language, and tags

### Offline Storage

The app follows an offline-first approach.

Core snippet features work without internet:

- Create snippets offline
- Edit snippets offline
- Search snippets offline
- View favorite snippets offline
- Persist data locally using SQLite

### File Management

The app includes local file management using Expo FileSystem.

Users can:

- Attach screenshots or files to snippets
- Save code files locally
- Browse stored files
- Create folders
- Create files
- Delete files
- Copy files
- Move files
- Export snippets as files

### AI Code Explanation

AI explanation screen is included in the project flow.

Planned AI features:

- Code explanations
- Summaries
- Improvement suggestions
- Bug detection
- Best practice recommendations

API keys are stored securely using SecureStore.

### Export and Sharing

Supported export formats:

- `.txt`
- `.js`
- `.json`

---

## Tech Stack

- Expo
- React Native
- TypeScript
- Expo Router
- SQLite
- Drizzle ORM
- AsyncStorage
- SecureStore
- Expo FileSystem
- Expo Sharing
- Expo Vector Icons

---

## Storage Usage

| Technology | Usage |
|---|---|
| AsyncStorage | Theme and app preferences |
| SecureStore | API keys or sensitive tokens |
| SQLite | Snippet database and file metadata |
| Expo FileSystem | Local file management and exports |

---

## Screens

- Home Screen
- Create Snippet Screen
- Snippet Details Screen
- Edit Snippet Screen
- Favorites Screen
- File Manager Screen
- Settings Screen
- AI Explanation Screen

---

## Project Structure

```bash
DevSnippetsAI
├── app
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── (tabs)
│   │   ├── _layout.tsx
│   │   ├── home.tsx
│   │   ├── favorites.tsx
│   │   ├── files.tsx
│   │   └── settings.tsx
│   ├── snippets
│   │   ├── create.tsx
│   │   ├── [id].tsx
│   │   └── edit
│   │       └── [id].tsx
│   └── ai
│       └── explain
│           └── [id].tsx
│
├── src
│   ├── components
│   ├── constants
│   ├── context
│   │   ├── ThemeContext.tsx
│   │   ├── SnippetContext.tsx
│   │   └── FileContext.tsx
│   ├── db
│   │   ├── database.ts
│   │   └── schema.ts
│   ├── services
│   ├── types
│   └── utils
│
├── drizzle
│   └── migrations
│
├── assets
├── package.json
└── README.md
````

---

## Database Structure

### Snippets Table

Stores all code snippets.

Fields:

* `id`
* `title`
* `code`
* `language`
* `tags`
* `isFavorite`
* `createdAt`
* `updatedAt`

### Files Table

Stores metadata for files managed by the app.

Fields:

* `id`
* `snippetId`
* `name`
* `uri`
* `type`
* `folder`
* `createdAt`

### Settings Table

Stores app settings.

Fields:

* `id`
* `theme`
* `fontSize`
* `updatedAt`

---

## Offline Storage Approach

DevSnippetsAI is local-first.

Snippet data is saved in SQLite, so users can create, edit, search, delete, and favorite snippets without an internet connection.

Theme preferences are stored in AsyncStorage.

API keys are stored securely in SecureStore.

Files and exports are saved locally using Expo FileSystem.

---

## File Management Implementation

Expo FileSystem is used to create and manage local app folders.

Main folders:

```txt
dev-snippets-ai/
├── attachments/
├── exports/
└── templates/
```

The app can:

* create folders
* create files
* pick files
* copy files
* move files
* delete files
* read local folders
* export snippets as local files

---

## AI Integration Workflow

The AI explanation flow is prepared in the app.

Current workflow:

1. User opens a snippet
2. User taps AI Explanation
3. AI screen opens for that snippet
4. API key is stored in SecureStore from Settings
5. AI response can later be generated and saved locally

Current status:

```txt
AI explanation feature is under development.
```

Planned response types:

* explanation
* summary
* suggestions
* bug detection
* best practices

---

## Local Setup

Clone the repository:

```bash
git clone https://github.com/Amie-dev/mobile-dev-cohort.git
```

Move inside the project:

```bash
cd mobile-dev-cohort/week04/Assignment/DevSnippetsAI
```

Install dependencies:

```bash
npm install
```

Generate Drizzle migrations:

```bash
npx drizzle-kit generate
```

Start the Expo development server:

```bash
npx expo start -c
```

Run on Android:

```bash
npx expo start --android
```

Run on iOS:

```bash
npx expo start --ios
```

Run on web:

```bash
npx expo start --web
```

---

## Important Development Notes

If SQLite tables are not created correctly, clear Expo Go app data:

```bash
adb shell pm clear host.exp.exponent
```

Then restart Expo:

```bash
npx expo start -c
```

If using a development build, clear your app package instead of `host.exp.exponent`.

---

## Demo Video

Add demo video link here:

```txt
Demo:
```

---

## Screenshots

Add screenshots here:

```txt
Home Screen:
Create Snippet Screen:
Snippet Details Screen:
Favorites Screen:
File Manager Screen:
Settings Screen:
```

---

## Bonus Features

* Dark and light theme support
* Theme persistence using AsyncStorage
* Secure API key storage using SecureStore
* Local file manager
* Optional screenshot/file attachment for snippets
* Export-ready file structure
* Expo Router based navigation
* Offline-first architecture

---

## Submission Checklist

* GitHub repository link
* Demo video
* Screenshots
* Database structure explanation
* Offline storage explanation
* File management explanation
* AI integration workflow explanation
* Bonus features mentioned


