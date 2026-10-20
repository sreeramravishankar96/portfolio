export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  github: string;
  linkedin: string;
  resumePath: string;
  currentDept: string;
  idNumber: string;
  validTill: string;
  degreeSummary: string;
  quote: string;
}

export interface NavItem {
  id: string;
  label: string;
  index: string;
}

export interface SkillItem {
  num: number;
  symbol: string;
  name: string;
  family: string;
  isBrand: boolean;
  logoKey: string;
  projects: string[];
}

export interface SkillGroup {
  name: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  date: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  miniUiType: "hospital" | "cards" | "telemetry";
}

export interface CertificationItem {
  index: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface TimelineItem {
  year: string;
  dateRange: string;
  type: "experience" | "education";
  title: string;
  organization: string;
  location: string;
  points: string[];
}

export const PROFILE: Profile = {
  name: "Sreeram Ravishankar",
  firstName: "Sreeram",
  lastName: "Ravishankar",
  role: "Software Engineer - Java",
  email: "work.ram22@gmail.com",
  phone: "+91-9008174440",
  phoneHref: "tel:+919008174440",
  location: "Bengaluru, India",
  resumeSummary:
    "Software Engineer specializing in Java, Spring Boot, distributed microservices, and enterprise authentication platforms, with end-to-end ownership of scalable identity and event-driven backend services.",
  github: "https://github.com/workram22",
  linkedin: "https://www.linkedin.com/in/work-ram",
  resumePath: "/portfolio/resume.pdf",
  currentDept: "Enterprise Auth & Platforms",
  idNumber: "SR-900817",
  validTill: "2026",
  degreeSummary: "M.Sc. Information Technology · B.Tech E.C.E",
  quote:
    "Engineering resilient backend platforms through rigorous ownership, scalable identity architectures, and real-time event-driven pipelines."
};

export const NAV: NavItem[] = [
  { id: "about", label: "About", index: "01" },
  { id: "skills", label: "Skills", index: "02" },
  { id: "work", label: "Work", index: "03" },
  { id: "certifications", label: "Certifications", index: "04" },
  { id: "experience", label: "Experience", index: "05" },
  { id: "contact", label: "Contact", index: "06" }
];

export const ALL_SKILLS: SkillItem[] = [
  // Languages
  { num: 1, symbol: "Jv", name: "Java", family: "Languages", isBrand: true, logoKey: "java", projects: ["Hospital Management System", "Card Game", "Enterprise Auth Platform"] },
  { num: 2, symbol: "Sq", name: "SQL", family: "Languages", isBrand: false, logoKey: "sql", projects: ["ERP Systems", "Hospital Management System"] },
  { num: 3, symbol: "Ht", name: "HTML5", family: "Languages", isBrand: true, logoKey: "html5", projects: ["FLAGROOT ERP"] },
  { num: 4, symbol: "Cs", name: "CSS3", family: "Languages", isBrand: true, logoKey: "css3", projects: ["FLAGROOT ERP"] },

  // Frameworks & Architecture
  { num: 5, symbol: "Sb", name: "Spring Boot", family: "Frameworks", isBrand: true, logoKey: "spring", projects: ["Enterprise Auth Platform", "25+ Microservices"] },
  { num: 6, symbol: "Ss", name: "Spring Security", family: "Frameworks", isBrand: true, logoKey: "spring", projects: ["Enterprise Auth Platform"] },
  { num: 7, symbol: "Ms", name: "Microservices", family: "Frameworks", isBrand: false, logoKey: "microservices", projects: ["25+ Microservices at Yell"] },
  { num: 8, symbol: "Re", name: "RESTful APIs", family: "Frameworks", isBrand: false, logoKey: "rest", projects: ["Enterprise Auth Platform", "25+ Microservices"] },
  { num: 9, symbol: "J2", name: "J2EE", family: "Frameworks", isBrand: true, logoKey: "java", projects: ["FLAGROOT ERP"] },
  { num: 10, symbol: "Jd", name: "JDBC", family: "Frameworks", isBrand: true, logoKey: "java", projects: ["FLAGROOT ERP"] },

  // Security & Identity
  { num: 11, symbol: "Oa", name: "OAuth 2.0", family: "Security", isBrand: false, logoKey: "oauth", projects: ["Enterprise Auth Platform"] },
  { num: 12, symbol: "Jw", name: "JWT", family: "Security", isBrand: false, logoKey: "jwt", projects: ["Enterprise Auth Platform"] },
  { num: 13, symbol: "Bc", name: "Azure AD B2C", family: "Security", isBrand: true, logoKey: "azure", projects: ["Enterprise Auth Platform"] },
  { num: 14, symbol: "Cp", name: "B2C Custom Policies", family: "Security", isBrand: true, logoKey: "azure", projects: ["Enterprise Auth Platform"] },
  { num: 15, symbol: "Ar", name: "App Registrations", family: "Security", isBrand: true, logoKey: "azure", projects: ["Enterprise Auth Platform"] },

  // Cloud & Messaging
  { num: 16, symbol: "Az", name: "Azure", family: "Cloud", isBrand: true, logoKey: "azure", projects: ["Enterprise Auth Platform", "Real-time SAP Sync"] },
  { num: 17, symbol: "Sb", name: "Azure Service Bus", family: "Cloud", isBrand: true, logoKey: "azure", projects: ["Real-time SAP Sync"] },
  { num: 18, symbol: "Kv", name: "Azure Key Vault", family: "Cloud", isBrand: true, logoKey: "azure", projects: ["Enterprise Auth Platform"] },
  { num: 19, symbol: "Pl", name: "Azure Pipelines", family: "Cloud", isBrand: true, logoKey: "azure", projects: ["Enterprise Auth Platform"] },
  { num: 20, symbol: "Ai", name: "Application Insights", family: "Cloud", isBrand: true, logoKey: "azure", projects: ["Enterprise Auth Platform"] },

  // Databases
  { num: 21, symbol: "Pg", name: "PostgreSQL", family: "Databases", isBrand: true, logoKey: "postgresql", projects: ["Enterprise Services"] },
  { num: 22, symbol: "Rd", name: "Redis", family: "Databases", isBrand: true, logoKey: "redis", projects: ["Redis Session Management"] },
  { num: 23, symbol: "My", name: "MySQL", family: "Databases", isBrand: true, logoKey: "mysql", projects: ["Hospital Management System", "ERP"] },
  { num: 24, symbol: "Ml", name: "MarkLogic", family: "Databases", isBrand: false, logoKey: "database", projects: ["UK Production High-Availability Clusters"] },

  // DevOps & Tooling
  { num: 25, symbol: "Dk", name: "Docker", family: "DevOps", isBrand: true, logoKey: "docker", projects: ["Distributed Microservices"] },
  { num: 26, symbol: "Gt", name: "Git", family: "DevOps", isBrand: true, logoKey: "git", projects: ["All Repositories & CI Pipelines"] },
  { num: 27, symbol: "Jk", name: "Jenkins", family: "DevOps", isBrand: true, logoKey: "jenkins", projects: ["CI/CD Pipeline Automation"] },
  { num: 28, symbol: "Mv", name: "Maven", family: "DevOps", isBrand: false, logoKey: "maven", projects: ["Java Microservices"] },
  { num: 29, symbol: "Gd", name: "Gradle", family: "DevOps", isBrand: true, logoKey: "gradle", projects: ["Enterprise Java Services"] },
  { num: 30, symbol: "Sw", name: "Swagger / OpenAPI", family: "DevOps", isBrand: true, logoKey: "swagger", projects: ["RESTful API Contracts"] },
  { num: 31, symbol: "Fl", name: "Flyway", family: "DevOps", isBrand: false, logoKey: "flyway", projects: ["Database Schema Migrations"] },
  { num: 32, symbol: "Pm", name: "Postman", family: "DevOps", isBrand: true, logoKey: "postman", projects: ["API Integration Testing"] },
  { num: 33, symbol: "Jr", name: "Jira", family: "DevOps", isBrand: true, logoKey: "jira", projects: ["Agile Sprint Planning & Incident Tracking"] },

  // Concepts & Practices
  { num: 34, symbol: "Ds", name: "Data Structures & Algorithms", family: "Concepts", isBrand: false, logoKey: "dsa", projects: ["Core Problem Solving & System Architecture"] },
  { num: 35, symbol: "Dp", name: "Design Patterns", family: "Concepts", isBrand: false, logoKey: "patterns", projects: ["Enterprise Architecture"] },
  { num: 36, symbol: "Ag", name: "Agile (Scrum)", family: "Concepts", isBrand: false, logoKey: "agile", projects: ["Sprint Execution & Production Releases"] },
  { num: 37, symbol: "Ci", name: "CI/CD", family: "Concepts", isBrand: false, logoKey: "cicd", projects: ["Azure Pipelines & Jenkins Automation"] },
  { num: 38, symbol: "Td", name: "TDD", family: "Concepts", isBrand: false, logoKey: "tdd", projects: ["Backend Microservices Testing"] },
  { num: 39, symbol: "Sd", name: "SDLC", family: "Concepts", isBrand: false, logoKey: "sdlc", projects: ["End-to-End Enterprise Software Lifecycle"] }
];

export const SKILL_FAMILIES = ["All", "Languages", "Frameworks", "Security", "Cloud", "Databases", "DevOps", "Concepts"] as const;

export const PROJECTS: ProjectItem[] = [
  {
    id: "hospital-management-system",
    index: "01",
    title: "Development of a Hospital Management System",
    kicker: "Healthcare Systems · Academic Project",
    date: "December, 2021",
    description:
      "Engineered an enterprise healthcare administration solution handling patient records, department allocations, admission schedules, and clinic workflows with relational persistence and secure backend logic.",
    features: [
      "Patient registry & medical history tracking",
      "Departmental doctor-patient scheduling",
      "Relational SQL schema with optimized queries",
      "Robust backend validations and error handling"
    ],
    tech: ["Java", "SQL", "MySQL", "JDBC", "Data Structures"],
    miniUiType: "hospital"
  },
  {
    id: "interactive-card-game",
    index: "02",
    title: "IT+ Team Project – Interactive Card Game",
    kicker: "Distributed Mechanics · University of Glasgow",
    date: "July, 2021",
    description:
      "Collaborative multiplayer card game engine architected around strict object-oriented patterns, turn sequencing, real-time score computations, and clean modular component design.",
    features: [
      "Turn-based state management engine",
      "Strict object-oriented rules enforcement",
      "Multiplayer card deck distribution algorithms",
      "Responsive interactive gameplay interface"
    ],
    tech: ["Java", "OOP Design Patterns", "Data Structures", "Agile"],
    miniUiType: "cards"
  },
  {
    id: "base-band-data-handling",
    index: "03",
    title: "Test System for Base Band Data Handling System",
    kicker: "Aerospace Verification · U.R.S.C / ISRO",
    date: "April, 2018",
    description:
      "Designed and developed a specialized automated verification test system for the Base Band Data Handling System at the U.R. Rao Satellite Centre (ISRO), ensuring telemetry data integrity and signal pipeline validation.",
    features: [
      "Baseband telemetry data stream simulation",
      "Packet validation & bit-error integrity checks",
      "Hardware-software handshake automated test suite",
      "Mission-critical telemetry verification reporting"
    ],
    tech: ["Electronics & Comm.", "Data Pipelines", "System Testing", "ISRO Protocols"],
    miniUiType: "telemetry"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    index: "01",
    title: "Certificate of Appreciation: Taking Ownership (2024 & 2025)",
    issuer: "Straumann Group",
    date: "2024, 2025"
  },
  {
    index: "02",
    title: "HackerRank: Java (Basic)",
    issuer: "HackerRank",
    date: "December, 2021"
  },
  {
    index: "03",
    title: "Full Stack in Java Course Completion Certification",
    issuer: "JSPIDERS / QSPIDERS",
    date: "October, 2019 – October, 2020"
  },
  {
    index: "04",
    title: "Merit Award: 2nd Place",
    issuer: "LPSC, ISRO",
    date: "June, 2012"
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "2023 – Present",
    dateRange: "September, 2023 – Present",
    type: "experience",
    title: "Software Engineer - Java",
    organization: "Straumann Group",
    location: "Bengaluru, Karnataka, IN",
    points: [
      "Took end-to-end ownership of the enterprise authentication platform, driving development, enhancement, and production support for Azure AD B2C, Azure AD B2C Custom Policies, Azure App Registrations, login services, and user data services.",
      "Designed and delivered customer-facing backend services, modernized legacy applications, and contributed to developing an event-driven SAP synchronization solution using Azure Service Bus, replacing a 14-hour daily batch process with real-time updates.",
      "Introduced, designed, and implemented a Redis-based session management solution, leading its delivery from concept to production and improving session scalability, security, and user experience across authentication services.",
      "Led production incident troubleshooting, root-cause analysis, and platform improvements, improving service maintainability and earning the Certificate of Appreciation – Taking Ownership in 2024 and 2025 for exceptional technical ownership."
    ]
  },
  {
    year: "2022 – 2023",
    dateRange: "February, 2022 – August, 2023",
    type: "experience",
    title: "Software Engineer - Java",
    organization: "Yell",
    location: "Reading, England, UK",
    points: [
      "Developed and maintained backend services across 25+ enterprise microservices, building scalable REST APIs for distributed applications.",
      "Led large-scale content moderation initiatives by building backend endpoints to detect profanity levels and moderate over 100 million image and text files, improving platform compliance and content quality.",
      "Designed and configured MarkLogic server infrastructure supporting high-availability production applications across the UK.",
      "Developed and deployed backend microservices while supporting distributed system integrations and enterprise production releases."
    ]
  },
  {
    year: "2021 – 2022",
    dateRange: "January, 2021 – January, 2022",
    type: "education",
    title: "Master of Science (M.Sc.), Information Technology (I.T)",
    organization: "University of Glasgow",
    location: "Glasgow, Scotland, UK",
    points: [
      "Advanced postgraduate studies in Information Technology, distributed software engineering, data structures, and enterprise systems.",
      "Engineered the IT+ Team Project Interactive Card Game with distributed state mechanics."
    ]
  },
  {
    year: "2019 – 2020",
    dateRange: "October, 2019 – October, 2020",
    type: "experience",
    title: "Java Full Stack Intern",
    organization: "FLAGROOT",
    location: "Bengaluru, Karnataka, IN",
    points: [
      "Carried out numerous projects along with the Java Full Stack Course Training held at JSPIDERS/QSPIDERS.",
      "Developed ERP Systems with technologies like Java, JDBC, SQL, J2EE, and Basics of HTML and CSS."
    ]
  },
  {
    year: "2014 – 2018",
    dateRange: "August, 2014 – August, 2018",
    type: "education",
    title: "Bachelor of Technology (B. Tech), Electronics and Communication (E.C.E)",
    organization: "Reva University",
    location: "Bengaluru, Karnataka, IN",
    points: [
      "Graduated with foundational degree in Electronics and Communication Engineering.",
      "Conducted final year project at U.R. Rao Satellite Centre (ISRO): Development of a Test System for Base Band Data Handling System (April, 2018)."
    ]
  }
];
