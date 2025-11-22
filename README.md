# MOE Research Copilot

An AI-powered research tool that leverages multiple expert perspectives to help you explore research questions, generate hypotheses, and discover insights through parallel expert analysis.

## Overview

MOE Research Copilot uses AI to simulate a diverse panel of expert personas, each providing unique perspectives on your research question. The tool generates detailed workflows for each expert, compares their approaches, and highlights meta-learning insights to help you think more deeply about your research.

## Features

- **Question Input**: Enter research questions, project descriptions, paper topics, or ideas to initiate expert analysis
- **Expert Persona Generation**: Automatically generates 6 diverse expert personas tailored to your research question (e.g., neuroscientist, ML professor, statistician, startup founder)
- **Expert Workflow Generation**: For each selected persona, generates comprehensive workflows including:
  - Problem reframing
  - Hypothesis formulation
  - Experimental design
  - Expected failure modes
  - Prior literature comparison
- **Parallel Expert Comparison**: Creates a meta-summary identifying:
  - Agreements across experts
  - Divergences and conflicting methodologies
  - Promising research directions
  - Missed risks
- **Meta-Learning Insights**: Highlights transferable skills, beginner lessons, and optimal thinking approaches for different research phases
- **Interactive Dashboard**: Three-column layout featuring:
  - Expert rail for navigation
  - Problem workspace
  - Parallel expert view for comparison

## Tech Stack

- **Framework**: Next.js 15 with React 18
- **AI**: Genkit with Google Gemini 2.5 Flash
- **Styling**: Tailwind CSS with Radix UI components
- **Language**: TypeScript
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Google AI API key (for Genkit)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MOE_research_copilot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Google AI API key:
```
GOOGLE_GENAI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:9002`

### Additional Commands

- `npm run genkit:dev` - Start Genkit development server
- `npm run genkit:watch` - Start Genkit with watch mode
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Usage

1. **Enter Your Research Question**: On the home page, enter your research question, project description, or idea
2. **Select Expert Personas**: Review the generated expert personas and select the ones you want to analyze
3. **Explore Expert Workflows**: View detailed workflows from each selected expert perspective
4. **Compare Perspectives**: Use the comparison view to see agreements, divergences, and insights across experts
5. **Learn from Meta-Insights**: Review the meta-learning panel for transferable skills and thinking approaches

## Project Structure

```
src/
├── ai/                    # AI flows and Genkit configuration
│   ├── flows/            # Expert persona, workflow, and comparison flows
│   └── genkit.ts         # Genkit AI setup
├── app/                   # Next.js app directory
│   ├── actions.ts        # Server actions for AI flows
│   └── page.tsx          # Main application page
├── components/            # React components
│   ├── app/              # Application-specific components
│   └── ui/               # Reusable UI components (Radix UI)
├── hooks/                # Custom React hooks
└── lib/                  # Utilities and type definitions
```

## Development

The application uses a three-step workflow:
1. **Step 1**: User submits research question → AI generates expert personas
2. **Step 2**: User selects personas → AI generates expert workflows
3. **Step 3**: Display workflows, comparison, and meta-learning insights

All AI operations are handled through server actions in `src/app/actions.ts`, which coordinate the various Genkit flows defined in `src/ai/flows/`.

## License

[Add your license information here]
