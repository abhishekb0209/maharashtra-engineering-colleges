import { useState } from 'react';
import { adminApi, cutoffApi } from '@/services/api';
import { Upload, FileText, Database } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const [uploading, setUploading] = useState(false);

  const handleCollegeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await adminApi.uploadColleges(file);
      toast.success(result.message || 'Colleges uploaded successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleCutoffUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await cutoffApi.uploadCutoffs(file);
      toast.success(result.message || 'Cutoffs uploaded successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload Colleges */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Upload Colleges</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Upload college data in CSV format with all required fields
            </p>
            <label className="block">
              <input
                type="file"
                accept=".csv"
                onChange={handleCollegeUpload}
                disabled={uploading}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {uploading ? 'Uploading...' : 'Click to upload CSV file'}
                </p>
              </div>
            </label>
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium mb-2">Required CSV columns:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>name, code, type, city, district</li>
                <li>address, pincode, university</li>
                <li>establishedYear, fees, placement stats</li>
                <li>accreditation details</li>
              </ul>
            </div>
          </div>

          {/* Upload Cutoffs */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold">Upload Cutoffs</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Upload CET Cell cutoff data in CSV or PDF format
            </p>
            <label className="block">
              <input
                type="file"
                accept=".csv,.pdf"
                onChange={handleCutoffUpload}
                disabled={uploading}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {uploading ? 'Uploading...' : 'Click to upload CSV/PDF file'}
                </p>
              </div>
            </label>
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium mb-2">Required data:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>College code, course code</li>
                <li>Year, round, exam type</li>
                <li>Category, opening/closing ranks</li>
                <li>Percentile data (if available)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold mb-3">Data Upload Guidelines</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Ensure CSV files are properly formatted with headers</li>
            <li>• PDF files will be automatically parsed for cutoff data</li>
            <li>• Duplicate entries will be skipped or updated</li>
            <li>• Large files may take several minutes to process</li>
            <li>• Verify data accuracy before uploading</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
