# 🔐 Passify

**A modern, highly secure password management solution built on the MERN stack.**

🚀 [**View Live Demo**](https://passify-gamma.vercel.app)

## ✨ Why Passify?

Managing passwords securely shouldn't be complicated. Passify provides a streamlined, user-friendly interface combined with enterprise-grade AES-256-GCM encryption, ensuring your credentials are kept strictly confidential while remaining easily accessible whenever you need them.

## 🌟 Key Features

- **Ironclad Security:** Robust AES-256-GCM encryption for all stored passwords.
- **Secure Authentication:** JWT-based user registration and login.
- **Sleek Interface:** Beautiful, responsive UI built with Tailwind CSS and React.
- **Real-Time Feedback:** Instant notifications directly in the browser via React Toastify.
- **Robust Backend:** RESTful API powered by Express.js and MongoDB.
- **Data Validation:** Strict input validation utilizing Zod.

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, React Router, Tailwind CSS, React Toastify
- **Backend:** Node.js, Express.js, MongoDB + Mongoose
- **Security:** bcryptjs, jsonwebtoken, AES-256-GCM, CORS

## 📡 API Overview

- **Authentication:** 
  - `POST /api/auth/register` (Register)
  - `POST /api/auth/login` (Login)
  - `GET /api/auth/profile` (Get Profile)
- **Passwords (Protected):** 
  - `GET`, `POST` at `/api/passwords`
  - `PUT`, `DELETE` at `/api/passwords/:id`

## 📄 License

**Proprietary & Confidential**

This project and its source code are proprietary. Unauthorized copying, distribution, or modification of this project, via any medium, is strictly prohibited. All rights reserved.
