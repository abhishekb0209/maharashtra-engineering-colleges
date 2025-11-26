import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { collegeApi } from '@/services/api';
import type { SearchFilters } from '@/types';
import { Search, Filter, MapPin, DollarSign, TrendingUp, Award, ChevronDown } from 'lucide-react';

const CollegesPage = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    page: 1,
    limit: 20,
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const [showFilters, setShowFilters] = useState(true);

  const { data, isLoading } = useQuery({
    queryKey: ['colleges', filters],
    queryFn: () => collegeApi.getColleges(filters),
  });

  const cities = ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Kolhapur', 'Thane'];
  const branches = ['Computer Engineering', 'IT', 'Electronics', 'Mechanical', 'Civil', 'Electrical'];
  const collegeTypes = ['Government', 'Private', 'Autonomous', 'Aided'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Browse Engineering Colleges</h1>
        <p className="text-gray-600">Explore 500+ engineering colleges in Maharashtra</p>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden`}>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h2>
              <button
                onClick={() => setFilters({ page: 1, limit: 20 })}
                className="text-sm text-blue-600 hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="College name..."
                  value={filters.query || ''}
                  onChange={(e) => setFilters({ ...filters, query: e.target.value, page: 1 })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* City */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">City</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {cities.map((city) => (
                  <label key={city} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.city?.includes(city)}
                      onChange={(e) => {
                        const current = filters.city || [];
                        setFilters({
                          ...filters,
                          city: e.target.checked
                            ? [...current, city]
                            : current.filter((c) => c !== city),
                          page: 1,
                        });
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{city}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* College Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">College Type</label>
              <div className="space-y-2">
                {collegeTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.type?.includes(type)}
                      onChange={(e) => {
                        const current = filters.type || [];
                        setFilters({
                          ...filters,
                          type: e.target.checked
                            ? [...current, type]
                            : current.filter((t) => t !== type),
                          page: 1,
                        });
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fees Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Annual Fees (₹)</label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minFees || ''}
                  onChange={(e) => setFilters({ ...filters, minFees: parseInt(e.target.value), page: 1 })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxFees || ''}
                  onChange={(e) => setFilters({ ...filters, maxFees: parseInt(e.target.value), page: 1 })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            {/* Placement */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Min Placement %</label>
              <input
                type="number"
                min="0"
                max="100"
                value={filters.minPlacement || ''}
                onChange={(e) => setFilters({ ...filters, minPlacement: parseInt(e.target.value), page: 1 })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            {/* Accreditation */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.nbaAccredited || false}
                  onChange={(e) => setFilters({ ...filters, nbaAccredited: e.target.checked, page: 1 })}
                  className="mr-2"
                />
                <span className="text-sm">NBA Accredited</span>
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={filters.autonomous || false}
                  onChange={(e) => setFilters({ ...filters, autonomous: e.target.checked, page: 1 })}
                  className="mr-2"
                />
                <span className="text-sm">Autonomous</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          {/* Sort and View Options */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>
              <div className="text-sm text-gray-600">
                {data?.total || 0} colleges found
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Sort by:</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="name">Name</option>
                <option value="fees">Fees</option>
                <option value="placement">Placement</option>
                <option value="cutoff">Cutoff</option>
              </select>
            </div>
          </div>

          {/* College Cards */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : data && data.data.length > 0 ? (
            <div className="space-y-4">
              {data.data.map((college) => (
                <Link
                  key={college.id}
                  to={`/colleges/${college.id}`}
                  className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{college.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{college.city}, {college.district}</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {college.type}
                        </span>
                        {college.accreditation.autonomous && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                            Autonomous
                          </span>
                        )}
                        {college.accreditation.naac && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                            NAAC {college.accreditation.naac.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                        <DollarSign className="h-4 w-4" />
                        <span>Annual Fees</span>
                      </div>
                      <div className="font-semibold">₹{college.fees.totalAnnualFee.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>Placement</span>
                      </div>
                      <div className="font-semibold">{college.placement.placementPercentage}%</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                        <Award className="h-4 w-4" />
                        <span>Avg Package</span>
                      </div>
                      <div className="font-semibold">₹{college.placement.averagePackage} LPA</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                        <Award className="h-4 w-4" />
                        <span>Branches</span>
                      </div>
                      <div className="font-semibold">{college.courses.length}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">No colleges found. Try adjusting your filters.</p>
            </div>
          )}

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <button
                disabled={filters.page === 1}
                onClick={() => setFilters({ ...filters, page: (filters.page || 1) - 1 })}
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {filters.page} of {data.totalPages}
              </span>
              <button
                disabled={filters.page === data.totalPages}
                onClick={() => setFilters({ ...filters, page: (filters.page || 1) + 1 })}
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegesPage;
