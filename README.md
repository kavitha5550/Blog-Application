# Blog Application - Submission Guide

This is a full-stack capable React application using `json-server` as a mock backend.

## 🚀 How to Run the Project

1.  **Clone the Repository** (if submitting via Git):
    ```bash
    git clone https://github.com/kavitha5550/Blog-Application.git
    cd task
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Start the Application**:
    We have configured a single command to run both the Frontend (Vite) and Backend (JSON Server) simultaneously.
    ```bash
    npm run start:all
    ```

4.  **Access the App**:
    - **Frontend**: `http://localhost:5173` (Use this for testing)
    - **Backend API**: `http://localhost:5000`

## ✨ Key Features

- **Authentication**: Sign Up and Login functionality using a simulated database.
- **CRUD Operations**: Create, Read, Update, and Delete blog posts.
- **Search & Filter**: Search blogs by author and sort by Date (Newest/Oldest) or Title (A-Z/Z-A).
- **Responsive Design**: Fully responsive layout tailored for desktop and mobile.
- **State Management**: Uses **Zustand** for efficient global state management.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide React (Icons)
- **Backend**: JSON Server (Simulated REST API)
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Build Tool**: Vite
