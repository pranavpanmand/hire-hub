# Job Portal Web Application

A comprehensive, full-stack Job Portal platform built using the MERN stack (MongoDB, Express.js, React, Node.js). This platform connects job seekers with employers, allowing candidates to create profiles, search for jobs, and apply, while enabling recruiters to post job listings, manage applications, and interact with applicants.

## 🚀 Features

### For Job Seekers
- **Authentication:** Secure user registration and login.
- **Profile Management:** Update personal details, resume, and profile pictures.
- **Job Search & Filters:** Search for jobs by keyword, category, or location.
- **Job Applications:** Apply for available jobs easily.
- **Application Tracking:** Track the status of applied jobs.

### For Employers (Recruiters)
- **Company Profile:** Register and manage company details.
- **Job Posting:** Create, update, and manage job listings.
- **Application Management:** View all applicants for a specific job.
- **Applicant Tracking System (ATS):** Update the status of applicant applications (e.g., Pending, Accepted, Rejected).

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite):** Fast and modern UI development.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Redux Toolkit:** State management.
- **Radix UI & Framer Motion:** Accessible components and smooth animations.
- **React Router:** Client-side routing.
- **Axios:** For making API requests to the backend.

### Backend
- **Node.js & Express.js:** Server-side runtime and web framework.
- **MongoDB & Mongoose:** NoSQL database and object data modeling.
- **JSON Web Tokens (JWT) & bcrypt:** For authentication and password hashing.
- **Cloudinary & Multer:** For image/resume uploads and management.

## 📂 Project Structure

- `/frontend` - Contains the React client application.
- `/backend` - Contains the Node/Express server, API routes, models, and controllers.

## ⚙️ Environment Variables

### Backend (`/backend/.env`)
Ensure the following variables are set in the `.env` file within the `backend` directory:
```env
PORT=8000
MONGO_URI=<Your MongoDB connection string>
SECRET_KEY=<Your JWT secret key>
CLOUD_NAME=<Cloudinary Cloud Name>
API_KEY=<Cloudinary API Key>
API_SECRET=<Cloudinary API Secret>
```

## 🚀 How to Run the Project

Follow these steps to run the project locally.

### 1. Prerequisites
Ensure you have Node.js and MongoDB installed on your system.

### 2. Start the Backend Server
Open a terminal and run the following commands:
```bash
cd backend
npm install
npm run dev
```
The backend server will start running on `http://localhost:8000`.

### 3. Start the Frontend Development Server
Open a new terminal and run the following commands:
```bash
cd frontend
npm install
npm run dev
```
The frontend application will start running on `http://localhost:5173`.

---

**Developed with ❤️ using the MERN stack.**
