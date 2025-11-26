# Maharashtra Engineering Colleges Portal 🎓

A comprehensive web application for engineering college admissions in Maharashtra with intelligent recommendation system, cutoff predictions, and detailed college information.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://www.postgresql.org/)

## 🚀 Quick Start

Get started in 10 minutes! See [QUICKSTART.md](QUICKSTART.md)

```bash
# Clone repository
git clone https://github.com/abhishekb0209/maharashtra-engineering-colleges.git
cd maharashtra-engineering-colleges

# Setup backend
cd backend && npm install && npm run prisma:migrate && npm run dev

# Setup frontend (new terminal)
cd frontend && npm install && npm run dev
```

Visit http://localhost:3000 🎉

## ✨ Key Features

### 🔍 Advanced Search & Filters
- Search 500+ engineering colleges across Maharashtra
- Filter by location, branch, fees, placement, accreditation
- Real-time search with instant results
- Sort by multiple criteria

### 🎯 Smart Recommendation Engine
- **AI-powered predictions** based on CET/JEE rank/percentile
- **Personalized suggestions** matching your preferences
- **Categorized results**: Safe, Likely, Borderline, Aspirational
- **Historical analysis** of 3 years cutoff data
- **Match scoring** algorithm (0-100)
- **Confidence levels** for predictions

### 📊 Comprehensive College Data
- Complete details: location, courses, fees, placement stats
- NAAC/NBA/AICTE accreditation information
- Facilities, hostel availability, contact info
- Historical cutoff trends and analysis

### 🔄 College Comparison
- Compare up to 4 colleges side-by-side
- Detailed metrics comparison
- Easy decision making

### 📈 Cutoff Predictions
- ML-based cutoff forecasting
- Trend analysis and visualization
- Category-wise predictions
- Confidence scoring

### 👨‍💼 Admin Panel
- Upload college data via CSV
- Import CET Cell cutoffs (CSV/PDF)
- Bulk operations support
- Data validation and error reporting

### 📥 Export Functionality
- PDF export for reports
- CSV export for data analysis
- Filtered data export

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing fast development
- **TailwindCSS** for styling
- **Shadcn/ui** for components
- **React Query** for data fetching
- **Zustand** for state management
- **Recharts** for visualizations

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Prisma ORM** for database
- **PostgreSQL** database
- **JWT** authentication
- **Multer** for file uploads

### DevOps
- **Docker** support
- **PM2** for process management
- **Nginx** for reverse proxy
- Deployment guides for Vercel, Railway, AWS, DigitalOcean

## 📁 Project Structure

```
maharashtra-engineering-colleges/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main app component
│   └── package.json
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── routes/          # API routes
│   │   │   ├── colleges.ts  # College endpoints
│   │   │   ├── recommendations.ts  # Recommendation engine
│   │   │   ├── cutoffs.ts   # Cutoff management
│   │   │   ├── admin.ts     # Admin operations
│   │   │   └── export.ts    # Export functionality
│   │   └── index.ts         # Entry point
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
├── database/                # Database scripts
│   └── sample-data.sql      # Sample data
├── docs/                    # Documentation
│   ├── QUICKSTART.md        # Quick start guide
│   ├── SETUP.md             # Detailed setup
│   ├── FEATURES.md          # Feature documentation
│   ├── API.md               # API reference
│   └── DEPLOYMENT.md        # Deployment guide
└── README.md                # This file
```

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get running in 10 minutes
- **[Setup Instructions](SETUP.md)** - Detailed installation guide
- **[Features Documentation](FEATURES.md)** - Complete feature overview
- **[API Reference](API.md)** - API endpoints and examples
- **[Deployment Guide](DEPLOYMENT.md)** - Production deployment

## 🎯 Use Cases

### For Students
- Find colleges matching your rank and preferences
- Compare colleges side-by-side
- Understand admission chances
- Plan your option form strategically
- Export personalized reports

### For Parents
- Research colleges thoroughly
- Compare fees and placement statistics
- Verify accreditation status
- Make informed decisions

### For Counselors
- Guide students effectively
- Access comprehensive data
- Generate comparison reports
- Track cutoff trends

### For Administrators
- Manage college database
- Update cutoff data
- Bulk data operations
- Monitor system usage

## 🔧 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

See [SETUP.md](SETUP.md) for detailed instructions.

## 🌐 API Endpoints

### Colleges
- `GET /api/colleges` - List colleges with filters
- `GET /api/colleges/:id` - Get college details
- `GET /api/colleges/search` - Search colleges

### Recommendations
- `POST /api/recommendations` - Get personalized recommendations

### Cutoffs
- `GET /api/cutoffs` - Get cutoffs with filters
- `POST /api/cutoffs/upload` - Upload cutoff data

### Admin
- `POST /api/admin/colleges` - Create/update colleges
- `POST /api/admin/colleges/upload` - Bulk upload

See [API.md](API.md) for complete API documentation.

## 🤖 Recommendation Algorithm

The smart recommendation engine uses a sophisticated multi-factor algorithm:

1. **Historical Analysis**: Analyzes 3 years of cutoff data
2. **Trend Prediction**: Linear regression with confidence scoring
3. **Admission Chance**: Categorizes as Safe/Likely/Borderline/Aspirational
4. **Match Scoring**: 100-point scale based on:
   - Branch preference (30 points)
   - Location match (20 points)
   - Budget compatibility (20 points)
   - Placement record (15 points)
   - Accreditation (15 points)

See [FEATURES.md](FEATURES.md) for detailed algorithm explanation.

## 📊 Database Schema

### Main Tables
- **colleges**: College information and statistics
- **courses**: Courses offered by colleges
- **cutoffs**: Historical cutoff data
- **users**: User accounts and preferences

See `backend/prisma/schema.prisma` for complete schema.

## 🚀 Deployment

### Quick Deploy Options

**Vercel (Frontend) + Railway (Backend)**
```bash
# Frontend
cd frontend && vercel

# Backend
# Push to GitHub and connect to Railway
```

**Docker**
```bash
docker-compose up -d
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guides.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abhishek B**
- Email: abhishekofficial0209@gmail.com
- GitHub: [@abhishekb0209](https://github.com/abhishekb0209)

## 🙏 Acknowledgments

- CET Cell, Maharashtra for cutoff data
- AICTE for college information
- NAAC/NBA for accreditation data
- All engineering colleges for providing information

## 📞 Support

- **Documentation**: Check the docs/ folder
- **Issues**: [GitHub Issues](https://github.com/abhishekb0209/maharashtra-engineering-colleges/issues)
- **Email**: abhishekofficial0209@gmail.com

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] College database with search and filters
- [x] Smart recommendation engine
- [x] Cutoff predictions
- [x] College comparison
- [x] Admin panel
- [x] Export functionality

### Phase 2 (Planned)
- [ ] User authentication and profiles
- [ ] Save favorite colleges
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] College reviews and ratings

### Phase 3 (Future)
- [ ] Virtual campus tours
- [ ] Scholarship information
- [ ] Admission process guidance
- [ ] Discussion forum
- [ ] Alumni network

## 📈 Stats

- **500+** Engineering Colleges
- **50+** Branches Available
- **3 Years** Historical Cutoff Data
- **100%** Verified Information

## 🌟 Star History

If you find this project helpful, please consider giving it a star ⭐

---

Made with ❤️ for engineering aspirants in Maharashtra
