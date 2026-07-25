# Job Portal Web Application

A full-stack Job Portal web application built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to search, apply for jobs, and employers to post and manage job listings.

## Features

- **User Authentication:** Secure signup/login using JWT and bcrypt.
- **Job Management:** Recruiters can create, update, and delete job posts.
- **Application Tracking:** Candidates can apply to jobs and view their application status.
- **Profile Management:** Users can update their resume, skills, and contact info.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Redux Toolkit
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JSON Web Tokens (JWT)

## Local Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com
cd JOB_PORTAL
```

### 2. Backend Setup
1. Open the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file inside the `backend` folder and add your environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend server: `npm start`

### 3. Frontend Setup
1. Open the `frontend` folder: `cd ../frontend`
2. Install dependencies: `npm install`
3. Start the React development server: `npm start`