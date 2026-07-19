<div align="center">

# 🚀 CampaignCraft AI

### Autonomous Marketing Campaign & Content Engine

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

<br/>

**CampaignCraft AI** is a full-stack, AI-powered marketing platform that lets marketers create, manage, and optimize digital advertising campaigns with the help of Google Gemini. It combines brand-aware content generation, CSV-driven data analytics, and a complete campaign management dashboard — all in one sleek interface.

<br/>

[Live Demo](https://campaign-craft-client-kappa.vercel.app) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **AI Content Generator** | Generate social media posts, newsletters, ad headlines, and email subject lines grounded in your brand's voice, tone, and audience. Powered by Google Gemini. |
| 📊 **Data Analyzer** | Upload campaign metrics as CSV files and receive an instant AI-generated audit — KPI summaries, spend analysis, CTR/CPC breakdowns, and strategic recommendations. |
| 📈 **Interactive Data Visualization** | Chart your campaign performance data with dynamic, interactive visualizations rendered from your uploaded datasets. |
| 🗂️ **Campaign Manager** | Full CRUD dashboard to create, explore, update, and delete campaigns with rich metadata (type, platform, budget, status, dates). |
| 🏢 **Brand Profiles** | Define brand profiles (name, industry, voice/tone, audience, goals) to anchor every AI generation to your unique brand identity. |
| 🔐 **Dual Authentication** | Secure login via email/password (JWT) or Google OAuth (Firebase), with protected routes and session persistence. |
| 🌐 **Explore Hub** | Browse, search, and discover public campaigns with detail views, filtering, and community inspiration. |
| 🎨 **Premium Dark UI** | Sleek glassmorphism design with micro-animations, gradient accents, and a fully responsive mobile-first layout. |

---

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript — component-based SPA
- **React Router v6** — client-side routing
- **Vite** — lightning-fast development and build
- **Tailwind CSS** — utility-first responsive styling
- **Lucide React** — modern icon library
- **Axios** — HTTP client for API communication
- **Firebase SDK** — Google OAuth authentication
- **Recharts / Custom Visualizer** — interactive data charts

### Backend
- **Node.js** + **Express** — RESTful API server
- **TypeScript** — type-safe server code
- **MongoDB** + **Mongoose** — document database with schema modeling
- **Google Generative AI (Gemini)** — AI content generation & data analysis
- **JWT (jsonwebtoken)** — token-based authentication
- **bcryptjs** — password hashing
- **Multer** — file upload handling (CSV/JSON)
- **csv-parser** — streaming CSV parsing

---

## 📁 Project Structure

```
campaigncraft-ai/
├── frontend/                  # React + Vite client
│   └── src/
│       ├── components/        # Navbar, Footer, CampaignCard, DataVisualizer, etc.
│       ├── config/            # Firebase configuration
│       ├── context/           # AuthContext (global auth state)
│       └── pages/             # Landing, Explore, Login, Register, AddCampaign,
│                              # ManageCampaigns, ContentGenerator, DataAnalyzer,
│                              # CampaignDetails, About, Contact
├── backend/                   # Node.js + Express API
│   └── src/
│       ├── config/            # MongoDB connection
│       ├── middleware/        # JWT auth middleware
│       ├── models/            # User, Campaign, BrandProfile (Mongoose schemas)
│       └── routes/            # auth, campaign, brand, ai (REST endpoints)
├── package.json               # Root scripts (concurrent dev, install, build)
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **MongoDB** (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Google Gemini API Key** — [Get one here](https://ai.google.dev)
- **Firebase Project** — [Create one here](https://console.firebase.google.com)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/campaigncraft-ai.git
cd campaigncraft-ai
```

### 2. Install all dependencies

```bash
npm run install:all
```

### 3. Configure environment variables

**Backend** — create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campaigncraft
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
```

**Frontend** — create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the development server

```bash
npm run dev
```

This starts both the backend (port `5000`) and frontend (port `5173`) concurrently.

### 5. Build for production

```bash
npm run build:all
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login with email & password |
| `POST` | `/api/auth/google` | Login / register with Google |

### Campaigns
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/campaigns` | Get all campaigns |
| `GET` | `/api/campaigns/:id` | Get campaign by ID |
| `POST` | `/api/campaigns` | Create a new campaign |
| `PUT` | `/api/campaigns/:id` | Update a campaign |
| `DELETE` | `/api/campaigns/:id` | Delete a campaign |

### Brand Profiles
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/brands` | Get user's brand profiles |
| `POST` | `/api/brands` | Create a brand profile |
| `DELETE` | `/api/brands/:id` | Delete a brand profile |

### AI Services
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/ai/generate-copy` | Generate AI marketing copy |
| `POST` | `/api/ai/analyze-data` | Analyze uploaded campaign CSV data |

---

## 🖥️ Pages & Routes

| Route | Page | Auth Required |
|---|---|---|
| `/` | Landing Page | ❌ |
| `/explore` | Campaign Explorer | ❌ |
| `/explore/:id` | Campaign Details | ❌ |
| `/login` | Login | ❌ |
| `/register` | Register | ❌ |
| `/generator` | AI Content Generator | ✅ |
| `/analyzer` | Data Analyzer | ✅ |
| `/items/add` | Add Campaign | ✅ |
| `/items/manage` | Manage Campaigns | ✅ |
| `/about` | About | ❌ |
| `/contact` | Contact | ❌ |

---

## 🌍 Deployment

| Layer | Platform |
|---|---|
| **Frontend** | [Vercel](https://vercel.com) |
| **Backend** | [Render](https://render.com) / [Railway](https://railway.app) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) |
| **Auth** | [Firebase](https://firebase.google.com) |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ using React, Node.js, MongoDB & Google Gemini AI**

⭐ **Star this repo if you find it useful!** ⭐

</div>
