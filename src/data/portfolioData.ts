import { Project, SkillCategory, ExperienceItem, AchievementItem, CertificateItem } from '../types/portfolio';

export const personalInfo = {
  name: "Kartik Joshi",
  role: "Full-Stack MERN & AI-Focused Developer",
  location: "Haridwar, Uttarakhand, India",
  email: "kartikjoshi842@gmail.com",
  phone: "+91-9528316660",
  phoneFormatted: "+91 95283 16660",
  github: "https://github.com/kartik12421",
  linkedin: "https://www.linkedin.com/in/kartik-joshi-31a509330",
  heroBadge: "Open to Internships & Full-Stack Opportunities",
  headline: "Full-Stack Developer Building Scalable Web & AI Products",
  subheadline: "I build production-ready MERN applications, REST APIs, and AI-powered SaaS platforms with clean architecture and strong user experiences.",
  profileImage: "/kartik.png",
  cvFileName: "Kartik_Joshi_CV.pdf",
  aboutHeading: "Transforming ideas into scalable digital products",
  aboutIntro: "Hello, I’m Kartik Joshi, a BCA student at COER University, Roorkee. I specialize in full-stack development, REST API design, and AI-integrated applications.",
  stats: [
    { label: "Major Projects", value: "3+", detail: "Production-ready full-stack SaaS & AI systems" },
    { label: "MERN Stack Internship", value: "1", detail: "Hands-on commercial software delivery" },
    { label: "Web Dev Quiz", value: "1st Place", detail: "University Technical Competition Winner" },
    { label: "Open Source Contributor", value: "GSSoC '26", detail: "Active open-source community contributor" }
  ],
  heroTechBadges: [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "TypeScript",
    "Next.js",
    "Docker",
    "AWS"
  ]
};

export const aboutHighlights = [
  {
    id: "mern",
    title: "MERN Stack Developer",
    subtitle: "React • Node.js • Express • MongoDB",
    description: "Architecting end-to-end full stack web platforms with scalable RESTful backends, modern state management, and optimized database indexing.",
    icon: "Layers"
  },
  {
    id: "ai",
    title: "AI Product Builder",
    subtitle: "LangChain • RAG • AI APIs • Vector Databases",
    description: "Designing agentic pipelines, retrieval-augmented generation (RAG) systems, and multi-model SaaS interfaces connecting LLMs with structured databases.",
    icon: "Brain"
  },
  {
    id: "devops",
    title: "Cloud & DevOps",
    subtitle: "Docker • GitHub Actions • CI/CD • AWS S3",
    description: "Containerizing microservices, setting up automated GitHub CI/CD workflows, cloud asset storage on AWS S3, and continuous deployment on Render & CloudFront.",
    icon: "Cloud"
  }
];

