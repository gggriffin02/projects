# TossApp

## Description
TossApp is a social platform designed to enhance the experience of playing the game of die. The app combines a competitive **ELO ranking system** with social features, fostering a vibrant community of die enthusiasts. By streamlining game coordination and promoting social interaction, TossApp brings a structured and engaging experience to the game of die.

Initially designed for die enthusiasts within our fraternity, the app allows users to:
- Submit game scores.
- Track rankings.
- Engage with a community feed.
- Coordinate games through the **"Need One"** feature.

The app was developed using **React Native**, **Expo**, and **Firebase**, ensuring a seamless user experience with real-time data synchronization.

---

## Key Features
1. **Game Feed:**
   - View game results, scores, and players involved.
   - Comment on and like games to engage with the community.

2. **ELO Ranking System:**
   - Track player rankings, ELO scores, and game records.
   - Compare performance with peers on a dedicated **Rankings Page**.

3. **"Need One" Feature:**
   - Notify the community when you're looking for a player to join a game.
   - Streamline game coordination with instant notifications.

4. **Game Submission:**
   - Submit ranked or unranked games easily with a scroll-and-select interface.
   - Prevent invalid scores with built-in error handling.

5. **Player Profiles:**
   - View personalized profiles showing player photos, ELO scores, and records.

6. **Real-Time Updates:**
   - Integrated with Firebase to ensure rankings and game feeds are updated instantly.

---

## Technologies Used
- **Frontend:** React Native and Expo Router
- **Backend:** Firebase (Firestore, Authentication, Storage)
- **Navigation:** Stack and Tab Navigation with Expo Router
- **Error Handling:** Robust error messages to ensure data integrity

---

## Design Principles
1. **Community Engagement:**
   - Inspired by platforms like GroupMe and Instagram, TossApp fosters engagement through game reactions, likes, and comments.

2. **Simplicity:**
   - Minimalist design to ensure users can quickly log games and access key features without distraction.

3. **Real-Life Connection:**
   - Encourages in-person die games by avoiding complex virtual personas.

4. **Moderation:**
   - Reporting features and non-anonymous comments reduce toxicity.

---

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/gggriffin02/projects.git
   cd TossApp
2. **Install Deperndencies**
   ```bash
   npm install
3. **Start the Frontend**
   ```bash
   npx expo start
4. **Start the Backend**
   ```bash
   cd backend
   npx tsc
   node dist/index.js

