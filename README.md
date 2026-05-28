# URL Shortener

A full-stack URL shortener with analytics built with React, Node.js, Express, and MongoDB Atlas.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Auth: JWT + bcryptjs

## Setup Instructions

### Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev

### Environment Variables
Create a `.env` file in the backend folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
BASE_URL=http://localhost:5000

## Assumptions
- Short codes are 6 characters generated using nanoid
- Users can only view and delete their own URLs
- Each visit is stored as a timestamp in the database
- Passwords are hashed using bcryptjs before storing
- No rate limiting implemented

## Features
- User signup and login with JWT authentication
- Shorten any valid URL to a 6 character short code
- Dashboard to view, copy and delete URLs
- Click tracking per short URL
- Analytics page showing total clicks, last visited and recent visit history
- Responsive UI with loading and error states
- Form validation on frontend and backend

## Architecture
Browser (React + Vite)
        ↓
  Axios HTTP Requests
        ↓
Express REST API (Node.js)
        ↓
   MongoDB Atlas

## AI Planning Document
### Steps followed:
1. Read problem statement and listed all mandatory features
2. Designed database schema - User, Url, Visit models
3. Planned REST API endpoints for auth, URLs, analytics and redirect
4. Built backend first and tested APIs
5. Built frontend with React and connected to backend via axios
6. Added Tailwind CSS for styling
7. Tested full flow - signup, login, shorten, redirect, analytics

## Demo Video
https://youtu.be/Vs61rwahbtE

## Sample Output


---
This project is a part of a hackathon run by https://katomaran.com