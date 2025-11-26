import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { collegeApi } from '@/services/api';
import type { College } from '@/types';
import { Search, X, GitCompare } from 'lucide-react';

const ComparePage = () => {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: searchResults } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => collegeApi.searchColleges(searchQuery),
    enabled: searchQuery.length > 2,
  });

  const addCollege = (college: College) => {
    if (selectedColleges.length < 4 && !selectedColleges.find(c => c.id === college.id)) {
      setSelectedColleges([...selectedColleges, college]);
      setSearchQuery('');
    }
  };

  const removeCollege = (id: string) => {
    setSelectedColleges(selectedColleges.filter(c => c.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Compare Colleges</h1>
          <p className="text-gray-600">Compare up to 4 colleges side by side</p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search colleges to compare..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {searchResults && searchResults.length > 0 && (
            <div className="mt-4 border rounded-lg max-h-60 overflow-y-auto">
              {searchResults.map((college) => (
                <button
                  key={college.id}
                  onClick={() => addCollege(college)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                  disabled={selectedColleges.length >= 4}
                >
                  <div className="font-semibold">{college.name}</div>
                  <div className="text-sm text-gray-600">{college.city}, {college.district}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Colleges */}
        {selectedColleges.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <GitCompare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Search and select colleges to compare</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-semibold bg-gray-50">Criteria</th>
                  {selectedColleges.map((college) => (
                    <th key={college.id} className="p-4 text-left min-w-64">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{college.name}</div>
                          <div className="text-sm text-gray-600 font-normal">{college.city}</div>
                        </div>
                        <button
                          onClick={() => removeCollege(college.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium bg-gray-50">Type</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4">{college.type}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium bg-gray-50">Established</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4">{college.establishedYear}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium bg-gray-50">Annual Fees</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4">₹{college.fees.totalAnnualFee.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium bg-gray-50">Placement %</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4">{college.placement.placementPercentage}%</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium bg-gray-50">Highest Package</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4">₹{college.placement.highestPackage} LPA</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium bg-gray-50">Average Package</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4">₹{college.placement.averagePackage} LPA</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium bg-gray-50">NAAC Grade</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4">
                      {college.accreditation.naac ? `${college.accreditation.naac.grade} (${college.accreditation.naac.score})` : 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium bg-gray-50">NBA Accredited</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4">
                      {college.accreditation.nba?.accredited ? 'Yes' : 'No'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium bg-gray-50">Autonomous</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4">
                      {college.accreditation.autonomous ? 'Yes' : 'No'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium bg-gray-50">Branches</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4">{college.courses.length}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium bg-gray-50">Boys Hostel</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4">{college.hostel.boys ? 'Yes' : 'No'}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium bg-gray-50">Girls Hostel</td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="p-4">{college.hostel.girls ? 'Yes' : 'No'}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;
