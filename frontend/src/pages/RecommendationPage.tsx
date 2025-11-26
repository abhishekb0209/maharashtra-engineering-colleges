import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { recommendationApi } from '@/services/api';
import type { RecommendationInput, RecommendationResult } from '@/types';
import { Lightbulb, Download, TrendingUp, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const RecommendationPage = () => {
  const [formData, setFormData] = useState<RecommendationInput>({
    examType: 'CET',
    category: 'OPEN',
    preferredBranches: [],
    preferredCities: [],
  });

  const [showResults, setShowResults] = useState(false);

  const { data: recommendations, isLoading, refetch } = useQuery({
    queryKey: ['recommendations', formData],
    queryFn: () => recommendationApi.getRecommendations(formData),
    enabled: showResults,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.rank && !formData.percentile) {
      toast.error('Please enter either rank or percentile');
      return;
    }

    if (formData.preferredBranches.length === 0) {
      toast.error('Please select at least one branch');
      return;
    }

    setShowResults(true);
    refetch();
  };

  const branches = [
    'Computer Engineering',
    'Information Technology',
    'Electronics and Telecommunication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Electronics Engineering',
    'Artificial Intelligence and Data Science',
    'Computer Science and Engineering',
    'Instrumentation Engineering',
  ];

  const cities = [
    'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad',
    'Kolhapur', 'Thane', 'Navi Mumbai', 'Solapur', 'Amravati',
  ];

  const categories = ['OPEN', 'OBC', 'SC', 'ST', 'EWS', 'TFWS', 'MI', 'EBC', 'NT1', 'NT2', 'NT3', 'VJ'];

  const getChanceColor = (chance: string) => {
    switch (chance) {
      case 'Safe': return 'bg-green-100 text-green-800 border-green-300';
      case 'Likely': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Borderline': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Aspirational': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Smart College Recommendations</h1>
          <p className="text-gray-600 text-lg">
            Get personalized college suggestions based on your rank, preferences, and budget
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Exam Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Exam Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="CET"
                    checked={formData.examType === 'CET'}
                    onChange={(e) => setFormData({ ...formData, examType: e.target.value as 'CET' | 'JEE' })}
                    className="mr-2"
                  />
                  MHT-CET
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="JEE"
                    checked={formData.examType === 'JEE'}
                    onChange={(e) => setFormData({ ...formData, examType: e.target.value as 'CET' | 'JEE' })}
                    className="mr-2"
                  />
                  JEE Main
                </label>
              </div>
            </div>

            {/* Rank/Percentile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rank</label>
                <input
                  type="number"
                  value={formData.rank || ''}
                  onChange={(e) => setFormData({ ...formData, rank: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your rank"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Percentile</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.percentile || ''}
                  onChange={(e) => setFormData({ ...formData, percentile: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your percentile"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Preferred Branches */}
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Branches (Select multiple)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-lg p-4">
                {branches.map((branch) => (
                  <label key={branch} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.preferredBranches.includes(branch)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            preferredBranches: [...formData.preferredBranches, branch],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            preferredBranches: formData.preferredBranches.filter((b) => b !== branch),
                          });
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{branch}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred Cities */}
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Cities (Optional)</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {cities.map((city) => (
                  <label key={city} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.preferredCities?.includes(city)}
                      onChange={(e) => {
                        const current = formData.preferredCities || [];
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            preferredCities: [...current, city],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            preferredCities: current.filter((c) => c !== city),
                          });
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{city}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium mb-2">Maximum Budget (Annual Fees)</label>
              <input
                type="number"
                value={formData.maxBudget || ''}
                onChange={(e) => setFormData({ ...formData, maxBudget: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter maximum budget in ₹"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Lightbulb className="h-5 w-5" />
              Get Recommendations
            </button>
          </form>
        </div>

        {/* Results */}
        {showResults && (
          <div>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Analyzing colleges and generating recommendations...</p>
              </div>
            ) : recommendations && recommendations.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Your Personalized Recommendations</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Download className="h-4 w-4" />
                    Export PDF
                  </button>
                </div>

                {/* Group by admission chance */}
                {['Safe', 'Likely', 'Borderline', 'Aspirational'].map((chanceType) => {
                  const filtered = recommendations.filter((r) => r.admissionChance === chanceType);
                  if (filtered.length === 0) return null;

                  return (
                    <div key={chanceType} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${getChanceColor(chanceType)}`}>
                          {chanceType} ({filtered.length})
                        </span>
                      </h3>
                      <div className="space-y-4">
                        {filtered.map((rec, idx) => (
                          <div key={idx} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="text-lg font-semibold">{rec.college.name}</h4>
                                <p className="text-gray-600">{rec.course.branch}</p>
                                <p className="text-sm text-gray-500">{rec.college.city}, {rec.college.district}</p>
                              </div>
                              <div className="text-right">
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getChanceColor(rec.admissionChance)}`}>
                                  {rec.chancePercentage}% Chance
                                </div>
                                <div className="text-sm text-gray-600 mt-1">Match: {rec.matchScore}%</div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <div className="text-sm text-gray-600">Annual Fees</div>
                                <div className="font-semibold">₹{rec.college.fees.totalAnnualFee.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Placement</div>
                                <div className="font-semibold">{rec.college.placement.placementPercentage}%</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Avg Package</div>
                                <div className="font-semibold">₹{rec.college.placement.averagePackage} LPA</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Predicted Cutoff</div>
                                <div className="font-semibold">{rec.predictedCutoff.closingRank}</div>
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="text-sm font-medium mb-2">Why this college?</div>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {rec.reasons.map((reason, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>{reason}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {rec.warnings && rec.warnings.length > 0 && (
                              <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                                <div className="flex items-start gap-2">
                                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                  <div className="text-sm text-yellow-800">
                                    {rec.warnings.join(', ')}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No recommendations found. Try adjusting your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPage;
