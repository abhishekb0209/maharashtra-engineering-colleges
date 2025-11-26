import { Link } from 'react-router-dom';
import { Search, Lightbulb, TrendingUp, Award, MapPin, DollarSign } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Perfect Engineering College in Maharashtra
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Comprehensive database of 500+ colleges with intelligent recommendations,
              cutoff predictions, and detailed insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/colleges"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Browse Colleges
              </Link>
              <Link
                to="/recommendations"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white"
              >
                Get Recommendations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
              <p className="text-gray-600">
                Filter by location, branch, fees, placement stats, and cutoffs
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-gray-600">
                AI-powered suggestions based on your rank, preferences, and budget
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cutoff Predictions</h3>
              <p className="text-gray-600">
                Historical data analysis with predicted cutoffs for current year
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Engineering Colleges</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Branches Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">3 Years</div>
              <div className="text-gray-600">Historical Cutoff Data</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">Verified Information</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Criteria */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Search by Multiple Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <MapPin className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-600">Find colleges in your preferred cities and districts</p>
            </div>
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Award className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Branch</h3>
              <p className="text-gray-600">Search by engineering specialization and courses</p>
            </div>
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <DollarSign className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Fees</h3>
              <p className="text-gray-600">Filter colleges within your budget range</p>
            </div>
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <TrendingUp className="h-8 w-8 text-orange-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Placements</h3>
              <p className="text-gray-600">Compare placement statistics and packages</p>
            </div>
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Award className="h-8 w-8 text-red-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Accreditation</h3>
              <p className="text-gray-600">Filter by NAAC grade and NBA accreditation</p>
            </div>
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Search className="h-8 w-8 text-indigo-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Cutoffs</h3>
              <p className="text-gray-600">View historical cutoffs and predictions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your College?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Get personalized recommendations based on your CET/JEE rank
          </p>
          <Link
            to="/recommendations"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
