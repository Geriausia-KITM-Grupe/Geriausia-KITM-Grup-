# Jira Event Manager App

- React + Vite frontend in /frontend
- Node.js + Express + MongoDB backend in /backend

| Path                    | Description                                         |
|-------------------------|-----------------------------------------------------|
| backend/controllers/    | API logic (userController.js, etc.)                 |
| backend/models/         | Mongoose schemas                                    |
| backend/routes/         | Express route definitions                           |
| backend/middleware/     | Custom Express middleware                           |
| backend/functions/      | Custom functions                                    |
| backend/uploads         | Store event images	                                |
| backend/config/         | Configuration files                                 |
| backend/server.js       | Main backend entry point                            |
| backend/.env            | Backend environment variables (not tracked in git)  |
| frontend/src/           | React source code                                   |
| frontend/.env           | Frontend environment variables (not tracked in git) |
| .gitignore              | Files/folders to ignore in git   

## Setup Instructions

1. Clone the repository:
- git clone https://github.com/FanTaz1986/Egzas2025.git
2. Install dependencies:
- Backend:
- cd ../backend
- npm install
- Frontend:
- cd ../frontend
- npm install
3. Set up environment variables:
- Copy/make .env in both backend and frontend and fill in your values.
4. Start the app:
- Backend:
- cd ../backend
- npx nodemon
- Frontend:
- cd ../frontend
- npm run dev
