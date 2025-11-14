'use server';

/**
 * @fileOverview This file defines the Genkit flow for highlighting meta-learning insights.
 *
 * The flow takes a comparison of expert workflows and generates a meta-summary
 * that highlights the best thinking types for different research phases, beginner
 * lessons, and transferable skills across domains.
 *
 * @exports highlightMetaLearningInsights - The main function to trigger the flow.
 * @exports HighlightMetaLearningInsightsInput - The input type for the function.
 * @exports HighlightMetaLearningInsightsOutput - The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const HighlightMetaLearningInsightsInputSchema = z.object({
  expertComparisonSummary: z
    .string()
    .describe(
      'A summary of the expert comparison, including agreements, divergences, conflicting methodologies, promising directions, and missed risks across all personas.'
    ),
});
export type HighlightMetaLearningInsightsInput = z.infer<typeof HighlightMetaLearningInsightsInputSchema>;

// Define the output schema
const HighlightMetaLearningInsightsOutputSchema = z.object({
  metaLearningInsights: z
    .string()
    .describe(
      'Highlights the best thinking types for different phases, beginner lessons, and transferable skills across domains.'
    ),
});
export type HighlightMetaLearningInsightsOutput = z.infer<typeof HighlightMetaLearningInsightsOutputSchema>;

// Define the main function
export async function highlightMetaLearningInsights(
  input: HighlightMetaLearningInsightsInput
): Promise<HighlightMetaLearningInsightsOutput> {
  return highlightMetaLearningInsightsFlow(input);
}

// Define the prompt
const highlightMetaLearningInsightsPrompt = ai.definePrompt({
  name: 'highlightMetaLearningInsightsPrompt',
  input: {schema: HighlightMetaLearningInsightsInputSchema},
  output: {schema: HighlightMetaLearningInsightsOutputSchema},
  prompt: `Given the following comparison of expert workflows, generate a meta-summary that highlights the best thinking types for different phases of research (ideation, experiment, scaling), beginner lessons that can be learned from each expert's perspective, and transferable skills across domains.\n\nExpert Comparison Summary: {{{expertComparisonSummary}}}`,
});

// Define the flow
const highlightMetaLearningInsightsFlow = ai.defineFlow(
  {
    name: 'highlightMetaLearningInsightsFlow',
    inputSchema: HighlightMetaLearningInsightsInputSchema,
    outputSchema: HighlightMetaLearningInsightsOutputSchema,
  },
  async input => {
    const {output} = await highlightMetaLearningInsightsPrompt(input);
    return output!;
  }
);
