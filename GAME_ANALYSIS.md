# CyberVerse - Cyber Awareness Game
## Complete File Analysis & Project Documentation

---

## 1. TECHNOLOGY & TOOLS USED

### Frontend Stack
| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.2.0 | UI Framework & Components |
| **Vite** | 7.3.1 | Build Tool & Dev Server (HMR) |
| **React Router DOM** | 7.13.1 | Client-side Routing |
| **Axios** | 1.13.6 | HTTP API Requests |
| **React Icons** | 5.6.0 | Icon Library (FontAwesome, Lucide) |
| **Lucide React** | 0.577.0 | Modern Icon Set |
| **Vitejs/plugin-react** | 5.1.1 | React Plugin for Vite |
| **ESLint** | 9.39.1 | Code Quality & Linting |

### Backend Stack
| Technology | Version | Purpose |
|---|---|---|
| **Express.js** | 5.2.1 | REST API Server |
| **Node.js** | latest | JavaScript Runtime |
| **MongoDB** | local (mongodb://localhost:27017) | NoSQL Database |
| **Mongoose** | 8.23.0 | MongoDB ODM |
| **JWT** | 9.0.3 | Authentication Token |
| **bcryptjs** | 3.0.3 | Password Hashing |
| **CORS** | 2.8.6 | Cross-Origin Resource Sharing |
| **Nodemon** | 3.1.14 | Dev Auto-Reload |

### Development Tools
- **ESLint** with React Hooks & React Refresh plugins
- **ES Module** (type: module)
- **Hot Module Replacement** (HMR) via Vite

---

## 2. PROJECT STRUCTURE

```
cyber-awareness-game/
├── src/                          # Frontend Source
│   ├── main.jsx                 # React Entry Point
│   ├── App.jsx                  # Main App Router
│   ├── index.css                # Global Styles
│   ├── App.css                  # App Styles
│   ├── assets/
│   │   └── stories/             # Story Assets
│   │       ├── story1/          # Story 1 - Campus WiFi Trap
│   │       │   ├── character/   # Character Sprites
│   │       │   │   ├── karan/   # Main Character
│   │       │   │   ├── phantom/ # NPC
│   │       │   │   ├── sneha/   # NPC
│   │       │   │   └── itadmin/ # NPC
│   │       │   └── Scene/       # Background Images
│   │       └── story2/          # Story 2 Assets
│   ├── components/
│   │   └── SecurityQuestion.jsx # Security Q&A Component
│   ├── data/
│   │   ├── stories.js          # Story Content & Scenes
│   │   └── streakQuestions.js  # Daily Streak Questions
│   └── pages/                   # React Route Components
│       ├── Landing.jsx          # Home Page
│       ├── Login.jsx            # Login Page
│       ├── Register.jsx         # Registration Page
│       ├── Dashboard.jsx        # Main Dashboard
│       ├── Profile.jsx          # User Profile
│       ├── Knowledge.jsx        # Knowledge Base
│       ├── Weakness.jsx         # Weakness Analysis
│       ├── Rank.jsx             # Leaderboard
│       ├── Streak.jsx           # Daily Streak Page
│       ├── StoryList.jsx        # Story Selection
│       ├── StoryPlay.jsx        # Story Gameplay
│       ├── VaultHome.jsx        # Password Vault Home
│       ├── VaultLayout.jsx      # Vault Layout
│       ├── VaultAdd.jsx         # Add Credential
│       ├── VaultList.jsx        # List Credentials
│       ├── VaultView.jsx        # View Credential
│       └── VaultDelete.jsx      # Delete Credential
│       └── utils/
│           └── clipboardUtils.js # Clipboard Helper
│
├── server/                       # Backend Source
│   ├── server.js                # Express App Entry
│   ├── package.json             # Server Dependencies
│   ├── config/
│   │   └── db.js                # MongoDB Connection
│   ├── middleware/
│   │   └── auth.js              # JWT Authentication
│   ├── models/
│   │   ├── User.js              # User Schema
│   │   ├── Answer.js            # User Answers Schema
│   │   ├── VaultCredential.js   # Password Vault Schema
│   │   └── VaultUsedQuestion.js # Used Questions Tracking
│   ├── routes/
│   │   ├── auth.js              # Auth Endpoints
│   │   ├── question.js          # Question Generation Endpoints
│   │   ├── answer.js            # Answer Verification Endpoints
│   │   ├── vault.js             # Password Vault Endpoints
│   │   ├── streak.js            # Streak Tracking Endpoints
│   │   └── rank.js              # Ranking Endpoints
│   └── utils/
│       ├── cryptoUtils.js       # Password Encryption/Decryption
│       └── questionEngine.js    # Question Generation Logic
│
├── public/                       # Static Assets
├── index.html                   # HTML Entry Point
├── vite.config.js              # Vite Configuration
├── eslint.config.js            # ESLint Rules
├── package.json                # Frontend Dependencies
└── README.md                    # Documentation
```

---

## 3. GAME-RELATED FILES

### A. Story & Narrative Files
| File | Purpose | Features |
|------|---------|----------|
| `src/data/stories.js` | Story content, scenes, dialogues, characters | 2 complete stories with multiple scenes, interactive questions, character animations |
| `src/pages/StoryList.jsx` | Story selection interface | Browse available stories, start playing |
| `src/pages/StoryPlay.jsx` | Story gameplay engine | Render scenes, display characters, handle user choices, track progress |
| `src/assets/stories/story1/` | Story 1 assets | Background images, character sprites (Karan, Phantom, Sneha, IT Admin) |
| `src/assets/stories/story2/` | Story 2 assets | Background images for second story |

### B. Knowledge & Education Files
| File | Purpose | Features |
|------|---------|----------|
| `src/data/streakQuestions.js` | Daily quiz questions | Phishing, security questions, cyber threats |
| `src/pages/Knowledge.jsx` | Knowledge base page | Educational content on cyber security |
| `src/pages/Weakness.jsx` | Weakness analysis | Shows user's weak areas in cyber security |
| `server/utils/questionEngine.js` | Question generation | Dynamic question creation based on user answers |
| `src/components/SecurityQuestion.jsx` | Security Q&A component | Fetches & verifies security questions |

### C. Gamification Files
| File | Purpose | Features |
|------|---------|----------|
| `src/pages/Streak.jsx` | Daily streak tracker | Consecutive day tracking, rewards |
| `src/pages/Rank.jsx` | Leaderboard | User rankings based on score |
| `src/pages/Profile.jsx` | User profile | Score, streak, stats display |
| `src/pages/Dashboard.jsx` | Game hub | Central dashboard with navigation |
| `server/routes/streak.js` | Streak API | Track & update user streaks |
| `server/routes/rank.js` | Ranking API | Calculate & return rankings |

### D. Password Vault (Security Practice) Files
| File | Purpose | Features |
|------|---------|----------|
| `src/pages/VaultHome.jsx` | Vault main page | Vault navigation hub |
| `src/pages/VaultAdd.jsx` | Add credentials | Store site passwords safely |
| `src/pages/VaultList.jsx` | List all credentials | Display saved passwords |
| `src/pages/VaultView.jsx` | View credential | Display single credential |
| `src/pages/VaultDelete.jsx` | Delete credential | Remove stored password |
| `src/pages/VaultLayout.jsx` | Vault layout wrapper | Consistent vault UI structure |
| `server/models/VaultCredential.js` | Vault schema | Store encrypted credentials |
| `server/routes/vault.js` | Vault API | CRUD operations for credentials |
| `server/utils/cryptoUtils.js` | Encryption | Encrypt/decrypt passwords |

### E. Authentication & User System Files
| File | Purpose | Features |
|------|---------|----------|
| `src/pages/Login.jsx` | User login | Email/username + password |
| `src/pages/Register.jsx` | User registration | Create account, security questions |
| `server/routes/auth.js` | Authentication API | Login, register, user management |
| `server/models/User.js` | User schema | Store user data, scores, weaknesses |
| `server/middleware/auth.js` | JWT middleware | Protect routes with JWT tokens |
| `server/utils/cryptoUtils.js` | Password security | Hash & verify passwords |

### F. Question & Answer System Files
| File | Purpose | Features |
|------|---------|----------|
| `server/routes/question.js` | Question API | Generate & serve questions |
| `server/routes/answer.js` | Answer verification | Verify user answers |
| `server/models/Answer.js` | Answer schema | Store user answers |
| `server/models/VaultUsedQuestion.js` | Question tracking | Track used security questions |
| `server/utils/questionEngine.js` | Question logic | Dynamic question generation |

### G. Configuration & Build Files
| File | Purpose |
|---|---|
| `vite.config.js` | Vite build & dev settings |
| `eslint.config.js` | Code quality rules |
| `package.json` | Frontend dependencies |
| `server/package.json` | Backend dependencies |
| `server/config/db.js` | MongoDB configuration |

---

## 4. DELIVERABLE FEATURES

### A. User Features
✅ **Authentication System**
- User registration with email/username & password
- Secure login with JWT tokens
- Password hashing with bcryptjs
- Security question setup during registration

✅ **User Profile Management**
- View personal profile
- Track game statistics (score, streaks)
- View security weakness areas
- Achievement tracking

✅ **Password Security Vault**
- Store website credentials securely
- Encryption/decryption of passwords
- Add, view, delete credentials
- Safe password management practice

### B. Learning & Gamification
✅ **Interactive Story Mode**
- 2 complete cyber security stories
- Scene-based narrative gameplay
- Character animations & sprites
- Multiple choice questions in stories
- Educational scenarios (WiFi trap, phishing, etc.)

✅ **Daily Streak System**
- Daily quiz questions on cyber threats
- Streak counter for consecutive correct answers
- Motivation through gamification

✅ **Knowledge Base**
- Educational content on cyber security topics
- Phishing awareness
- Email security
- Social engineering prevention

✅ **Weakness Analysis**
- Auto-identification of user weak areas
- Personalized recommendations
- Progress tracking

✅ **Leaderboard/Ranking System**
- Global user rankings
- Score-based ranking
- Competitive gamification

### C. Technical Features
✅ **Responsive Design**
- Multi-page SPA with React Router
- CSS styling with flexbox layout
- Dark/Light mode support

✅ **Real-time API Communication**
- Axios for HTTP requests
- RESTful API endpoints
- JWT-based authentication

✅ **Database Persistence**
- MongoDB for user data storage
- Mongoose schemas for data modeling
- User profiles, scores, credentials, answers

✅ **Secure Password Handling**
- SHA256 encryption for vault
- bcryptjs hashing for user passwords
- JWT tokens for session management

---

## 5. API ENDPOINTS

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user/:id` - Get user details
- `PUT /api/auth/user/:id/progress` - Update story progress

### Question Routes
- `GET /api/question/generate/:userId` - Generate random question
- `POST /api/question/verify` - Verify answer

### Answer Routes
- `POST /api/answer/submit` - Submit story answers
- `GET /api/answer/:userId` - Get user answers

### Vault Routes
- `POST /api/vault/add` - Add credential
- `GET /api/vault/list` - Get all credentials
- `GET /api/vault/:id` - Get single credential
- `DELETE /api/vault/:id` - Delete credential

### Streak Routes
- `POST /api/streak/update` - Update user streak
- `GET /api/streak/:userId` - Get user streak

### Rank Routes
- `GET /api/rank/leaderboard` - Get rankings
- `GET /api/rank/:userId` - Get user rank

---

## 6. DATABASE SCHEMA

### User Model
```
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  securityAnswers: Map<String, String>,
  score: Number,
  streak: Number,
  weakness: Array<String>,
  lastStreakDate: String,
  storyProgress: Map<String, Number>
}
```

### VaultCredential Model
```
{
  userId: ObjectId (ref: User),
  site: String,
  password: String (encrypted)
}
```

### Answer Model
```
{
  userId: ObjectId (ref: User),
  questionType: String,
  questionText: String,
  selectedAnswer: String,
  isCorrect: Boolean,
  timestamp: Date
}
```

### VaultUsedQuestion Model
```
{
  userId: ObjectId (ref: User),
  questionHash: String,
  usedAt: Date
}
```

---

## 7. KEY GAME MECHANICS

### Story-Based Learning
- Interactive visual narratives
- Character-driven scenarios
- Real-world cyber security threats
- Educational consequences for wrong choices

### Skill Assessment
- Security question generation
- Dynamic question pools (based on user answers)
- Difficulty scaling
- Weakness identification

### Progression System
- Score tracking
- Streak rewards
- Level-based progression
- Achievement unlocking

### Security Practice
- Safe credential storage (vault)
- Password encryption exercise
- Social engineering awareness
- Phishing recognition

---

## 8. GAME SCENARIOS

### Story 1: Campus WiFi Trap
- Protagonist: Karan (college student)
- Setting: Campus environment
- Threat: Public WiFi, phishing, password security
- Learning: Identify fake networks, avoid malware

### Story 2: (In Development)
- Additional cyber threat scenarios
- Progressive difficulty
- Real-world attack simulations

---

## 9. DEVELOPMENT STATUS

✅ **Completed**
- Authentication system
- Database design
- API backend
- Story mode gameplay
- Vault system
- Profile management
- Basic UI/UX

🚀 **Running**
- Vite dev server (port 5174)
- Express API server (port 5000)
- MongoDB (localhost:27017)

⚠️ **Notes**
- Server must be running separately on port 5000
- MongoDB must be running on localhost:27017
- Frontend accessible at http://localhost:5174/

---

## 10. HOW TO RUN

### Frontend
```bash
cd cyber-awareness-game
npm install
npm run dev
# Runs on http://localhost:5174/
```

### Backend
```bash
cd cyber-awareness-game/server
npm install
npm start
# Runs on http://localhost:5000
# Ensure MongoDB is running
```

---

## SUMMARY

**CyberVerse** is a comprehensive cyber security awareness game that combines:
- 📚 **Educational Stories** - Interactive learning through narratives
- 🎮 **Gamification** - Streaks, rankings, scores
- 🔐 **Security Practice** - Password vault, credential management
- 📊 **Progress Tracking** - Weakness analysis, performance metrics
- 🌐 **Full-Stack Application** - React frontend + Express backend + MongoDB database

Total Game Pages: **17 pages**
Total Backend Routes: **26+ API endpoints**
Database Collections: **4 schemas**
