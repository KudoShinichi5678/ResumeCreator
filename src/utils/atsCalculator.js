// ATS Score Calculator and Resume Quality Analyzer

const ACTION_VERBS = [
  'architected', 'spearheaded', 'engineered', 'developed', 'delivered', 
  'optimized', 'mentored', 'implemented', 'designed', 'orchestrated', 
  'boosted', 'scaled', 'reduced', 'mitigated', 'launched', 'automated'
];

export function calculateAtsScore(resumeData) {
  let score = 0;
  const breakdown = [];
  const suggestions = [];

  const { personal, experience, education, skills, projects, certifications, languages } = resumeData;

  // 1. Contact & Identity (20 pts)
  let contactPts = 0;
  if (personal.fullName && personal.fullName.trim().length > 2) contactPts += 5;
  if (personal.email && personal.email.includes('@')) contactPts += 4;
  if (personal.phone && personal.phone.trim().length >= 8) contactPts += 4;
  if (personal.location && personal.location.trim().length > 3) contactPts += 3;
  if (personal.linkedin || personal.github || personal.website) contactPts += 4;

  score += contactPts;
  breakdown.push({
    name: 'Contact & Profile Links',
    score: contactPts,
    maxScore: 20,
    status: contactPts >= 18 ? 'pass' : 'warn',
    note: contactPts >= 18 ? 'Complete contact channels provided.' : 'Add phone, email, and LinkedIn/GitHub profiles.'
  });

  // 2. Professional Summary (15 pts)
  let summaryPts = 0;
  const summaryWords = personal.summary ? personal.summary.trim().split(/\s+/).length : 0;
  if (summaryWords >= 25) {
    summaryPts = 15;
  } else if (summaryWords >= 10) {
    summaryPts = 8;
  }
  score += summaryPts;
  breakdown.push({
    name: 'Executive Summary',
    score: summaryPts,
    maxScore: 15,
    status: summaryPts === 15 ? 'pass' : 'warn',
    note: summaryPts === 15 ? 'Rich summary with clear value proposition.' : 'Expand your summary to 25–50 words highlighting strengths.'
  });
  if (summaryWords < 25) {
    suggestions.push('Expand your Professional Summary with core technologies and career focus.');
  }

  // 3. Work Experience & Quantifiable Impact (30 pts)
  let expPts = 0;
  let hasMetrics = false;
  let hasActionVerbs = false;

  if (experience && experience.length > 0) {
    expPts += 10; // has experience

    // Check bullets
    const allHighlights = experience.flatMap(e => e.highlights || []);
    if (allHighlights.length >= 4) expPts += 8;
    else if (allHighlights.length >= 2) expPts += 4;

    // Check for numbers / quantifiable metrics (%, $, k, TPS, etc.)
    const metricsRegex = /\d+|%|\$|฿|million|ms|fps/i;
    hasMetrics = allHighlights.some(h => metricsRegex.test(h));
    if (hasMetrics) expPts += 6;

    // Check for strong action verbs
    hasActionVerbs = allHighlights.some(h => 
      ACTION_VERBS.some(verb => h.toLowerCase().includes(verb))
    );
    if (hasActionVerbs) expPts += 6;
  }

  score += expPts;
  breakdown.push({
    name: 'Experience & Impact Metrics',
    score: expPts,
    maxScore: 30,
    status: expPts >= 24 ? 'pass' : expPts >= 15 ? 'warn' : 'fail',
    note: hasMetrics && hasActionVerbs 
      ? 'Great usage of action verbs and quantifiable results.' 
      : 'Include numbers, percentages, and strong action verbs in your bullet points.'
  });
  if (!hasMetrics) {
    suggestions.push('Add quantifiable metrics (e.g. "reduced latency by 35%", "scaled to 10k users").');
  }

  // 4. Skills & Competencies (15 pts)
  let skillsPts = 0;
  const totalSkillsCount = (skills || []).flatMap(s => s.items || []).length;
  if (totalSkillsCount >= 12) skillsPts = 15;
  else if (totalSkillsCount >= 6) skillsPts = 10;
  else if (totalSkillsCount >= 2) skillsPts = 5;

  score += skillsPts;
  breakdown.push({
    name: 'Skills Categorization',
    score: skillsPts,
    maxScore: 15,
    status: skillsPts >= 12 ? 'pass' : 'warn',
    note: `${totalSkillsCount} technical & professional skills indexed.`
  });
  if (totalSkillsCount < 8) {
    suggestions.push('Add at least 8–12 relevant technical tools, languages, and frameworks.');
  }

  // 5. Education & Credentials (10 pts)
  let eduPts = 0;
  if (education && education.length > 0) {
    eduPts += 6;
    if (education[0].school && education[0].degree) eduPts += 4;
  }
  score += eduPts;
  breakdown.push({
    name: 'Education & Academics',
    score: eduPts,
    maxScore: 10,
    status: eduPts >= 8 ? 'pass' : 'warn',
    note: eduPts >= 8 ? 'Degree and institution verified.' : 'Fill in school name and degree title.'
  });

  // 6. Projects & Supporting Credentials (10 pts)
  let bonusPts = 0;
  if (projects && projects.length >= 1) bonusPts += 4;
  if (projects && projects.length >= 2) bonusPts += 2;
  if (certifications && certifications.length >= 1) bonusPts += 2;
  if (languages && languages.length >= 1) bonusPts += 2;

  score += bonusPts;
  breakdown.push({
    name: 'Portfolio Projects & Certs',
    score: bonusPts,
    maxScore: 10,
    status: bonusPts >= 8 ? 'pass' : 'warn',
    note: `${projects?.length || 0} projects, ${certifications?.length || 0} certifications, ${languages?.length || 0} languages.`
  });

  return {
    score: Math.min(100, Math.max(0, score)),
    breakdown,
    suggestions,
    totalSkillsCount,
    hasMetrics,
    hasActionVerbs
  };
}

