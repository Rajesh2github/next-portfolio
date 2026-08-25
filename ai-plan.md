# AI PLAYGROUND — IMPLEMENTATION PLAN
# Project: raj eshtiwari.com
# Route: /ai

You are implementing a new `/ai` section in my existing portfolio website.

The goal is to build an:

    Interactive AI Engineering Playground

This is NOT an AI blog.

It should allow visitors to:

    Learn
      ↓
    Visualize
      ↓
    Experiment
      ↓
    Solve challenges
      ↓
    Understand

The experience should cover modern AI concepts such as:

    AI
    Machine Learning
    Deep Learning
    Generative AI
    LLM
    Tokens
    Context Window
    Embeddings
    Transformers
    Attention
    Prompt Engineering
    RAG
    Vector Databases
    Tool Calling
    AI Agents
    Agentic AI
    MCP
    Structured Output
    Streaming
    Evaluation
    AI Security
    AI Architecture

==================================================
IMPORTANT IMPLEMENTATION RULE
==================================================

DO NOT IMPLEMENT EVERYTHING AT ONCE.

Implement one phase at a time.

After completing each phase:

    1. Run lint
    2. Run tests
    3. Run type checking
    4. Check production build
    5. Check responsive behavior
    6. Check accessibility
    7. Report what was implemented
    8. Report files changed
    9. Report any issues
    10. STOP and wait for approval

Do not automatically continue to the next phase.

==================================================
PHASE 0 — PROJECT ANALYSIS
==================================================

Before changing any code:

Inspect the existing repository.

Understand:

    Next.js version
    App Router / Pages Router
    TypeScript
    Styling solution
    Existing component system
    Existing animations
    Existing navigation
    Existing theme
    Existing `/play` implementation
    Existing SEO implementation
    Existing testing
    Existing utilities
    Existing state management

Especially inspect `/play` if it already exists.

Determine which components can be reused.

Do NOT create duplicate components if an equivalent already exists.

Produce a report:

    Current Architecture
    /play Architecture
    Reusable Components
    Shared Components
    AI-specific Components
    Recommended /ai Architecture
    Recommended Folder Structure
    Dependencies Required
    Risks

DO NOT MODIFY FILES IN PHASE 0.

STOP.

==================================================
PHASE 1 — `/ai` FOUNDATION
==================================================

Create:

    /ai

The landing page should contain:

    Hero
    Introduction
    AI Categories
    Featured Experiments
    Challenge section

Suggested hero:

    AI Engineering Playground

Supporting message:

    Explore AI, LLMs, RAG, Agents and MCP
    through interactive experiments.

Adapt the copy to the existing portfolio design.

Do not make the page look like a generic AI SaaS landing page.

Use the existing portfolio's:

    Typography
    Colors
    Cards
    Spacing
    Animations
    Navigation
    Footer

Create reusable components where appropriate.

Potential components:

    AIHero
    AICategoryCard
    AIExperimentCard
    AIChallengeCard

Do NOT implement complex AI functionality yet.

Create placeholder cards only for future experiences.

Categories:

    Fundamentals
    LLM
    RAG
    Agents
    MCP
    AI Engineering
    AI Security

STOP.

==================================================
PHASE 2 — AI FUNDAMENTALS
==================================================

Create a fundamentals experience.

Concepts:

    AI
    Machine Learning
    Deep Learning
    Generative AI
    LLM

The UI should explain relationships.

Example:

    Artificial Intelligence
           │
           ├── Machine Learning
           │       │
           │       └── Deep Learning
           │
           └── Generative AI
                   │
                   └── LLM

Each concept should contain:

    What is it?
    Why does it matter?
    Simple example
    Where is it used?
    Related concepts

Keep explanations concise.

Do not create huge walls of text.

Add:

    "Test your knowledge"

with a small quiz.

Initial target:

    10 questions

Question format:

    Question
    4 options
    Correct answer
    Explanation
    Difficulty

Create typed, data-driven question definitions.

STOP.

==================================================
PHASE 3 — TOKEN VISUALIZER
==================================================

