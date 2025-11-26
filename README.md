# Maharashtra Engineering Colleges Portal

A comprehensive web application for engineering college admissions in Maharashtra with intelligent recommendation system, cutoff predictions, and detailed college information.

## Features

### Core Features
- **Complete College Database**: 500+ engineering colleges with detailed information
- **Advanced Search & Filters**: Search by name, city, branch, fees, placement stats, cutoffs
- **Detailed College Pages**: Location, courses, fees, placement statistics, accreditation, facilities
- **CET Cell Cutoff Data**: Historical cutoffs for all rounds and categories

### Smart Recommendation Engine
- **Personalized Predictions**: Based on CET/JEE percentile/rank
- **Category-wise Analysis**: Open, OBC, SC, ST, EWS, TFWS categories
- **Intelligent Ranking**: Safe, Likely, Borderline, Aspirational colleges
- **Multi-criteria Matching**: Location preferences, branch choices, budget constraints
- **Predicted Cutoffs**: AI-powered cutoff predictions with explanations

### Admin Features
- **Data Management**: Upload college data via CSV
- **Cutoff Updates**: Import CET Cell cutoffs from PDF/CSV
- **Bulk Operations**: Efficient data management tools

### Export & Sharing
- **PDF Export**: Generate detailed reports
- **CSV Export**: Download filtered data
- **Shareable Links**: Save and share college lists

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **TailwindCSS** for styling
- **Shadcn/ui** for components
- **React Query** for data fetching
- **Zustand** for state management
- **React Router** for navigation
- **Recharts** for data visualization

### Backend
- **Node.js** with Express (or FastAPI with Python)
- **PostgreSQL** database
- **Prisma ORM** (or SQLAlchemy)
- **JWT** authentication
- **PDF parsing** libraries
- **CSV processing** utilities

### Database Schema
- Colleges, Courses, Branches
- Cutoffs (historical data)
- Placements, Accreditation
- User preferences and saved lists

## Project Structure

```
maharashtra-engineering-colleges/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom hooks
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript types
│   │   └── store/           # State management
│   └── public/
├── backend/                 # Node.js/FastAPI backend
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # Database models
│   │   ├── services/        # Services
│   │   ├── middleware/      # Middleware
│   │   └── utils/           # Utilities
│   └── prisma/              # Database schema
├── database/                # Database scripts
│   ├── migrations/
│   └── seeds/
└── docs/                    # Documentation

```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/abhishekb0209/maharashtra-engineering-colleges.git
cd maharashtra-engineering-colleges
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
npm install
```

4. Setup database
```bash
# Create PostgreSQL database
createdb mh_engineering_colleges

# Run migrations
npx prisma migrate dev
```

5. Configure environment variables
```bash
# Backend .env
DATABASE_URL="postgresql://user:password@localhost:5432/mh_engineering_colleges"
JWT_SECRET="your-secret-key"
PORT=5000

# Frontend .env
VITE_API_URL="http://localhost:5000/api"
```

6. Start development servers
```bash
# Backend
cd backend
npm run dev

# Frontend (new terminal)
cd frontend
npm run dev
```

## API Endpoints

### Colleges
- `GET /api/colleges` - List all colleges with filters
- `GET /api/colleges/:id` - Get college details
- `POST /api/colleges` - Create college (admin)
- `PUT /api/colleges/:id` - Update college (admin)

### Cutoffs
- `GET /api/cutoffs` - Get cutoffs with filters
- `POST /api/cutoffs/upload` - Upload cutoff data (admin)

### Recommendations
- `POST /api/recommendations` - Get personalized recommendations
- `POST /api/recommendations/predict` - Predict admission chances

### Search
- `GET /api/search` - Advanced search with filters

## Features in Detail

### Search & Filters
- Text search across college names, locations, courses
- Filter by city, district, university affiliation
- Filter by branch/specialization
- Fee range slider
- Placement percentage filter
- Cutoff range filter
- Accreditation status (NAAC, NBA)
- College type (Government, Private, Autonomous)

### Recommendation Algorithm
1. **Input Processing**: Parse user's rank/percentile, category, preferences
2. **Historical Analysis**: Analyze past 3 years cutoff trends
3. **Prediction Model**: ML-based cutoff prediction for current year
4. **Matching**: Match user profile with colleges
5. **Categorization**: Classify as Safe/Likely/Borderline/Aspirational
6. **Ranking**: Sort by probability, preference match, placement stats

### Data Sources
- CET Cell official cutoff data
- College websites and brochures
- AICTE database
- NAAC/NBA accreditation data
- Placement reports

## Contributing
Contributions are welcome! Please read our contributing guidelines.

## License
MIT License

## Contact
For queries: abhishekofficial0209@gmail.com

## Acknowledgments
- CET Cell, Maharashtra
- AICTE
- All engineering colleges for data
