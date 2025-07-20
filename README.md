# DevPlusOps - Full Stack Blog Application

A modern full-stack blog application with a TypeScript/Express.js backend and Angular 19 frontend, featuring user authentication, post management, and public/private content.

## 🌟 Features

### Backend
- TypeScript for type safety
- Express.js web server
- Prisma ORM for database management
- JWT authentication
- Password hashing with bcrypt
- Docker support

### Frontend
- Angular 19 with modern practices
- User authentication flow
- Rich text post creation and management
- Responsive design for all devices
- Public/private content visibility

## 🚀 Prerequisites

### Backend
- Node.js (>=18.x)
- PNPM package manager
- PostgreSQL database
- Docker and Docker Compose (optional)

### Frontend
- Node.js (v16 or later)
- npm (v8 or later) or yarn
- Angular CLI (v19 or later)

## 🛠️ Installation

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```
4. Run database migrations:
   ```bash
   pnpm prisma migrate dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Configure environment:
   Update `src/environments/environment.ts` with your API endpoints

## 🏃 Running the Application

### Development Mode

1. Start the backend server:
   ```bash
   cd backend
   pnpm dev
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   ng serve
   ```

3. Open your browser to:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000 (or your configured port)

### Production Build

1. Build the frontend:
   ```bash
   cd frontend
   ng build --configuration production
   ```

2. Build the backend:
   ```bash
   cd backend
   pnpm build
   ```

### Using Docker

1. From the project root:
   ```bash
   docker-compose up -d
   ```

## 📁 Project Structure

```
devplusops/
├── backend/              # Backend server
│   ├── src/             # Source code
│   ├── prisma/          # Database schema and migrations
│   └── docker-compose.yml
├── frontend/            # Angular frontend
│   ├── src/
│   │   ├── app/        # Application code
│   │   ├── assets/     # Static assets
│   │   └── environments/
└── README.md           # This file
```

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Environment-based configuration
- Protected API routes
- CORS configuration

## 📝 Environment Variables

### Backend (backend/.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/devplusops"
JWT_SECRET=your-secret-key
PORT=3000
NODE_ENV=development
```

### Frontend (frontend/src/environments/environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  // Add other frontend-specific configurations
};
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