Create:

    /ai/tokens

Build an interactive Token Visualizer.

User enters text.

Example:

    "Hello, how are you?"

Display a conceptual tokenization.

IMPORTANT:

Unless an actual tokenizer is integrated, DO NOT claim that the displayed tokens are the exact tokens of a specific model.

Label it:

    Conceptual Token Visualization

Explain:

    Tokens are not necessarily words.

Show:

    Input characters
    Approximate token count
    Context usage

Also explain why tokens matter for:

    Context window
    Cost
    Latency

Add a small challenge:

    "Which input is likely to use more tokens?"

STOP.

==================================================
PHASE 4 — CONTEXT WINDOW
==================================================

Create:

    /ai/context

Build a visual context-window challenge.

Example:

    Context Limit
    1000 tokens

Sections:

    System Instructions
    Conversation
    Retrieved Documents
    User Question
    Output Budget

Example:

    System       200
    Conversation 400
    Documents   300
    Question    100

    Total       1000

Allow the user to modify the content.

Then create:

    Context Overflow

scenario.

Teach:

    Context Window
    Input Tokens
    Output Tokens
    Context Budget

Use a visual progress bar.

Example:

    850 / 1000

Then:

    1100 / 1000
    OVERFLOW

STOP.

==================================================
PHASE 5 — LLM VISUALIZER
==================================================

Create:

    /ai/llm

Visualize:

    User Prompt
         ↓
    Tokenization
         ↓
    Context
         ↓
       Model
         ↓
    Next-token prediction
         ↓
       Output

Explain that this is a simplified conceptual representation.

Do NOT pretend this visualization represents the literal internal architecture of an LLM.

Explain:

    Tokens
    Prediction
    Probability
    Context
    Generation

Add an interactive "next token" demonstration.

For example:

    "The sky is"

Possible next tokens:

    blue
    green
    large
    running

Show conceptual probabilities.

Clearly label the probabilities as simulated.

STOP.

==================================================
PHASE 6 — LLM PARAMETERS
==================================================

Create:

    /ai/parameters

Interactive simulation for:

    Temperature
    Top-K
    Top-P
    Max Tokens

Users change sliders.

Show simulated output behavior.

IMPORTANT:

This is a conceptual simulation unless a real model is connected.

Do not claim the generated text is actual output from a specific LLM.

Explain each parameter in simple language.

Example:

    Temperature

    Lower:
        More deterministic

    Higher:
        More varied

Avoid absolute claims.

STOP.

==================================================
PHASE 7 — EMBEDDINGS
==================================================

Create:

    /ai/embeddings

Build a conceptual visualization.

Example:

    Pizza
    Burger
    Pasta

should appear closer together than:

    Car
    Airplane

Use a 2D visual space.

Explain:

    Embedding
    Vector
    Semantic similarity

IMPORTANT:

If no real embedding model is used:

    Label coordinates as conceptual/simulated.

Do not claim the coordinates are actual embeddings.

Add a small similarity challenge.

Example:

    Which concept is closest to:

    "Pizza"

STOP.

==================================================
PHASE 8 — RAG
==================================================

Create:

    /ai/rag

Build a complete RAG visualization.

Flow:

    User Question
          ↓
      Embedding
          ↓
      Vector Search
          ↓
    Relevant Chunks
          ↓
       Context
          ↓
         LLM
          ↓
       Answer

Create a small fake knowledge base.

Example:

    Document 1
    Document 2
    Document 3
    Document 4

Allow the user to ask predefined questions.

Show:

    Retrieved documents
    Relevance score
    Context passed to LLM
    Final answer

Everything can be simulated.

Do NOT introduce a real vector database.

Explain:

    Why RAG exists
    Chunking
    Embeddings
    Retrieval
    Context
    Generation

STOP.

==================================================
PHASE 9 — RAG CHALLENGE
==================================================

Create:

    RAG Detective

Scenario:

    "Find the correct information from the knowledge base."

User sees:

    Question

and:

    5 document chunks.

