import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Recommendation algorithm
router.post('/', async (req, res) => {
  try {
    const {
      examType,
      rank,
      percentile,
      category,
      preferredBranches,
      preferredCities,
      preferredDistricts,
      maxBudget,
      hostelRequired,
      minPlacementPercentage,
      collegeType,
    } = req.body;

    if (!rank && !percentile) {
      return res.status(400).json({ error: 'Either rank or percentile is required' });
    }

    if (!preferredBranches || preferredBranches.length === 0) {
      return res.status(400).json({ error: 'At least one preferred branch is required' });
    }

    // Build where clause for colleges
    const where: any = {};

    if (preferredCities && preferredCities.length > 0) {
      where.city = { in: preferredCities };
    }

    if (preferredDistricts && preferredDistricts.length > 0) {
      where.district = { in: preferredDistricts };
    }

    if (maxBudget) {
      where.totalAnnualFee = { lte: maxBudget };
    }

    if (hostelRequired) {
      where.OR = [{ boysHostel: true }, { girlsHostel: true }];
    }

    if (minPlacementPercentage) {
      where.placementPercentage = { gte: minPlacementPercentage };
    }

    if (collegeType && collegeType.length > 0) {
      where.type = { in: collegeType };
    }

    // Get colleges with courses and cutoffs
    const colleges = await prisma.college.findMany({
      where,
      include: {
        courses: {
          where: {
            branch: { in: preferredBranches },
          },
        },
        cutoffs: {
          where: {
            examType,
            category,
            year: { gte: new Date().getFullYear() - 3 }, // Last 3 years
          },
          orderBy: { year: 'desc' },
        },
      },
    });

    // Generate recommendations
    const recommendations: any[] = [];

    for (const college of colleges) {
      for (const course of college.courses) {
        // Get cutoffs for this course
        const courseCutoffs = college.cutoffs.filter(c => c.courseId === course.id);

        if (courseCutoffs.length === 0) continue;

        // Calculate predicted cutoff
        const predictedCutoff = predictCutoff(courseCutoffs, new Date().getFullYear());

        // Calculate admission chance
        const userRank = rank || convertPercentileToRank(percentile!, examType);
        const admissionChance = calculateAdmissionChance(userRank, predictedCutoff);

        // Calculate match score
        const matchScore = calculateMatchScore({
          college,
          course,
          userPreferences: {
            preferredBranches,
            preferredCities,
            maxBudget,
            minPlacementPercentage,
          },
        });

        // Generate reasons
        const reasons = generateReasons(college, course, admissionChance);

        // Generate warnings
        const warnings = generateWarnings(college, userRank, predictedCutoff);

        recommendations.push({
          college: transformCollege(college),
          course,
          matchScore,
          admissionChance: admissionChance.category,
          chancePercentage: admissionChance.percentage,
          predictedCutoff: {
            openingRank: predictedCutoff.opening,
            closingRank: predictedCutoff.closing,
            confidence: predictedCutoff.confidence,
          },
          historicalCutoffs: courseCutoffs,
          reasons,
          warnings,
        });
      }
    }

    // Sort by match score and admission chance
    recommendations.sort((a, b) => {
      const chanceOrder = { Safe: 4, Likely: 3, Borderline: 2, Aspirational: 1 };
      const chanceA = chanceOrder[a.admissionChance as keyof typeof chanceOrder];
      const chanceB = chanceOrder[b.admissionChance as keyof typeof chanceOrder];

      if (chanceA !== chanceB) return chanceB - chanceA;
      return b.matchScore - a.matchScore;
    });

    res.json(recommendations.slice(0, 50)); // Return top 50
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

// Predict cutoff using historical data
function predictCutoff(cutoffs: any[], targetYear: number) {
  if (cutoffs.length === 0) {
    return { opening: 0, closing: 0, confidence: 0 };
  }

  // Sort by year
  cutoffs.sort((a, b) => b.year - a.year);

  // Calculate trend
  const closingRanks = cutoffs.map(c => c.closingRank).filter(r => r !== null);
  const openingRanks = cutoffs.map(c => c.openingRank).filter(r => r !== null);

  if (closingRanks.length === 0) {
    return { opening: 0, closing: 0, confidence: 0 };
  }

  // Simple linear regression for prediction
  const avgClosing = closingRanks.reduce((a, b) => a + b, 0) / closingRanks.length;
  const avgOpening = openingRanks.length > 0
    ? openingRanks.reduce((a, b) => a + b, 0) / openingRanks.length
    : avgClosing * 0.8;

  // Calculate trend (increasing or decreasing)
  let trend = 0;
  if (closingRanks.length >= 2) {
    trend = (closingRanks[0] - closingRanks[closingRanks.length - 1]) / closingRanks.length;
  }

  // Predict for target year
  const predictedClosing = Math.round(avgClosing + trend);
  const predictedOpening = Math.round(avgOpening + trend);

  // Calculate confidence based on data consistency
  const variance = closingRanks.reduce((sum, rank) => sum + Math.pow(rank - avgClosing, 2), 0) / closingRanks.length;
  const stdDev = Math.sqrt(variance);
  const confidence = Math.max(0, Math.min(100, 100 - (stdDev / avgClosing) * 100));

  return {
    opening: predictedOpening,
    closing: predictedClosing,
    confidence: Math.round(confidence),
  };
}

// Calculate admission chance
function calculateAdmissionChance(userRank: number, predictedCutoff: any) {
  const { closing } = predictedCutoff;

  if (closing === 0) {
    return { category: 'Aspirational', percentage: 20 };
  }

  const ratio = userRank / closing;

  if (ratio <= 0.7) {
    return { category: 'Safe', percentage: 90 + Math.round((0.7 - ratio) * 10) };
  } else if (ratio <= 0.9) {
    return { category: 'Likely', percentage: 70 + Math.round((0.9 - ratio) * 100) };
  } else if (ratio <= 1.1) {
    return { category: 'Borderline', percentage: 40 + Math.round((1.1 - ratio) * 150) };
  } else {
    return { category: 'Aspirational', percentage: Math.max(10, 40 - Math.round((ratio - 1.1) * 50)) };
  }
}

// Calculate match score
function calculateMatchScore(params: any) {
  const { college, course, userPreferences } = params;
  let score = 0;

  // Branch preference (30 points)
  if (userPreferences.preferredBranches.includes(course.branch)) {
    score += 30;
  }

  // Location preference (20 points)
  if (userPreferences.preferredCities && userPreferences.preferredCities.includes(college.city)) {
    score += 20;
  }

  // Budget match (20 points)
  if (userPreferences.maxBudget) {
    const budgetRatio = college.totalAnnualFee / userPreferences.maxBudget;
    if (budgetRatio <= 0.7) score += 20;
    else if (budgetRatio <= 0.9) score += 15;
    else if (budgetRatio <= 1.0) score += 10;
  } else {
    score += 10; // Default if no budget specified
  }

  // Placement (15 points)
  if (college.placementPercentage >= 90) score += 15;
  else if (college.placementPercentage >= 75) score += 12;
  else if (college.placementPercentage >= 60) score += 8;
  else score += 5;

  // Accreditation (15 points)
  if (college.naacGrade === 'A++' || college.naacGrade === 'A+') score += 15;
  else if (college.naacGrade === 'A') score += 12;
  else if (college.nbaAccredited) score += 10;
  else score += 5;

  return Math.min(100, score);
}

// Generate reasons
function generateReasons(college: any, course: any, admissionChance: any) {
  const reasons: string[] = [];

  if (admissionChance.category === 'Safe') {
    reasons.push('Your rank is well within the cutoff range');
  } else if (admissionChance.category === 'Likely') {
    reasons.push('Good chances based on historical cutoffs');
  }

  if (college.placementPercentage >= 80) {
    reasons.push(`Strong placement record (${college.placementPercentage}%)`);
  }

  if (college.naacGrade && ['A++', 'A+', 'A'].includes(college.naacGrade)) {
    reasons.push(`Excellent NAAC ${college.naacGrade} accreditation`);
  }

  if (college.autonomous) {
    reasons.push('Autonomous college with flexible curriculum');
  }

  if (college.averagePackage >= 6) {
    reasons.push(`Good average package of ₹${college.averagePackage} LPA`);
  }

  return reasons;
}

// Generate warnings
function generateWarnings(college: any, userRank: number, predictedCutoff: any) {
  const warnings: string[] = [];

  if (userRank > predictedCutoff.closing * 1.2) {
    warnings.push('Your rank is significantly higher than predicted cutoff');
  }

  if (college.placementPercentage < 50) {
    warnings.push('Below average placement statistics');
  }

  if (!college.naacGrade && !college.nbaAccredited) {
    warnings.push('Limited accreditation information available');
  }

  return warnings;
}

// Convert percentile to rank (approximate)
function convertPercentileToRank(percentile: number, examType: string) {
  // Approximate conversion based on typical exam statistics
  if (examType === 'CET') {
    const totalCandidates = 400000; // Approximate MHT-CET candidates
    return Math.round(totalCandidates * (100 - percentile) / 100);
  } else {
    const totalCandidates = 1200000; // Approximate JEE Main candidates
    return Math.round(totalCandidates * (100 - percentile) / 100);
  }
}

// Transform college data
function transformCollege(college: any) {
  return {
    id: college.id,
    name: college.name,
    code: college.code,
    type: college.type,
    university: college.university,
    city: college.city,
    district: college.district,
    address: college.address,
    pincode: college.pincode,
    establishedYear: college.establishedYear,
    website: college.website,
    email: college.email,
    phone: college.phone,
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
  };
}

export default router;
