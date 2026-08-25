import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import PlayHero from "@/features/play/components/PlayHero";
import GameCard from "@/features/play/components/GameCard";

export const metadata: Metadata = {
  title: "Play – Interactive Frontend & Web Engineering Playground | Rajesh Tiwari",
  description:
    "Interactive frontend, performance, architecture, security, and web engineering challenges. Learn concepts, solve real-world problems, and see results instantly.",
};

type CategorySectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function CategorySection({ title, description, children }: CategorySectionProps) {
  return (
    <div className="border-t border-border/20 pt-10 first:border-none first:pt-0">
      <div className="mb-6">
        <h2 className="font-[family:var(--font-display)] text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
        <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
          {description}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {children}
      </div>
    </div>
  );
}

export default function PlayPage() {
  return (
    <MotionMountSection
      delay={0.06}
      className="pt-2 px-4 pb-12 sm:px-6 md:pb-24"
    >
      <div className="mx-auto w-full max-w-[1040px]">
        {/* Hero Header */}
        <PlayHero
          subtitle="Engineering Playground"
          title="Play. Experiment. Learn."
          description="Interactive, data-driven web engineering challenges designed to make technical concepts visual and fun. Experiment with code, investigate problems, and learn why."
        />

        <div className="mt-12 flex flex-col gap-14 md:mt-16">
          {/* CATEGORY 1: Frontend */}
          <CategorySection
            title="1. Frontend Craft"
            description="Master alignment, logic, layout tracks, state cycles, and digital accessibility."
          >
            <GameCard
              title="JavaScript Arena"
              description="Predict output and test deep JavaScript knowledge on hoisting, coercion, event loop, and scoping."
              icon="🧠"
              buttonText="Play Challenge"
              href="/play/javascript"
              delay={0.1}
            />
            <GameCard
              title="CSS Flexbox Lab"
              description="Experiment with Flexbox alignments visually and map exact styles to match target layouts."
              icon="🎨"
              buttonText="Start Playing"
              href="/play/css-flex"
              delay={0.15}
            />
            <GameCard
              title="CSS Grid Lab"
              description="Build 2D grid structures visually. Align cells, trace tracks, and stretch spanning blocks."
              icon="▦"
              buttonText="Start Playing"
              href="/play/css-grid"
              delay={0.2}
            />
            <GameCard
              title="React Challenge"
              description="Interactive exercises covering state batches, effect loops, re-render triggers, and hooks."
              icon="⚛️"
              buttonText="Play Challenge"
              href="/play/react"
              delay={0.25}
            />
            <GameCard
              title="Accessibility Detective"
              description="Inspect markup to find semantic errors, focus issues, low contrast, and screen-reader violations."
              icon="♿"
              buttonText="Start Playing"
              href="/play/accessibility"
              delay={0.3}
            />
          </CategorySection>

          {/* CATEGORY 2: Web Performance */}
          <CategorySection
            title="2. Web Performance"
            description="Inspect, profile, and compress bundles and layout states to hit optimal speeds."
          >
            <GameCard
              title="Core Web Vitals Lab"
              description="Identify causes for high LCP, CLS, and INP metrics in realistic rendering simulations."
              icon="⚡"
              buttonText="Start Playing"
              href="/play/vitals"
              delay={0.1}
            />
            <GameCard
              title="Lighthouse Optimizer"
              description="Pick target optimizations to raise audits for performance, best practices, and SEO scores."
              icon="🚨"
              buttonText="Start Playing"
              href="/play/lighthouse"
              delay={0.15}
            />
            <GameCard
              title="Bundle Optimizer"
              description="Apply dynamic imports, code splitting, tree shaking, and compress simulated script sizes."
              icon="📦"
              buttonText="Start Playing"
              href="/play/bundle"
              delay={0.2}
            />
          </CategorySection>

          {/* CATEGORY 3: SEO */}
          <CategorySection
            title="3. Search Engine Optimization"
            description="Manage head tags, structures, and robots files to ensure perfect search indexing."
          >
            <GameCard
              title="SEO Detective"
              description="Find and fix missing tags, heading hierarchies, canonical links, and image alt text."
              icon="🔍"
              buttonText="Start Playing"
              href="/play/seo"
              delay={0.1}
            />
            <GameCard
              title="Googlebot Simulator"
              description="Direct crawlers with sitemaps and indexing rules. Watch crawler pathways in real time."
              icon="🤖"
              buttonText="Start Playing"
              href="/play/googlebot"
              delay={0.15}
            />
            <GameCard
              title="robots.txt Challenge"
              description="Verify if specific path URLs are allowed or disallowed under parsed user-agent directives."
              icon="📄"
              buttonText="Play Challenge"
              href="/play/robots"
              delay={0.2}
            />
            <GameCard
              title="Structured Data Builder"
              description="Validate and construct JSON-LD snippets for breadcrumbs, products, and articles."
              icon="🏷️"
              buttonText="Start Playing"
              href="/play/structured-data"
              delay={0.25}
            />
          </CategorySection>

          {/* CATEGORY 4: Developer Workflow */}
          <CategorySection
            title="4. Developer Workflow"
            description="Resolve version gaps, configure build pipelines, and troubleshoot live runtime bugs."
          >
            <GameCard
              title="Debug Hunter"
              description="Troubleshoot realistic, live frontend bugs. Use terminal outputs, logs, and network tabs."
              icon="🐛"
              buttonText="Start Playing"
              href="/play/debug"
              delay={0.1}
            />
            <GameCard
              title="Git Quest"
              description="Command git branches, cherries, stashes, rebases, and merges in a visual tree explorer."
              icon="🌳"
              buttonText="Start Playing"
              href="/play/git"
              delay={0.15}
            />
            <GameCard
              title="Git Conflict Resolver"
              description="Fix matching text conflicts between HEAD branches and features using split merge editors."
              icon="💥"
              buttonText="Start Playing"
              href="/play/git-conflicts"
              delay={0.2}
            />
            <GameCard
              title="CI/CD Pipeline Builder"
              description="Drag and compile pipeline steps to install, build, check, and safely publish applications."
              icon="🚀"
              buttonText="Start Playing"
              href="/play/pipeline"
              delay={0.25}
            />
          </CategorySection>

          {/* CATEGORY 5: Cloud & Architecture */}
          <CategorySection
            title="5. Cloud & Architecture"
            description="Design scalable server meshes and caching layers to accommodate millions of requests."
          >
            <GameCard
              title="Cloud Builder"
              description="Link CDNs, balancers, server clusters, caches, and databases into a resilient network."
              icon="☁️"
              buttonText="Start Playing"
              href="/play/cloud"
              delay={0.1}
            />
            <GameCard
              title="Scale the Application"
              description="Upgrade infrastructure assets to manage rapid traffic increases without crashes or high costs."
              icon="📈"
              buttonText="Start Playing"
              href="/play/scale"
              delay={0.15}
            />
          </CategorySection>

          {/* CATEGORY 6: Application Security */}
          <CategorySection
            title="6. Application Security"
            description="Identify scripts injections, query breaches, and implement solid defensive headers."
          >
            <GameCard
              title="Security Detective"
              description="Troubleshoot insecure injection vulnerabilities, SQL issues, XSS scripts, and broken auth."
              icon="🛡️"
              buttonText="Start Playing"
              href="/play/security"
              delay={0.1}
            />
            <GameCard
              title="Secure the Application"
              description="Lock down headers, configure solid Content Security Policies (CSP), and encrypt session secrets."
              icon="🔑"
              buttonText="Start Playing"
              href="/play/secure"
              delay={0.15}
            />
          </CategorySection>

          {/* CATEGORY 7: Browser & Networking */}
          <CategorySection
            title="7. Browser & Networking"
            description="Map networking hops, packet tunnels, and response status definitions."
          >
            <GameCard
              title="HTTP Journey"
              description="Trace the exact network path from DNS resolver, TLS tunnel, server payload, and rendering."
              icon="🌐"
              buttonText="Start Playing"
              href="/play/http"
              delay={0.1}
            />
            <GameCard
              title="HTTP Status Challenge"
              description="Quickly identify redirect, authorization, missing resource, and gateway server errors."
              icon="🔢"
              buttonText="Play Challenge"
              href="/play/status"
              delay={0.15}
            />
          </CategorySection>
        </div>
      </div>
    </MotionMountSection>
  );
}
