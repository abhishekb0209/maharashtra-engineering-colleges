# API Documentation

Base URL: `http://localhost:5000/api` (development) or `https://your-domain.com/api` (production)

## Authentication

Currently, the API is open for read operations. Admin operations require authentication (to be implemented).

## Response Format

All responses follow this structure:

**Success Response:**
```json
{
  "data": [...],
  "total": 100,
  "page": 1,
  "limit": 20,
  "totalPages": 5
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## Endpoints

### Colleges

#### Get All Colleges

```http
GET /api/colleges
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| query | string | Search query for college name, city, or code |
| city | string[] | Filter by cities |
| district | string[] | Filter by districts |
| type | string[] | Filter by college type (Government, Private, etc.) |
| branch | string[] | Filter by available branches |
| university | string[] | Filter by university affiliation |
| minFees | number | Minimum annual fees |
| maxFees | number | Maximum annual fees |
| minPlacement | number | Minimum placement percentage |
| naacGrade | string[] | Filter by NAAC grades |
| nbaAccredited | boolean | Filter NBA accredited colleges |
| autonomous | boolean | Filter autonomous colleges |
| hostel | string | Filter by hostel (boys, girls, both) |
| sortBy | string | Sort field (name, fees, placement, cutoff) |
| sortOrder | string | Sort order (asc, desc) |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 20) |

**Example Request:**
```bash
curl "http://localhost:5000/api/colleges?city=Pune&minPlacement=80&page=1&limit=10"
```

**Example Response:**
```json
{
  "data": [
    {
      "id": "clx1",
      "name": "College of Engineering Pune",
      "code": "COEP",
      "type": "Government",
      "university": "Savitribai Phule Pune University",
      "city": "Pune",
      "district": "Pune",
      "address": "Wellesley Road, Shivajinagar",
      "pincode": "411005",
      "establishedYear": 1854,
      "website": "https://www.coep.org.in",
      "email": "info@coep.ac.in",
      "phone": "020-25507000",
      "accreditation": {
        "naac": {
          "grade": "A++",
          "score": 3.65,
          "validUntil": "2025-12-31"
        },
        "nba": {
          "accredited": true,
          "programs": ["Computer", "IT", "Mechanical"],
          "validUntil": "2026-06-30"
        },
        "aicte": {
          "approved": true,
          "code": "AICTE123"
        },
        "autonomous": true
      },
      "facilities": ["Library", "Labs", "Sports Complex"],
      "hostel": {
        "boys": true,
        "girls": true,
        "capacity": 500
      },
      "fees": {
        "tuitionFee": 50000,
        "developmentFee": 15000,
        "otherFees": 10000,
        "totalAnnualFee": 75000,
        "hostelFee": 40000,
        "category": "Government"
      },
      "placement": {
        "year": 2024,
        "totalStudents": 1200,
        "studentsPlaced": 1080,
        "placementPercentage": 90.0,
        "highestPackage": 45.0,
        "averagePackage": 12.5,
        "medianPackage": 10.0,
        "topRecruiters": ["TCS", "Infosys", "Microsoft"]
      },
      "courses": [...],
      "cutoffs": [...]
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 10,
  "totalPages": 15
}
```

#### Get Single College

```http
GET /api/colleges/:id
```

**Path Parameters:**
- `id` (string): College ID

**Example Request:**
```bash
curl "http://localhost:5000/api/colleges/clx1"
```

**Response:** Same structure as single college object above

#### Search Colleges

```http
GET /api/colleges/search?q=query
```

**Query Parameters:**
- `q` (string): Search query (minimum 2 characters)

**Example Request:**
```bash
curl "http://localhost:5000/api/colleges/search?q=pune"
```

**Example Response:**
```json
[
  {
    "id": "clx1",
    "name": "College of Engineering Pune",
    "code": "COEP",
    "city": "Pune",
    "district": "Pune",
    "type": "Government"
  }
]
```

### Recommendations

#### Get Personalized Recommendations

```http
POST /api/recommendations
```

**Request Body:**
```json
{
  "examType": "CET",
  "rank": 5000,
  "percentile": 98.5,
  "category": "OPEN",
  "preferredBranches": ["Computer Engineering", "Information Technology"],
  "preferredCities": ["Pune", "Mumbai"],
  "preferredDistricts": ["Pune", "Mumbai"],
  "maxBudget": 200000,
  "hostelRequired": true,
  "minPlacementPercentage": 70,
  "collegeType": ["Government", "Autonomous"]
}
```

**Required Fields:**
- `examType`: "CET" or "JEE"
- `rank` OR `percentile`: At least one required
- `category`: Category code
- `preferredBranches`: Array of branch names

**Example Request:**
```bash
curl -X POST "http://localhost:5000/api/recommendations" \
  -H "Content-Type: application/json" \
  -d '{
    "examType": "CET",
    "rank": 5000,
    "category": "OPEN",
    "preferredBranches": ["Computer Engineering"]
  }'
```

