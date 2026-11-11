<<<<<<< HEAD
<<<<<<< HEAD
# Green Notes — React + Express + MongoDB

A minimal notes app with JWT authentication, bcrypt password hashing, private notes, and a public feed.

## 1. Requirements
- Node.js 18+ (20 LTS recommended)
- MongoDB Community Server running locally, OR a MongoDB Atlas cluster
- VS Code or another editor

## 2. Start MongoDB
### Local MongoDB
Install MongoDB Community Server and make sure its service is running. The sample connection string is:
`mongodb://127.0.0.1:27017/green_notes`

MongoDB Compass is optional; connect it to `mongodb://127.0.0.1:27017` to view your database.

### MongoDB Atlas
Create a free cluster, create a database user, allow your current IP in Network Access, and copy the Node.js connection string. Replace the username, password, and database name. If the password contains special characters, URL-encode them.

## 3. Configure the backend
Open a terminal in the `server` folder:
```bash
npm install
```
Copy `.env.example` to a new file named `.env` and set your values:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/green_notes
JWT_SECRET=put_a_long_random_secret_here
CLIENT_URL=http://localhost:5173
```
For Atlas, replace only `MONGO_URI` with the Atlas connection string. Never commit `.env` to GitHub.

Start the API:
```bash
npm run dev
```
Expected output:
- `MongoDB connected successfully`
- `Server running on port 5000`

Open `http://localhost:5000` to confirm the API is running.

## 4. Start the React frontend
Open a SECOND terminal in the `client` folder:
```bash
npm install
npm run dev
```
Open the local URL Vite prints, normally `http://localhost:5173`.

Register a user, create a note, and test the Make public checkbox. Register a second account (use a private/incognito browser window) to test the Public Notes feed.

## 5. Project structure
```text
green-notes-app/
├── server/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── noteController.js
│   ├── middleware/authMiddleware.js
│   ├── models/User.js
│   ├── models/Note.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── client/
    ├── src/
    │   ├── App.jsx
    │   ├── api.js
    │   ├── main.jsx
    │   └── styles.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 6. API routes
All `/api/notes` routes require `Authorization: Bearer <JWT>`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/notes/mine` | Get your notes |
| GET | `/api/notes/public` | Get all public notes |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update a note you own |
| DELETE | `/api/notes/:id` | Delete a note you own |

## 7. How the database connection works
`server.js` loads `.env` using dotenv, then calls `connectDB()` from `config/db.js`. Mongoose reads `MONGO_URI` and connects to MongoDB. The app starts listening only after the database connection succeeds.

Mongoose creates the `green_notes` database and collections when the first documents are inserted. You do not need to manually create the database first.

## 8. Common problems
- **`MONGO_URI is missing`**: Ensure the file is named exactly `.env`, is inside `server/`, and contains `MONGO_URI=...`.
- **`ECONNREFUSED 127.0.0.1:27017`**: MongoDB is not running, or the local URI/port is wrong. Start the MongoDB service or use Atlas.
- **`EADDRINUSE :::5000`**: Another process is using port 5000. Stop the old server terminal with Ctrl+C. On Windows PowerShell:
  ```powershell
  netstat -ano | findstr :5000
  taskkill /PID <PID_NUMBER> /F
  ```
  Or change `PORT` in `.env` and update `client/src/api.js` to the same port.
- **Frontend cannot reach API**: Run both terminals, check API port `5000`, and ensure `CLIENT_URL` matches the Vite origin.
- **401 / Invalid token**: Log out and log in again; the browser may have an expired token.
- **Atlas connection fails**: Check database username/password, IP allowlist, and URL-encode special characters in the password.

## 9. Security notes
This is a learning project, not a production-hardened service. It hashes passwords with bcryptjs and signs JWTs. The browser stores the JWT in localStorage for simplicity; for production, prefer secure, HttpOnly, SameSite cookies, HTTPS, CSRF protections where applicable, rate limiting, input validation, and secret management. Add `.env` to `.gitignore` before pushing to GitHub.

## 10. Git ignore
Create `server/.gitignore` containing:
```gitignore
node_modules/
.env
```
Create `client/.gitignore` containing:
```gitignore
node_modules/
dist/
```
=======
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
>>>>>>> ff12cd6f85b9134472a25ef8fed655ceb44d624e
=======

>>>>>>> origin/main
