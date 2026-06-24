# 🛡️ Cyberverse: Cyber Awareness Game Platform

An interactive, gamified web application designed to teach critical cybersecurity concepts through immersive story-driven quests, hands-on mini-games, and security simulators.

---

## 🎮 Key Features

### 1. Interactive Story Mode
Engaging, branching stories that place users in real-world scenarios where they must make critical security decisions to progress. Covers phishing, social engineering, credentials safety, and device security.

### 2. Cybersecurity Mini-Games & Quests
*   **🔗 Link Trap:** Practice parsing and identifying suspicious URLs, subdomains, and phishing links.
*   **💬 Scam Chat:** Interact with simulated scammers and practice refusing to give up confidential information.
*   **📱 APK Inspector:** Scan app permissions to identify and isolate malicious mobile applications.
*   **📞 Scam Call:** Listen to realistic phone calls and flag voice phishing (vishing) attempts.
*   **🔑 Password Rush:** Build and test strong passwords against brute-force estimators under time pressure.
*   **🔍 Privacy Detective:** Inspect public profiles and digital footprints to locate privacy leaks.
*   **💣 Cyber Bomb:** Defuse security risks by resolving common device vulnerabilities before the timer runs out.

### 3. Password Vault Simulator
A simulated secure password manager demonstrating how encryption, strength estimation, and zero-knowledge principles protect stored credentials.

### 4. Dashboards & Progress Tracking
*   **🔥 Streak System:** Rewards daily logins and consecutive correct challenges.
*   **🏆 Global Leaderboard:** Ranks users based on points earned across quests and games.
*   **👤 Custom Profile:** Showcases user achievements, security rating, and completion progress.

---

## 📸 Screenshots

### Home Page
![Main Page](./screenshots/mainpage.jpg)

### Dashboard
![Dashboard](./screenshots/dashboard.jpg)

### Login Security Check
![Login Security](./screenshots/login.jpg)

### User Registration
![Register](./screenshots/register.jpg)

---

## 🛠️ Technology Stack

*   **Frontend:** React 19, Vite, React Router, Lucide React (Icons), HSL CSS Design System
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB Atlas (Cloud Database)
*   **Speech Synthesis:** Google Text-to-Speech (gTTS) Integration

---

## 🚀 Running Locally

### Prerequisites
*   Node.js (v18+)
*   MongoDB installed locally OR a MongoDB Atlas cloud database connection string.

### Setup
1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Jeevan1725/cyber-awareness-game.git
    cd cyber-awareness-game
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    cd server
    npm install
    cd ..
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    ```

4.  **Start the Application:**
    Run the command below to start the backend, frontend, and a public Pinggy tunnel concurrently:
    ```bash
    npm start
    ```
    *   **Frontend:** `http://localhost:5173`
    *   **Backend:** `http://localhost:5000`
    *   **Public Tunnel:** A 60-minute shareable `*.pinggy-free.link` URL will be printed in your terminal logs.

---

## ☁️ Vercel Deployment

This project is configured for seamless deployment on Vercel as a fullstack application:
*   The **React frontend** is built and served statically.
*   The **Express backend** is deployed automatically as a Serverless Function via `api/index.js`.

### Deploying
1.  Import your repository into Vercel.
2.  Add the environment variable `MONGODB_URI` with your MongoDB Atlas connection string.
3.  Click **Deploy**.
