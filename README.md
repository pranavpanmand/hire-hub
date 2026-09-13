<div align="center">

# <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=40&pause=1000&color=3B82F6&center=true&vCenter=true&width=600&height=80&lines=Welcome+to+Hire+Hub+🚀;Your+Ultimate+Job+Portal;Connect.+Apply.+Get+Hired." alt="Typing SVG" /></a>

**A Modern, Full-Stack Job Portal built with the MERN Stack**

[![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=mongodb)](https://github.com/pranavpanmand/hire-hub)

---
</div>

<p align="center">
  <b>Hire Hub</b> bridges the gap between job seekers and employers. With a sleek UI and powerful backend, candidates can easily find and save jobs, while recruiters can efficiently manage applications using our built-in Applicant Tracking System (ATS).
</p>

## ✨ Interactive Features

### 🧑‍🎓 For Job Seekers
| Feature | Description |
| :--- | :--- |
| 🔐 **Secure Auth** | Robust user registration and login with JWT session management. |
| 🧑‍💻 **Rich Profiles** | Update your bio, skills, and seamlessly upload resumes & avatars. |
| 🔍 **Advanced Search** | Filter the perfect job by category, location, and salary range. |
| 🔖 **Saved Jobs** | *[NEW]* Bookmark your favorite jobs and access them later from your profile. |
| 🚀 **1-Click Apply** | Apply to any job instantly with your saved resume. |
| 📊 **Live Tracking** | Track your application status (Pending, Accepted, Rejected). |

### 🏢 For Employers
| Feature | Description |
| :--- | :--- |
| 🏢 **Company Profiles** | Register multiple companies under a single recruiter account. |
| 📝 **Job Posting** | Post detailed job listings with requirements and salary ranges. |
| 📈 **Built-in ATS** | An integrated Applicant Tracking System to manage candidates. |
| 📥 **Resume Access** | View and download candidate resumes with a single click. |
| ✅ **Status Updates** | Accept or reject candidates to keep them informed. |

---

<div align="center">
  
## 🛠️ Powerful Tech Stack

<a href="https://skillicons.dev">
  <img src="https://skillicons.dev/icons?i=react,tailwind,redux,vite,nodejs,express,mongodb,postman&theme=dark" alt="Tech Stack" />
</a>

<br/><br/>
</div>

### 🎨 Frontend (Client)
- **Framework:** React.js powered by Vite ⚡
- **Styling:** Tailwind CSS + Radix UI + Framer Motion (for buttery smooth animations)
- **State Management:** Redux Toolkit
- **Routing & Networking:** React Router DOM & Axios

### ⚙️ Backend (Server)
- **Core:** Node.js & Express.js
- **Database:** MongoDB & Mongoose ODM
- **Security:** bcryptjs & JSON Web Tokens (JWT)
- **Cloud Storage:** Cloudinary & Multer (for resumes and profile pictures)

---

## 📂 Project Architecture

```text
hire-hub/
├── ⚙️ backend/
│   ├── controllers/      # Business logic for Users, Jobs, Applications
│   ├── middlewares/      # Authentication & File Upload handling
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API endpoints
│   └── utils/            # DB connections & Cloudinary config
│
├── 🎨 frontend/
│   ├── src/
│   │   ├── components/   # Modular UI Components (Auth, Admin, Shared)
│   │   ├── hooks/        # Custom React Hooks for data fetching
│   │   ├── redux/        # Global State Slices
│   │   └── utils/        # Global Constants
│   └── tailwind.config.js
└── README.md
```

---

## 🚀 Get Started Locally

Follow these steps to experience **Hire Hub** on your local machine.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/pranavpanmand/hire-hub.git
cd hire-hub
```

### 2️⃣ Environment Setup (`backend/.env`)
Create a `.env` file in the `backend/` directory and configure:
```env
PORT=8000
MONGO_URI=<Your MongoDB Connection String>
SECRET_KEY=<Your JWT Secret Key>
CLOUD_NAME=<Your Cloudinary Cloud Name>
API_KEY=<Your Cloudinary API Key>
API_SECRET=<Your Cloudinary API Secret>
```

### 3️⃣ Launch the Backend Server 
```bash
cd backend
npm install
npm run dev
```
*(Server runs on `http://localhost:8000`)*

### 4️⃣ Launch the Frontend App
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*(App runs on `http://localhost:5173`)*

---

<div align="center">

**Crafted with ❤️ and the MERN Stack**

[⬆ Back to Top](#-hire-hub-job-portal-web-application)

</div>
