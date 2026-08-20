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
    title: "Clutchly - AI Voice Interview Coach",
    points: [
      "AI voice interview coach with a full-duplex speech pipeline — Deepgram Voice Agent, Nova-3 STT, and Aura-2 TTS.",
      "Real-time adaptive question generation via Gemini 2.5 with structured multi-dimensional answer evaluation.",
      "Long-term semantic graph memory (Cognee Cloud) recalls past weaknesses to personalize sessions, plus per-stage token and cost observability.",
    ],
    href: "https://interview-memory-agent.vercel.app/",
    repoHref: "https://github.com/Rajesh2github/interview-memory-agent",
    featured: true,
    tags: [
      { id: 1, name: "Next.js", icon: SiNextdotjs },
      { id: 2, name: "TypeScript", icon: SiTypescript },
      { id: 3, name: "Gemini 2.5", icon: SiGooglegemini },
      { id: 4, name: "Prisma", icon: SiPrisma },
      { id: 5, name: "PostgreSQL", icon: SiPostgresql },
      { id: 6, name: "Clerk", icon: SiClerk },
    ],
  },
  {
    title: "HumanCaptcha",
    points: [
      "Browser-native CAPTCHA replacing mouse-and-keyboard verification with MediaPipe hand-gesture tracking and cognitive puzzles.",
      "Live camera capture, pinch-based cursor control, and multi-step spatial interaction to resist bot automation.",
      "Reusable embeddable SDK — a drop-in <HumanCaptcha /> React component with dynamically generated image puzzles.",
    ],
    href: "https://human-captcha.vercel.app/",
    repoHref: "https://github.com/Rajesh2github/human-captcha",
    featured: true,
    tags: [
      { id: 1, name: "Next.js", icon: SiNextdotjs },
      { id: 2, name: "TypeScript", icon: SiTypescript },
      { id: 3, name: "MediaPipe", icon: SiMediapipe },
      { id: 4, name: "Tailwind CSS", icon: SiTailwindcss },
      { id: 5, name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    title: "Finora - Finance Dashboard",
    points: [
      "Multi-route finance dashboard with analytics, transactions, and real-time currency conversion.",
      "Built using Next.js 16, React 19, Zustand, and Recharts.",
      "Responsive layout with role-based UI, dark mode, and persistent state management.",
    ],
    href: "https://finora.rajeshtiwari.in/",
    repoHref: "https://github.com/Rajesh2github/finance-dashboard",
    featured: true,
    tags: [
      { id: 1, name: "Next.js", icon: SiNextdotjs },
      { id: 2, name: "React 19", icon: SiReact },
      { id: 3, name: "Node.js", icon: SiNodedotjs },
      { id: 4, name: "PostgreSQL", icon: SiPostgresql },
      { id: 5, name: "Tailwind v4", icon: SiTailwindcss },
      { id: 6, name: "TypeScript", icon: SiTypescript },
    ],
  },
  {
    title: "EzMeet",
    points: [
      "Full-stack meeting scheduling platform productized from an internship prototype into a production-ready system.",
      "Timezone-aware UTC slot management with conflict-resolution logic for zero scheduling conflicts across time zones.",
      "Google Calendar, Google Meet, and Zoom integrations covering end-to-end event creation, availability, and booking.",
    ],
    href: "https://ez-meet-xyz.vercel.app/",
    repoHref: "https://github.com/Rajesh2github/EzMeet",
    tags: [
      { id: 1, name: "React", icon: SiReact },
      { id: 2, name: "Node.js", icon: SiNodedotjs },
      { id: 3, name: "Express.js", icon: SiExpress },
      { id: 4, name: "Supabase", icon: SiSupabase },
      { id: 5, name: "Google Calendar", icon: SiGooglecalendar },
      { id: 6, name: "Zoom", icon: SiZoom },
    ],
  },
  {
    title: "AI Chat Bot",
    points: [
      "Real-time chat application with AI integration and live messaging.",
      "Socket.io powers instant communication and updates.",
      "Redis handles caching and session management.",
    ],
    href: "#",
    repoHref: "https://github.com/Rajesh2github/AI-Chat-Bot",
    tags: [
      { id: 1, name: "React", icon: SiReact },
      { id: 2, name: "Node.js", icon: SiNodedotjs },
      { id: 3, name: "MongoDB", icon: SiMongodb },
      { id: 4, name: "Redis", icon: SiRedis },
    ],
  },
  {
    title: "Portfolio Website",
    points: [
      "Modern personal portfolio showcasing projects and skills.",
      "Built with React and Vite for strong performance.",
      "Focused on smooth animations and a clean UI.",
    ],
    href: "#",
    repoHref: "https://github.com/Rajesh2github/Portfolio-Website",
    tags: [
      { id: 1, name: "React", icon: SiReact },
      { id: 2, name: "Tailwind", icon: SiTailwindcss },
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