**Example Response:**
```json
[
  {
    "college": {...},
    "course": {
      "id": "crs1",
      "branch": "Computer Engineering",
      "branchCode": "COMP",
      "degree": "BE",
      "duration": 4,
      "intake": 120
    },
    "matchScore": 85,
    "admissionChance": "Safe",
    "chancePercentage": 95,
    "predictedCutoff": {
      "openingRank": 3000,
      "closingRank": 6000,
      "confidence": 85
    },
    "historicalCutoffs": [...],
    "reasons": [
      "Your rank is well within the cutoff range",
      "Strong placement record (90%)",
      "Excellent NAAC A++ accreditation"
    ],
    "warnings": []
  }
]
```

### Cutoffs

#### Get Cutoffs

```http
GET /api/cutoffs
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| collegeId | string | Filter by college ID |
| courseId | string | Filter by course ID |
| year | number | Filter by year |
| examType | string | Filter by exam type (CET, JEE) |
| category | string | Filter by category |
| round | number | Filter by round (1, 2, 3) |

**Example Request:**
```bash
curl "http://localhost:5000/api/cutoffs?collegeId=clx1&year=2024&examType=CET"
```

**Example Response:**
```json
[
  {
    "id": "cut1",
    "collegeId": "clx1",
    "courseId": "crs1",
    "year": 2024,
    "round": 1,
    "examType": "CET",
    "category": "OPEN",
    "openingRank": 50,
    "closingRank": 500,
    "openingPercentile": 99.95,
    "closingPercentile": 99.50,
    "college": {
      "name": "College of Engineering Pune",
      "code": "COEP",
      "city": "Pune"
    },
    "course": {
      "branch": "Computer Engineering",
      "branchCode": "COMP"
    }
  }
]
```

#### Upload Cutoffs (Admin)

```http
POST /api/cutoffs/upload
```

**Request:** Multipart form data with CSV file

**CSV Format:**
```csv
collegeCode,branchCode,year,round,examType,category,openingRank,closingRank,openingPercentile,closingPercentile
COEP,COMP,2024,1,CET,OPEN,50,500,99.95,99.50
```

**Example Request:**
```bash
curl -X POST "http://localhost:5000/api/cutoffs/upload" \
  -F "file=@cutoffs.csv"
```

**Example Response:**
```json
{
  "success": true,
  "message": "Imported 150 cutoffs, skipped 5",
  "imported": 150,
  "skipped": 5
}
```

### Admin

#### Create College

```http
POST /api/admin/colleges
```

**Request Body:** College object (see college structure above)

#### Update College

```http
PUT /api/admin/colleges/:id
```

**Request Body:** Partial college object with fields to update

#### Delete College

```http
DELETE /api/admin/colleges/:id
```

#### Upload Colleges CSV

```http
POST /api/admin/colleges/upload
```

**Request:** Multipart form data with CSV file

**CSV Format:**
```csv
code,name,type,city,district,university,address,pincode,establishedYear,website,email,phone,description,tuitionFee,totalAnnualFee,feeCategory,placementYear,totalStudents,studentsPlaced,placementPercentage,highestPackage,averagePackage,medianPackage,naacGrade,naacScore,nbaAccredited,autonomous,boysHostel,girlsHostel,facilities,topRecruiters
```

### Export

#### Export to CSV

```http
GET /api/export/csv
```

**Query Parameters:** Same as GET /api/colleges

**Response:** CSV file download

#### Export to PDF

```http
GET /api/export/pdf
```

**Query Parameters:** Same as GET /api/colleges

**Response:** PDF file download

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

## Rate Limiting

Currently no rate limiting. Will be implemented in production:
- 100 requests per minute per IP
- 1000 requests per hour per IP

## Pagination

All list endpoints support pagination:
- Default: 20 items per page
- Maximum: 100 items per page
- Use `page` and `limit` parameters

## Filtering

Multiple values for array parameters:
```
?city=Pune&city=Mumbai&city=Nagpur
```

## Sorting

```
?sortBy=fees&sortOrder=asc
```

Available sort fields:
- name
- fees (totalAnnualFee)
- placement (placementPercentage)
- cutoff (predicted closing rank)

## Examples

### Find affordable colleges in Pune with good placements

```bash
curl "http://localhost:5000/api/colleges?city=Pune&maxFees=150000&minPlacement=75&sortBy=placement&sortOrder=desc"
```

### Get recommendations for CET rank 10000

```bash
curl -X POST "http://localhost:5000/api/recommendations" \
  -H "Content-Type: application/json" \
  -d '{
    "examType": "CET",
    "rank": 10000,
    "category": "OPEN",
    "preferredBranches": ["Computer Engineering", "IT"],
    "maxBudget": 200000
  }'
```

### Search for autonomous colleges

```bash
curl "http://localhost:5000/api/colleges?autonomous=true&sortBy=placement&sortOrder=desc"
```

## Webhooks (Future)

Planned webhook support for:
- New cutoff data published
- College information updated
- Admission notifications

## SDK (Future)

Official SDKs planned for:
- JavaScript/TypeScript
- Python
- Java

## Support

For API issues or questions:
- GitHub Issues: https://github.com/abhishekb0209/maharashtra-engineering-colleges/issues
- Email: abhishekofficial0209@gmail.com
