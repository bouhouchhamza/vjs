# Vue + Nest E-Commerce Platform

Production-oriented e-commerce starter with a Vue 3 storefront/admin dashboard and a NestJS REST API. Data is mocked through JSON-backed repositories so PostgreSQL can be introduced later behind the same service/repository boundaries.

## Structure

```text
frontend/  Vue 3 + Vite + TypeScript + Tailwind CSS + Pinia + Vue Router
backend/   NestJS + TypeScript REST API with JSON mock data
```

## Prerequisites

- Node.js 20+
- npm 10+

## Install

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Development

Start the API:

```bash
cd backend
npm run start:dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Default URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000/api`

## Build

```bash
cd backend
npm run build

cd ../frontend
npm run build
```

## Mock Users

- Admin: `admin@velora.test` / `password`
- Customer: `mia@velora.test` / `password`

## API Highlights

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PATCH /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/categories`
- `POST /api/orders`
- `GET /api/users/me`
- `PATCH /api/users/me`

The current auth implementation issues mock bearer tokens and includes JWT-ready guards/decorators. Replace the token service with `@nestjs/jwt` and the JSON repositories with database repositories when PostgreSQL is added.
