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
- User-friendly interface with Tailwind CSS
- Real-time notifications with React Toastify
- RESTful API backend with Express.js
- MongoDB database integration
- CORS-enabled for cross-origin requests
- ESLint code quality standards

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** 7.3.1 - Build tool with HMR
- **Tailwind CSS** 4.2.2 - Utility-first CSS framework
- **React Toastify** 11.0.5 - Toast notifications
- **UUID** 13.0.0 - Unique identifier generation

### Backend
- **Node.js** - Runtime environment
- **Express.js** 5.2.1 - Web framework
- **MongoDB** 7.1.0 - NoSQL database
- **CORS** 2.8.6 - Cross-origin resource sharing
- **Dotenv** 17.3.1 - Environment variable management
- **Body Parser** 2.2.2 - Request parsing middleware

## 📁 Project Structure

```
passify/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Manager.jsx
│   │   │   └── Navbar.jsx
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
├── backend/
│   ├── server.js
│   ├── .env
│   └── package.json
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
   git clone <repository-url>
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
npm start
```
Backend runs on `http://localhost:5000` (or configured PORT)

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
PORT=5000
MONGODB_URI=mongodb://localhost:27017/passify
NODE_ENV=development
```

For MongoDB Atlas:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/passify
NODE_ENV=development
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all passwords |
| POST | `/` | Create new password entry |
| PUT | `/:id` | Update password entry |
| DELETE | `/:id` | Delete password entry |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.
