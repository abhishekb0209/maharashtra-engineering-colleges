import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import csvParser from 'csv-parser';
import fs from 'fs';

const router = Router();
const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' });

// Get cutoffs with filters
router.get('/', async (req, res) => {
  try {
    const { collegeId, courseId, year, examType, category, round } = req.query;

    const where: any = {};

    if (collegeId) where.collegeId = collegeId as string;
    if (courseId) where.courseId = courseId as string;
    if (year) where.year = parseInt(year as string);
    if (examType) where.examType = examType as string;
    if (category) where.category = category as string;
    if (round) where.round = parseInt(round as string);

    const cutoffs = await prisma.cutoff.findMany({
      where,
      include: {
        college: {
          select: {
            name: true,
            code: true,
            city: true,
          },
        },
        course: {
          select: {
            branch: true,
            branchCode: true,
          },
        },
      },
      orderBy: [{ year: 'desc' }, { round: 'asc' }],
    });

    res.json(cutoffs);
  } catch (error) {
    console.error('Error fetching cutoffs:', error);
    res.status(500).json({ error: 'Failed to fetch cutoffs' });
  }
});

// Upload cutoff data (CSV)
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const results: any[] = [];

    // Parse CSV
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          let imported = 0;
          let skipped = 0;

          for (const row of results) {
            try {
              // Find college by code
              const college = await prisma.college.findUnique({
                where: { code: row.collegeCode },
              });

              if (!college) {
                skipped++;
                continue;
              }

              // Find course by branch code
              const course = await prisma.course.findFirst({
                where: {
                  collegeId: college.id,
                  branchCode: row.branchCode,
                },
              });

              if (!course) {
                skipped++;
                continue;
              }

              // Create or update cutoff
              await prisma.cutoff.upsert({
                where: {
                  collegeId_courseId_year_round_examType_category: {
                    collegeId: college.id,
                    courseId: course.id,
                    year: parseInt(row.year),
                    round: parseInt(row.round),
                    examType: row.examType,
                    category: row.category,
                  },
                },
                update: {
                  openingRank: row.openingRank ? parseInt(row.openingRank) : null,
                  closingRank: row.closingRank ? parseInt(row.closingRank) : null,
                  openingPercentile: row.openingPercentile ? parseFloat(row.openingPercentile) : null,
                  closingPercentile: row.closingPercentile ? parseFloat(row.closingPercentile) : null,
                },
                create: {
                  collegeId: college.id,
                  courseId: course.id,
                  year: parseInt(row.year),
                  round: parseInt(row.round),
                  examType: row.examType,
                  category: row.category,
                  openingRank: row.openingRank ? parseInt(row.openingRank) : null,
                  closingRank: row.closingRank ? parseInt(row.closingRank) : null,
                  openingPercentile: row.openingPercentile ? parseFloat(row.openingPercentile) : null,
                  closingPercentile: row.closingPercentile ? parseFloat(row.closingPercentile) : null,
                },
              });

              imported++;
            } catch (error) {
              console.error('Error processing row:', error);
              skipped++;
            }
          }

          // Clean up uploaded file
          fs.unlinkSync(req.file!.path);

          res.json({
            success: true,
            message: `Imported ${imported} cutoffs, skipped ${skipped}`,
            imported,
            skipped,
          });
        } catch (error) {
          console.error('Error processing cutoffs:', error);
          res.status(500).json({ error: 'Failed to process cutoffs' });
        }
      });
  } catch (error) {
    console.error('Error uploading cutoffs:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;
