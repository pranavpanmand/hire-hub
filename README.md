# 🚀 Hire Hub (Job Portal Web Application)

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A comprehensive, full-stack Job Portal platform built using the MERN stack (MongoDB, Express.js, React, Node.js). 

**Hire Hub** bridges the gap between job seekers and employers. It allows candidates to create profiles, search for jobs, save jobs for later, and apply seamlessly. Simultaneously, it enables recruiters to post job listings, manage company profiles, and track applicants using a built-in Applicant Tracking System (ATS).

---

## ✨ Comprehensive Feature List

### 🧑‍🎓 For Job Seekers (Students)
- **Authentication & Authorization:** Secure user registration, login, and JWT-based session management.
- **Profile Management:** 
  - Update personal details, bio, and skills.
  - Upload profile pictures and resumes (powered by Cloudinary and Multer).
- **Advanced Job Search & Filters:** 
  - Search for jobs by keyword.
  - Filter jobs by category, location, and salary range.
- **Bookmarks / Saved Jobs (New!):** 
  - Bookmark jobs to apply later.
  - View and manage all saved jobs in a dedicated "Saved Jobs" table on the user profile.
- **Job Applications:** 
  - One-click application process for available jobs.
- **Application Tracking:** 
  - Track the status of applied jobs in real-time (Pending, Accepted, Rejected).

### 🏢 For Employers (Recruiters)
- **Company Management:** 
  - Register and manage multiple company profiles under a single recruiter account.
  - Upload company logos.
- **Job Posting & Management:** 
  - Create detailed job listings specifying role, requirements, salary, and location.
  - Edit or delete existing job postings.
- **Applicant Tracking System (ATS):** 
  - View all applicants for a specific job posting.
  - Review applicant profiles, skills, and download their resumes.
  - Update the status of applicant applications (e.g., Pending, Accepted, Rejected).

---

## 🛠️ Tech Stack & Technologies Used

### Frontend (Client)
- **React.js (Vite):** Fast and modern UI development environment.
- **Tailwind CSS:** Utility-first CSS framework for rapid and responsive UI styling.
- **Redux Toolkit:** Centralized state management for users, jobs, companies, and applications.
- **Radix UI & Framer Motion:** Highly accessible UI components with smooth, dynamic animations.
- **React Router DOM:** Client-side routing for seamless navigation.
- **Axios:** Promise-based HTTP client for making API requests to the backend.
- **Sonner:** For beautiful toast notifications.

### Backend (Server)
- **Node.js & Express.js:** Scalable server-side runtime and robust web framework.
- **MongoDB & Mongoose:** NoSQL database and object data modeling (ODM) for flexible data storage.
- **JSON Web Tokens (JWT) & bcryptjs:** Secure authentication and password hashing.
- **Cloudinary:** Cloud-based image and document (resume) storage.
- **Multer:** Middleware for handling `multipart/form-data` (file uploads).
- **DataURI:** For converting uploaded files into base64 strings before uploading to Cloudinary.

---

## 📂 Project Structure

The project is structured as a monorepo with separate `frontend` and `backend` directories.

```text
hire-hub/
├── backend/
│   ├── controllers/      # API logic (user, job, company, application)
│   ├── middlewares/      # Auth & Multer middlewares
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routes
│   ├── utils/            # DB connection, Cloudinary config
│   ├── index.js          # Entry point for the Express server
│   └── .env              # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/   # React components (Admin, Auth, Shared, UI)
│   │   ├── hooks/        # Custom React hooks for data fetching
│   │   ├── redux/        # Redux slices and store configuration
│   │   ├── utils/        # Constants (API Endpoints)
│   │   ├── App.jsx       # Main App component with Routing
│   │   └── main.jsx      # React DOM rendering entry point
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

---

## ⚙️ Environment Variables Setup

Before running the project, you need to configure the environment variables.

### Backend (`/backend/.env`)
Create a `.env` file within the `backend` directory and add the following keys:

```env
PORT=8000
MONGO_URI=<Your MongoDB Connection String>
SECRET_KEY=<Your Custom JWT Secret Key>
CLOUD_NAME=<Your Cloudinary Cloud Name>
API_KEY=<Your Cloudinary API Key>
API_SECRET=<Your Cloudinary API Secret>
```

*(Note: You can get Cloudinary credentials by signing up for a free account at [cloudinary.com](https://cloudinary.com/))*

---

## 🚀 How to Run the Project Locally

Follow these steps to get the project up and running on your local machine.

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed (v16+ recommended).
- [MongoDB](https://www.mongodb.com/) installed locally, or a MongoDB Atlas cluster URI.
- Git installed.

### 2. Clone the Repository
```bash
git clone https://github.com/pranavpanmand/hire-hub.git
cd hire-hub
```

### 3. Start the Backend Server
Open a terminal, navigate to the backend folder, install dependencies, and start the development server.

```bash
cd backend
npm install
npm run dev
```
*The backend server will start running on `http://localhost:8000`.*

### 4. Start the Frontend Application
Open a new terminal, navigate to the frontend folder, install dependencies, and start the Vite development server.

```bash
cd frontend
npm install
npm run dev
```
*The frontend application will start running on `http://localhost:5173`. Open this URL in your browser to view the app.*

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License
This project is open-source and available under the [ISC License](LICENSE).

---
**Developed with ❤️ using the MERN stack.**
