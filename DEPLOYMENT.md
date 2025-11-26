# Deployment Guide

## Overview

This guide covers deploying the Maharashtra Engineering Colleges Portal to production environments.

## Architecture

```
Frontend (React) → Backend (Node.js/Express) → Database (PostgreSQL)
```

## Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend + Database)

#### Frontend on Vercel

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login
   vercel login
   
   # Deploy
   cd frontend
   vercel
   ```

2. **Configure Build Settings**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

#### Backend on Railway

1. **Create New Project**
   - Go to railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

2. **Add PostgreSQL Database**
   - Click "New"
   - Select "Database"
   - Choose "PostgreSQL"
   - Railway will provide DATABASE_URL

3. **Configure Backend Service**
   - Root Directory: `backend`
   - Build Command: `npm install && npx prisma generate && npm run build`
   - Start Command: `npx prisma migrate deploy && npm start`

4. **Environment Variables**
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   JWT_SECRET=your-secret-key
   PORT=5000
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```

5. **Generate Domain**
   - Railway provides a domain automatically
   - Or add custom domain

### Option 2: DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean
   - Click "Create" → "Apps"
   - Connect GitHub repository

2. **Configure Components**

   **Frontend Component:**
   - Type: Static Site
   - Source Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

   **Backend Component:**
   - Type: Web Service
   - Source Directory: `backend`
   - Build Command: `npm install && npx prisma generate && npm run build`
   - Run Command: `npx prisma migrate deploy && npm start`

   **Database Component:**
   - Type: PostgreSQL Database
   - Plan: Basic or Professional

3. **Environment Variables**
   - Set for backend component
   - Use ${db.DATABASE_URL} for database connection

### Option 3: AWS (EC2 + RDS)

#### Setup RDS PostgreSQL

1. Create RDS instance
2. Configure security groups
3. Note connection details

#### Setup EC2 Instance

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t2.medium or larger
   - Configure security groups (ports 80, 443, 22)

2. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install Nginx
   sudo apt install -y nginx
   
   # Install PM2
   sudo npm install -g pm2
   ```

3. **Clone and Setup**
   ```bash
   # Clone repository
   git clone https://github.com/abhishekb0209/maharashtra-engineering-colleges.git
   cd maharashtra-engineering-colleges
   
   # Setup backend
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with production values
   npx prisma generate
   npx prisma migrate deploy
   
   # Setup frontend
   cd ../frontend
   npm install
   npm run build
   ```

4. **Configure PM2**
   ```bash
   cd backend
   pm2 start dist/index.js --name mh-colleges-api
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/mh-colleges
   
   server {
       listen 80;
       server_name your-domain.com;
       
       # Frontend
       location / {
           root /path/to/frontend/dist;
           try_files $uri $uri/ /index.html;
       }
       
       # Backend API
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/mh-colleges /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### Option 4: Docker Deployment

1. **Create Dockerfiles**

   **Backend Dockerfile:**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npx prisma generate
   RUN npm run build
   EXPOSE 5000
   CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
   ```

   **Frontend Dockerfile:**
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Docker Compose**
   ```yaml
   version: '3.8'
   
   services:
     db:
       image: postgres:14
       environment:
         POSTGRES_DB: mh_engineering_colleges
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: ${DB_PASSWORD}
       volumes:
         - postgres_data:/var/lib/postgresql/data
       ports:
         - "5432:5432"
     
     backend:
       build: ./backend
       environment:
         DATABASE_URL: postgresql://postgres:${DB_PASSWORD}@db:5432/mh_engineering_colleges
         JWT_SECRET: ${JWT_SECRET}
         PORT: 5000
       depends_on:
         - db
       ports:
         - "5000:5000"
     
     frontend:
       build: ./frontend
       ports:
         - "80:80"
       depends_on:
         - backend
   
   volumes:
     postgres_data:
   ```

3. **Deploy**
   ```bash
   docker-compose up -d
   ```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
MAX_FILE_SIZE=10485760
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## Database Migrations

Always run migrations before starting the application:

```bash
npx prisma migrate deploy
```

## Monitoring

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
pm2 status
```

### Database Monitoring
- Use PostgreSQL monitoring tools
- Set up alerts for connection issues
- Monitor query performance

### Application Monitoring
- Use services like:
  - Sentry for error tracking
  - LogRocket for session replay
  - New Relic for APM

## Backup Strategy

### Database Backups
```bash
# Automated daily backups
pg_dump -h hostname -U username -d database > backup_$(date +%Y%m%d).sql

# Restore
psql -h hostname -U username -d database < backup_file.sql
```

### File Backups
- Backup uploaded files regularly
- Use cloud storage (S3, DigitalOcean Spaces)

## Security Checklist

- [ ] Use HTTPS (SSL certificate)
- [ ] Set strong JWT secret
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up firewall rules
- [ ] Regular security updates
- [ ] Database connection encryption
- [ ] Input validation and sanitization
- [ ] SQL injection prevention (Prisma handles this)

## Performance Optimization

### Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement caching headers
- Lazy load images
- Code splitting

### Backend
- Database connection pooling
- Query optimization
- Response caching
- Load balancing
- Horizontal scaling

### Database
- Proper indexing
- Query optimization
- Connection pooling
- Regular VACUUM
- Monitor slow queries

## Scaling

### Horizontal Scaling
- Multiple backend instances
- Load balancer (Nginx, AWS ALB)
- Database read replicas
- Redis for caching

### Vertical Scaling
- Increase server resources
- Optimize database
- Upgrade PostgreSQL plan

## Troubleshooting

### Common Issues

**Database Connection Failed**
- Check DATABASE_URL
- Verify database is running
- Check firewall rules
- Verify credentials

**CORS Errors**
- Check CORS_ORIGIN setting
- Verify frontend URL
- Check Nginx configuration

**Build Failures**
- Check Node.js version
- Clear node_modules and reinstall
- Check for TypeScript errors
- Verify environment variables

**High Memory Usage**
- Check for memory leaks
- Optimize database queries
- Implement pagination
- Use connection pooling

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review and rotate secrets quarterly
- Database maintenance (VACUUM, ANALYZE)
- Monitor disk space
- Review logs for errors
- Performance testing
- Security audits

### Updates
```bash
# Update dependencies
npm update

# Update Prisma
npm install @prisma/client@latest prisma@latest
npx prisma generate

# Test thoroughly before deploying
```

## Support

For deployment issues:
- Check logs: `pm2 logs` or cloud platform logs
- Review error messages
- Check GitHub Issues
- Contact: abhishekofficial0209@gmail.com
