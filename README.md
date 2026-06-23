# EduCRM Pro

Ta'lim markazlari uchun CRM tizimi — ASP.NET Core 9 (Clean Architecture) backend va React + TypeScript + Vite frontend.

MVP modullari: Autentifikatsiya (JWT), Dashboard, Leadlar, O'quvchilar, Kurslar, Guruhlar, Davomat (darslar), To'lovlar.

## Texnologiyalar

- **Backend:** ASP.NET Core 9 Web API, EF Core (SQLite), MediatR (CQRS), FluentValidation, JWT, Serilog
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, React Router, Axios

## Talablar

- [.NET SDK 9](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org)

## Ishga tushirish

### 1. Backend (API) — `http://localhost:5000`

```bash
cd src/EduCRM.API
dotnet run
```

Birinchi ishga tushishda SQLite bazasi (`educrm.db`) avtomatik yaratiladi va boshlang'ich
ma'lumotlar (admin foydalanuvchi va namuna ma'lumotlar) bilan to'ldiriladi.

Swagger: `http://localhost:5000/swagger`

### 2. Frontend — `http://localhost:5173`

Yangi terminalda:

```bash
cd frontend
npm install
npm run dev
```

Brauzerda `http://localhost:5173` ni oching.

## Kirish ma'lumotlari (seed)

| Login | Parol      |
| ----- | ---------- |
| admin | admin123   |

## Loyiha tuzilishi

```
src/
├── EduCRM.Domain         # Entities
├── EduCRM.Application     # CQRS (MediatR), Validators, DTOs
├── EduCRM.Infrastructure  # DbContext, Services, DbSeeder
└── EduCRM.API             # Controllers, Middleware, DI
frontend/
└── src/                   # pages, components, services, context
```

## Eslatma

- API porti (`5000`) frontend (`src/services/api.ts`) va CORS sozlamalari bilan moslangan.
- Konfiguratsiya `src/EduCRM.API/appsettings.json` da (JWT kaliti, ulanish satri).
  Production uchun JWT `SecretKey` ni almashtiring.
