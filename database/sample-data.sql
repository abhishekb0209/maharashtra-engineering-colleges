-- Sample colleges data for Maharashtra Engineering Colleges Portal
-- This is sample data for testing purposes

-- Insert sample colleges
INSERT INTO "College" (
  id, code, name, type, university, city, district, address, pincode,
  "establishedYear", website, email, phone, description,
  "tuitionFee", "totalAnnualFee", "feeCategory",
  "placementYear", "totalStudents", "studentsPlaced", "placementPercentage",
  "highestPackage", "averagePackage", "medianPackage",
  "naacGrade", "naacScore", "nbaAccredited", "autonomous",
  "boysHostel", "girlsHostel", facilities, "topRecruiters"
) VALUES
(
  'clx1', 'COEP', 'College of Engineering Pune', 'Government', 'Savitribai Phule Pune University',
  'Pune', 'Pune', 'Wellesley Road, Shivajinagar', '411005',
  1854, 'https://www.coep.org.in', 'info@coep.ac.in', '020-25507000',
  'One of the oldest and most prestigious engineering colleges in India',
  50000, 75000, 'Government',
  2024, 1200, 1080, 90.0,
  45.0, 12.5, 10.0,
  'A++', 3.65, true, true,
  true, true, ARRAY['Library', 'Labs', 'Sports Complex', 'Auditorium', 'Cafeteria'],
  ARRAY['TCS', 'Infosys', 'Microsoft', 'Google', 'Amazon']
),
(
  'clx2', 'VJTI', 'Veermata Jijabai Technological Institute', 'Government', 'Mumbai University',
  'Mumbai', 'Mumbai', 'Matunga', '400019',
  1887, 'https://www.vjti.ac.in', 'registrar@vjti.ac.in', '022-24198000',
  'Premier autonomous engineering institute in Mumbai',
  60000, 85000, 'Government',
  2024, 1500, 1350, 90.0,
  50.0, 13.0, 11.0,
  'A++', 3.70, true, true,
  true, true, ARRAY['Library', 'Labs', 'Sports', 'Hostel', 'Cafeteria'],
  ARRAY['Microsoft', 'Google', 'Amazon', 'Goldman Sachs', 'Morgan Stanley']
),
(
  'clx3', 'PICT', 'Pune Institute of Computer Technology', 'Private', 'Savitribai Phule Pune University',
  'Pune', 'Pune', 'Dhankawadi', '411043',
  1983, 'https://www.pict.edu', 'info@pict.edu', '020-24390000',
  'Leading private engineering college specializing in computer technology',
  150000, 180000, 'Private',
  2024, 800, 720, 90.0,
  42.0, 11.0, 9.5,
  'A+', 3.55, true, true,
  true, true, ARRAY['Library', 'Computer Labs', 'Sports', 'Cafeteria'],
  ARRAY['Infosys', 'TCS', 'Wipro', 'Cognizant', 'Accenture']
);

-- Insert sample courses
INSERT INTO "Course" (
  id, "collegeId", branch, "branchCode", degree, duration, intake, "affiliatedTo", accredited
) VALUES
('crs1', 'clx1', 'Computer Engineering', 'COMP', 'BE', 4, 120, 'SPPU', true),
('crs2', 'clx1', 'Information Technology', 'IT', 'BE', 4, 60, 'SPPU', true),
('crs3', 'clx1', 'Electronics and Telecommunication', 'ENTC', 'BE', 4, 120, 'SPPU', true),
('crs4', 'clx1', 'Mechanical Engineering', 'MECH', 'BE', 4, 180, 'SPPU', true),
('crs5', 'clx2', 'Computer Engineering', 'COMP', 'BTech', 4, 180, 'Mumbai University', true),
('crs6', 'clx2', 'Information Technology', 'IT', 'BTech', 4, 120, 'Mumbai University', true),
('crs7', 'clx3', 'Computer Engineering', 'COMP', 'BE', 4, 240, 'SPPU', true),
('crs8', 'clx3', 'Information Technology', 'IT', 'BE', 4, 180, 'SPPU', true);

-- Insert sample cutoffs
INSERT INTO "Cutoff" (
  id, "collegeId", "courseId", year, round, "examType", category,
  "openingRank", "closingRank", "openingPercentile", "closingPercentile"
) VALUES
-- COEP Computer Engineering
('cut1', 'clx1', 'crs1', 2024, 1, 'CET', 'OPEN', 50, 500, 99.95, 99.50),
('cut2', 'clx1', 'crs1', 2023, 1, 'CET', 'OPEN', 45, 480, 99.96, 99.52),
('cut3', 'clx1', 'crs1', 2022, 1, 'CET', 'OPEN', 40, 450, 99.97, 99.55),
('cut4', 'clx1', 'crs1', 2024, 1, 'CET', 'OBC', 800, 1200, 99.20, 98.80),
('cut5', 'clx1', 'crs1', 2024, 1, 'CET', 'SC', 2000, 3500, 97.50, 96.50),

-- VJTI Computer Engineering
('cut6', 'clx2', 'crs5', 2024, 1, 'CET', 'OPEN', 30, 400, 99.97, 99.60),
('cut7', 'clx2', 'crs5', 2023, 1, 'CET', 'OPEN', 25, 380, 99.98, 99.62),
('cut8', 'clx2', 'crs5', 2022, 1, 'CET', 'OPEN', 20, 350, 99.98, 99.65),

-- PICT Computer Engineering
('cut9', 'clx3', 'crs7', 2024, 1, 'CET', 'OPEN', 1000, 2500, 99.00, 97.50),
('cut10', 'clx3', 'crs7', 2023, 1, 'CET', 'OPEN', 950, 2400, 99.05, 97.60),
('cut11', 'clx3', 'crs7', 2022, 1, 'CET', 'OPEN', 900, 2300, 99.10, 97.70);

-- Note: This is sample data. In production, you would have:
-- - 500+ colleges
-- - Multiple courses per college
-- - 3 years of cutoff data for all rounds and categories
-- - Complete facility and placement information
