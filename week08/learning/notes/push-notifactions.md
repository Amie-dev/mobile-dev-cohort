# Push Notifications in Mobile Development (Expo + React Native)

# Complete Deep-Dive Notes

📅 Week 08

---

# 1. What is a Push Notification?

A Push Notification is a message sent from a remote server to a user's device through a notification delivery service such as:

* Firebase Cloud Messaging (FCM)
* Apple Push Notification Service (APNs)
* Expo Push Service

The notification can arrive even when:

✅ App is closed

✅ App is in background

✅ User is not currently using the app

---

## Real World Examples

### WhatsApp

```text
John:
Where are you?
```

---

### Instagram

```text
Sarah liked your photo
```

---

### YouTube

```text
New video uploaded
```

---

### Banking App

```text
₹5000 credited to your account
```

---

### Food Delivery

```text
Your order is arriving in 5 minutes
```

---

# 2. Why Push Notifications Exist

Without push notifications:

```text
Server knows something happened
User does not know
```

Example:

```text
Someone sent a message
```

The user may never open the app.

---

Push notifications solve this problem.

```text
Server
 ↓
Notify User
 ↓
User Opens App
```

---

# 3. Local vs Push Notifications

| Feature              | Local   | Push             |
| -------------------- | ------- | ---------------- |
| Created By           | Device  | Server           |
| Internet Required    | No      | Yes              |
| Works Offline        | Yes     | No               |
| Needs Backend        | No      | Yes              |
| Can Reach Closed App | Yes     | Yes              |
| Personalized         | Limited | Very High        |
| Example              | Alarm   | WhatsApp Message |

---

# 4. Push Notification Architecture

This is one of the most important interview questions.

---

## Complete Flow

```text
User Device
      ↓
Get Push Token
      ↓
Save Token To Database
      ↓
Server Sends Request
      ↓
Expo Push Service
      ↓
FCM / APNs
      ↓
User Device
      ↓
Notification Displayed
```

---

# Architecture Breakdown

---

## Mobile App

Responsible for:

```text
Permission
Token Generation
Receiving Notifications
Handling Notification Clicks
```

---

## Push Token

Unique identifier for a device.

Example:

```text
ExponentPushToken[
zX92Hksdf7...
]
```

Without token:

```text
Server does not know
where to send notification
```

---

## Backend Server

Responsible for:

```text
Who receives notification
When notification is sent
What notification contains
```

Examples:

* Node.js
* Express
* NestJS
* Laravel
* Spring Boot

---

## Expo Push Service

Middle layer.

```text
Server
 ↓
Expo
 ↓
Google / Apple
 ↓
Device
```

Expo simplifies push notification delivery.

---

## FCM

Firebase Cloud Messaging

Android uses FCM.

---

## APNs

Apple Push Notification Service

iOS uses APNs.

---

# 5. Push Notification Lifecycle

---

## Step 1

User installs app.

---

## Step 2

App requests permission.

---

## Step 3

User grants permission.

---

## Step 4

App gets Expo Push Token.

Example:

```text
ExponentPushToken[ABC123]
```

---

## Step 5

Token stored in database.

---

## Step 6

Event happens.

Example:

```text
New Message
```

---

## Step 7

Backend sends notification.

---

## Step 8

Expo receives request.

---

## Step 9

Expo forwards to FCM/APNs.

---

## Step 10

Notification arrives on device.

---

## Step 11

User taps notification.

---

## Step 12

App opens specific screen.

---

# 6. Types of Push Notifications

Many developers think push notification means only one thing.

Actually there are many types.

---

# Type 1: Transactional Notifications

Triggered by user activity.

---

## Example 1

Banking

```text
₹5000 Debited
```

---

## Example 2

Food Delivery

```text
Your order is out for delivery
```

---

## Example 3

E-Commerce

```text
Your package has shipped
```

---

Characteristics:

```text
Important
Immediate
Time Sensitive
```

---

# Type 2: Messaging Notifications

Most common.

---

## WhatsApp

```text
John:
Where are you?
```

---

## Messenger

```text
New message received
```

---

## Slack

```text
You were mentioned in #general
```

---

Characteristics:

```text
Real Time
User Specific
```

---

# Type 3: Social Notifications

---

## Instagram

```text
Sarah liked your photo
```

---

## Facebook

```text
You have a new friend request
```

---

## LinkedIn

```text
Your post received 100 likes
```

---

Purpose:

```text
Increase engagement
```

---

# Type 4: Marketing Notifications

Used by businesses.

---

## Example

```text
50% OFF Today
```

---

## Example

```text
Weekend Sale Starts Now
```

---

## Example

```text
Buy 1 Get 1 Free
```

---

Purpose:

```text
Increase revenue
```

---

# Type 5: Reminder Notifications

Server-triggered reminders.

---

## Example

Habit Tracker

```text
You forgot today's workout
```

---

## Example

Education App

```text
Continue your course
```

---

## Example

Duolingo

```text
Practice today and keep your streak
```

---

# Type 6: Announcement Notifications

Broadcast to everyone.

---

## Example

```text
New Feature Released
```

---

## Example

```text
Version 2.0 Available
```

---

## Example

```text
Scheduled Maintenance Tonight
```

---

# Type 7: Re-engagement Notifications

Used when users stop using the app.

---

## Example

```text
We miss you!
```

---

## Example

```text
Come back and finish your workout
```

---

## Example

```text
Your friends are waiting for you
```

---

# 7. Notification Payload

Every push notification contains payload.

---

## Basic Payload

```json
{
  "to": "ExponentPushToken[xxx]",
  "title": "Hello",
  "body": "Welcome Back"
}
```

---

# Payload Components

---

## Title

```json
{
  "title": "New Message"
}
```

Displayed as heading.

