export const PRESET_PROFILES = [
  {
    id: 'fullstack-senior',
    name: 'Senior Full-Stack Engineer',
    badge: 'Tech & Cloud',
    description: '5+ years experience, React, Node, AWS & scalable architectures',
    data: {
      personal: {
        fullName: 'Alexandre "Alex" Chen',
        targetRole: 'Senior Full-Stack & Cloud Software Engineer',
        age: 28,
        email: 'alex.chen.dev@gmail.com',
        phone: '+66 82 456 7890',
        location: 'Bangkok, Thailand (Open to Remote / Relocation)',
        website: 'https://alexchen.tech',
        github: 'github.com/alexchen-dev',
        linkedin: 'linkedin.com/in/alexchen-eng',
        summary: 'Performance-driven Senior Software Engineer with 6+ years of expertise in building resilient web applications, distributed backend services, and scalable cloud architectures. Proven track record spearheading frontend microservices serving 40M+ monthly users and cutting AWS cloud expenditure by 32%. Passionate about developer tooling, clean code, and mentoring high-velocity engineering teams.'
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Lead Full-Stack Engineer',
          company: 'Nexus FinTech Solutions',
          location: 'Bangkok, Thailand (Hybrid)',
          startDate: '2023-01',
          endDate: 'Present',
          isCurrent: true,
          highlights: [
            'Architected and delivered an event-driven payment processing engine in Golang and Node.js, sustaining over 12,000 TPS during peak promotional periods.',
            'Redesigned the primary customer portal in Next.js 14 and TailwindCSS, cutting Largest Contentful Paint (LCP) from 3.8s to 0.9s and boosting checkout conversions by 18%.',
            'Implemented comprehensive automated CI/CD pipelines via GitHub Actions and Docker, reducing deployment cycle times from 45 minutes to 7 minutes.',
            'Mentored 6 junior/mid-level engineers through bi-weekly architectural reviews, automated testing workshops, and structured pair-programming.'
          ]
        },
        {
          id: 'exp-2',
          role: 'Senior Frontend Engineer',
          company: 'Agoda Services Co., Ltd.',
          location: 'Bangkok, Thailand',
          startDate: '2021-03',
          endDate: '2022-12',
          isCurrent: false,
          highlights: [
            'Maintained and optimized flight & hotel booking search funnels handling 40M+ monthly global requests using React, TypeScript, and Redux Toolkit.',
            'Co-developed an enterprise-wide design system component library adopted across 14 cross-functional squads, enhancing UI consistency and development speed by 35%.',
            'Conducted extensive A/B testing on pricing displays, driving an incremental $1.4M in annualized booking volume.'
          ]
        },
        {
          id: 'exp-3',
          role: 'Software Engineer',
          company: 'Siam Digital Innovations',
          location: 'Chiang Mai, Thailand',
          startDate: '2019-06',
          endDate: '2021-02',
          isCurrent: false,
          highlights: [
            'Developed RESTful & GraphQL APIs with Node.js/Express and PostgreSQL for logistics tracking applications.',
            'Integrated Redis caching layers, which mitigated database read bottlenecks and reduced average server response times by 40%.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          school: 'Chulalongkorn University',
          degree: 'Bachelor of Science (B.Sc.)',
          field: 'Computer Engineering (First Class Honours)',
          location: 'Bangkok, Thailand',
          graduationYear: '2019',
          gpa: '3.86 / 4.00',
          achievements: 'President of Chula Tech & Coding Guild, 1st Place National Hackathon 2018'
        }
      ],
      skills: [
        {
          category: 'Languages & Core',
          items: ['TypeScript', 'JavaScript (ESNext)', 'Golang', 'Python', 'SQL (PostgreSQL)', 'HTML5 / Modern CSS']
        },
        {
          category: 'Frameworks & Libraries',
          items: ['React 19', 'Next.js', 'Node.js', 'Express', 'TailwindCSS', 'GraphQL', 'Redux Toolkit', 'Zustand']
        },
        {
          category: 'Cloud, DevOps & Tools',
          items: ['AWS (ECS, Lambda, S3, RDS)', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Redis', 'Jest / Vitest']
        },
        {
          category: 'Architecture & Leadership',
          items: ['Microservices', 'Event-Driven Systems', 'System Design', 'Agile / Scrum', 'Technical Mentorship', 'CI/CD Automation']
        }
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'AutoMetrics - Real-Time APM Dashboard',
          subtitle: 'Distributed Tracing & Server Metrics Visualizer',
          techStack: ['React', 'TypeScript', 'Golang', 'ClickHouse', 'Docker'],
          liveUrl: 'https://autometrics.alexchen.tech',
          githubUrl: 'https://github.com/alexchen-dev/autometrics',
          description: 'High-performance observability dashboard ingesting 50,000 metrics/sec with sub-second query rendering. Built with Go workers and Canvas charting.'
        },
        {
          id: 'proj-2',
          title: 'CloudScribe - AI Document Synthesizer',
          subtitle: 'Markdown & PDF Generation Microservice',
          techStack: ['Next.js', 'TailwindCSS', 'Python FastAPI', 'AWS S3'],
          liveUrl: 'https://cloudscribe.app',
          githubUrl: 'https://github.com/alexchen-dev/cloudscribe',
          description: 'Serverless SaaS that extracts structured summaries from 100+ page technical PDFs using OpenAI embeddings and generates branded reports.'
        }
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
          issuer: 'Amazon Web Services',
          issueDate: '2023',
          credentialUrl: 'https://aws.amazon.com/verification'
        },
        {
          id: 'cert-2',
          name: 'CKA: Certified Kubernetes Administrator',
          issuer: 'Linux Foundation / CNCF',
          issueDate: '2022',
          credentialUrl: 'https://www.cncf.io/certification/cka/'
        }
      ],
      languages: [
        { id: 'lang-1', name: 'English', proficiency: 'Native / Full Professional (IELTS 8.5)' },
        { id: 'lang-2', name: 'Thai', proficiency: 'Native' },
        { id: 'lang-3', name: 'Japanese', proficiency: 'Conversational (JLPT N3)' }
      ],
      interests: [
        'Open-Source Developer Tools',
        'Distributed Database Internals',
        'Competitive Badminton & Marathon Training',
        'Specialty Coffee & Espresso Engineering',
        'Mechanical Keyboards (Custom PCB Design)'
      ]
    }
  },
  {
    id: 'ai-ml-engineer',
    name: 'AI & Machine Learning Engineer',
    badge: 'LLMs & MLOps',
    description: 'PyTorch, LangChain, RAG Systems, HuggingFace & Big Data Pipelines',
    data: {
      personal: {
        fullName: 'Natcha "Maya" Ratanaporn',
        targetRole: 'Senior Machine Learning & Applied AI Engineer',
        age: 26,
        email: 'maya.ratanaporn.ai@outlook.com',
        phone: '+66 89 123 4567',
        location: 'Bangkok, Thailand',
        website: 'https://mayaratanaporn.ai',
        github: 'github.com/maya-ml',
        linkedin: 'linkedin.com/in/maya-ratanaporn',
        summary: 'Applied Machine Learning Engineer with 4+ years of specialized experience designing LLM-powered enterprise workflows, Retrieval-Augmented Generation (RAG) pipelines, and computer vision models. Successfully deployed fine-tuned open-source models reducing external API expenditures by $180k/yr while preserving 97.4% precision.'
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Staff AI Engineer',
          company: 'Synthetix AI Labs',
          location: 'Bangkok, Thailand & Remote',
          startDate: '2023-04',
          endDate: 'Present',
          isCurrent: true,
          highlights: [
            'Architected a multi-agent RAG workflow on top of Qdrant vector database and Llama-3-70B, servicing 500,000 enterprise knowledge queries daily.',
            'Spearheaded Quantization (AWQ/GGUF) and vLLM inference serving, yielding a 3.4x throughput leap and 65% reduction in GPU hosting costs.',
            'Collaborated with legal and compliance teams to engineer automated PII redacting filters with 99.8% precision.'
          ]
        },
        {
          id: 'exp-2',
          role: 'Data Scientist & ML Engineer',
          company: 'Kasikorn Business-Technology Group (KBTG)',
          location: 'Nonthaburi, Thailand',
          startDate: '2021-08',
          endDate: '2023-03',
          isCurrent: false,
          highlights: [
            'Engineered fraud detection gradient boosted trees (XGBoost/LightGBM) analyzing 15M daily transactions, preventing an estimated ฿42M in fraudulent withdrawals.',
            'Built real-time streaming ML feature stores using Kafka and Feast, dropping offline-to-online feature calculation discrepancies to zero.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          school: 'Imperial College London',
          degree: 'Master of Science (M.Sc.)',
          field: 'Computing (Artificial Intelligence & Machine Learning)',
          location: 'London, United Kingdom',
          graduationYear: '2021',
          gpa: 'Distinction (Honor)',
          achievements: 'Master Thesis published at NeurIPS workshop on Parameter-Efficient Fine-Tuning.'
        },
        {
          id: 'edu-2',
          school: 'Kasetsart University',
          degree: 'Bachelor of Engineering (B.Eng.)',
          field: 'Computer Science',
          location: 'Bangkok, Thailand',
          graduationYear: '2020',
          gpa: '3.92 / 4.00',
          achievements: 'Valedictorian of Engineering Faculty'
        }
      ],
      skills: [
        {
          category: 'AI & Machine Learning',
          items: ['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'LlamaIndex', 'vLLM', 'LoRA / PEFT', 'Vector DBs (Qdrant, Pinecone)']
        },
        {
          category: 'Languages & Tools',
          items: ['Python (Expert)', 'C++', 'SQL', 'Bash', 'Docker', 'Kubernetes / KServe', 'Weights & Biases', 'Git']
        },
        {
          category: 'Data & Cloud Infrastructure',
          items: ['Apache Spark', 'Kafka', 'FastAPI', 'GCP Vertex AI', 'AWS SageMaker', 'PostgreSQL / pgvector']
        }
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'ThaiLlama - Specialized Legal & Finance LLM',
          subtitle: 'Open-weights Thai language reasoning model',
          techStack: ['PyTorch', 'HuggingFace', 'FastAPI', 'vLLM'],
          liveUrl: 'https://huggingface.co/models',
          githubUrl: 'https://github.com/maya-ml/thailogic-llm',
          description: 'Fine-tuned 8B model with 400M tokens of curated Thai government regulations and financial disclosures, beating standard GPT-3.5 on Thai legal benchmark.'
        }
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Google Cloud Certified Professional Machine Learning Engineer',
          issuer: 'Google Cloud',
          issueDate: '2023',
          credentialUrl: 'https://cloud.google.com/certification'
        }
      ],
      languages: [
        { id: 'lang-1', name: 'Thai', proficiency: 'Native' },
        { id: 'lang-2', name: 'English', proficiency: 'Bilingual / Full Professional' }
      ],
      interests: [
        'Generative Art & Stable Diffusion Experiments',
        'Playing Classical Cello',
        'Board Games & Strategy Game Design',
        'Hiking & National Parks Exploration'
      ]
    }
  },
  {
    id: 'junior-fresh-grad',
    name: 'Junior Developer / Fresh Graduate',
    badge: 'Fast Learner',
    description: 'Entry-level frontend/backend, academic projects, hackathon wins',
    data: {
      personal: {
        fullName: 'Krit "Ken" Thanapat',
        targetRole: 'Junior Software Engineer (Frontend / Full-Stack)',
        age: 22,
        email: 'krit.thanapat.dev@gmail.com',
        phone: '+66 91 876 5432',
        location: 'Bangkok, Thailand',
        website: 'https://krit-portfolio.vercel.app',
        github: 'github.com/krit-dev99',
        linkedin: 'linkedin.com/in/krit-thanapat',
        summary: 'Proactive and detail-oriented Computer Science graduate with strong foundational expertise in modern JavaScript/TypeScript, React, Node.js, and SQL. Proven capability delivering production-ready web apps through high-impact software internships and national hackathons. Eager to contribute high-quality code and grow within an agile, collaborative product team.'
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Software Engineer Intern',
          company: 'LINE Company (Thailand)',
          location: 'Bangkok, Thailand',
          startDate: '2024-05',
          endDate: '2024-08',
          isCurrent: false,
          highlights: [
            'Assisted in developing LINE Mini App features for merchant CRM reaching 120,000 daily active users using Vue 3 and TypeScript.',
            'Authored unit tests using Vitest, lifting module code coverage from 64% to 88% and eliminating 15 recurring edge-case bugs.',
            'Collaborated with senior engineers to refactor legacy API handlers into modular TypeScript controllers.'
          ]
        },
        {
          id: 'exp-2',
          role: 'Frontend Developer (Part-Time / Student)',
          company: 'KMUTT University Tech Club',
          location: 'Bangkok, Thailand',
          startDate: '2023-08',
          endDate: '2024-04',
          isCurrent: false,
          highlights: [
            'Built responsive registration and ticketing web app for the annual university tech symposium accommodating 4,000 attendees.',
            'Integrated Stripe and PromptPay QR payment gateways with zero transaction discrepancies.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          school: "King Mongkut's University of Technology Thonburi (KMUTT)",
          degree: 'Bachelor of Science (B.Sc.)',
          field: 'Computer Science',
          location: 'Bangkok, Thailand',
          graduationYear: '2024',
          gpa: '3.75 / 4.00',
          achievements: 'First Place - National University Hackathon 2023, Dean’s List for 6 Consecutive Semesters'
        }
      ],
      skills: [
        {
          category: 'Core Technologies',
          items: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'HTML5 & CSS3', 'TailwindCSS']
        },
        {
          category: 'Backend & Databases',
          items: ['Node.js', 'Express', 'PostgreSQL', 'Prisma ORM', 'MongoDB', 'REST APIs']
        },
        {
          category: 'Dev Tools & Practices',
          items: ['Git & GitHub', 'Docker (Basics)', 'Postman', 'Figma', 'Linux / Bash', 'Agile / Scrum']
        }
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'SkillSwap - Student Mentorship Marketplace',
          subtitle: 'Full-Stack Web App for Peer Tutoring',
          techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'TailwindCSS'],
          liveUrl: 'https://skillswap-th.vercel.app',
          githubUrl: 'https://github.com/krit-dev99/skillswap',
          description: 'Peer-to-peer tutoring booking platform with instant chat, schedule booking, and automated email notifications via Resend.'
        },
        {
          id: 'proj-2',
          title: 'PromptPay QR Generator & Validator',
          subtitle: 'Lightweight Open-Source NPM Package',
          techStack: ['TypeScript', 'NPM', 'Vitest'],
          liveUrl: 'https://npmjs.com/package/promptpay-lite',
          githubUrl: 'https://github.com/krit-dev99/promptpay-lite',
          description: 'Zero-dependency TypeScript library for generating EMVCo-compliant PromptPay QR payloads with 100% test coverage and 5,000+ monthly downloads.'
        }
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Meta Front-End Developer Professional Certificate',
          issuer: 'Meta / Coursera',
          issueDate: '2023',
          credentialUrl: 'https://coursera.org/verify/professional-cert/meta'
        }
      ],
      languages: [
        { id: 'lang-1', name: 'Thai', proficiency: 'Native' },
        { id: 'lang-2', name: 'English', proficiency: 'Conversational / Working (TOEIC 860)' }
      ],
      interests: [
        'Building Web Mini-Games',
        'Photography & Street Architecture',
        'Coffee Brewing (V60 Pour-over)',
        'E-Sports & Team Strategy'
      ]
    }
  }
];

