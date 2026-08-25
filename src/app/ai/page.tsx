import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import AiHero from "@/features/ai/components/AiHero";
import AiCategorySection from "@/features/ai/components/AiCategorySection";
import GameCard from "@/features/play/components/GameCard";

export const metadata: Metadata = {
  title: "AI Playground – Interactive AI & LLM Engineering | Rajesh Tiwari",
  description:
    "Explore AI, LLMs, RAG, Agents, and MCP protocols through interactive visual simulations and technical challenges.",
};

export default function AiPlaygroundPage() {
  return (
    <MotionMountSection
      delay={0.06}
      className="pt-6 px-4 pb-12 sm:px-6 md:pb-24"
    >
      <div className="mx-auto w-full max-w-[1040px]">
        {/* Hero Section */}
        <AiHero
          subtitle="AI Engineering Playground"
          title="AI Playground"
          description="Explore AI, LLMs, RAG, Agents, and MCP through interactive visual simulations. Learn concepts, investigate system parameters, and solve engineering challenges."
        />

        {/* Categories Grid Container */}
        <div className="mt-12 flex flex-col gap-14 md:mt-16">
          {/* CATEGORY 1: Fundamentals */}
          <AiCategorySection
            title="1. AI Fundamentals"
            description="Explore the absolute foundations of Machine Learning, Neural Networks, and Generative LLMs."
          >
            <GameCard
              title="AI Knowledge Quiz"
              description="Test your knowledge of core AI, ML, Deep Learning, and Generative LLM architectures."
              icon="🧠"
              buttonText="Coming Soon"
              href="/ai/fundamentals"
              disabled
              delay={0.1}
            />
          </AiCategorySection>

          {/* CATEGORY 2: LLM Mechanics */}
          <AiCategorySection
            title="2. LLM Mechanics"
            description="Visualize tokenize streams, investigate context budgets, and adjust deep inference parameters."
          >
            <GameCard
              title="Token Visualizer"
              description="Analyze how text inputs decompose into numerical token structures and verify cost ratios."
              icon="🔢"
              buttonText="Coming Soon"
              href="/ai/tokens"
              disabled
              delay={0.1}
            />
            <GameCard
              title="Context Window Lab"
              description="Manage prompts, systemic instructions, and documents in a live, visual context window layout."
              icon="🖼️"
              buttonText="Coming Soon"
              href="/ai/context"
              disabled
              delay={0.15}
            />
            <GameCard
              title="LLM Visualizer"
              description="Trace the exact network path from user prompts, context compiling, and next-token probability prediction."
              icon="👁️"
              buttonText="Coming Soon"
              href="/ai/llm"
              disabled
              delay={0.2}
            />
            <GameCard
              title="LLM Parameters Lab"
              description="Fine-tune inference temperatures, Top-K, Top-P, and max-token thresholds inside response simulators."
              icon="🎛️"
              buttonText="Coming Soon"
              href="/ai/parameters"
              disabled
              delay={0.25}
            />
            <GameCard
              title="Embedding Spaces"
              description="Plot text meanings inside semantic 2D vector coordinate frames and resolve cosine similarities."
              icon="📍"
              buttonText="Coming Soon"
              href="/ai/embeddings"
              disabled
              delay={0.3}
            />
          </AiCategorySection>

          {/* CATEGORY 3: Retrieval-Augmented Generation */}
          <AiCategorySection
            title="3. Retrieval-Augmented Generation"
            description="Augment raw model prompts by retrieving verified, semantic knowledge chunks from vector databases."
          >
            <GameCard
              title="RAG Simulator"
              description="Audit chunk retrieval, check vector DB searches, and construct context payloads."
              icon="📚"
              buttonText="Coming Soon"
              href="/ai/rag"
              disabled
              delay={0.1}
            />
            <GameCard
              title="RAG Detective"
              description="Inspect raw database chunks, evaluate semantic overlaps, and find the perfect reference context."
              icon="🕵️‍♂️"
              buttonText="Coming Soon"
              href="/ai/rag-detective"
              disabled
              delay={0.15}
            />
          </AiCategorySection>

          {/* CATEGORY 4: AI Agents */}
          <AiCategorySection
            title="4. Agentic AI & Tooling"
            description="Orchestrate autonomous agent planning loops and connect LLMs directly to browser execution tools."
          >
            <GameCard
              title="Tool Calling Simulator"
              description="Model the precise cycle where LLMs decide to parse function schemas and execute external tools."
              icon="🛠️"
              buttonText="Coming Soon"
              href="/ai/tools"
              disabled
              delay={0.1}
            />
            <GameCard
              title="Agentic Loop Simulator"
              description="Orchestrate autonomous agent loops: monitor goals, analyze plans, execute tools, and log observations."
              icon="🤖"
              buttonText="Coming Soon"
              href="/ai/agents"
              disabled
              delay={0.15}
            />
          </AiCategorySection>

          {/* CATEGORY 5: Model Context Protocol */}
          <AiCategorySection
            title="5. Model Context Protocol"
            description="Standardize communication pipelines between client assistants and target data servers."
          >
            <GameCard
              title="MCP Concept Explorer"
              description="Investigate the unified MCP spec. Map Client-Server links, Tool resources, and Prompt templates."
              icon="🔌"
              buttonText="Coming Soon"
              href="/ai/mcp"
              disabled
              delay={0.1}
            />
          </AiCategorySection>

          {/* CATEGORY 6: AI Engineering */}
          <AiCategorySection
            title="6. AI Engineering"
            description="Integrate AI nodes into production software: format outputs, stream bytes, and audit model architectures."
          >
            <GameCard
              title="Prompt Engineering Lab"
              description="Improve bad prompting statements into descriptive, contextual templates with constraint boundaries."
              icon="✍️"
              buttonText="Coming Soon"
              href="/ai/prompting"
              disabled
              delay={0.1}
            />
            <GameCard
              title="Structured Output Lab"
              description="Force LLMs to return strict, parseable JSON files instead of standard descriptive sentences."
              icon="📄"
              buttonText="Coming Soon"
              href="/ai/structured-output"
              disabled
              delay={0.15}
            />
            <GameCard
              title="Streaming Visualizer"
              description="Verify progressive response streaming. Contrast latency improvements of TTFT (Time-To-First-Token)."
              icon="🌊"
              buttonText="Coming Soon"
              href="/ai/streaming"
              disabled
              delay={0.2}
            />
            <GameCard
              title="AI Evaluation Suite"
              description="Evaluate and benchmark models based on multi-dimensional quality, cost, and speed trade-offs."
              icon="📊"
              buttonText="Coming Soon"
              href="/ai/evaluation"
              disabled
              delay={0.25}
            />
            <GameCard
              title="Observability Tracker"
              description="Trace nested LLM execution chains, check model latency graphs, and log token costs."
              icon="🕵️‍♀️"
              buttonText="Coming Soon"
              href="/ai/observability"
              disabled
              delay={0.3}
            />
            <GameCard
              title="AI Architecture Builder"
              description="Connect frontend layouts, caching layers, and vector databases into secure, highly-available architectures."
              icon="🏗️"
              buttonText="Coming Soon"
              href="/ai/architecture"
              disabled
              delay={0.35}
            />
          </AiCategorySection>

          {/* CATEGORY 7: AI Security */}
          <AiCategorySection
            title="7. AI Security"
            description="Defend model integration pipelines against injection strings, parameter leaks, and hijacked tool scopes."
          >
            <GameCard
              title="AI Security Detective"
              description="Identify prompt injections, excessive agencies, insecure tool integrations, and data poison leaks."
              icon="🛡️"
              buttonText="Coming Soon"
              href="/ai/security"
              disabled
              delay={0.1}
            />
          </AiCategorySection>
        </div>
      </div>
    </MotionMountSection>
  );
}
