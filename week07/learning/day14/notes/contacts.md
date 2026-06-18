# 👥 Expo Contacts (`expo-contacts`) — Complete Deep Notes

## What is Expo Contacts?

`expo-contacts` allows your app to **access, read, create, update, and delete contacts** stored on the user's device.

It gives your app access to information such as:

* Contact Name
* Phone Number
* Email Address
* Address
* Birthday
* Profile Image
* Organization

---

# Why Do Apps Need Contacts Access?

Many apps need to interact with a user's contacts.

Examples:

| App          | Usage                               |
| ------------ | ----------------------------------- |
| WhatsApp     | Find friends already using WhatsApp |
| Telegram     | Sync contacts                       |
| Truecaller   | Identify callers                    |
| Phone App    | Show contact information            |
| Gmail        | Email suggestions                   |
| Payment Apps | Send money to contacts              |

---

# Installation

```bash
npx expo install expo-contacts
```

---

# What Can Expo Contacts Do?

```txt
expo-contacts
│
├── Request Permission
├── Read Contacts
├── Search Contacts
├── Create Contact
├── Update Contact
├── Delete Contact
└── Access Contact Images
```

---

# Permissions

Contacts are considered private user data.

Before accessing contacts:

```txt
User Permission Required
```

---

## Request Permission

```tsx
import * as Contacts from "expo-contacts";

const permission =
  await Contacts.requestPermissionsAsync();
```

Result:

```tsx
{
  granted: true
}
```

or

```tsx
{
  granted: false
}
```

---

# Permission Flow

```txt
Open App
     ↓
Request Contacts Permission
     ↓
User Accepts?
   /      \
 Yes       No
 ↓          ↓
Read       Show Message
Contacts
```

---

# Example

```tsx
const { status } =
  await Contacts.requestPermissionsAsync();

if (status !== "granted") {
  alert("Permission denied");
  return;
}
```

---

# Reading Contacts

## Get All Contacts

```tsx
const contacts =
  await Contacts.getContactsAsync();
```

Returns:

```tsx
{
  data: [...]
}
```

---

# Example

```tsx
import * as Contacts from "expo-contacts";

const contacts =
  await Contacts.getContactsAsync();

console.log(contacts.data);
```

---

# Contact Object

A contact typically looks like:

```tsx
{
  id: "123",

  name: "John Doe",

  firstName: "John",

  lastName: "Doe",

  phoneNumbers: [
    {
      number: "+91 9876543210"
    }
  ],

  emails: [
    {
      email: "john@gmail.com"
    }
  ]
}
```

---

# Display Contact List

```tsx
const { data } =
  await Contacts.getContactsAsync();

setContacts(data);
```

Render:

```tsx
<FlatList
  data={contacts}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <Text>{item.name}</Text>
  )}
/>
```

---

# Selecting Specific Fields

Fetching everything can be slow.

Instead request only needed fields.

---

## Example

```tsx
const { data } =
  await Contacts.getContactsAsync({
    fields: [
      Contacts.Fields.PhoneNumbers,
      Contacts.Fields.Emails,
    ],
  });
```

---

# Available Fields

| Field          | Description           |
| -------------- | --------------------- |
| `PhoneNumbers` | Contact phone numbers |
| `Emails`       | Email addresses       |
| `Image`        | Profile photo         |
| `Addresses`    | Postal addresses      |
| `Birthday`     | Birth date            |
| `Company`      | Organization          |
| `JobTitle`     | Job title             |
| `Dates`        | Important dates       |

---

# Reading Phone Numbers

```tsx
const { data } =
  await Contacts.getContactsAsync({
    fields: [
      Contacts.Fields.PhoneNumbers,
    ],
  });
```

---

# Example

```tsx
data.map(contact => {
  console.log(
    contact.phoneNumbers?.[0]?.number
  );
});
```

Output:

```txt
+91 9876543210
+91 9999999999
```

---

# Reading Emails

```tsx
const { data } =
  await Contacts.getContactsAsync({
    fields: [
      Contacts.Fields.Emails,
    ],
  });
```

---

Output:

```txt
john@gmail.com
alice@gmail.com
```

---

# Reading Contact Photos

```tsx
const { data } =
  await Contacts.getContactsAsync({
    fields: [
      Contacts.Fields.Image,
    ],
  });
```

---

Result:

```tsx
contact.imageAvailable
contact.image
```

---

# Search Contacts

Very common in messaging apps.

---

## Example

```tsx
const { data } =
  await Contacts.getContactsAsync({
    name: "John",
  });
```

Returns contacts matching:

```txt
John
Johnny
John Doe
```

---

# Find Specific Contact

```tsx
const { data } =
  await Contacts.getContactsAsync({
    name: searchText,
  });
```

Used in:

```txt
WhatsApp
Telegram
Phone Apps
```

---

# Get Contact By ID

```tsx
const contact =
  await Contacts.getContactByIdAsync(id);
```

---

Returns:

```tsx
{
  id,
  name,
  phoneNumbers
}
```

---

# Add New Contact

Expo can create contacts.

---

## Example

```tsx
await Contacts.addContactAsync({
  firstName: "John",
  lastName: "Doe",
});
```

---

Result:

```txt
New Contact Saved
```

---

# Add Contact With Phone Number

```tsx
await Contacts.addContactAsync({
  firstName: "John",

  phoneNumbers: [
    {
      number: "+91 9876543210",
    },
  ],
});
```

---

# Update Contact

