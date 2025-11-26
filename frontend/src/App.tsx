import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import CollegesPage from './pages/CollegesPage';
import CollegeDetailPage from './pages/CollegeDetailPage';
import RecommendationPage from './pages/RecommendationPage';
import ComparePage from './pages/ComparePage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/colleges" element={<CollegesPage />} />
              <Route path="/colleges/:id" element={<CollegeDetailPage />} />
              <Route path="/recommendations" element={<RecommendationPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
