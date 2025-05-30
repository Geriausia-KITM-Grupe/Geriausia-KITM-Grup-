# Jira Event Manager App

- React + Vite frontend in /frontend
- Node.js + Express + MongoDB backend in /backend

| Path                    | Description                                         |
|-------------------------|-----------------------------------------------------|
| backend/controllers/    | API logic (userController.js, etc.)                 |
| backend/models/         | Mongoose schemas                                    |
| backend/routes/         | Express route definitions                           |
| backend/middleware/     | Custom Express middleware                           |
| backend/api/            | API entry point or grouping                         |
| backend/config/         | Configuration files                                 |
| backend/server.js       | Main backend entry point                            |
| backend/.env            | Backend environment variables (not tracked in git)  |
| frontend/src/           | React source code                                   |
| frontend/.env           | Frontend environment variables (not tracked in git) |
| .gitignore              | Files/folders to ignore in git   

## Setup Instructions

1. Clone the repository:
git clone https://github.com/Geriausia-KITM-Grupe/Geriausia-KITM-Grup-.git
cd "JiraEventManager"
2. Install dependencies:
- Backend:
cd backend
npm install
 - Frontend:
powershell
cd ../frontend
npm install
3. Set up environment variables:
- Copy/make .env in both backend and frontend and fill in your values.
4. Start the app:
- Backend:
cd ../backend
npx nodemon
 - Frontend:
cd ../frontend
npm run dev

## How to Push, Make a Branch, and Push to Git

1. Create a new branch:

git checkout -b your-branch-name

2. Add and commit your changes:

git add .
git commit -m "Describe your changes"


3. Push your branch to GitHub:
git push -u origin your-branch-name