First get contact ID.

```tsx
await Contacts.updateContactAsync({
  id: contactId,

  firstName: "Updated Name",
});
```

---

# Delete Contact

```tsx
await Contacts.removeContactAsync(
  contactId
);
```

---

Flow:

```txt
Select Contact
      ↓
Delete
      ↓
Removed From Device
```

---

# Get Default Contact Container

Useful on iOS.

```tsx
const container =
  await Contacts.getDefaultContainerIdAsync();
```

---

# Contact Images

Many apps show avatars.

Example:

```tsx
<Image
  source={{
    uri: contact.image?.uri,
  }}
/>
```

---

# WhatsApp Contact Sync Example

Flow:

```txt
Permission
     ↓
Read Contacts
     ↓
Get Phone Numbers
     ↓
Send Numbers To Server
     ↓
Find Friends Using App
```

---

# Payment App Example

Flow:

```txt
Select Contact
      ↓
Read Phone Number
      ↓
Send Money
```

Used by:

```txt
Google Pay
PhonePe
Paytm
```

---

# Invite Friends Feature

Flow:

```txt
Read Contacts
      ↓
Select Contact
      ↓
Send Invite
```

---

Example:

```tsx
const friend =
  contacts[0];

sendInvite(friend.phoneNumbers[0].number);
```

---

# Contact Picker Example

```txt
User Opens Picker
        ↓
Load Contacts
        ↓
Choose Person
        ↓
Return Contact
```

---

# Simple Contact List Example

```tsx
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

export default function ContactScreen() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const { status } =
      await Contacts.requestPermissionsAsync();

    if (status !== "granted") return;

    const { data } =
      await Contacts.getContactsAsync();

    setContacts(data);
  };

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text>{item.name}</Text>
      )}
    />
  );
}
```

---

# Platform Support

| Platform | Support |
| -------- | ------- |
| Android  | ✅       |
| iOS      | ✅       |
| Web      | ❌       |

---

# Common Use Cases

## Messaging Apps

```txt
WhatsApp
Telegram
Signal
```

Find friends automatically.

---

## Calling Apps

```txt
Dialer
Truecaller
```

Show caller information.

---

## Payment Apps

```txt
Google Pay
PhonePe
```

Select recipients.

---

## CRM Apps

```txt
Salesforce
HubSpot
```

Manage customers.

---

## Invitation Systems

```txt
Invite Friends
Referral Programs
```

---

# Common Mistakes

## Mistake 1

Requesting contacts immediately.

❌

```txt
Open App
↓
Permission Popup
```

Bad UX.

---

Better:

```txt
User Clicks "Find Friends"
↓
Request Permission
```

---

## Mistake 2

Fetching all fields.

❌

```tsx
getContactsAsync()
```

when only phone numbers are needed.

---

Better:

```tsx
fields: [
  Contacts.Fields.PhoneNumbers
]
```

---

## Mistake 3

Ignoring denied permission.

Always handle:

```txt
Granted
Denied
```

---

## Mistake 4

Assuming every contact has a phone number.

Wrong.

```txt
Some Contacts Only Have Emails
```

Always use:

```tsx
contact.phoneNumbers?.[0]
```

---

# Privacy Considerations

Contacts are highly sensitive data.

Never:

❌ Upload all contacts without permission

❌ Store contacts unnecessarily

❌ Share contacts with third parties

---

Good Practice:

```txt
Explain Why You Need Contacts
↓
Request Permission
↓
Use Only Required Data
```

---

# Best Practices

### 1. Request Permission Only When Needed

```txt
Find Friends
Import Contacts
Send Invite
```

---

### 2. Fetch Only Required Fields

```txt
Phone Numbers
Emails
Images
```

---

### 3. Handle Empty Contacts

```txt
No Contacts Found
```

---

### 4. Handle Missing Phone Numbers

```txt
Optional Chaining
```

---

### 5. Respect User Privacy

Only access necessary information.

---

# Expo Contacts + Other Expo APIs

## Contacts + SMS

```txt
Select Contact
      ↓
Send SMS
```

---

## Contacts + Notifications

```txt
Birthday Reminder
```

---

## Contacts + Sharing

```txt
Invite Friends
```

---

## Contacts + File Upload

```txt
Share Contact Card
```

---

# Typical Production Flow

```txt
User Clicks "Find Friends"
         ↓
Request Permission
         ↓
Permission Granted?
      /       \
    Yes        No
    ↓          ↓
Load         Show Message
Contacts
    ↓
Display List
    ↓
Select Contact
    ↓
Perform Action
```

---

# Final Mental Model

```txt
expo-contacts
│
├── Permissions
│
├── Read Contacts
│   ├── Names
│   ├── Phone Numbers
│   ├── Emails
│   ├── Images
│   └── Addresses
│
├── Search Contacts
│
├── Create Contacts
│
├── Update Contacts
│
├── Delete Contacts
│
└── Contact Management
```

# Quick Memory Trick

```txt
expo-contacts =
Access phone contacts
↓
Read information
↓
Search contacts
↓
Create/update/delete contacts
↓
Build messaging, payment, and social features
```

## Most Common Real-World Usage

```txt
WhatsApp → Find Friends
PhonePe → Select Recipient
Truecaller → Caller Identity
Telegram → Contact Sync
Gmail → Email Suggestions
```

In real mobile apps, `expo-contacts` is mainly used for **contact discovery, friend finding, messaging, calling, invitations, and payment workflows**. 👥📱
