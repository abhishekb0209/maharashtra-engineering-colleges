import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import csvParser from 'csv-parser';
import fs from 'fs';

const router = Router();
const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' });

// Create college
router.post('/colleges', async (req, res) => {
  try {
    const college = await prisma.college.create({
      data: req.body,
    });

    res.json(college);
  } catch (error) {
    console.error('Error creating college:', error);
    res.status(500).json({ error: 'Failed to create college' });
  }
});

// Update college
router.put('/colleges/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const college = await prisma.college.update({
      where: { id },
      data: req.body,
    });

    res.json(college);
  } catch (error) {
    console.error('Error updating college:', error);
    res.status(500).json({ error: 'Failed to update college' });
  }
});

// Delete college
router.delete('/colleges/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.college.delete({
      where: { id },
    });

    res.json({ success: true, message: 'College deleted' });
  } catch (error) {
    console.error('Error deleting college:', error);
    res.status(500).json({ error: 'Failed to delete college' });
  }
});

// Upload colleges CSV
router.post('/colleges/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const results: any[] = [];

    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          let imported = 0;
          let skipped = 0;

          for (const row of results) {
            try {
              await prisma.college.upsert({
                where: { code: row.code },
                update: {
                  name: row.name,
                  type: row.type,
                  university: row.university,
                  city: row.city,
                  district: row.district,
                  address: row.address,
                  pincode: row.pincode,
                  establishedYear: parseInt(row.establishedYear),
                  website: row.website,
                  email: row.email,
                  phone: row.phone,
                  description: row.description,
                  tuitionFee: parseInt(row.tuitionFee),
                  totalAnnualFee: parseInt(row.totalAnnualFee),
                  feeCategory: row.feeCategory,
                  placementYear: parseInt(row.placementYear),
                  totalStudents: parseInt(row.totalStudents),
                  studentsPlaced: parseInt(row.studentsPlaced),
                  placementPercentage: parseFloat(row.placementPercentage),
                  highestPackage: parseFloat(row.highestPackage),
                  averagePackage: parseFloat(row.averagePackage),
                  medianPackage: parseFloat(row.medianPackage),
                  naacGrade: row.naacGrade,
                  naacScore: row.naacScore ? parseFloat(row.naacScore) : null,
                  nbaAccredited: row.nbaAccredited === 'true',
                  autonomous: row.autonomous === 'true',
                  boysHostel: row.boysHostel === 'true',
                  girlsHostel: row.girlsHostel === 'true',
                  facilities: row.facilities ? row.facilities.split(',') : [],
                  topRecruiters: row.topRecruiters ? row.topRecruiters.split(',') : [],
                },
                create: {
                  code: row.code,
                  name: row.name,
                  type: row.type,
                  university: row.university,
                  city: row.city,
                  district: row.district,
                  address: row.address,
                  pincode: row.pincode,
                  establishedYear: parseInt(row.establishedYear),
                  website: row.website,
                  email: row.email,
                  phone: row.phone,
                  description: row.description,
                  tuitionFee: parseInt(row.tuitionFee),
                  totalAnnualFee: parseInt(row.totalAnnualFee),
                  feeCategory: row.feeCategory,
                  placementYear: parseInt(row.placementYear),
                  totalStudents: parseInt(row.totalStudents),
                  studentsPlaced: parseInt(row.studentsPlaced),
                  placementPercentage: parseFloat(row.placementPercentage),
                  highestPackage: parseFloat(row.highestPackage),
                  averagePackage: parseFloat(row.averagePackage),
                  medianPackage: parseFloat(row.medianPackage),
                  naacGrade: row.naacGrade,
                  naacScore: row.naacScore ? parseFloat(row.naacScore) : null,
                  nbaAccredited: row.nbaAccredited === 'true',
                  autonomous: row.autonomous === 'true',
                  aicteApproved: true,
                  boysHostel: row.boysHostel === 'true',
                  girlsHostel: row.girlsHostel === 'true',
                  facilities: row.facilities ? row.facilities.split(',') : [],
                  topRecruiters: row.topRecruiters ? row.topRecruiters.split(',') : [],
                },
              });

              imported++;
            } catch (error) {
              console.error('Error processing row:', error);
              skipped++;
            }
          }

          fs.unlinkSync(req.file!.path);

          res.json({
            success: true,
            message: `Imported ${imported} colleges, skipped ${skipped}`,
            imported,
            skipped,
          });
        } catch (error) {
          console.error('Error processing colleges:', error);
          res.status(500).json({ error: 'Failed to process colleges' });
        }
      });
  } catch (error) {
    console.error('Error uploading colleges:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;