export const INITIAL_RESUME_DATA = PRESET_PROFILES[0].data;

export const BULLET_SUGGESTIONS = [
  'Architected and deployed {technology} services, boosting processing efficiency by {number}%.',
  'Spearheaded migration of legacy codebase to {technology}, reducing maintenance overhead by {number}%.',
  'Automated end-to-end testing pipeline, raising overall test coverage from {number}% to {number}%.',
  'Collaborated across cross-functional squads to launch {feature}, generating ${number}k in annualized revenue.',
  'Engineered low-latency APIs handling {number}+ requests per second with sub-50ms latency.',
  'Mentored and onboarded {number} junior developers, standardizing code review guidelines and git workflows.',
  'Optimized database queries and added indexing, reducing query response times by {number}%.'
];

export const SUMMARY_SUGGESTIONS = [
  'Results-driven Software Engineer with extensive experience in architecting scalable web applications, optimizing performance, and delivering business value in fast-paced collaborative environments.',
  'Innovative Tech Lead and Full-Stack specialist adept at bridging the gap between product strategy, elegant UX, and robust cloud microservices.',
  'Passionate and self-directed developer with a strong foundation in modern web frameworks, continuous integration, and clean code principles.'
];

export const POPULAR_SKILL_PACKS = [
  { name: 'MERN Stack', skills: ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript', 'TailwindCSS'] },
  { name: 'Python AI & Data', skills: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Pandas', 'PostgreSQL', 'Docker'] },
  { name: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'GitHub Actions', 'Linux'] },
  { name: 'Mobile Dev', skills: ['React Native', 'Flutter', 'TypeScript', 'Dart', 'iOS (Swift)', 'Android (Kotlin)'] }
];
