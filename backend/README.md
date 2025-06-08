## 🚀 Features

- **User Management:** Register, login, logout, update, delete (admin), JWT authentication, role-based access.
- **Event Management:** Users can create, update, and delete their own events (title, description, category, location, time, picture). Admins can approve events and delete any event.
- **Event Categories:** Admins can create, update, and delete event categories. Anyone can view categories.
- **File Uploads:** Event images (only images, max 5MB) are uploaded and served from `/uploads`.
- **Admin Controls:** Admin dashboard (stub), delete users, approve events, manage categories.
- **Security:** JWT authentication, admin-only routes, input validation, centralized error handling.
- **CORS & Logging:** CORS enabled for frontend, request logging with morgan.

---

## 🛠️ Key Files

- **controllers/**
  - `userController.js`: User registration, login, logout, update, delete, password reset/email verification (stubs).
  - `eventController.js`: Event creation, update, deletion, approval, and listing.
  - `eventCategoryController.js`: CRUD for event categories (admin only for create/update/delete).
  - `adminController.js`: Admin dashboard (stub), delete users.
- **models/**
  - `User.js`: User schema (username, email, password, role, status, timestamps).
  - `Event.js`: Event schema (title, description, picture, category, location, time, approved, createdBy, timestamps).
  - `EventCategory.js`: Event category schema (name, description).
- **routes/**
  - `userRoutes.js`: User registration, login, logout, password reset/email verification (stubs), get all users (admin), update user, delete user (admin).
  - `eventRoutes.js`: Event creation (with picture upload), update, delete (admin or creator), approval (admin), listing (public and admin).
  - `eventCategoryRoutes.js`: CRUD for event categories (admin protected for create/update/delete).
  - `adminRoutes.js`: Admin dashboard (stub), delete users (admin only).
- **functions/**
  - `generateToken.js`: JWT token generation.
  - `emailRegix.js`: Simple email validation.
- **config/**
  - `db.js`: MongoDB connection logic.
- **server.js**: Main backend entry point, sets up Express, connects to MongoDB, configures middleware, serves static uploads, and mounts all routes.
