# Setup Instructions

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- npm or yarn package manager
- Git

## Step 1: Clone Repository

```bash
git clone https://github.com/abhishekb0209/maharashtra-engineering-colleges.git
cd maharashtra-engineering-colleges
```

## Step 2: Database Setup

### Create PostgreSQL Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE mh_engineering_colleges;

# Exit psql
\q
```

## Step 3: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env and update DATABASE_URL
# DATABASE_URL="postgresql://username:password@localhost:5432/mh_engineering_colleges"

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start development server
npm run dev
```

Backend will run on http://localhost:5000

## Step 4: Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

Frontend will run on http://localhost:3000

## Step 5: Seed Database (Optional)

You can add sample data through the admin panel or create a seed script:

```bash
cd backend
# Create seed script in prisma/seed.ts
npm run prisma:seed
```

## Step 6: Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Prisma Studio: `npm run prisma:studio` (in backend directory)

## Database Schema

The application uses the following main tables:

- **colleges**: College information
- **courses**: Courses offered by colleges
- **cutoffs**: Historical cutoff data
- **users**: User accounts and preferences

## API Endpoints

### Colleges
- `GET /api/colleges` - List colleges with filters
- `GET /api/colleges/:id` - Get college details
- `GET /api/colleges/search` - Search colleges

### Recommendations
- `POST /api/recommendations` - Get personalized recommendations

### Cutoffs
- `GET /api/cutoffs` - Get cutoffs with filters
- `POST /api/cutoffs/upload` - Upload cutoff data (admin)

### Admin
- `POST /api/admin/colleges` - Create college
- `PUT /api/admin/colleges/:id` - Update college
- `DELETE /api/admin/colleges/:id` - Delete college
- `POST /api/admin/colleges/upload` - Upload colleges CSV

### Export
- `GET /api/export/csv` - Export colleges to CSV
- `GET /api/export/pdf` - Export colleges to PDF

## CSV Format for Data Upload

### Colleges CSV Format

```csv
code,name,type,city,district,university,address,pincode,establishedYear,website,email,phone,description,tuitionFee,totalAnnualFee,feeCategory,placementYear,totalStudents,studentsPlaced,placementPercentage,highestPackage,averagePackage,medianPackage,naacGrade,naacScore,nbaAccredited,autonomous,boysHostel,girlsHostel,facilities,topRecruiters
```

### Cutoffs CSV Format

```csv
collegeCode,branchCode,year,round,examType,category,openingRank,closingRank,openingPercentile,closingPercentile
```

## Troubleshooting

### Database Connection Issues

If you get database connection errors:

1. Ensure PostgreSQL is running
2. Check DATABASE_URL in .env
3. Verify database exists
4. Check username/password

### Port Already in Use

If port 5000 or 3000 is already in use:

1. Change PORT in backend/.env
2. Change port in frontend/vite.config.ts
3. Update VITE_API_URL in frontend/.env

### Prisma Issues

If Prisma commands fail:

```bash
# Regenerate Prisma client
npm run prisma:generate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## Production Deployment

### Backend

1. Build the application:
```bash
npm run build
```

2. Set production environment variables
3. Run migrations:
```bash
npx prisma migrate deploy
```

4. Start server:
```bash
npm start
```

### Frontend

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

## Support

For issues or questions:
- Email: abhishekofficial0209@gmail.com
- GitHub Issues: https://github.com/abhishekb0209/maharashtra-engineering-colleges/issues
