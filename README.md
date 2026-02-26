# HILS
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)

[![Frontend](https://img.shields.io/badge/Frontend-React_18_%7C_TypeScript-61dafb.svg)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Backend-Node.js_%7C_Firebase_Functions-339933.svg)](https://nodejs.org/)
[![LLM](https://img.shields.io/badge/LLM-Gemini_Engine-ff9900.svg)](https://ai.google.dev/)
[![Database](https://img.shields.io/badge/Database-Firestore-ffca28.svg)](https://firebase.google.com/docs/firestore)
[![Deployment](https://img.shields.io/badge/Deployment-Firebase_Hosting-039be5.svg)](https://firebase.google.com/)

HILS (High-Intensity Learning System) provides a programmatic, highly constrained environment for digesting strict university syllabi. It generates recall-optimized, structurally enforced academic responses engineered for maximum evaluator scoring. Here are the screenshots of a working example on a Web Browser.

 ![image](https://deaf-lime-eiide1xbbi.edgeone.app/BrowserUI.png)

*If you're interested in the prompt compilation mechanics that power this application, have a look at [this section](#prompt-engineering-strategy).*

# Table of contents
- [Problem statement](#problem-statement)
- [Solution architecture overview](#solution-architecture-overview)
- [Core system modules (layered architecture)](#core-system-modules-layered-architecture)
- [Feature breakdown](#feature-breakdown)
- [Scalability & system design](#scalability--system-design)
- [Folder structure (frontend + backend)](#folder-structure-frontend--backend)
- [Technology stack](#technology-stack)
- [Prompt engineering strategy](#prompt-engineering-strategy)
- [Future roadmap](#future-roadmap)
- [Security & data policy](#security--data-policy)
- [Installation & deployment guide](#installation--deployment-guide)
- [Use cases](#use-cases)
- [Contact & support](#contact--support)

# Problem statement
[(Back to top)](#table-of-contents)

Modern engineering curricula impose high volumes of theoretical content within strict schedules. During these constrained timeframes, students face critical bottlenecks:

- **Information Overload:** Textbooks optimize for exhaustive coverage, not temporal efficiency.
- **Generic AI Tool Chaos:** Standard LLMs generate verbose, conversational responses that ignore academic evaluator structures.
- **Lack of Syllabus Alignment:** Educational platforms fail to map content directly to university constraints (modules, subjects, specific topics).
- **Suboptimal Format for Memory Encoding:** Traditional AI outputs lack the hierarchical enumeration and rigid terminology necessary for short-term memory encoding.

HILS aggressively limits LLM execution. It forces a syllabus-bound, pointwise architecture designed exclusively for rapid cognitive processing and exam scoring.

# Solution architecture overview
[(Back to top)](#table-of-contents)

HILS replaces non-deterministic AI chat with a strict, prompt-compiled, syllabus-driven pipeline. It operates as an academic intelligence compiler.

### System Flow Diagram

```text
[User Request / Topic Selection]
              ↓
[Syllabus Context Parser] (Retrieves University/Semester/Module data)
              ↓
[Section & Structuring Engine] (Maps weightage and bounds context)
              ↓
[Prompt Orchestration Layer] (Injects rules, formats, constraints)
              ↓
[LLM Processing Unit] (Generates restricted data)
              ↓
[Structured Output Validator] (Ensures adherence to pointwise rules)
              ↓
[Cognitive UI Presentation] (Renders in distraction-free interface)
```

By injecting exact academic metadata into an imperatively structured prompt, HILS forces the LLM to strip conversational drift and enforce evaluator-friendly outputs.

# Core system modules (layered architecture)
[(Back to top)](#table-of-contents)

The system is compartmentalized into five independent layers to ensure high cohesion.

### Layer 1: Input Layer
The data context that bounds execution entirely.
- **University Definition:** Root configuration (e.g., VTU).
- **Semester Targeting:** Filters available cognitive load.
- **Subject Code & Module:** Restricts LLM scope to prevent cross-domain contamination.
- **Topic Indexing:** The precise execution node.

### Layer 2: Structuring Engine
Logic handling the defined syllabus schema.
- **Syllabus Tokenizer:** Maps raw syllabus data into discrete JSON elements.
- **Topic Hierarchy Generator:** Resolves spatial dependencies within a module.
- **Weightage Mapping:** Associates topics with historical frequency data.
- **Recall Density Optimizer:** Ensures output strictly fits short-term memory limits.

### Layer 3: Prompt Orchestration Layer
Converts user intent into deterministic LLM instructions.
- **Exam-Mode Prompts:** Forces the LLM into a virtual evaluator perspective.
- **Precision Mode:** Disables narrative generation and conversational filler.
- **Terminology Enforcement:** Demands capitalization of key academic terms.
- **No-Paragraph Mode:** Prohibits contiguous text blocks exceeding 4 lines.
- **Marks-Based Expansion:** Dynamically adjusts point counts based on 5M or 10M markers.

### Layer 4: AI Processing Layer
Execution and validation of external LLM calls.
- **Gemini Engine Integration:** Handles async requests via REST.
- **Structured Validation:** Sanitizes strings to guarantee requested markdown structures.
- **Error Trapping:** Rejects malformed responses or hallucinatory schemas.

### Layer 5: Presentation Layer
Front-end client optimized for cognitive load reduction.
- **Section Navigation Tabs:** Strict isolation of modes (Planner, Explanation, Exam Answer).
- **Dynamic Module Switching:** Context-aware breadcrumb routing for state hydration.
- **Clean UI:** Monochromatic grey/black themes to minimize visual fatigue.
- **Focus Layout:** Strips sidebars and extraneous features during active reading.

# Feature breakdown
[(Back to top)](#table-of-contents)

### Exam Optimization
- **Marks-Based Generation:** Automatically scales point count for 5M vs 10M requirements.
- **Bullet Structures:** Enforces numerical and alphabetical hierarchies.
- **Terminology Enforcement:** Prioritizes critical keywords to mimic top-scoring answers.
- **Recall Formatting:** Implements chunking to optimize visual memory encoding.

### Structural Intelligence
- **Context Breadcrumbs:** Maps spatial progression across the syllabus topology.
- **Section Auto-Generation:** Splits content logically (definitions, concepts, examples).
- **Subject Hierarchy Mapping:** Maintains global progression state across enrolled subjects.

### Cognitive Design
- **Minimal UI:** Strips redundant interface components.
- **Focus Mode:** Centers content with optimal tracking line heights.
- **Data Density:** Maximizes information-per-pixel without overwhelming the user.
- **No-Fluff Output:** Zero conversational preamble. Content opens directly into definitions.

### Technical Features
- **Full-Stack Architecture:** Strongly typed TypeScript across the edge.
- **Modular Design Structure:** Component isolation driven systematically by domain features (MCPs).
- **Async Processing:** Non-blocking interface for LLM request streaming and rendering.

# Scalability & system design
[(Back to top)](#table-of-contents)

HILS relies exclusively on Google’s Firebase infrastructure for serverless, horizontally scaling operations.

### Technical Specifications
- **Stateless Cloud Functions:** Backend endpoints operate on demand without persistent memory overhead.
- **LLM Abstraction Layer:** Capable of rotating payload delivery across Gemini models.
- **Modular Prompt System:** Configurable string templates isolated from routing logic.
- **Edge Caching Architecture:** Responses are cached and indexed against a deterministic hash of topic data to prevent duplicate LLM execution.
- **Multi-University Expansion:** Deeply nested JSON schemas accommodate diverse global academic hierarchies.

### Deployment Architecture

```text
[Client Web Application]
           │
           ▼
[Firebase Hosting CDN] ───> [Static React Application & Assets]
           │
           ├──> [Firebase Auth] ──> [Session JWT Verification]
           │
           ├──> [Firestore DB] ──> [User Progress & Academic State]
           │
           └──> [Firebase Cloud Functions / Node.js]
                      │
                      ├──> [Rate Check & Schema Validator]
                      │
                      └──> [Prompt Engine] ──> [Gemini API Endpoints]
```

# Folder structure (frontend + backend)
[(Back to top)](#table-of-contents)

The monolithic repository enforces strict boundaries between the React client codebase and serverless functions.

```text
HILS/
├── functions/                # Serverless Firebase Node.js backend
│   └── src/                  
│       ├── index.ts          # Centralized Cloud Functions router
│       └── services/         # Core backend business and API processing logic
│
└── src/                      # Client React application
    ├── app/                  # Initializers, Routers, and base configurations
    ├── mcps/                 # Multi-Component Paradigms (Domain-driven modules)
    │   ├── academic-profile/
    │   ├── ai-engine/
    │   ├── auth/
    │   ├── persona/
    │   └── progress/
    ├── pages/                # High-level route views (Dashboard, TopicPage)
    └── shared/               # Global cross-cutting concerns
        ├── components/       # Reusable UI fragments
        ├── config/           # Application-wide feature flags
        ├── data/             # Static university syllabus schemas
        ├── types/            # Strict TypeScript interface declarations
        └── utils/            # Helper formats and generic logic
```

# Technology stack
[(Back to top)](#table-of-contents)

### Backend
- **Runtime:** Node.js
- **Platform:** Firebase Cloud Functions
- **Language:** TypeScript
- **Database:** Firebase Firestore (NoSQL)

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Dark Theme UI)
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Routing:** React Router v6

### LLM Integration
- **Primary Engine:** Google Gemini Pro
- **Execution:** Direct REST interactions bound by prompt-enforced regex parameters.

### Deployment & Auth
- **Hosting Platform:** Firebase Hosting
- **CI/CD Configuration:** GitHub Actions (Automated Deployment)
- **Provider:** Firebase Authentication (OAuth / Email Session State)

# Prompt engineering strategy
[(Back to top)](#table-of-contents)

HILS mitigates LLM variation via a highly deterministic, programmatic prompt architecture.

- **Enforced Layout Syntax:** Binds the model to explicit structural slots, eliminating natural prose drift.
- **No-Paragraph Limits:** Halts text blocks exceeding 4 lines, forcing synthesis into high-density lists.
- **Exam Recall Formats:** Demands specific headings, terminology caps, and numerical spacing to mirror standard examination booklets.
- **Context Injection:** Injects strictly the VTU subject, module name, and topic, drastically reducing the dataset available for hallucination.
- **Dynamic Scale Adjustments:** Programmatically expands generation structures (diagram placeholders, detailed examples) strictly based on parameterized marks requirements.

# Future roadmap
[(Back to top)](#table-of-contents)

- **Geographic University Expansion:** Map adjacent state universities into the core data schema.
- **Weak-Area Algorithmic Detection:** Track quiz scores internally to isolate and flag failing learning modules.
- **Adaptive Revision Timelines:** Generate chronological study plans converging exactly on projected exam dates.
- **Memory-Based Reinforcement:** Introduce active recall techniques linked directly to cached LLM responses.

# Security & data policy
[(Back to top)](#table-of-contents)

HILS executes a rigid, zero-fluff data policy to assure privacy.

- **Zero Biometric Data Storage.** We track nothing beyond minimal academic context.
- **Anonymized Processing:** LLM interactions pass no user-identifying markers into external training pools. 
- **Isolated JWT Validation:** All backend pathways demand strictly enforced token authorization checks prior to execution.

# Installation & deployment guide
[(Back to top)](#table-of-contents)

### Prerequisites
- Node.js >= 18.0.0
- Firebase CLI (`npm install -g firebase-tools`)
- Google Cloud Platform account with active Gemini API token

### Local Setup
1. Clone the repository and navigate root:
   ```bash
   git clone https://github.com/organization/hils.git
   cd hils
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Initialize environment variables via `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Start the Vite development interface:
   ```bash
   npm run dev
   ```

### Backend & Emulators
1. Navigate to the functions directory:
   ```bash
   cd functions
   npm install
   ```
2. Authenticate the Firebase CLI:
   ```bash
   firebase login
   firebase use <project-id>
   ```
3. Boot local Firebase emulators:
   ```bash
   npm run serve
   ```

### Production Deployment
Deployments are handled entirely through Firebase architecture.
```bash
# Deploys both frontend static assets (Hosting) and serverless backend (Functions)
firebase deploy
```

# Use cases
[(Back to top)](#table-of-contents)

- **Targeted Exam Preparation:** Decoding dense algorithmic topics hours before an examination utilizing precise "Planner" bounds.
- **Cheat-Sheet Synthesis:** Utilizing "Rapid Revision" prompts to compress entire textbook chapters into sub-4-page structures.
- **Institutional Implementation:** Coaching centers pulling strictly VTU-aligned materials directly from structured outputs without manual formatting overhead.
- **Platform Integration:** Exporting deterministic JSON parameters via backend pathways for integration into external revision dashboards.

# Contact & support
[(Back to top)](#table-of-contents)

### Project Information
- **Developer**: Omkar Shirvalkar
- **LinkedIn**: [linkedin.com/in/omkar-shirvalkar-1941ab269/](https://www.linkedin.com/in/omkar-shirvalkar-1941ab269/)
- **GitHub**: [github.com/omkar-sip/HILS](https://github.com/omkar-sip/HILS)
- **Email**: omkarshirvalkar@gmail.com

### Enterprise Inquiries
For institutional deployments, custom features, or consulting services:
- Email: omkarshirvalkar@gmail.com