# 🏥 Apna Doctor - AI Powered Symptom Checker

An intelligent healthcare assistant built with the **MERN Stack** (MongoDB, Express.js, React, Node.js).

## 📁 Project Structure

```
apna-doctor/
├── frontend/          # React Application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── lib/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/           # Express.js API Server
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── package.json
│   └── index.js
│
└── package.json       # Root package for running both
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Google Gemini API Key

### 1. Install Dependencies

```bash
# Install all dependencies
npm run install:all

# Or manually
cd frontend && npm install
cd ../backend && npm install
```

### 2. Configure Environment

Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/apna-doctor
JWT_SECRET=your-secret-key
ADMIN_SECRET=apna-doctor-admin-2024
GEMINI_API_KEY=your-gemini-api-key
PORT=5000
```

### 3. Start the Application

**Option 1: Run both together (requires concurrently)**
```bash
npm install
npm run dev
```

**Option 2: Run separately**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### 4. Access the App
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🔐 Authentication

### Sign Up / Login
Go to `http://localhost:5173/auth`

### Create Admin User
```bash
curl -X POST http://localhost:5000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Admin",
    "email": "admin@apnadoctor.com",
    "password": "admin123",
    "adminSecret": "apna-doctor-admin-2024"
  }'
```

## 🛠 Tech Stack

| Frontend | Backend |
|----------|---------|
| React 18 | Node.js |
| Vite | Express.js |
| Tailwind CSS | MongoDB |
| Radix UI | Mongoose |
| React Router | JWT Auth |
| React Query | Gemini AI |

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/create-admin` | Create admin |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/symptoms/analyze` | Analyze symptoms |
| GET | `/api/symptoms/history` | Get history |
| POST | `/api/consent` | Record consent |

## ⚠️ Disclaimer

This is for educational purposes only. Always consult a healthcare professional for medical advice.

---
**Made with ❤️ using MERN Stack**