export const projects: Project[] = [
  {
    id: "syntra-ai",
    title: "SyntraAI",
    tagline: "Microservices-based AI SaaS platform",
    description: "Conversational AI, code generation, web search, image generation, PDF RAG, and document generation in a modular AI-agent architecture.",
    category: ["all", "ai-saas", "full-stack"],
    techStack: [
      "React / Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "LangChain",
      "Razorpay",
      "AWS S3",
      "Docker",
      "GitHub Actions"
    ],
    githubUrl: "https://github.com/kartik12421/SyntraAI",
    liveUrl: "https://d2plf92847v20i.cloudfront.net/",
    featured: true,
    badge: "Flagship AI Platform",
    highlights: [
      "Modular microservices AI agent routing architecture",
      "Automated document processing with PDF RAG pipeline",
      "Full monetization integration with Razorpay webhooks",
      "Cloud asset storage on AWS S3 with CDN delivery on CloudFront",
      "Automated deployment with Docker containers and GitHub Actions CI/CD"
    ]
  },
  {
    id: "gen-ui",
    title: "GenUI",
    tagline: "AI-powered React component generation platform",
    description: "Full-stack SaaS for generating reusable React UI components, with authentication, payments, live previews, and an npm-ready component library.",
    category: ["all", "ai-saas", "full-stack", "web-apps"],
    techStack: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS",
      "Express",
      "MongoDB",
      "JWT",
      "Firebase Auth",
      "OpenRouter",
      "tsup"
    ],
    githubUrl: "https://github.com/kartik12421/GenUI",
    liveUrl: "https://genui-1-tkei.onrender.com/",
    featured: true,
    badge: "Full-Stack SaaS",
    highlights: [
      "Interactive code sandbox with instant live component rendering",
      "AI prompting optimized with multi-model OpenRouter LLMs",
      "Secure dual auth: Firebase Auth & JWT backend tokens",
      "NPM library compilation pipeline using tsup bundler",
      "Production deployment with automated health checks on Render"
    ]
  },
  {
    id: "travel-den",
    title: "TravelDen",
    tagline: "Full-stack accommodation booking platform",
    description: "MVC-based travel accommodation platform with listings, reviews, secure authentication, image uploads, validation, and centralized error handling.",
    category: ["all", "full-stack", "web-apps"],
    techStack: [
      "Node.js",
      "Express",
      "MongoDB",
      "EJS",
      "Passport.js",
      "Cloudinary",
      "Multer",
      "Joi"
    ],
    githubUrl: "https://github.com/kartik12421/TravelDen",
    liveUrl: "https://travelden.onrender.com/listings",
    featured: true,
    badge: "MVC Web Platform",
    highlights: [
      "Robust MVC pattern with decoupled routing, models, and controllers",
      "Multi-image cloud uploads using Multer & Cloudinary CDN",
      "Strict schema and input validation with Joi schemas",
      "User authentication and session management via Passport.js",
      "Centralized error handling and flash feedback messaging"
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    subtitle: "Core programming fundamentals & typing",
    iconName: "Code2",
    skills: [
      { name: "JavaScript (ES6+)", isPrimary: true },
      { name: "TypeScript", isPrimary: true },
      { name: "Java", isPrimary: true },
      { name: "SQL", isPrimary: false },
      { name: "PHP", isPrimary: false }
    ]
  },
  {
    title: "Frontend",
    subtitle: "Modern, reactive & accessible user interfaces",
    iconName: "Layout",
    skills: [
      { name: "React.js", isPrimary: true },
      { name: "Next.js", isPrimary: true },
      { name: "Tailwind CSS", isPrimary: true },
      { name: "Redux Toolkit", isPrimary: true },
      { name: "HTML5 & CSS3", isPrimary: false },
      { name: "Bootstrap", isPrimary: false },
      { name: "Vite", isPrimary: false }
    ]
  },
  {
    title: "Backend",
    subtitle: "Robust servers, security & clean architectures",
    iconName: "Server",
    skills: [
      { name: "Node.js", isPrimary: true },
      { name: "Express.js", isPrimary: true },
      { name: "REST APIs", isPrimary: true },
      { name: "JWT Authentication", isPrimary: true },
      { name: "Session Management", isPrimary: false },
      { name: "MVC Architecture", isPrimary: false }
    ]
  },
  {
    title: "Databases",
    subtitle: "Relational, document & vector data stores",
    iconName: "Database",
    skills: [
      { name: "MongoDB", isPrimary: true },
      { name: "MySQL", isPrimary: false },
      { name: "PostgreSQL", isPrimary: false },
      { name: "Redis", isPrimary: false },
      { name: "Vector Databases", isPrimary: true }
    ]
  },
  {
    title: "AI & Machine Learning",
    subtitle: "LLM agents, RAG & cognitive integrations",
    iconName: "Cpu",
    skills: [
      { name: "LangChain", isPrimary: true },
      { name: "LangGraph", isPrimary: true },
      { name: "RAG Systems", isPrimary: true },
      { name: "AI APIs (OpenAI, OpenRouter)", isPrimary: true }
    ]
  },
  {
    title: "Cloud & DevOps",
    subtitle: "Containerization, CI/CD & cloud infrastructure",
    iconName: "Terminal",
    skills: [
      { name: "Docker", isPrimary: true },
      { name: "GitHub Actions", isPrimary: true },
      { name: "CI / CD Pipelines", isPrimary: true },
      { name: "AWS S3", isPrimary: true },
      { name: "Nginx", isPrimary: false },
      { name: "Render", isPrimary: false }
    ]
  },
  {
    title: "Developer Tools",
    subtitle: "Collaboration, workflow & quality assurance",
    iconName: "Wrench",
    skills: [
      { name: "Git & GitHub", isPrimary: true },
      { name: "Postman", isPrimary: true },
      { name: "Firebase Auth", isPrimary: false },
      { name: "API Testing", isPrimary: true }
    ]
  }
];

