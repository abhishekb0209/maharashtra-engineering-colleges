import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { collegeApi } from '@/services/api';
import { MapPin, Phone, Mail, Globe, Award, TrendingUp, DollarSign, Users, Building } from 'lucide-react';

const CollegeDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: college, isLoading } = useQuery({
    queryKey: ['college', id],
    queryFn: () => collegeApi.getCollege(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">College Not Found</h1>
          <p className="text-gray-600">The college you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h1 className="text-3xl font-bold mb-4">{college.name}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>{college.address}, {college.city}, {college.district} - {college.pincode}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {college.type}
          </span>
          {college.accreditation.autonomous && (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Autonomous
            </span>
          )}
          {college.accreditation.naac && (
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              NAAC {college.accreditation.naac.grade} ({college.accreditation.naac.score})
            </span>
          )}
          {college.accreditation.nba?.accredited && (
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
              NBA Accredited
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-gray-600 mb-4">{college.description || 'No description available.'}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Established</div>
                <div className="font-semibold">{college.establishedYear}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">University</div>
                <div className="font-semibold">{college.university}</div>
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Courses Offered</h2>
            <div className="space-y-3">
              {college.courses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{course.branch}</h3>
                      <p className="text-sm text-gray-600">{course.degree} • {course.duration} years</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Intake</div>
                      <div className="font-semibold">{course.intake}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Placement Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Placement Statistics ({college.placement.year})</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600">Placement Rate</div>
                <div className="text-2xl font-bold text-green-600">{college.placement.placementPercentage}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Highest Package</div>
                <div className="text-2xl font-bold">₹{college.placement.highestPackage} LPA</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Average Package</div>
                <div className="text-2xl font-bold">₹{college.placement.averagePackage} LPA</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Median Package</div>
                <div className="text-2xl font-bold">₹{college.placement.medianPackage} LPA</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Students Placed</div>
                <div className="text-2xl font-bold">{college.placement.studentsPlaced}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Students</div>
                <div className="text-2xl font-bold">{college.placement.totalStudents}</div>
              </div>
            </div>
            {college.placement.topRecruiters.length > 0 && (
              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-2">Top Recruiters</div>
                <div className="flex flex-wrap gap-2">
                  {college.placement.topRecruiters.map((recruiter, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {recruiter}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Facilities */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Facilities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {college.facilities.map((facility, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">{facility}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Boys Hostel</div>
                <div className="font-semibold">{college.hostel.boys ? 'Available' : 'Not Available'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Girls Hostel</div>
                <div className="font-semibold">{college.hostel.girls ? 'Available' : 'Not Available'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Quick Info</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-600">Annual Fees</div>
                  <div className="font-semibold">₹{college.fees.totalAnnualFee.toLocaleString()}</div>
                </div>
              </div>
              {college.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600">Phone</div>
                    <div className="font-semibold">{college.phone}</div>
                  </div>
                </div>
              )}
              {college.email && (
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-semibold break-all">{college.email}</div>
                  </div>
                </div>
              )}
              {college.website && (
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600">Website</div>
                    <a href={college.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline break-all">
                      Visit Website
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Fee Structure */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Fee Structure</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Tuition Fee</span>
                <span className="font-semibold">₹{college.fees.tuitionFee.toLocaleString()}</span>
              </div>
              {college.fees.developmentFee && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Development Fee</span>
                  <span className="font-semibold">₹{college.fees.developmentFee.toLocaleString()}</span>
                </div>
              )}
              {college.fees.otherFees && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Other Fees</span>
                  <span className="font-semibold">₹{college.fees.otherFees.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total Annual Fee</span>
                <span>₹{college.fees.totalAnnualFee.toLocaleString()}</span>
              </div>
              {college.fees.hostelFee && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Hostel Fee (Optional)</span>
                  <span>₹{college.fees.hostelFee.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetailPage;
