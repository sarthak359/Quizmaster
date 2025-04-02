# Quiz Application

## Backend Deployment Guide

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Environment Setup

1. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3001
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-domain.com
   ```

### Deployment Steps

#### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```

#### Production Deployment Options

##### Option 1: Deploy to Heroku

1. Create a Heroku account and install Heroku CLI
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
4. Set environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set CORS_ORIGIN=https://your-frontend-domain.com
   ```
5. Deploy:
   ```bash
   git push heroku main
   ```

##### Option 2: Deploy to Railway

1. Create a Railway account
2. Connect your GitHub repository
3. Set environment variables in Railway dashboard
4. Deploy from Railway dashboard

##### Option 3: Deploy to DigitalOcean App Platform

1. Create a DigitalOcean account
2. Create a new app from the App Platform
3. Connect your GitHub repository
4. Set environment variables
5. Deploy

### After Deployment

1. Update the frontend API configuration to point to your new backend URL
2. Test the application to ensure everything works correctly
3. Monitor the logs for any potential issues

### Important Notes

- Always use HTTPS in production
- Set appropriate CORS settings
- Keep your environment variables secure
- Regularly update dependencies