export function matchJobDescription(resumeData, jobDescriptionText) {
  if (!jobDescriptionText || jobDescriptionText.trim().length === 0) {
    return { matchScore: 0, matchedKeywords: [], missingKeywords: [] };
  }

  const normalizedJob = jobDescriptionText.toLowerCase();

  // Extract all resume words & skill items
  const resumeKeywords = new Set([
    ...resumeData.skills.flatMap(s => s.items.map(i => i.toLowerCase())),
    ...resumeData.experience.flatMap(e => (e.highlights || []).join(' ').toLowerCase().split(/\W+/)),
    ...resumeData.projects.flatMap(p => (p.techStack || []).map(t => t.toLowerCase())),
    ...(resumeData.personal.summary || '').toLowerCase().split(/\W+/)
  ].filter(w => w && w.length > 2));

  // Common tech keywords to scan for
  const COMMON_SCAN_LIST = [
    'react', 'next.js', 'typescript', 'javascript', 'python', 'golang', 'node.js', 
    'aws', 'docker', 'kubernetes', 'graphql', 'sql', 'postgresql', 'redis', 
    'ci/cd', 'git', 'microservices', 'agile', 'rest', 'api', 'tailwind', 
    'figma', 'vitest', 'jest', 'kafka', 'linux', 'cloud', 'terraform'
  ];

  const matchedKeywords = [];
  const missingKeywords = [];

  COMMON_SCAN_LIST.forEach(tech => {
    if (normalizedJob.includes(tech)) {
      if (resumeKeywords.has(tech)) {
        matchedKeywords.push(tech);
      } else {
        missingKeywords.push(tech);
      }
    }
  });

  const totalRequired = matchedKeywords.length + missingKeywords.length;
  const matchScore = totalRequired > 0 
    ? Math.round((matchedKeywords.length / totalRequired) * 100) 
    : 85;

  return {
    matchScore,
    matchedKeywords,
    missingKeywords,
    totalScanned: totalRequired
  };
}
