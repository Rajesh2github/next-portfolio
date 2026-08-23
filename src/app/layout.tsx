import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "lenis/dist/lenis.css";
import "./globals.css";
import "@/styles/mdx.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { Toaster } from "react-hot-toast";
import LenisProvider from "@/components/providers/lenis-provider";
import { MotionProvider } from "@/components/ui/reveal";
// import GalaxyDeferred from "@/components/3d/GalaxyDeferred";

const siteUrl = "https://www.rajesh2github.in";
const siteName = "Rajesh Tiwari";
const siteTitle = "Rajesh Tiwari | Full-Stack Developer";
const siteDescription =
  "Building scalable web applications, API-driven systems, Chrome extensions, and modern digital experiences using Next.js, React, TypeScript, and backend technologies.";
const ogImageUrl = `${siteUrl}/OG_image.png?v=2`;
const ogImage = {
  url: ogImageUrl,
  secureUrl: ogImageUrl,
  width: 1731,
  height: 909,
  alt: "Dark premium developer branding for Rajesh Tiwari, Full-Stack Developer at Rajesh2github.",
  type: "image/png",
};

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Rajesh Tiwari",
  },
  description: siteDescription,
  applicationName: "Rajesh2github",
  keywords: [
    "Full-Stack Developer",
    "Rajesh Tiwari",
    "Rajesh2github",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Node.js",
    "Portfolio Website",
    "Software Engineer",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Rajesh2github",
    type: "website",
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Rajesh2github_",
    creator: "@Rajesh2github_",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark overflow-x-hidden"
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${manrope.className} ${manrope.variable} ${sora.variable} relative flex min-h-screen min-h-dvh flex-col overflow-x-hidden bg-background text-foreground transition-colors duration-300`}
        suppressHydrationWarning
      >
        <div className="light-canvas pointer-events-none absolute inset-0 -z-20 opacity-100 transition-opacity duration-500 dark:opacity-0" />
        <div className="dark-canvas pointer-events-none absolute inset-0 -z-20 opacity-0 transition-opacity duration-500 dark:opacity-100" />
        {/* <div className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
          <GalaxyDeferred />
        </div> */}
        {/* BACKGROUND BLOBS */}
        <div className="pointer-events-none absolute top-[-7rem] right-[8rem] -z-10 hidden h-[34rem] w-[34rem] rounded-full bg-[var(--project-glow-primary)] opacity-100 blur-[9rem] transition-opacity duration-500 dark:opacity-0 sm:block sm:w-[72rem]"></div>
        <div className="pointer-events-none absolute top-[-2rem] left-[-32rem] -z-10 hidden h-[32rem] w-[54rem] rounded-full bg-secondary/70 opacity-70 blur-[9rem] transition-opacity duration-500 dark:opacity-0 sm:block sm:w-[72rem] md:left-[-30rem] lg:left-[-24rem] xl:left-[-12rem] 2xl:left-[-4rem]"></div>
        <div className="pointer-events-none absolute left-[22%] top-[5rem] -z-10 hidden h-[30rem] w-[46rem] rounded-full bg-accent/60 opacity-85 blur-[11rem] transition-opacity duration-500 dark:opacity-0 sm:block" />

        <MotionProvider>
          <LenisProvider>
            <ActiveSectionContextProvider>
              <Header />
              {/* CONTENT */}
              <main className="w-full flex-1 pt-32 pb-24 sm:pb-10">
                <div className="w-full">{children}</div>
              </main>
              <Footer />
              <Toaster position="top-right" />
              <Analytics />
              <SpeedInsights />
            </ActiveSectionContextProvider>
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}