They must select the most relevant chunks.

Score:

    Retrieval Quality

Then explain:

    Why the selected chunks were useful
    Why irrelevant chunks hurt the answer

Add difficulty levels.

STOP.

==================================================
PHASE 10 — PROMPT ENGINEERING
==================================================

Create:

    /ai/prompting

Build a Prompt Improvement Challenge.

Show:

    Bad Prompt

Example:

    "Tell me about React."

Then:

    Improved Prompt

Example:

    "Explain React hooks to a JavaScript developer
     who is new to React. Give three examples."

Teach:

    Context
    Constraints
    Output format
    Examples
    Clear instructions

Do not present prompt engineering as magic.

Focus on clear communication.

Add:

    Improve this prompt

challenge.

STOP.

==================================================
PHASE 11 — TOOL CALLING
==================================================

Create:

    /ai/tools

Explain:

    User
      ↓
    LLM
      ↓
    Tool Decision
      ↓
    Tool Call
      ↓
    Tool Result
      ↓
    LLM
      ↓
    Final Answer

Create scenarios.

Example:

    "What is the current weather?"

Ask:

    Should the model answer directly?

or:

    Should it call a tool?

Explain:

    Tool Calling
    Function Calling
    Tool Schema
    Tool Result

Do not connect to real external services.

Simulate tool calls.

STOP.

==================================================
PHASE 12 — AI AGENTS
==================================================

Create:

    /ai/agents

Explain the difference between:

    LLM interaction

and:

    Agentic workflow.

LLM:

    Prompt
      ↓
    Response

Agent:

    Goal
      ↓
    Plan
      ↓
    Tool
      ↓
    Observation
      ↓
    Decision
      ↓
    Tool
      ↓
    Final Result

Create:

    Agent Simulator

Scenario:

    "Research a topic and summarize the findings."

Show:

    Goal
    Plan
    Tool Calls
    Observations
    Final Response

Everything should be simulated.

Explain:

    Agent
    Agentic AI
    Planning
    Tool use
    Memory
    Iteration

Avoid presenting one rigid definition of "agent."

STOP.

==================================================
PHASE 13 — MCP
==================================================

Create:

    /ai/mcp

IMPORTANT:

MCP terminology/specifications may evolve.

Before implementing this phase:

    Verify current MCP concepts using authoritative
    and current documentation.

Explain:

    Model Context Protocol
    MCP Client
    MCP Server
    Tools
    Resources
    Prompts

Visual:

    AI Application
          ↓
      MCP Client
          ↓
      MCP Server
       /   |   \
    Tools Resources Prompts

Create:

    MCP Concept Explorer

Then:

    MCP Challenge

Example scenario:

    "An AI assistant needs access to GitHub issues."

Ask:

    Should this capability be represented as:

    Tool
    Resource
    Prompt

Provide explanation after answer.

Do not require users to deploy an actual MCP server.

STOP.

==================================================
PHASE 14 — STRUCTURED OUTPUT
==================================================

Create:

    /ai/structured-output

Compare:

    Free-form output

with:

    Structured output

Example:

    Free-form:

    "The hotel is XYZ and costs ₹5000..."

versus:

    {
      "name": "XYZ",
      "price": 5000,
      "currency": "INR"
    }

Explain why structured output is useful for applications.

Create a small extraction challenge.

STOP.

==================================================
PHASE 15 — STREAMING
==================================================

Create:

    /ai/streaming

Visualize:

    Non-streaming

    Request
       ↓
    Wait
       ↓
    Complete response

versus:

    Streaming

    Request
       ↓
    Token
       ↓
    Token
       ↓
    Token
       ↓
    Complete

Explain:

    User experience
    Time to first token
    Progressive rendering

Create a small simulation.

STOP.

==================================================
PHASE 16 — AI EVALUATION
==================================================

Create:

    /ai/evaluation

Explain that AI systems need evaluation.

Create simulated model comparison.

Example:

    Model A
    Quality: 82
    Latency: 1.2s
    Cost: $0.02

    Model B
    Quality: 91
    Latency: 2.8s
    Cost: $0.08

