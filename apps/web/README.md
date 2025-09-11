# Quests Web App - Deployment Guide

This directory contains the web version of Quests that can be deployed to Vercel or any static hosting platform.

## Getting Started

### Development

1. Install dependencies (from the root directory):
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev:web
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Build the application:
```bash
cd apps/web
pnpm build
```

The built files will be in the `dist/` directory.

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy from this directory**:
   ```bash
   cd apps/web
   vercel
   ```

3. **Follow the prompts** to link or create a new Vercel project.

### Manual Deployment

1. Build the application:
   ```bash
   pnpm build
   ```

2. Upload the `dist/` directory contents to your static hosting provider.

3. Configure your hosting provider to:
   - Serve `index.html` for all routes (SPA routing)
   - Proxy `/api/*` requests to the serverless functions

## API Routes

The web version includes serverless API routes in the `api/` directory:

- `GET /api/` - Health check
- `GET|POST /api/preferences` - User preferences
- `POST /api/auth/login` - Authentication

## Environment Variables

For production deployment, you may need to set:

- `NODE_ENV=production`
- API keys for AI providers (when integrated)
- Database connection strings (when implemented)

## Current Limitations

This is an initial web version with the following limitations:

1. **Authentication**: Uses mock authentication (demo user only)
2. **Backend**: Limited API endpoints with mock data
3. **File System**: No file system access (desktop feature)
4. **Workspace**: Simplified workspace management
5. **AI Integration**: Not yet connected to AI providers

## Next Steps

To make this a fully functional web application:

1. Implement proper authentication system
2. Add database integration for persistent storage
3. Create full API compatibility with desktop version
4. Add AI provider integrations
5. Implement web-compatible workspace management
6. Add real-time collaboration features

## Contributing

This web version shares components and logic with the desktop app in `apps/studio`. When making changes:

1. Consider compatibility with both web and desktop versions
2. Test changes in both environments
3. Update shared components in the `packages/` directory when appropriate