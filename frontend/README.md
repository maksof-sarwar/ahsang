# Blog Application

A modern blog application built with Angular 19, featuring user authentication, post management, and public/private content. This application allows users to create, view, and manage blog posts with a clean and responsive interface.

## Features

- **User Authentication**
  - Secure login system
  - Protected routes for authenticated users
  - Session management

- **Post Management**
  - Create, read, update, and delete blog posts
  - Rich text editing capabilities
  - Post categorization and tagging

- **Public Interface**
  - View all public posts without authentication
  - Responsive design for all devices
  - Clean and modern user interface

## Prerequisites

- Node.js (v16 or later)
- npm (v8 or later) or yarn
- Angular CLI (v19 or later)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

4. **Open in browser**
   Navigate to `http://localhost:4200/` to view the application.

## Project Structure

```
src/
├── app/
│   ├── pages/
│   │   ├── auth/          # Authentication components
│   │   │   └── login.ts   # Login page
│   │   ├── post/          # Post management
│   │   │   ├── post.ts    # Private posts (requires auth)
│   │   │   └── public.post.ts  # Public posts view
│   ├── component/         # Shared components
│   └── layout/            # Layout components
├── assets/               # Static assets
└── environments/         # Environment configurations
```

## Development

### Code scaffolding

Generate new components, services, and more using Angular CLI:

```bash
ng generate component component-name
```

### Build

Build the project for production:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

### Running tests

Run unit tests:
```bash
ng test
```

Run end-to-end tests:
```bash
ng e2e
```

## API Integration

This application integrates with a backend API. Make sure the API server is running and properly configured in the environment files.

## Environment Configuration

Update the environment files in `src/environments/` with your API endpoints and other configuration values.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