---

## Body

```json
{
  "body": "John sent a message"
}
```

Main content.

---

## Sound

```json
{
  "sound": "default"
}
```

Play sound.

---

## Badge

```json
{
  "badge": 3
}
```

App icon badge count.

---

## Data

Hidden information.

```json
{
  "data": {
    "chatId": 123
  }
}
```

Used for navigation.

---

# 8. Notification Data Payload

One of the most important concepts.

---

Without Data

```text
User clicks notification
 ↓
App opens Home Screen
```

---

With Data

```text
User clicks notification
 ↓
App opens Chat #123
```

---

Example

```json
{
  "title": "New Message",
  "body": "John sent a message",
  "data": {
    "chatId": 45,
    "senderId": 12
  }
}
```

---

# 9. Notification States

Push notifications behave differently based on app state.

---

# Foreground State

App currently open.

```text
User using app
```

Example:

```text
Chat Screen Open
```

Notification arrives.

Handle with:

```javascript
addNotificationReceivedListener()
```

---

# Background State

App minimized.

```text
App running in background
```

Notification appears normally.

---

# Terminated State

App fully closed.

```text
App not running
```

Push notifications still work.

---

# 10. Receiving Notifications

---

## Foreground Listener

```javascript
Notifications.addNotificationReceivedListener(
(notification) => {
  console.log(notification);
});
```

---

Example

```javascript
Notifications.addNotificationReceivedListener(
(notification) => {
  Alert.alert(
    notification.request.content.title
  );
});
```

---

# 11. Notification Click Handling

Most important production feature.

---

Example:

```javascript
Notifications.addNotificationResponseReceivedListener(
(response) => {
  console.log(response);
});
```

---

Navigate User

```javascript
Notifications.addNotificationResponseReceivedListener(
(response) => {
  const data =
    response.notification.request.content.data;

  navigation.navigate(
    "ChatScreen",
    {
      chatId: data.chatId,
    }
  );
});
```

---

# 12. Notification Channels (Android)

Android groups notifications.

---

Example Channels

```text
messages
marketing
updates
orders
payments
```

---

Benefits

User can disable:

```text
marketing
```

while keeping:

```text
messages
```

enabled.

---

Example

```javascript
await Notifications.setNotificationChannelAsync(
  "messages",
  {
    name: "Messages",
    importance:
      Notifications.AndroidImportance.MAX,
  }
);
```

---

# 13. Notification Priority

Controls visibility.

---

## LOW

Silent

```text
Background Sync Complete
```

---

## DEFAULT

Normal

```text
New Comment
```

---

## HIGH

Popup + Sound

```text
New Message
```

---

## MAX

Highest Importance

```text
Emergency Alert
```

---

# 14. Notification Permission

Without permission:

```text
No notifications
```

---

Request:

```javascript
await Notifications.requestPermissionsAsync();
```

---

Possible States

```text
granted
```

```text
denied
```

```text
undetermined
```

---

# 15. Push Token Management

Senior-level topic.

---

Token may change when:

* User reinstalls app
* Device reset
* App reconfigured

---

Best Practice

Whenever app launches:

```text
Generate token
Compare with database
Update if changed
```

---

# 16. Notification Deep Linking

Deep linking means:

```text
Notification
 ↓
Specific Screen
```

Example:

```text
New Message
 ↓
Open Chat Screen
```

Instead of:

```text
Home Screen
```

---

# 17. Notification Categories

Large apps organize notifications.

---

## Chat Notifications

```text
New Message
```

---

## Payment Notifications

```text
Payment Received
```

---

## Marketing Notifications

```text
Weekend Sale
```

---

## System Notifications

```text
App Maintenance
```

---

# 18. Common Production Scenarios

---

## Scenario 1

WhatsApp

```text
Message Sent
 ↓
Server
 ↓
Push Notification
 ↓
Recipient
```

---

## Scenario 2

Instagram

```text
Photo Liked
 ↓
Server
 ↓
Push Notification
```

---

## Scenario 3

Uber

```text
Driver Arriving
 ↓
Push Notification
```

---

## Scenario 4

Habit Tracker

```text
3 Day Streak
 ↓
Push Notification
```

---

## Scenario 5

Banking App

```text
Money Credited
 ↓
Push Notification
```

---

# 19. Common Mistakes

---

## Not Storing Token

Cannot send notifications later.

---

## No Permission Check

Notifications fail.

---

## No Data Payload

Cannot navigate correctly.

---

## Using One Channel For Everything

Poor user experience.

---

## Sending Too Many Notifications

Users uninstall app.

---

# Senior Developer Best Practices

✅ Store push token in database

✅ Refresh token periodically

✅ Use separate Android channels

✅ Use custom data payloads

✅ Deep link to specific screens

✅ Handle foreground notifications

✅ Handle notification clicks

✅ Send only relevant notifications

✅ Track delivery and engagement

✅ Support both Android (FCM) and iOS (APNs)

✅ Design notification architecture before coding

✅ Separate transactional, social, marketing, and system notifications

---

# Push Notification Interview Questions

### What is a Push Notification?

A remote notification sent from a server to a device through FCM/APNs.

---

### What is an Expo Push Token?

A unique identifier used by Expo to deliver notifications to a device.

---

### What is FCM?

Firebase Cloud Messaging, Google's push notification service for Android.

---

### What is APNs?

Apple Push Notification Service used for iOS devices.

---

### What is Notification Payload?

The data sent with a notification including title, body, sound, badge, and custom data.

---

### What is Deep Linking?

Opening a specific screen when a notification is tapped.

---

### Why Store Push Tokens?

So the backend knows where to send notifications.

---

### What is the Difference Between Local and Push Notifications?

Local notifications are created by the device itself, while push notifications are sent by a remote server.
