import type { generateExpertWorkflows } from '@/ai/flows/generate-expert-workflows';
import type { createParallelExpertComparison } from '@/ai/flows/create-parallel-expert-comparison';
import type { highlightMetaLearningInsights } from '@/ai/flows/highlight-meta-learning-insights';
import type { z } from 'zod';

type GenerateExpertWorkflowsOutput = z.infer<ReturnType<typeof generateExpertWorkflows>['outputSchema']>;
type CreateParallelExpertComparisonOutput = z.infer<ReturnType<typeof createParallelExpertComparison>['outputSchema']>;
type HighlightMetaLearningInsightsOutput = z.infer<ReturnType<typeof highlightMetaLearningInsights>['outputSchema']>;

export type ExpertWorkflow = GenerateExpertWorkflowsOutput['expertWorkflows'][0];
export type ComparisonSummary = CreateParallelExpertComparisonOutput['metaSummary'];
export type MetaLearningInsights = HighlightMetaLearningInsightsOutput['metaLearningInsights'];

export type AppState = {
  step: number;
  researchQuestion: string;
  personas: string[];
  selectedPersonas: string[];
  expertWorkflows: ExpertWorkflow[];
  comparisonSummary: ComparisonSummary;
  metaLearningInsights: MetaLearningInsights;
};
