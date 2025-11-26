import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all colleges with filters
router.get('/', async (req, res) => {
  try {
    const {
      query,
      city,
      district,
      type,
      branch,
      university,
      minFees,
      maxFees,
      minPlacement,
      naacGrade,
      nbaAccredited,
      autonomous,
      hostel,
      sortBy = 'name',
      sortOrder = 'asc',
      page = '1',
      limit = '20',
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};

    if (query) {
      where.OR = [
        { name: { contains: query as string, mode: 'insensitive' } },
        { city: { contains: query as string, mode: 'insensitive' } },
        { district: { contains: query as string, mode: 'insensitive' } },
      ];
    }

    if (city) {
      const cities = Array.isArray(city) ? city : [city];
      where.city = { in: cities };
    }

    if (district) {
      const districts = Array.isArray(district) ? district : [district];
      where.district = { in: districts };
    }

    if (type) {
      const types = Array.isArray(type) ? type : [type];
      where.type = { in: types };
    }

    if (university) {
      const universities = Array.isArray(university) ? university : [university];
      where.university = { in: universities };
    }

    if (minFees || maxFees) {
      where.totalAnnualFee = {};
      if (minFees) where.totalAnnualFee.gte = parseInt(minFees as string);
      if (maxFees) where.totalAnnualFee.lte = parseInt(maxFees as string);
    }

    if (minPlacement) {
      where.placementPercentage = { gte: parseFloat(minPlacement as string) };
    }

    if (naacGrade) {
      const grades = Array.isArray(naacGrade) ? naacGrade : [naacGrade];
      where.naacGrade = { in: grades };
    }

    if (nbaAccredited === 'true') {
      where.nbaAccredited = true;
    }

    if (autonomous === 'true') {
      where.autonomous = true;
    }

    if (hostel === 'boys') {
      where.boysHostel = true;
    } else if (hostel === 'girls') {
      where.girlsHostel = true;
    } else if (hostel === 'both') {
      where.AND = [{ boysHostel: true }, { girlsHostel: true }];
    }

    // Build orderBy
    const orderBy: any = {};
    if (sortBy === 'name') orderBy.name = sortOrder;
    else if (sortBy === 'fees') orderBy.totalAnnualFee = sortOrder;
    else if (sortBy === 'placement') orderBy.placementPercentage = sortOrder;

    // Get total count
    const total = await prisma.college.count({ where });

    // Get colleges
    const colleges = await prisma.college.findMany({
      where,
      include: {
        courses: true,
        cutoffs: {
          orderBy: { year: 'desc' },
          take: 10,
        },
      },
      orderBy,
      skip,
      take: limitNum,
    });

    // Transform data
    const transformedColleges = colleges.map((college) => ({
      id: college.id,
      name: college.name,
      code: college.code,
      type: college.type,
      university: college.university,
      city: college.city,
      district: college.district,
      address: college.address,
      pincode: college.pincode,
      latitude: college.latitude,
      longitude: college.longitude,
      establishedYear: college.establishedYear,
      website: college.website,
      email: college.email,
      phone: college.phone,
      description: college.description,
      accreditation: {
        naac: college.naacGrade ? {
          grade: college.naacGrade,
          score: college.naacScore,
          validUntil: college.naacValidUntil,
        } : undefined,
        nba: {
          accredited: college.nbaAccredited,
          programs: college.nbaPrograms,
          validUntil: college.nbaValidUntil,
        },
        aicte: {
          approved: college.aicteApproved,
          code: college.aicteCode,
        },
        autonomous: college.autonomous,
      },
      facilities: college.facilities,
      hostel: {
        boys: college.boysHostel,
        girls: college.girlsHostel,
        capacity: college.hostelCapacity,
      },
      fees: {
        tuitionFee: college.tuitionFee,
        developmentFee: college.developmentFee,
        otherFees: college.otherFees,
        totalAnnualFee: college.totalAnnualFee,
        hostelFee: college.hostelFee,
        category: college.feeCategory,
      },
      placement: {
        year: college.placementYear,
        totalStudents: college.totalStudents,
        studentsPlaced: college.studentsPlaced,
        placementPercentage: college.placementPercentage,
        highestPackage: college.highestPackage,
        averagePackage: college.averagePackage,
        medianPackage: college.medianPackage,
        topRecruiters: college.topRecruiters,
      },
      courses: college.courses,
      cutoffs: college.cutoffs,
      images: college.images,
      createdAt: college.createdAt,
      updatedAt: college.updatedAt,
    }));

    res.json({
      data: transformedColleges,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

// Get single college
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const college = await prisma.college.findUnique({
      where: { id },
      include: {
        courses: true,
        cutoffs: {
          orderBy: { year: 'desc' },
        },
      },
    });

    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    // Transform data (same as above)
    const transformed = {
      id: college.id,
      name: college.name,
      code: college.code,
      type: college.type,
      university: college.university,
      city: college.city,
      district: college.district,
      address: college.address,
      pincode: college.pincode,
      latitude: college.latitude,
      longitude: college.longitude,
      establishedYear: college.establishedYear,
      website: college.website,
      email: college.email,
      phone: college.phone,
      description: college.description,
      accreditation: {
        naac: college.naacGrade ? {
          grade: college.naacGrade,
          score: college.naacScore,
          validUntil: college.naacValidUntil,
        } : undefined,
        nba: {
          accredited: college.nbaAccredited,
          programs: college.nbaPrograms,
          validUntil: college.nbaValidUntil,
        },
        aicte: {
          approved: college.aicteApproved,
          code: college.aicteCode,
        },
        autonomous: college.autonomous,
      },
      facilities: college.facilities,
      hostel: {
        boys: college.boysHostel,
        girls: college.girlsHostel,
        capacity: college.hostelCapacity,
      },
      fees: {
        tuitionFee: college.tuitionFee,
        developmentFee: college.developmentFee,
        otherFees: college.otherFees,
        totalAnnualFee: college.totalAnnualFee,
        hostelFee: college.hostelFee,
        category: college.feeCategory,
      },
      placement: {
        year: college.placementYear,
        totalStudents: college.totalStudents,
        studentsPlaced: college.studentsPlaced,
        placementPercentage: college.placementPercentage,
        highestPackage: college.highestPackage,
        averagePackage: college.averagePackage,
        medianPackage: college.medianPackage,
        topRecruiters: college.topRecruiters,
      },
      courses: college.courses,
      cutoffs: college.cutoffs,
      images: college.images,
      createdAt: college.createdAt,
      updatedAt: college.updatedAt,
    };

    res.json(transformed);
  } catch (error) {
    console.error('Error fetching college:', error);
    res.status(500).json({ error: 'Failed to fetch college' });
  }
});

// Search colleges
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || (q as string).length < 2) {
      return res.json([]);
    }

    const colleges = await prisma.college.findMany({
      where: {
        OR: [
          { name: { contains: q as string, mode: 'insensitive' } },
          { city: { contains: q as string, mode: 'insensitive' } },
          { code: { contains: q as string, mode: 'insensitive' } },
        ],
      },
      take: 10,
      select: {
        id: true,
        name: true,
        code: true,
        city: true,
        district: true,
        type: true,
      },
    });

    res.json(colleges);
  } catch (error) {
    console.error('Error searching colleges:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

export default router;
