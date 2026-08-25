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
  SiFirebase,
} from "react-icons/si";
import { TbApi, TbBinaryTree } from "react-icons/tb";

export const links = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Play", href: "/play" },
  { name: "AI", href: "/ai" },
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
    title: "OmniBooking — High-Performance OTA Platform",
    points: [
      "Architected and led the development of a unified high-throughput booking platform across Web (React) and Mobile (React Native) serving millions of active users monthly.",
      "Designed and implemented a dynamic theme engine and design-token compilation pipeline driven by remote configuration, enabling instant visual rebranding without app store releases.",
      "Engineered a native, high-performance React Native one-page checkout flow replacing legacy, sluggish WebView layers, boosting successful transaction completions by 25%.",
    ],
    href: "https://www.linkedin.com/in/rajesh-tiwari-reactjs-javascript/",
    repoHref: "https://github.com/Rajesh2github",
    featured: true,
    tags: [
      { id: 1, name: "React", icon: FaReact },
      { id: 2, name: "React Native", icon: FaReact },
      { id: 3, name: "Redux Toolkit", icon: SiRedux },
      { id: 4, name: "TypeScript", icon: SiTypescript },
      { id: 5, name: "REST APIs", icon: TbApi },
    ],
  },
  {
    title: "SchemaFlow — Enterprise Schema-Driven UI Engine",
    points: [
      "Architected a highly scalable, metadata-driven UI platform that automatically parses complex JSON schemas into production-ready React screens.",
      "Designed advanced parsing logic supporting runtime validation compiling, multi-field conditional dependencies, and on-the-fly state bindings, reducing manual frontend dev cycles by 80%.",
      "Ensured strict compliance with WCAG 2.1 accessibility specifications, incorporating robust aria-live screen announcements, keyboard traps, and accessible validation states.",
    ],
    href: "https://www.linkedin.com/in/rajesh-tiwari-reactjs-javascript/",
    repoHref: "https://github.com/Rajesh2github",
    featured: true,
    tags: [
      { id: 1, name: "React", icon: FaReact },
      { id: 2, name: "System Design", icon: TbBinaryTree },
      { id: 3, name: "Accessibility", icon: SiFramer },
      { id: 4, name: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    title: "PromoDash — Automated Banner CMS & Content Pipeline",
    points: [
      "Developed a full-stack, CMS-style self-serve Banner Management Dashboard enabling non-technical marketing teams to schedule and publish layout banners independently.",
      "Eliminated manual developer-driven code deployments, reducing banner propagation times across global CDNs from hours to under 30 seconds.",
      "Designed drag-and-drop banner schedulers, advanced targeting rules, and built validation layers ensuring zero layout regressions across the consumer Super App.",
    ],
    href: "https://www.linkedin.com/in/rajesh-tiwari-reactjs-javascript/",
    repoHref: "https://github.com/Rajesh2github",
    featured: true,
    tags: [
      { id: 1, name: "React", icon: FaReact },
      { id: 2, name: "Web Performance", icon: TbApi },
      { id: 3, name: "Redux", icon: SiRedux },
      { id: 4, name: "Architecture", icon: TbBinaryTree },
    ],
  },
  {
    title: "CoreSecure — Resilient Banking Microservice Gateway",
    points: [
      "Led the technical migration of a mission-critical government monolith system into 34+ secure, isolated Spring Boot microservices.",
      "Designed high-throughput REST APIs and transactional workflows utilizing Spring Security, Hibernate, JWT, and PostgreSQL database-driven partition schemes.",
      "Implemented complex financial business logic covering corporate loans and retail finance systems complying with strict regulatory auditing standards.",
    ],
    href: "https://www.linkedin.com/in/rajesh-tiwari-reactjs-javascript/",
    repoHref: "https://github.com/Rajesh2github",
    tags: [
      { id: 1, name: "Java", icon: FaJava },
      { id: 2, name: "Spring Boot", icon: SiSpringboot },
      { id: 3, name: "PostgreSQL", icon: SiPostgresql },
      { id: 4, name: "Microservices", icon: TbBinaryTree },
    ],
  },
] as const;

export const skillsData = [
  "React",
  "React Native",
  "Next.js",
  "TypeScript",
  "JavaScript",
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
  "Firebase",
  "Tailwind CSS",
  "Bootstrap",
  "HTML",
  "CSS",
] as const;

export const skillIconsData: Record<string, React.ReactElement> = {
  React: React.createElement(FaReact),
  "React Native": React.createElement(FaReact),
  "Next.js": React.createElement(SiNextdotjs),
  TypeScript: React.createElement(SiTypescript),
  JavaScript: React.createElement(SiJavascript),
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
  Firebase: React.createElement(SiFirebase),
  "Tailwind CSS": React.createElement(SiTailwindcss),
  Bootstrap: React.createElement(SiBootstrap),
  HTML: React.createElement(FaHtml5),
  CSS: React.createElement(FaCss3Alt),
};

export const skillColors: Record<string, string> = {
  React: "#61DAFB",
  "React Native": "#61DAFB",
  "Next.js": "#ffffff",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
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
  Firebase: "#FFCA28",
  "Tailwind CSS": "#06B6D4",
  Bootstrap: "#7952B3",
  HTML: "#E34F26",
  CSS: "#1572B6",
  "Gemini 2.5": "#8E75B2",
  Prisma: "#5A67D8",
  Clerk: "#6C47FF",
  MediaPipe: "#0097A7",
  "Google Calendar": "#4285F4",
  Zoom: "#2D8CFF",
};
