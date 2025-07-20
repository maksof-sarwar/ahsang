# DevPlusOps Backend Server

A TypeScript-based backend server built with Express.js and Prisma ORM.

## 🚀 Features

- TypeScript for type safety
- Express.js for the web server
- Prisma ORM for database management
- JWT authentication
- Password hashing with bcrypt
- Docker support

## 🛠️ Prerequisites

- Node.js (>=18.x)
- PNPM package manager
- PostgreSQL database
- Docker and Docker Compose (optional)

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy `.env.example` to `.env` and configure your environment variables
4. Run database migrations:
   ```bash
   pnpm prisma migrate dev
   ```

## 🏃 Running the Application

### Development Mode

```bash
pnpm dev
```

### Build for Production

```bash
pnpm build
```

### Using Docker

```bash
docker-compose up -d
```

## 🛠️ Available Scripts

- `pnpm dev`: Start development server with hot-reload
- `pnpm build`: Build the project for production
- `pnpm types`: Generate TypeScript types
- `pnpm migrate`: Run database migrations
- `pnpm prisma`: Prisma CLI

## 📁 Project Structure

```
backend/
├── src/                 # Source code
├── prisma/              # Prisma configuration and migrations
├── docker-compose.yml   # Docker configuration
└── package.json         # Project dependencies and scripts
```

## 🔒 Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Environment variables are used for sensitive configuration

## 📝 Environment Variables

Create a `.env` file with the following variables:

```
DATABASE_URL="postgresql://user:password@localhost:5432/devplusops"
JWT_SECRET=your-secret-key
```

## 📚 Documentation

- API documentation: [API Reference](./docs/api.md)
- Database schema: [Prisma Schema](./prisma/schema.prisma)
- Development guide: [Development Guide](./docs/development.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details
