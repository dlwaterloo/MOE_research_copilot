'use server';

import { generateExpertPersonas } from '@/ai/flows/generate-expert-personas';
import { generateExpertWorkflows } from '@/ai/flows/generate-expert-workflows';
import { createParallelExpertComparison } from '@/ai/flows/create-parallel-expert-comparison';
import { highlightMetaLearningInsights } from '@/ai/flows/highlight-meta-learning-insights';
import type { ExpertWorkflow } from '@/lib/types';

export async function getPersonas(researchQuestion: string): Promise<string[]> {
  if (!researchQuestion) {
    throw new Error('Research question is required.');
  }
  return await generateExpertPersonas({ researchQuestion });
}

function formatWorkflowToString(workflow: ExpertWorkflow): string {
  return `
### Persona: ${workflow.personaName}

#### Problem Reframing
${workflow.problemReframing}

#### Hypothesis Formulation
${workflow.hypothesisFormulation}

#### Experimental Design
${workflow.experimentalDesign}

#### Expected Failure Modes
${workflow.expectedFailureModes}

#### Prior Literature Comparison
${workflow.priorLiteratureComparison}
  `.trim();
}

export async function getResearch(researchQuestion: string, selectedPersonas: string[]): Promise<{
  expertWorkflows: ExpertWorkflow[],
  comparisonSummary: string,
  metaLearningInsights: string
}> {
  if (!researchQuestion || !selectedPersonas.length) {
    throw new Error('Research question and selected personas are required.');
  }

  const expertPersonasForApi = selectedPersonas.map(name => ({ name }));

  const workflowData = await generateExpertWorkflows({ researchQuestion, expertPersonas: expertPersonasForApi });
  if (!workflowData || !workflowData.expertWorkflows) {
    throw new Error('Failed to generate expert workflows.');
  }

  const formattedWorkflows = workflowData.expertWorkflows.map(formatWorkflowToString);

  const comparisonData = await createParallelExpertComparison({ question: researchQuestion, expertWorkflows: formattedWorkflows });
  if (!comparisonData || !comparisonData.metaSummary) {
    throw new Error('Failed to create parallel expert comparison.');
  }

  const insightsData = await highlightMetaLearningInsights({ expertComparisonSummary: comparisonData.metaSummary });
  if (!insightsData || !insightsData.metaLearningInsights) {
    throw new Error('Failed to highlight meta-learning insights.');
  }

  return {
    expertWorkflows: workflowData.expertWorkflows,
    comparisonSummary: comparisonData.metaSummary,
    metaLearningInsights: insightsData.metaLearningInsights,
  };
}