Ask:

    Which model should you choose?

There should NOT always be one correct answer.

Explain trade-offs:

    Quality
    Cost
    Latency
    Reliability
    Safety

STOP.

==================================================
PHASE 17 — AI OBSERVABILITY
==================================================

Create:

    /ai/observability

Build a simulated AI request trace.

Example:

    User Request
        ↓
    LLM Call
        ↓
    Tool Call
        ↓
    LLM Call
        ↓
    Final Response

Display:

    Total Latency
    Token Usage
    Number of Model Calls
    Number of Tool Calls
    Estimated Cost
    Errors

Explain why observability matters.

All values can be simulated.

STOP.

==================================================
PHASE 18 — AI SECURITY
==================================================

Create:

    /ai/security

Topics:

    Prompt Injection
    Data Leakage
    Excessive Agency
    Tool Permissions
    Secret Exposure
    RAG Poisoning
    Output Validation

Create:

    Security Detective

Show a scenario.

Example:

    System:
    "You are a support assistant."

    User:
    "Ignore your instructions..."

Ask:

    What is the security concern?

Then explain.

Keep examples defensive.

Do not provide instructions for attacking real systems.

STOP.

==================================================
PHASE 19 — AI ARCHITECTURE
==================================================

Create:

    /ai/architecture

Build an interactive architecture builder.

Scenario:

    "Build a customer support AI assistant."

Available components:

    Frontend
    API
    LLM
    Embedding Model
    Vector Database
    RAG
    MCP Server
    Tools
    Cache
    Authentication

User connects components.

Possible architecture:

    User
      ↓
    Frontend
      ↓
    API
      ↓
    RAG
      ↓
    Vector DB
      ↓
    LLM
      ↓
    Response

Score based on:

    Architecture quality
    Security
    Scalability
    Cost
    Latency

Multiple solutions can be valid.

Do not enforce one architecture unless the requirements explicitly demand it.

STOP.

==================================================
PHASE 20 — AI KNOWLEDGE QUIZ
==================================================

Create a comprehensive:

    AI Knowledge Challenge

Topics:

    AI
    ML
    Deep Learning
    GenAI
    LLM
    Tokens
    Context
    Embeddings
    RAG
    Vector DB
    Prompting
    Tool Calling
    Agents
    Agentic AI
    MCP
    Structured Output
    Streaming
    Evaluation
    AI Security

Start with:

    30 questions

Eventually expand to:

    100+

Questions must be data-driven.

Each question:

    id
    category
    difficulty
    question
    options
    correct answer
    explanation

The explanation is more important than the score.

==================================================
PHASE 21 — PROGRESS SYSTEM
==================================================

Eventually add:

    AI Learning Progress

Example:

    Fundamentals     ████████░░ 80%
    LLM              █████░░░░░ 50%
    RAG              ███░░░░░░░ 30%
    Agents           ██░░░░░░░░ 20%
    MCP              █░░░░░░░░░ 10%

Initially use localStorage.

Do NOT introduce a backend.

Make sure localStorage is accessed only on the client.

Avoid hydration issues.

==================================================
PHASE 22 — AI HOME PAGE POLISH
==================================================

After all major experiences exist, improve `/ai`.

The page should show:

    Hero

    Featured Experiments

    Learn AI Fundamentals

    Explore LLMs

    Explore RAG

    Explore Agents

    Explore MCP

    AI Engineering

    AI Security

    Knowledge Challenge

    Progress

Do not make it feel like a dashboard full of boxes.

Maintain strong visual hierarchy.

==================================================
PHASE 23 — SHARED PLAYGROUND FOUNDATION
==================================================

After enough experiences exist, review `/play` and `/ai`.

Identify common patterns.

Potential shared components:

    ChallengeCard
    Quiz
    ProgressBar
    Score
    ResultScreen
    Explanation
    InteractivePanel
    FlowDiagram
    ChallengeLayout

