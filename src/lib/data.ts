import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import {
  FaCss3Alt,
  FaDatabase,
  FaDocker,
  FaGithub,
  FaHtml5,
  FaJava,
  FaLinux,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiClerk,
  SiCplusplus,
  SiExpress,
  SiFastapi,
  SiFramer,
  SiGooglecalendar,
  SiGooglegemini,
  SiJavascript,
  SiMediapipe,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiZoom,
  SiRedux,
  SiBootstrap,
  SiSpringboot,
  SiPostman,
  SiSwagger,
  SiGooglecloud,
  SiGitlab,
} from "react-icons/si";
import { TbApi, TbBinaryTree } from "react-icons/tb";

export const links = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
] as const;

export const sections = [
  { name: "Introduction", hash: "#introduction" },
  { name: "Skills", hash: "#skills" },
  { name: "My Journey", hash: "#my-journey" },
  { name: "Contact", hash: "#contact" },
] as const;

export const experiencesData = [
  {
    title: "Senior Software Engineer",
    location: "AirAsia | Bangalore, India",
    description:
      "• Led the development of OTA booking platforms across Web (React) and Mobile (React Native) to enhance the end-to-end booking experience.\n" +
      "• Improved application performance (reduced load times by around 30%) via code-splitting, lazy loading, and Redux optimization.\n" +
      "• Built modular, theme-aware shared UI component library to ensure UX consistency across multiple Lines of Business.\n" +
      "• Developed Promotions pages across platforms and implemented installment/EMI payment features for high-value bookings.\n",
    icon: React.createElement(CgWorkAlt),
    date: "Aug 2021 - Present",
  },
  {
    title: "Lead Engineer",
    location: "HCL Software | Pune, India",
    description:
      "• Modernized legacy desktop enterprise tool into high-performing, scalable React/Redux web-based application.\n" +
      "• Supported frontend architecture design of Enterprise Framework (EF) platform to reduce technical complexity.\n" +
      "• Built shared UI component library and created automated UI generation system parsing JSON schemas into dynamic forms.\n",
    icon: React.createElement(CgWorkAlt),
    date: "Dec 2018 - Aug 2021",
  },
  {
    title: "Application Developer Analyst",
    location: "Accenture Solutions | Pune, India",
    description:
      "• Migrated UK Home Office Visa Application System from monolithic architecture to 34+ independent Java/Spring Boot microservices.\n" +
      "• Developed secure, scalable APIs for visa processing workflows and integrated React frontends with backend service layers.\n" +
      "• Designed and implemented key banking modules for Commerzbank covering loans, retail banking, and corporate finance.\n",
    icon: React.createElement(CgWorkAlt),
    date: "May 2016 - Nov 2018",
  },
  {
    title: "Master of Computer Applications (MCA)",
    location: "DAVV University | Indore, India",
    description:
      "• CGPA: 8.69\n" +
      "• Specialized in advanced software engineering, computer architectures, web programming, and database systems.\n",
    icon: React.createElement(LuGraduationCap),
    date: "2013 - 2016",
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    location: "BU University | Bhopal, India",
    description:
      "• Aggregate: 75.68%\n" +
      "• Foundation in computer applications, programming languages (C, C++, Java), and web development.\n",
    icon: React.createElement(LuGraduationCap),
    date: "2009 - 2012",
  },
] as const;

