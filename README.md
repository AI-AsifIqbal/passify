# Passify 🔐

A modern MERN stack application for secure password management. Built with React, Express, MongoDB, and Node.js.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- Secure password storage and management
- User authentication (Registration & Login) using JWT
- AES-256-GCM encryption for stored passwords
- User-friendly interface with Tailwind CSS
- Real-time notifications with React Toastify
- RESTful API backend with Express.js
- MongoDB database integration via Mongoose
- CORS-enabled for cross-origin requests
- ESLint code quality standards

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** 7.3.1 - Build tool with HMR
- **React Router DOM** - Client-side routing
- **Tailwind CSS** 4.2.2 - Utility-first CSS framework
- **React Toastify** 11.0.5 - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** 5.2.1 - Web framework
- **MongoDB & Mongoose** - NoSQL database and Object Data Modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - Authentication tokens
- **zod** - Input validation
- **CORS** 2.8.6 - Cross-origin resource sharing
- **Dotenv** 17.3.1 - Environment variable management

## 📁 Project Structure

```text
passify/
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Manager.jsx
│   │   ├── Navbar.jsx
│   │   ├── PasswordForm.jsx
│   │   └── PasswordTable.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Password.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── passwords.js
│   ├── utils/
│   │   └── encryption.js
│   ├── server.js
│   ├── debug.js
│   ├── .env
│   └── package.json
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AI-AsifIqbal/passify.git
   cd passify
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

## 🎯 Running the Application

### Development Mode

**Terminal 1 - Start Backend Server**
```bash
cd backend
node server.js
```
Backend runs on `http://localhost:3000`

**Terminal 2 - Start Frontend Development Server**
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## 🔧 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=passify
PORT=3000
JWT_SECRET=your_super_secret_jwt_key
ENCRYPTION_KEY=64_character_hex_string_for_aes_256_gcm
NODE_ENV=development
```

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Authenticate user & get token |
| GET | `/api/auth/profile` | Get current user profile (Protected) |

### Passwords (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/passwords` | Get all passwords for logged in user |
| POST | `/api/passwords` | Create new password entry |
| PUT | `/api/passwords/:id` | Update password entry |
| DELETE | `/api/passwords/:id` | Delete password entry |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.