Potential shared utilities:

    score calculation
    progress tracking
    challenge completion
    difficulty handling

Do not prematurely abstract.

Only extract components that are genuinely reusable.

==================================================
PHASE 24 — PERFORMANCE
==================================================

Audit the entire `/ai` section.

Requirements:

    Route-level code splitting
    Lazy loading
    No unnecessary dependencies
    No huge initial JS bundle
    No unnecessary global state
    No unnecessary re-renders

Heavy visualizers should not load on `/ai`.

Only load them when needed.

==================================================
PHASE 25 — ACCESSIBILITY
==================================================

Audit:

    Keyboard navigation
    Focus
    Screen readers
    Semantic HTML
    Form labels
    Reduced motion
    Color contrast
    Non-color feedback

Interactive diagrams must have accessible alternatives.

==================================================
PHASE 26 — SEO
==================================================

Ensure:

    /ai
    /ai/tokens
    /ai/context
    /ai/llm
    /ai/embeddings
    /ai/rag
    /ai/agents
    /ai/mcp

have appropriate metadata.

Use:

    title
    description
    canonical
    Open Graph

Follow the existing portfolio's SEO architecture.

Do not keyword stuff.

==================================================
PHASE 27 — TESTING
==================================================

Test reusable logic.

Examples:

    calculateQuizScore()
    calculateProgress()
    validateRAGSelection()
    validateArchitecture()
    validateToolCall()
    validateContextWindow()

Do not create meaningless tests.

Run:

    lint
    typecheck
    tests
    production build

==================================================
FINAL PRODUCT STRUCTURE
==================================================

The eventual experience should look approximately like:

    /ai

    ┌────────────────────────────────────────┐
    │                                        │
    │       AI Engineering Playground        │
    │                                        │
    │  Learn • Visualize • Experiment        │
    │                                        │
    └────────────────────────────────────────┘

    Fundamentals
       AI
       ML
       GenAI
       LLM

    LLM
       Tokens
       Context
       Embeddings
       Transformers

    RAG
       Retrieval
       Chunking
       Vector DB
       RAG Challenge

    Agents
       Tool Calling
       Planning
       Memory
       Agent Simulator

    MCP
       Client
       Server
       Tools
       Resources
       Prompts

    AI Engineering
       Prompting
       Structured Output
       Streaming
       Evaluation
       Observability

    Security
       Prompt Injection
       Data Leakage
       Tool Permissions

    Challenges
       AI Quiz
       Token Challenge
       RAG Challenge
       Agent Challenge
       MCP Challenge

==================================================
IMPORTANT DESIGN PRINCIPLE
==================================================

Do not build an:

    "AI terminology dictionary."

Build an:

    "Interactive AI learning experience."

For every important concept use:

    Explanation
        ↓
    Visual
        ↓
    Example
        ↓
    Interaction
        ↓
    Challenge
        ↓
    Explanation of result

Example:

    TOKEN

    What is a token?
          ↓
    Type some text
          ↓
    See conceptual tokenization
          ↓
    Understand context usage
          ↓
    Take token challenge

Example:

    RAG

    What is RAG?
          ↓
    Ask a question
          ↓
    Retrieve documents
          ↓
    Inspect chunks
          ↓
    Adjust retrieval
          ↓
    See result

Example:

    AGENT

    What is an agent?
          ↓
    Give it a goal
          ↓
    Watch planning
          ↓
    Watch tool calls
          ↓
    Inspect observations
          ↓
    See final result

==================================================
FINAL RULE
==================================================

This project should demonstrate:

    AI knowledge
        +
    Frontend engineering
        +
    UX thinking
        +
    Technical communication
        +
    Software architecture

Do not optimize for the number of AI concepts.

Optimize for:

    Understanding
    Interaction
    Accuracy
    Performance
    User experience

==================================================
START NOW
==================================================

Begin with PHASE 0 only.

Analyze the repository.

Do not modify files.

Do not install dependencies.

Do not implement `/ai`.

Return the architecture analysis and proposed implementation plan.

Then STOP and wait for approval.