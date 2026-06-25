# Push Notification Examples for Different Real-World Scenarios

These examples assume:

```javascript
const expoPushToken =
  "ExponentPushToken[xxxxxxxxxxxx]";
```

and notifications are sent from a backend server.

---

# 1. Basic Welcome Notification

## Scenario

User signs up successfully.

### Payload

```javascript
await fetch(
  "https://exp.host/--/api/v2/push/send",
  {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: expoPushToken,
      title: "Welcome 🎉",
      body: "Thank you for joining our app",
      sound: "default",
    }),
  }
);
```

---

# 2. WhatsApp Style Chat Notification

## Scenario

John sends message.

### Payload

```javascript
await fetch(
  "https://exp.host/--/api/v2/push/send",
  {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: expoPushToken,
      title: "John",
      body: "Where are you?",
      sound: "default",
      data: {
        chatId: 15,
        senderId: 7,
      },
    }),
  }
);
```

---

## Open Chat Screen

```javascript
Notifications.addNotificationResponseReceivedListener(
(response) => {
  const data =
    response.notification.request.content.data;

  navigation.navigate("ChatScreen", {
    chatId: data.chatId,
  });
});
```

---

# 3. Instagram Like Notification

## Scenario

Someone likes a post.

### Payload

```javascript
{
  to: expoPushToken,
  title: "New Like ❤️",
  body: "Sarah liked your photo",
  data: {
    postId: 101
  }
}
```

---

## Open Post

```javascript
navigation.navigate(
  "PostDetails",
  {
    postId: data.postId
  }
);
```

---

# 4. Instagram Comment Notification

## Scenario

New comment received.

### Payload

```javascript
{
  to: expoPushToken,
  title: "New Comment 💬",
  body: "Mike commented on your photo",
  data: {
    postId: 101,
    commentId: 50
  }
}
```

---

# 5. Facebook Friend Request

## Scenario

New friend request.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Friend Request",
  body: "Alex sent you a friend request",
  data: {
    userId: 88
  }
}
```

---

# 6. Food Delivery Order Confirmed

## Scenario

Order placed.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Order Confirmed 🍕",
  body: "Your order has been confirmed",
  data: {
    orderId: 456
  }
}
```

---

# 7. Food Delivery Driver Assigned

## Scenario

Driver assigned.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Driver Assigned 🚗",
  body: "Rahul is on the way",
  data: {
    orderId: 456,
    driverId: 25
  }
}
```

---

# 8. Food Delivery Out For Delivery

## Scenario

Order leaving restaurant.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Out For Delivery 🛵",
  body: "Your order will arrive soon",
  data: {
    orderId: 456
  }
}
```

---

# 9. Banking Transaction Alert

## Scenario

Money credited.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Money Received 💰",
  body: "₹5,000 credited to your account",
  data: {
    transactionId: 900
  }
}
```

---

# 10. Banking Debit Alert

## Scenario

Money withdrawn.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Debit Alert",
  body: "₹1,200 withdrawn from account",
  data: {
    transactionId: 901
  }
}
```

---

# 11. E-Commerce Order Placed

## Scenario

Amazon style.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Order Placed",
  body: "Your order has been placed",
  data: {
    orderId: 1001
  }
}
```

---

# 12. E-Commerce Shipped

## Scenario

Product shipped.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Package Shipped 📦",
  body: "Track your package now",
  data: {
    orderId: 1001
  }
}
```

---

# 13. E-Commerce Delivered

## Scenario

Package delivered.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Delivered ✅",
  body: "Your package has arrived",
  data: {
    orderId: 1001
  }
}
```

---

# 14. Habit Tracker Reminder

## Scenario

User missed workout.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Workout Reminder 💪",
  body: "You missed today's workout",
  data: {
    habitId: 5
  }
}
```

---

# 15. Habit Streak Notification

## Scenario

User completed streak.

### Payload

```javascript
{
  to: expoPushToken,
  title: "7 Day Streak 🔥",
  body: "Amazing consistency!",
  data: {
    streak: 7
  }
}
```

---

# 16. Duolingo Style Reminder

## Scenario

User inactive.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Keep Your Streak Alive 🔥",
  body: "Practice today",
}
```

---

# 17. Online Course Reminder

## Scenario

Student inactive.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Continue Learning 📚",
  body: "Your next lesson is waiting",
  data: {
    courseId: 45
  }
}
```

---

# 18. YouTube New Video

## Scenario

Creator uploads video.

### Payload

```javascript
{
  to: expoPushToken,
  title: "New Video Uploaded",
  body: "React Native Tutorial Part 10",
  data: {
    videoId: 77
  }
}
```

---

# 19. Breaking News Notification

## Scenario

News app.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Breaking News 🚨",
  body: "Major event happening now",
  data: {
    articleId: 101
  }
}
```

---

# 20. Weather Alert Notification

## Scenario

Storm incoming.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Weather Alert ⛈️",
  body: "Heavy rain expected today",
}
```

---

# 21. Security Alert Notification

## Scenario

New login detected.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Security Alert 🔒",
  body: "New login from Chrome Browser",
  data: {
    deviceId: 44
  }
}
```

---

# 22. Password Changed Notification

## Scenario

Account updated.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Password Updated",
  body: "Your password was changed",
}
```

---

# 23. Marketing Notification

## Scenario

Sale campaign.

### Payload

```javascript
{
  to: expoPushToken,
  title: "50% OFF Today 🎉",
  body: "Limited time offer",
}
```

---

# 24. Festival Promotion

## Scenario

E-commerce campaign.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Diwali Sale 🪔",
  body: "Up to 70% OFF",
}
```

---

# 25. Flash Sale Notification

## Scenario

Urgent marketing.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Flash Sale ⚡",
  body: "Ends in 1 hour",
}
```

---

# 26. App Update Available

## Scenario

New version.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Update Available",
  body: "Version 2.0 is ready",
}
```

---

# 27. Maintenance Notice

## Scenario

Server maintenance.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Scheduled Maintenance",
  body: "App unavailable tonight",
}
```

---

# 28. Multiplayer Game Invitation

## Scenario

Friend invites player.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Game Invite 🎮",
  body: "John invited you to play",
  data: {
    roomId: 123
  }
}
```

---

# 29. Tournament Notification

## Scenario

Gaming app.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Tournament Starts Soon",
  body: "Join before 5 PM",
  data: {
    tournamentId: 9
  }
}
```

---

# 30. Admin Broadcast Notification

## Scenario

Send to all users.

### Payload

```javascript
{
  to: expoPushToken,
  title: "Announcement 📢",
  body: "New features released",
}
```

---

# Production-Grade Payload Example

A real production notification usually looks like:

```javascript
{
  to: expoPushToken,

  title: "New Message",

  body: "John sent a message",

  sound: "default",

  badge: 1,

  channelId: "messages",

  priority: "high",

  data: {
    type: "chat",
    chatId: 15,
    senderId: 7,
    createdAt: Date.now()
  }
}
```

### Why each field?

```text
to          → target device
title       → notification heading
body        → notification message
sound       → play sound
badge       → app badge count
channelId   → Android notification channel
priority    → importance level
data        → hidden navigation data
```

This is very close to what senior mobile developers use in production applications such as WhatsApp, Instagram, Uber, Amazon, Swiggy, Zomato, Duolingo, and Banking Apps.
