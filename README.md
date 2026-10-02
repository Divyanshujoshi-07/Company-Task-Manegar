# CompanyOS — Employee & Task Management System

A full-stack MERN application (MongoDB, Express, React, Node.js) for managing employees,
departments, projects, and tasks across three roles: **Admin**, **Manager**, and **Employee**.

This is a real, runnable codebase — not a mockup. Everything below (auth, role-based
permissions, CRUD, task workflow, comments, file uploads, notifications, dashboards, reports,
activity logs) is implemented and wired end-to-end. You just need to point it at a MongoDB
database to run it.

## What's included

- **JWT authentication** with bcrypt password hashing and role-based route protection
- **Three role-based dashboards** (Admin / Manager / Employee) with live stats
- **Employee management**: create, edit, deactivate, delete, department assignment
- **Department management** with employee counts and manager assignment
- **Project management** with team assignment, priority, deadlines, and auto-calculated progress
- **Task management** with the full workflow: Pending → In Progress → Review → Needs Changes → Completed
- **Rich task-assignment notifications** — includes title, description, priority, due date, and who assigned it
- **Attendance & work-time tracking** — an employee's working time is tracked automatically from the moment
  they land on their dashboard each day; "Mark Attendance" stays disabled until they've completed the
  required hours (8 by default, configurable — see below)
- **Random presence verification** — at an unpredictable point during the work session, the employee is
  prompted to confirm they're present within a short response window; the response (or lack of one) is
  recorded with a timestamp
- **Comments** on tasks (threaded by task, visible to assignee + assigner)
- **File attachments** on tasks (stored on local disk via Multer; swap in Cloudinary easily — see below)
- **Notifications** (task assigned, comments, status changes) with a bell dropdown
- **Reports** with charts: task statistics, project progress, employee performance
- **Attendance overview** for admins/managers — live team status, presence-check compliance, per-employee
  attendance history
- **Activity log** (admin-only, company-wide audit trail)
- **Search, filters, and pagination-ready tables** across employees/projects/tasks
- Modern UI: dark ink sidebar, a single deliberate accent color throughout, monospace digits for the work
  timer and hour figures, responsive across desktop/tablet/mobile

## Project structure

```
company-task-manager/
├── server/     # Express + MongoDB API
└── client/     # React (Vite) + Tailwind frontend
```

## 1. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` and set `MONGO_URI` to your MongoDB connection string — either:
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster, or
- A local MongoDB instance (`mongodb://127.0.0.1:27017/company-task-manager`)

Also set `JWT_SECRET` to any long random string.

Then create your first admin account and a bit of sample data:

```bash
npm run seed
```

This prints login credentials for an Admin, a Manager, and an Employee account.

Start the API:

```bash
npm run dev      # with nodemon, auto-restarts on changes
# or
npm start        # plain node
```

The API runs on `http://localhost:5000` by default. Health check: `GET /api/health`.

## 2. Frontend setup

```bash
cd client
npm install
cp .env.example .env
```

`VITE_API_URL` defaults to `http://localhost:5000/api` — change it if your backend runs
elsewhere.

```bash
npm run dev
```

The app runs on `http://localhost:5173`. Log in with the seeded credentials, e.g.:

```
admin@company.com / your_admin_password
manager@company.com / Manager@123
employee@company.com / Employee@123
```

## 3. Building for production

```bash
cd client && npm run build   # outputs to client/dist — deploy as a static site
cd server && npm start       # deploy the server behind a process manager (pm2, etc.)
```

## Notes / things to know

- **Attendance tracking**: a work session starts automatically the first time an employee opens their
  dashboard each day (no manual "clock in" needed). The elapsed time is tracked server-side, so refreshing
  or logging out and back in doesn't reset it. "Mark Attendance" unlocks once `ATTENDANCE_REQUIRED_HOURS`
  (default 8) have passed — lower this in `server/.env` for local testing so you don't have to wait 8 hours.
- **Presence verification**: once per work session, at a random point between 10% and 90% of the required
  hours, the employee gets a "Please confirm your presence" prompt with a 5-minute response window. If they
  don't respond in time, it's recorded as missed. Admins/managers can see compliance on the Attendance page.
- **File storage**: task attachments are saved to `server/uploads/` and served statically at
  `/uploads/...`. If you'd rather use Cloudinary (as the original spec suggested), swap the
  logic in `server/middleware/upload.js` and `taskController.uploadTaskFile` for the Cloudinary
  SDK — the rest of the app doesn't need to change.
- **Role permissions** are enforced on the backend (in controllers/middleware), not just hidden
  in the UI — e.g. an employee token can never fetch another employee's tasks or attendance.
- **Seed script is idempotent** — running `npm run seed` again won't duplicate data, it just
  skips records that already exist.
- **Rate limiting, Helmet, and CORS** are configured in `server/server.js`; adjust
  `CLIENT_URL` in `.env` if your frontend runs on a different origin.
- The project follows the build order from the original spec (Steps 1–9 are fully implemented;
  search/filter/pagination from Step 10 are implemented for tasks/employees, sorting and
  empty/loading states are in place throughout).
