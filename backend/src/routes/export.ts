import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Export to CSV
router.get('/csv', async (req, res) => {
  try {
    const colleges = await prisma.college.findMany({
      include: {
        courses: true,
      },
    });

    // Generate CSV
    const headers = [
      'Name',
      'Code',
      'Type',
      'City',
      'District',
      'University',
      'Established',
      'Annual Fees',
      'Placement %',
      'Avg Package',
      'NAAC Grade',
      'NBA Accredited',
      'Autonomous',
    ];

    const rows = colleges.map((college) => [
      college.name,
      college.code,
      college.type,
      college.city,
      college.district,
      college.university,
      college.establishedYear,
      college.totalAnnualFee,
      college.placementPercentage,
      college.averagePackage,
      college.naacGrade || 'N/A',
      college.nbaAccredited ? 'Yes' : 'No',
      college.autonomous ? 'Yes' : 'No',
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=colleges.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    res.status(500).json({ error: 'Export failed' });
  }
});

// Export to PDF (placeholder - requires PDF library)
router.get('/pdf', async (req, res) => {
  try {
    // This would use a library like pdfkit or puppeteer
    // For now, return a message
    res.json({
      message: 'PDF export functionality to be implemented with pdfkit or puppeteer',
    });
  } catch (error) {
    console.error('Error exporting PDF:', error);
    res.status(500).json({ error: 'Export failed' });
  }
});

export default router;
