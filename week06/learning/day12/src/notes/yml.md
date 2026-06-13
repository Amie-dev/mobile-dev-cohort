# 🚀 Bonus Notes

# Understanding YAML (.yml) From Scratch

📅 Week 06 — Deployment Fundamentals

---

# Why Learn YAML?

When working with:

* EAS Workflows
* GitHub Actions
* Docker Compose
* Kubernetes
* CI/CD Pipelines
* Cloud Deployments

you will frequently see files like:

```text
workflow.yml

docker-compose.yml

github-actions.yml
```

Many beginners get scared because YAML looks different from JavaScript.

But YAML is actually very simple.

---

# What is YAML?

YAML stands for:

```text
YAML Ain't Markup Language
```

It is a human-readable format used for configuration.

Think:

```text
JSON
XML
YAML
```

All three store configuration data.

---

# Real World Example

Instead of:

```json
{
  "name": "PocketFiles",
  "version": "1.0.0"
}
```

YAML becomes:

```yaml
name: PocketFiles
version: 1.0.0
```

Cleaner and easier to read.

---

# File Extensions

You will see:

```text
.yml
```

or

```text
.yaml
```

Both are exactly the same.

Example:

```text
workflow.yml

workflow.yaml
```

No difference.

---

# YAML Syntax Rules

---

# Rule 1: Key Value Pairs

Just like JavaScript objects.

YAML:

```yaml
name: PocketFiles
version: 1.0.0
```

JavaScript:

```js
const app = {
  name: "PocketFiles",
  version: "1.0.0",
};
```

---

# Rule 2: Indentation Matters

This is the MOST IMPORTANT RULE.

YAML uses spaces.

Correct:

```yaml
app:
  name: PocketFiles
  version: 1.0.0
```

Wrong:

```yaml
app:
name: PocketFiles
version: 1.0.0
```

YAML will fail.

---

# Think Like Folders

```yaml
app:
  name: PocketFiles
```

Means:

```text
app
 └── name
```

Visual:

```text
app
│
├── name
└── version
```

---

# Rule 3: Use Spaces, Not Tabs

Correct:

```yaml
app:
  name: PocketFiles
```

Wrong:

```yaml
app:
	name: PocketFiles
```

Tabs can break YAML.

Use spaces only.

---

# YAML Data Types

---

# String

```yaml
name: PocketFiles
```

or

```yaml
name: "PocketFiles"
```

---

# Number

```yaml
version: 1
```

---

# Boolean

```yaml
production: true
debug: false
```

---

# Arrays (Lists)

JavaScript:

```js
["android", "ios"]
```

YAML:

```yaml
platforms:
  - android
  - ios
```

---

Visual:

```text
platforms
├── android
└── ios
```

---

# Objects

JavaScript:

```js
{
  app: {
    name: "PocketFiles"
  }
}
```

YAML:

```yaml
app:
  name: PocketFiles
```

---

# Nested Objects

```yaml
app:
  name: PocketFiles
  version: 1.0.0

  author:
    name: Amie
    role: Developer
```

Visual:

```text
app
│
├── name
├── version
│
└── author
     ├── name
     └── role
```

---

# Understanding YAML Through EAS Workflows

Suppose:

```yaml
name: Create Production Build
```

Meaning:

```text
Workflow Name
```

---

# Trigger Section

```yaml
on:
  push:
    branches:
      - main
```

Meaning:

```text
When code is pushed
to main branch
run workflow
```

---

Visual:

```text
Push To Main
      ↓
Run Workflow
```

---

# Jobs Section

```yaml
jobs:
```

Means:

```text
Things To Do
```

Think:

```text
To-Do List
```

---

Example:

```yaml
jobs:
  build_android:
```

Means:

```text
Create Job
Named build_android
```

---

# Job Type

```yaml
build_android:
  type: build
```

Means:

```text
This Job
Creates Build
```

---

# Parameters

```yaml
build_android:
  type: build

  params:
    platform: android
```

Means:

```text
Build Android App
```

---

Visual

```text
Job
│
├── Type = Build
│
└── Platform = Android
```

---

# Complete Example

```yaml
name: Android Production Build

on:
  push:
    branches:
      - main

jobs:
  build_android:
    type: build

    params:
      platform: android
```

Translation:

```text
Workflow Name:
Android Production Build

Trigger:
Push To Main

Action:
Build Android App
```

---

# Multiple Jobs

```yaml
jobs:
  build_android:
    type: build

  build_ios:
    type: build
```

Visual:

```text
Workflow
│
├── Build Android
│
└── Build iOS
```

---

# Job Dependencies

One job can wait for another.

Example:

```yaml
jobs:
  build_android:
    type: build

  submit_android:
    type: submit

    after:
      - build_android
```

Meaning:

```text
Build Android
      ↓
Then Submit Android
```

---

Visual:

```text
build_android
      ↓
submit_android
```

---

# Real EAS Workflow Example

```yaml
name: Production Release

on:
  push:
    branches:
      - main

jobs:
  build_android:
    type: build

    params:
      platform: android

  submit_android:
    type: submit

    params:
      platform: android

    after:
      - build_android
```

---

Translation

```text
Push Code To Main
        ↓
Build Android App
        ↓
Submit To Play Store
```

Automatically.

---

# Compare YAML To JavaScript

YAML:

```yaml
user:
  name: Amie
  age: 21
```

JavaScript:

```js
const user = {
  name: "Amie",
  age: 21,
};
```

---

YAML:

```yaml
platforms:
  - android
  - ios
```

JavaScript:

```js
const platforms = [
  "android",
  "ios",
];
```

---

# Common YAML Mistakes

---

## Wrong Indentation

Wrong:

```yaml
app:
name: PocketFiles
```

Correct:

```yaml
app:
  name: PocketFiles
```

---

## Using Tabs

Wrong:

```yaml
app:
	name: PocketFiles
```

Use spaces only.

---

## Wrong List Syntax

Wrong:

```yaml
platforms:
android
ios
```

Correct:

```yaml
platforms:
  - android
  - ios
```

---

# YAML Mental Model

Think:

```text
YAML
=
Folder Structure
```

Example:

```yaml
app:
  info:
    name: PocketFiles

    author:
      name: Amie
```

Visual:

```text
app
│
└── info
    │
    ├── name
    │
    └── author
        │
        └── name
```

---

# Why YAML Is Used For DevOps

Because it's easy to read.

Compare:

JSON

```json
{
  "jobs": {
    "build": {
      "platform": "android"
    }
  }
}
```

YAML

```yaml
jobs:
  build:
    platform: android
```

Much cleaner.

---

# Interview Questions

### What is YAML?

A human-readable configuration language commonly used for CI/CD, DevOps, cloud services, and automation.

---

### Difference between YAML and JSON?

YAML is easier for humans to read, while JSON is stricter and commonly used for APIs.

---

### Why is indentation important?

YAML uses indentation to represent nesting and hierarchy.

---

### What does `-` mean in YAML?

It represents an item in a list (array).

Example:

```yaml
platforms:
  - android
  - ios
```

---

### Where is YAML used in Expo?

```text
.eas/workflows/*.yml
```

for EAS Workflows automation.

---

# Memory Trick

```text
YAML
=
Configuration Language

Key: Value

Indentation = Hierarchy

- = Array Item

.eas/workflows/*.yml
=
Automation Instructions For Expo
```

Once you understand YAML as **"a prettier JavaScript object written with spaces"**, reading EAS Workflows, GitHub Actions, Docker Compose, and Kubernetes files becomes much easier. 🚀