export const myProjects = [
  {
    title: "rtk-query-app",
    points: [
      "Built a high-performance React application illustrating global state management and data fetching via Redux Toolkit (RTK) Query.",
      "Implemented smart query caching, automated cache invalidation, and optimized request polling mechanisms to reduce server load.",
      "Leveraged TypeScript for absolute type-safe request/response bodies, query parameters, and global store states.",
    ],
    href: "https://github.com/Rajesh2github/rtk-query-app",
    repoHref: "https://github.com/Rajesh2github/rtk-query-app",
    featured: true,
    tags: [
      { id: 1, name: "React", icon: FaReact },
      { id: 2, name: "Redux Toolkit", icon: SiRedux },
      { id: 3, name: "TypeScript", icon: SiTypescript },
    ],
  },
  {
    title: "namaste-frontend-system-design",
    points: [
      "Curated modular blueprints, high-level architectures, and deep checklists for massive scale Frontend System Design.",
      "Analyzed modern load-optimizations, image-delivery CDNs, progressive rendering states, and aggressive client-side caching schemas.",
      "Documented clean-code guidelines, modular component structures, security policies (XSS, CSRF), and multi-tier authentication.",
    ],
    href: "https://github.com/Rajesh2github/namaste-frontend-system-design",
    repoHref: "https://github.com/Rajesh2github/namaste-frontend-system-design",
    featured: true,
    tags: [
      { id: 1, name: "System Design", icon: TbBinaryTree },
      { id: 2, name: "Web Performance", icon: TbApi },
      { id: 3, name: "Architecture", icon: SiFramer },
    ],
  },
  {
    title: "shimmer",
    points: [
      "Developed a custom lightweight React component library implementing smooth, pulsing Shimmer (skeleton) loading placeholders.",
      "Slashed bounce rates and improved overall UX by replacing jarring spinners with native skeletal layout previews.",
      "Engineered hardware-accelerated CSS animations for highly fluid, 60fps shimmer scanning effects across different screen sizes.",
    ],
    href: "https://github.com/Rajesh2github/shimmer",
    repoHref: "https://github.com/Rajesh2github/shimmer",
    featured: true,
    tags: [
      { id: 1, name: "React", icon: FaReact },
      { id: 2, name: "UX Design", icon: SiFramer },
      { id: 3, name: "CSS3", icon: FaCss3Alt },
    ],
  },
  {
    title: "Routing-Protected-Routes",
    points: [
      "Designed a highly secure, nested routing model using React Router to illustrate protected routing architectures.",
      "Integrated client-side authentication checks, session verification hooks, and automated redirections for anonymous requests.",
      "Built multi-role access controls allowing or restricting nested dashboard routes based on user authorization levels.",
    ],
    href: "https://github.com/Rajesh2github/Routing-Protected-Routes",
    repoHref: "https://github.com/Rajesh2github/Routing-Protected-Routes",
    tags: [
      { id: 1, name: "React Router", icon: TbApi },
      { id: 2, name: "Security", icon: SiClerk },
      { id: 3, name: "Authentication", icon: SiTypescript },
    ],
  },
  {
    title: "tanStack_Query",
    points: [
      "Constructed a robust async-state React application demonstrating integration of TanStack Query (React Query).",
      "Features background data synchronization, automatic refetching upon window focus, and manual queries trigger parameters.",
      "Implemented infinite scroll pipelines and pagination utilizing server-cache states for frictionless, lag-free list scroll behavior.",
    ],
    href: "https://github.com/Rajesh2github/tanStack_Query",
    repoHref: "https://github.com/Rajesh2github/tanStack_Query",
    tags: [
      { id: 1, name: "TanStack Query", icon: SiRedis },
      { id: 2, name: "React", icon: FaReact },
      { id: 3, name: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    title: "DSA-Solutions",
    points: [
      "Maintained a curated repository of cleanly optimized solutions for complex Data Structures and Algorithms problems.",
      "Includes LeetCode questions focusing on runtime complexities, heap/stack space limits, sorting, binary trees, and binary search.",
      "Wrote comprehensive JS/TS helper tests mapping expected edge-cases, validation limits, and complexity outcomes.",
    ],
    href: "https://github.com/Rajesh2github/DSA",
    repoHref: "https://github.com/Rajesh2github/DSA",
    tags: [
      { id: 1, name: "Algorithms", icon: TbBinaryTree },
      { id: 2, name: "Data Structures", icon: TbBinaryTree },
      { id: 3, name: "JavaScript", icon: SiJavascript },
    ],
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "React Native",
  "Redux",
  "Java",
  "Spring Boot",
  "REST APIs",
  "MongoDB",
  "PostgreSQL",
  "Oracle",
  "Git",
  "GitHub",
  "GitLab",
  "Docker",
  "Postman",
  "Swagger",
  "GCP",
  "Tailwind CSS",
  "Bootstrap",
] as const;

export const skillIconsData: Record<string, React.ReactElement> = {
  HTML: React.createElement(FaHtml5),
  CSS: React.createElement(FaCss3Alt),
  JavaScript: React.createElement(SiJavascript),
  TypeScript: React.createElement(SiTypescript),
  React: React.createElement(FaReact),
  "React Native": React.createElement(FaReact),
  Redux: React.createElement(SiRedux),
  Java: React.createElement(FaJava),
  "Spring Boot": React.createElement(SiSpringboot),
  "REST APIs": React.createElement(TbApi),
  MongoDB: React.createElement(SiMongodb),
  PostgreSQL: React.createElement(SiPostgresql),
  Oracle: React.createElement(FaDatabase),
  Git: React.createElement(FaGithub), // standard git can be fallback to Github or customized
  GitHub: React.createElement(FaGithub),
  GitLab: React.createElement(SiGitlab),
  Docker: React.createElement(FaDocker),
  Postman: React.createElement(SiPostman),
  Swagger: React.createElement(SiSwagger),
  GCP: React.createElement(SiGooglecloud),
  "Tailwind CSS": React.createElement(SiTailwindcss),
  Bootstrap: React.createElement(SiBootstrap),
};

export const skillColors: Record<string, string> = {
  HTML: "#E34F26",
  CSS: "#1572B6",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  React: "#61DAFB",
  "React Native": "#61DAFB",
  Redux: "#764ABC",
  Java: "#007396",
  "Spring Boot": "#6DB33F",
  "REST APIs": "#0EA5E9",
  MongoDB: "#47A248",
  PostgreSQL: "#336791",
  Oracle: "#F80000",
  Git: "#F05032",
  GitHub: "#181717",
  GitLab: "#FCA121",
  Docker: "#2496ED",
  Postman: "#FF6C37",
  Swagger: "#85EA2D",
  GCP: "#4285F4",
  "Tailwind CSS": "#06B6D4",
  Bootstrap: "#7952B3",
  "Gemini 2.5": "#8E75B2",
  Prisma: "#5A67D8",
  Clerk: "#6C47FF",
  MediaPipe: "#0097A7",
  "Google Calendar": "#4285F4",
  Zoom: "#2D8CFF",
};
