export const TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern Tech',
    badge: 'Popular',
    description: 'Crisp header, accent badges, sleek dividers, and balanced white space.',
    previewIcon: 'LayoutTemplate',
    layoutType: 'split-bottom',
    bestFor: 'Software Engineers, Product Managers, Tech Startups'
  },
  {
    id: 'minimal',
    name: 'Clean ATS Minimal',
    badge: 'ATS 99%',
    description: 'Single-column scannable format, optimized for ATS parsers and corporate recruiters.',
    previewIcon: 'FileText',
    layoutType: 'single-col',
    bestFor: 'Enterprise Roles, Finance, Traditional Corporates, Taleo/Workday'
  },
  {
    id: 'creative',
    name: 'Creative Sidebar',
    badge: 'Two-Column',
    description: 'Distinctive tinted sidebar for skills & credentials with wide main experience area.',
    previewIcon: 'Columns2',
    layoutType: 'two-col-left',
    bestFor: 'Designers, Frontend Developers, Marketers, Creative Leads'
  },
  {
    id: 'executive',
    name: 'Executive Classic',
    badge: 'Senior & Lead',
    description: 'Serif headings, formal double rule accents, and timeless editorial tone.',
    previewIcon: 'Award',
    layoutType: 'editorial',
    bestFor: 'Directors, VP/C-Suite, Management Consultants, Legal'
  },
  {
    id: 'innovator',
    name: 'Tech Innovator',
    badge: 'Dev & Cloud',
    description: 'High-impact technical resume with monospace tags, project links & skills matrix sidebar.',
    previewIcon: 'Code2',
    layoutType: 'two-col-right',
    bestFor: 'Full-Stack Developers, DevOps/SRE, Cloud Architects, AI Engineers'
  },
  {
    id: 'nordic',
    name: 'Nordic Elegance',
    badge: 'Minimalist',
    description: 'Refined Scandinavian layout with soft tinted section headers and serene typography.',
    previewIcon: 'Sparkles',
    layoutType: 'clean-linear',
    bestFor: 'UX/UI Designers, Researchers, Consultants, Modern Professionals'
  },
  {
    id: 'compact',
    name: 'Compact 1-Page',
    badge: '1-Page Fit',
    description: 'High-density balanced 2-column format engineered to fit extensive careers cleanly onto one page.',
    previewIcon: 'AlignJustify',
    layoutType: 'compact-grid',
    bestFor: 'Dense Work Histories, Mid-to-Senior Engineers, Space Optimization'
  }
];

export const COLOR_THEMES = [
  {
    id: 'sapphire',
    name: 'Sapphire Blue',
    primary: '#2563eb',
    primaryDark: '#1e40af',
    accentBg: '#eff6ff',
    border: '#bfdbfe'
  },
  {
    id: 'emerald',
    name: 'Tech Emerald',
    primary: '#059669',
    primaryDark: '#065f46',
    accentBg: '#ecfdf5',
    border: '#a7f3d0'
  },
  {
    id: 'violet',
    name: 'Electric Violet',
    primary: '#7c3aed',
    primaryDark: '#5b21b6',
    accentBg: '#f5f3ff',
    border: '#ddd6fe'
  },
  {
    id: 'rose',
    name: 'Crimson Rose',
    primary: '#e11d48',
    primaryDark: '#9f1239',
    accentBg: '#fff1f2',
    border: '#fecdd3'
  },
  {
    id: 'slate',
    name: 'Obsidian Slate',
    primary: '#1e293b',
    primaryDark: '#0f172a',
    accentBg: '#f8fafc',
    border: '#cbd5e1'
  },
  {
    id: 'cyan',
    name: 'Ocean Cyan',
    primary: '#0284c7',
    primaryDark: '#075985',
    accentBg: '#f0f9ff',
    border: '#bae6fd'
  },
  {
    id: 'amber',
    name: 'Amber Gold',
    primary: '#d97706',
    primaryDark: '#b45309',
    accentBg: '#fffbeb',
    border: '#fde68a'
  },
  {
    id: 'plum',
    name: 'Midnight Plum',
    primary: '#9333ea',
    primaryDark: '#6b21a8',
    accentBg: '#faf5ff',
    border: '#e9d5ff'
  }
];

export const FONT_OPTIONS = [
  { id: 'jakarta', name: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', sans-serif" },
  { id: 'inter', name: 'Inter Clean', family: "'Inter', sans-serif" },
  { id: 'outfit', name: 'Outfit Geometric', family: "'Outfit', sans-serif" },
  { id: 'serif', name: 'Editorial Serif', family: "'Newsreader', Georgia, serif" }
];

export const SPACING_OPTIONS = [
  { id: 'compact', label: 'Compact (Fit 1 Page)', padding: '16px 20px', gap: '10px' },
  { id: 'normal', label: 'Balanced (Standard)', padding: '24px 28px', gap: '14px' },
  { id: 'spacious', label: 'Spacious', padding: '32px 36px', gap: '18px' }
];
