# Blog Application - MERN Stack

This project is a full-stack blog application built using the MERN (MongoDB, Express, React, Node.js) stack. It includes features such as CRUD functionality for blog posts, a responsive UI, and authentication using JSON Web Tokens (JWT). State management is handled by Redux Toolkit.

## Features
- **CRUD Functionality**: Create, Read, Update, Delete blog posts.
- **Responsive UI**: Optimized for both desktop and mobile.
- **Authentication**: Secure login and signup using JSON Web Tokens (JWT).
- **State Management**: Handled by Redux Toolkit.
- **Database**: MongoDB is used as the database.

## Tech Stack
- **Frontend**: React.js, Redux Toolkit, CSS (or styled components)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Hosting**: Vercel (Frontend and Backend)
- **Authentication**: JSON Web Tokens (JWT)
- **State Management**: Redux Toolkit

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (version 14 or higher)
- **MongoDB** (local or cloud instance)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo-url.git
   cd your-project-directory



## Install dependencies:

# For the frontend:
cd frontend
npm install

# For the backend:
cd backend
npm install


### Running the Application Locally

# Frontend
cd frontend
npm start

# Backend:
cd backend
npm run dev



### Notes
**Environment Variables** : Ensure you configure your .env file in the backend with the following variables:
**MONGO_URI** - MongoDB connection string
**JWT_SECRET** - Secret key for JWT
**PORT** - Port on which the backend will run
**Deployment**: Both frontend and backend are deployed using Vercel, but for local development, you can use the commands above to run them.

