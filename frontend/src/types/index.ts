export interface College {
  id: string;
  name: string;
  code: string;
  type: 'Government' | 'Private' | 'Autonomous' | 'Aided';
  university: string;
  city: string;
  district: string;
  address: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  establishedYear: number;
  website?: string;
  email?: string;
  phone?: string;
  accreditation: Accreditation;
  facilities: string[];
  hostel: {
    boys: boolean;
    girls: boolean;
    capacity?: number;
  };
  placement: PlacementStats;
  fees: FeeStructure;
  courses: Course[];
  cutoffs: Cutoff[];
  images?: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Accreditation {
  naac?: {
    grade: 'A++' | 'A+' | 'A' | 'B++' | 'B+' | 'B' | 'C';
    score: number;
    validUntil: string;
  };
  nba?: {
    accredited: boolean;
    programs: string[];
    validUntil: string;
  };
  aicte: {
    approved: boolean;
    code: string;
  };
  autonomous: boolean;
}

export interface PlacementStats {
  year: number;
  totalStudents: number;
  studentsPlaced: number;
  placementPercentage: number;
  highestPackage: number;
  averagePackage: number;
  medianPackage: number;
  topRecruiters: string[];
}

export interface FeeStructure {
  tuitionFee: number;
  developmentFee?: number;
  otherFees?: number;
  totalAnnualFee: number;
  hostelFee?: number;
  category: 'Government' | 'Private' | 'Aided';
}

export interface Course {
  id: string;
  collegeId: string;
  branch: string;
  branchCode: string;
  degree: 'BE' | 'BTech' | 'ME' | 'MTech';
  duration: number;
  intake: number;
  affiliatedTo: string;
  accredited: boolean;
}

export interface Cutoff {
  id: string;
  collegeId: string;
  courseId: string;
  year: number;
  round: 1 | 2 | 3;
  examType: 'CET' | 'JEE';
  category: Category;
  openingRank?: number;
  closingRank?: number;
  openingPercentile?: number;
  closingPercentile?: number;
}

export type Category = 'OPEN' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'TFWS' | 'MI' | 'EBC' | 'NT1' | 'NT2' | 'NT3' | 'VJ';

export interface SearchFilters {
  query?: string;
  city?: string[];
  district?: string[];
  type?: string[];
  branch?: string[];
  university?: string[];
  minFees?: number;
  maxFees?: number;
  minPlacement?: number;
  naacGrade?: string[];
  nbaAccredited?: boolean;
  autonomous?: boolean;
  hostel?: 'boys' | 'girls' | 'both';
  sortBy?: 'name' | 'fees' | 'placement' | 'cutoff';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface RecommendationInput {
  examType: 'CET' | 'JEE';
  rank?: number;
  percentile?: number;
  category: Category;
  preferredBranches: string[];
  preferredCities?: string[];
  preferredDistricts?: string[];
  maxBudget?: number;
  hostelRequired?: boolean;
  minPlacementPercentage?: number;
  collegeType?: string[];
}

export interface RecommendationResult {
  college: College;
  course: Course;
  matchScore: number;
  admissionChance: 'Safe' | 'Likely' | 'Borderline' | 'Aspirational';
  chancePercentage: number;
  predictedCutoff: {
    openingRank: number;
    closingRank: number;
    confidence: number;
  };
  historicalCutoffs: Cutoff[];
  reasons: string[];
  warnings?: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  savedColleges: string[];
  preferences?: RecommendationInput;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
