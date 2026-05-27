Here’s a clean **project plan + folder structure** for this assignment.

## App Name Idea

**CodeVault** — Offline Code Snippet Manager

## Main Features

### 1. Snippet Management

User can:

Create snippet
Edit snippet
Delete snippet
Search snippet
Mark favorite
Filter by language/tags

Snippet fields:

```ts
{
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}
```

---

## Storage Usage

| Storage         | Use                                                    |
| --------------- | ------------------------------------------------------ |
| SQLite          | Store snippets, tags, attachments metadata             |
| AsyncStorage    | Theme, onboarding, app preferences                     |
| SecureStore     | AI API key/token                                       |
| Expo FileSystem | Screenshot attachments, exported code files, templates |

---

## Suggested Folder Structure

```bash
src
├── app
│   ├── HomeScreen.tsx
│   ├── CreateSnippetScreen.tsx
│   ├── EditSnippetScreen.tsx
│   ├── SnippetDetailsScreen.tsx
│   ├── FavoritesScreen.tsx
│   ├── FileManagerScreen.tsx
│   └── SettingsScreen.tsx
│
├── components
│   ├── snippets
│   │   ├── SnippetCard.tsx
│   │   ├── SnippetForm.tsx
│   │   ├── CodePreview.tsx
│   │   └── TagInput.tsx
│   │
│   ├── files
│   │   ├── FileCard.tsx
│   │   └── FolderCard.tsx
│   │
│   └── ui
│       ├── AppButton.tsx
│       ├── AppInput.tsx
│       ├── EmptyState.tsx
│       └── ScreenWrapper.tsx
│
├── db
│   ├── database.ts
│   ├── schema.ts
│   ├── migrations.ts
│   └── queries
│       ├── snippetQueries.ts
│       └── fileQueries.ts
│
├── services
│   ├── aiService.ts
│   ├── fileService.ts
│   ├── exportService.ts
│   ├── shareService.ts
│   ├── secureStoreService.ts
│   └── preferenceService.ts
│
├── context
│   ├── ThemeContext.tsx
│   └── SnippetContext.tsx
│
├── hooks
│   ├── useSnippets.ts
│   ├── useFiles.ts
│   ├── useTheme.ts
│   └── useAIExplanation.ts
│
├── navigation
│   ├── RootNavigator.tsx
│   ├── BottomTabs.tsx
│   └── types.ts
│
├── constants
│   ├── colors.ts
│   ├── languages.ts
│   └── storageKeys.ts
│
├── types
│   ├── snippet.ts
│   ├── file.ts
│   └── ai.ts
│
└── utils
    ├── generateId.ts
    ├── formatDate.ts
    └── fileHelpers.ts
```

---

## Screens

### Home Screen

Show all snippets.

Features:

Search bar
Language filter
Tag filter
Favorite button
Snippet cards
Create button

### Create Snippet Screen

Inputs:

Title
Language
Tags
Code editor area
Attach screenshot button
Save button

### Snippet Details Screen

Show:

Title
Code
Language
Tags
Attached files
AI explanation button
Export button
Share button

### Favorites Screen

Only favorite snippets.

### File Manager Screen

Show local files.

Features:

Browse folders
Delete file
Move file
Copy file
Open saved exports
View screenshots/templates

### Settings Screen

Theme toggle
Save AI API key
Clear local data
Export all snippets

---

## SQLite Tables

```sql
snippets
- id
- title
- code
- language
- tags
- isFavorite
- createdAt
- updatedAt
```

```sql
files
- id
- snippetId
- name
- uri
- type
- folder
- createdAt
```

---

## Best Feature Flow

User creates a snippet → saved in SQLite
User attaches image/file → saved using FileSystem
File path saved in SQLite
User marks favorite → SQLite update
User exports snippet → FileSystem creates `.js`, `.txt`, or `.json`
User shares file → Expo Sharing
User adds AI key → SecureStore
User changes theme → AsyncStorage

---

## Recommended Packages

```bash
npx expo install expo-sqlite
npx expo install expo-file-system
npx expo install expo-secure-store
npx expo install expo-sharing
npx expo install expo-document-picker
npx expo install expo-image-picker
npm install @react-native-async-storage/async-storage
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
```

This structure is clean, scalable, and perfect for your Week 04 offline-first assignment.
