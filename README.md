# 🌿 Green Notes

A simple, clean, and lightweight note-taking web application built using the MERN stack. Green Notes allows users to create, manage, and share notes through a minimal and user-friendly interface.

## ✨ Features

- User registration and login
- Secure authentication using JWT
- Password hashing using bcrypt
- Create, edit, and delete personal notes
- Make notes public or private
- Explore notes shared by other users
- Responsive and minimalist interface

## 🛠️ Tech Stack

**Frontend**
- React.js
- CSS
- Vite

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

## 📁 Project Structure

```text
green-notes-app/
├── client/
│   └── src/
│       ├── App.jsx
│       ├── api.js
│       ├── main.jsx
│       └── styles.css
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env.example
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd green-notes-app
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Set up the frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL provided by Vite in your browser.

## 🔐 Security

- Passwords are hashed before being stored.
- JWT is used for authentication.
- Private notes are accessible only to their owners.
- Environment variables are used to protect sensitive credentials.

## 🚀 Future Improvements

- Search and filter notes
- Organize notes using categories and tags
- Add note pinning
- Improve sharing and collaboration features

## 👩‍💻 Author

Developed as a personal full-stack web development project.

---

**Green Notes — Keep your thoughts organized. 🌿**