export const experience: ExperienceItem[] = [
  {
    id: "skillbuildera-intern",
    role: "MERN Stack Developer Intern",
    company: "SkillBuildEra",
    location: "Remote",
    period: "Jan 2026 – Feb 2026",
    type: "Internship",
    description: [
      "Developed production-ready full-stack MERN applications using React.js, Node.js, Express.js, and MongoDB.",
      "Built scalable RESTful APIs with CRUD operations, authentication, validation, authorization, and error handling.",
      "Used Postman, Git workflows, MVC architecture, asynchronous programming, and participated in regular code reviews.",
      "Debugged frontend and backend issues, optimizing query performance and collaborating closely with cross-functional team members."
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Postman", "Git"],
    highlights: [
      "Delivered production features within sprint deadlines",
      "Architected clean REST endpoints following MVC best practices",
      "Collaborated via agile code reviews and Git branch workflows"
    ]
  }
];

export const achievements: AchievementItem[] = [
  {
    id: "gssoc",
    title: "Open Source Contributor",
    subtitle: "GirlScript Summer of Code (GSSoC) 2026",
    badge: "Open Source",
    iconName: "GitPullRequest",
    highlight: "Contributed to real-world repositories, solving community issues and authoring pull requests."
  },
  {
    id: "quiz-first",
    title: "First Position — Web Development Quiz",
    subtitle: "University Technical Competition",
    badge: "1st Place Winner",
    iconName: "Trophy",
    highlight: "Ranked #1 in university-wide frontend & backend full-stack engineering assessment."
  },
  {
    id: "iit-roorkee",
    title: "Participant — IIT Roorkee E-Summit Workshop",
    subtitle: "Entrepreneurship & Tech Summit, IIT Roorkee",
    badge: "IIT Roorkee",
    iconName: "Sparkles",
    highlight: "Selected for immersive workshops on building high-growth scalable digital technology ventures."
  },
  {
    id: "hackathons",
    title: "Hackathon Participant",
    subtitle: "National and Internal Hackathons",
    badge: "National Competitions",
    iconName: "Code",
    highlight: "Collaborated in high-intensity sprint hackathons, building working prototypes within 24-36 hours."
  }
];

export const certificates: CertificateItem[] = [
  {
    id: "cert-microsoft",
    title: "Microsoft Certified Achievement",
    issuer: "Microsoft",
    image: "/certificates/microsoft.png",
    badge: "Official Certificate",
    date: "2026"
  },
  {
    id: "cert-hackathon",
    title: "National Hackathon 4.0",
    issuer: "National Technical Innovation Forum",
    image: "/certificates/NationalHackathon4.o.jpg",
    badge: "National Finalist",
    date: "2026"
  },
  {
    id: "cert-hp",
    title: "HP LIFE Technical Certification",
    issuer: "HP Foundation",
    image: "/certificates/hp.jpg",
    badge: "Verified Skill",
    date: "2025"
  },
  {
    id: "cert-python",
    title: "Python Bootcamp Specialization",
    issuer: "Udemy",
    image: "/certificates/udemyPython.jpg",
    badge: "Course Completion",
    date: "2025"
  }
];

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact & Comments", href: "#contact" }
];
