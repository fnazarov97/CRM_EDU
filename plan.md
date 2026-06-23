Full Stack Implementation Plan: EduCRM Pro
This document outlines the complete architecture and integration strategy for the EduCRM system, covering both the ASP.NET Core Backend and the React Frontend.

1. Backend Architecture (EduCRM.API)
Style: Clean Architecture + Modular Monolith Tech Stack: ASP.NET Core 9 Web API, EF Core, PostgreSQL, MediatR, FluentValidation, AutoMapper, JWT, Serilog, Redis, Hangfire.

Solution Structure
text

src/
├── EduCRM.Domain        # Entities, Enums, Value Objects
├── EduCRM.Application   # CQRS (MediatR), Validators, DTOs
├── EduCRM.Infrastructure# DbContext, Repositories, External Integrations
└── EduCRM.API           # Controllers, Middlewares, DI Setup
Modules (Folder-based segregation)
Identity: Users, Roles, JWT, Refresh Tokens.
Students & Parents: Student profiles, Parent relations.
Leads: Lead pipeline, statuses, conversions.
Courses & Groups: Course catalog, Group schedules, Classrooms.
Attendance: Session tracking.
Payments: Invoices, transactions, debt tracking.
Teachers: Teacher management, salary rules.
2. Frontend Architecture (React Web App)
Tech Stack: React 18, TypeScript, Vite, Tailwind CSS, React Router v6, Axios.

Folder Structure
text

frontend/
├── public/
├── src/
│   ├── assets/          # Images, Icons
│   ├── components/      # Reusable UI (Sidebar, Header, Cards)
│   ├── context/         # AuthContext, ThemeContext
│   ├── pages/           # Screen views (Dashboard, Login, Leads, etc.)
│   ├── services/        # API integration (axios instances, endpoint calls)
│   ├── types/           # TypeScript interfaces for API models
│   ├── App.tsx          # Router configuration
│   └── main.tsx         # Entry point
├── tailwind.config.js   # Custom theme matching design_system.md
└── package.json
Routing Structure
/login - Public login page.
/ (Dashboard) - Protected route.
/leads - Protected route.
/students - Protected route.
/courses - Protected route.
/groups - Protected route.
/attendance - Protected route.
/payments - Protected route.
3. Integration Strategy (Backend ↔ Frontend)
Authentication Flow (JWT)
Login: Frontend sends POST /api/v1/auth/login with username/password.
Token Issuance: Backend returns a JWT AccessToken (15m expiry) and a RefreshToken (30d expiry).
Storage: Frontend stores tokens securely (e.g., localStorage).
API Requests: Frontend Axios interceptor automatically attaches Authorization: Bearer {AccessToken} to all outgoing requests.
Token Refresh: If a request fails with 401 Unauthorized, the Axios interceptor attempts to call POST /api/v1/auth/refresh, updates the token, and retries the original request.
CORS Configuration
The ASP.NET Core backend will be configured to allow Cross-Origin Resource Sharing (CORS) explicitly for the frontend development server (http://localhost:5173).

API Proxy (Optional but Recommended)
To prevent CORS issues entirely during development, the Vite configuration (vite.config.ts) can be set up to proxy API requests:

typescript

server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
4. Execution Plan (Sprints)
Sprint 1: MVP Setup
Initialize Backend: Setup Clean Architecture, EF Core PostgreSQL, Identity module, JWT.
Initialize Frontend: Setup Vite, Tailwind, React Router, AuthContext, Axios, layout components.
Connect: Implement Login screen and Auth API. Verify end-to-end token flow.
Core Modules: Implement CRUD and UI for Leads, Students, Groups, Attendance, Payments.
Sprint 2 & 3: Advanced Features
Integrations: Telegram Bot notifications, SMS provider.
Background Jobs: Hangfire tasks for payment reminders.
Reporting: Materialized views in PostgreSQL and Dashboard charts in React.