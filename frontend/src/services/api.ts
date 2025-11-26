import axios from 'axios';
import type {
  College,
  SearchFilters,
  PaginatedResponse,
  RecommendationInput,
  RecommendationResult,
  Cutoff,
  ApiResponse,
} from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const collegeApi = {
  // Get all colleges with filters
  getColleges: async (filters: SearchFilters): Promise<PaginatedResponse<College>> => {
    const { data } = await api.get('/colleges', { params: filters });
    return data;
  },

  // Get single college by ID
  getCollege: async (id: string): Promise<College> => {
    const { data } = await api.get(`/colleges/${id}`);
    return data;
  },

  // Search colleges
  searchColleges: async (query: string): Promise<College[]> => {
    const { data } = await api.get('/colleges/search', { params: { q: query } });
    return data;
  },

  // Get college cutoffs
  getCollegeCutoffs: async (collegeId: string, filters?: any): Promise<Cutoff[]> => {
    const { data } = await api.get(`/colleges/${collegeId}/cutoffs`, { params: filters });
    return data;
  },
};

export const recommendationApi = {
  // Get personalized recommendations
  getRecommendations: async (input: RecommendationInput): Promise<RecommendationResult[]> => {
    const { data } = await api.post('/recommendations', input);
    return data;
  },

  // Predict cutoffs
  predictCutoffs: async (collegeId: string, courseId: string, year: number) => {
    const { data } = await api.post('/recommendations/predict', {
      collegeId,
      courseId,
      year,
    });
    return data;
  },
};

export const cutoffApi = {
  // Get cutoffs with filters
  getCutoffs: async (filters: any): Promise<Cutoff[]> => {
    const { data } = await api.get('/cutoffs', { params: filters });
    return data;
  },

  // Upload cutoff data (admin)
  uploadCutoffs: async (file: File): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/cutoffs/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};

export const adminApi = {
  // Create college
  createCollege: async (college: Partial<College>): Promise<College> => {
    const { data } = await api.post('/admin/colleges', college);
    return data;
  },

  // Update college
  updateCollege: async (id: string, college: Partial<College>): Promise<College> => {
    const { data } = await api.put(`/admin/colleges/${id}`, college);
    return data;
  },

  // Delete college
  deleteCollege: async (id: string): Promise<void> => {
    await api.delete(`/admin/colleges/${id}`);
  },

  // Upload colleges CSV
  uploadColleges: async (file: File): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/admin/colleges/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};

export const exportApi = {
  // Export colleges to PDF
  exportPDF: async (filters: SearchFilters): Promise<Blob> => {
    const { data } = await api.get('/export/pdf', {
      params: filters,
      responseType: 'blob',
    });
    return data;
  },

  // Export colleges to CSV
  exportCSV: async (filters: SearchFilters): Promise<Blob> => {
    const { data } = await api.get('/export/csv', {
      params: filters,
      responseType: 'blob',
    });
    return data;
  },
};

export default api;
