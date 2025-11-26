# Quick Start Guide

Get the Maharashtra Engineering Colleges Portal running in 10 minutes!

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- PostgreSQL 14+ ([Download](https://www.postgresql.org/download/))
- Git ([Download](https://git-scm.com/downloads))

## 1. Clone Repository

```bash
git clone https://github.com/abhishekb0209/maharashtra-engineering-colleges.git
cd maharashtra-engineering-colleges
```

## 2. Setup Database

### Windows
```bash
# Open PostgreSQL command line
psql -U postgres

# Create database
CREATE DATABASE mh_engineering_colleges;
\q
```

### Mac/Linux
```bash
# Create database
createdb mh_engineering_colleges
```

## 3. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your database credentials
# DATABASE_URL="postgresql://postgres:password@localhost:5432/mh_engineering_colleges"

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start backend server
npm run dev
```

✅ Backend running at http://localhost:5000

## 4. Setup Frontend

Open a **new terminal**:

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start frontend server
npm run dev
```

✅ Frontend running at http://localhost:3000

## 5. Access Application

Open your browser and go to:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000/api/colleges

## 6. Add Sample Data (Optional)

```bash
# In backend directory
psql -U postgres -d mh_engineering_colleges -f ../database/sample-data.sql
```

## Common Issues

### Port Already in Use

**Backend (Port 5000):**
```bash
# Change PORT in backend/.env
PORT=5001
```

**Frontend (Port 3000):**
```bash
# Change port in frontend/vite.config.ts
server: {
  port: 3001
}
```

### Database Connection Error

1. Check PostgreSQL is running:
   ```bash
   # Windows
   services.msc (look for PostgreSQL)
   
   # Mac
   brew services list
   
   # Linux
   sudo systemctl status postgresql
   ```

2. Verify DATABASE_URL in backend/.env
3. Check username/password

### Prisma Errors

```bash
# Regenerate Prisma client
cd backend
npm run prisma:generate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## Next Steps

### Add More Data

1. Go to http://localhost:3000/admin
2. Upload colleges CSV
3. Upload cutoffs CSV

### Try Features

1. **Browse Colleges**: http://localhost:3000/colleges
2. **Get Recommendations**: http://localhost:3000/recommendations
3. **Compare Colleges**: http://localhost:3000/compare

### Explore API

```bash
# Get all colleges
curl http://localhost:5000/api/colleges

# Search colleges
curl http://localhost:5000/api/colleges/search?q=pune

# Get recommendations
curl -X POST http://localhost:5000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "examType": "CET",
    "rank": 5000,
    "category": "OPEN",
    "preferredBranches": ["Computer Engineering"]
  }'
```

## Development Tools

### Prisma Studio (Database GUI)

```bash
cd backend
npm run prisma:studio
```

Opens at http://localhost:5555

### API Testing

Use tools like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code extension)

## Project Structure

```
maharashtra-engineering-colleges/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript types
│   └── package.json
├── backend/              # Node.js backend
│   ├── src/
│   │   ├── routes/       # API routes
│   │   └── index.ts      # Entry point
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   └── package.json
└── database/             # Database scripts
    └── sample-data.sql
```

## Useful Commands

### Backend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run prisma:studio # Open Prisma Studio
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Learning Resources

- [React Documentation](https://react.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)

## Getting Help

- **Documentation**: Check README.md, SETUP.md, FEATURES.md
- **API Docs**: See API.md
- **Issues**: https://github.com/abhishekb0209/maharashtra-engineering-colleges/issues
- **Email**: abhishekofficial0209@gmail.com

## What's Next?

1. Read [FEATURES.md](FEATURES.md) for detailed feature documentation
2. Check [API.md](API.md) for API reference
3. See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
4. Explore the codebase and start contributing!

Happy coding! 🚀
