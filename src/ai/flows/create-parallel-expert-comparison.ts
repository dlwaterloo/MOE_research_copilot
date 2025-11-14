'use server';

/**
 * @fileOverview This file defines a Genkit flow for creating a parallel expert comparison.
 *
 * The flow takes in a research question and a list of expert workflows, and generates a meta-summary
 * that identifies agreements, divergences, conflicting methodologies, promising directions, and missed risks across all personas.
 *
 * @exported createParallelExpertComparison - A function that triggers the parallel expert comparison flow.
 * @exported CreateParallelExpertComparisonInput - The input type for the createParallelExpertComparison function.
 * @exported CreateParallelExpertComparisonOutput - The return type for the createParallelExpertComparison function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateParallelExpertComparisonInputSchema = z.object({
  question: z.string().describe('The research question to analyze.'),
  expertWorkflows: z.array(z.string()).describe('The expert workflows to compare, one string per expert workflow.'),
});
export type CreateParallelExpertComparisonInput = z.infer<typeof CreateParallelExpertComparisonInputSchema>;

const CreateParallelExpertComparisonOutputSchema = z.object({
  metaSummary: z.string().describe('A meta-summary that identifies agreements, divergences, conflicting methodologies, promising directions, and missed risks across all personas.'),
});
export type CreateParallelExpertComparisonOutput = z.infer<typeof CreateParallelExpertComparisonOutputSchema>;

export async function createParallelExpertComparison(input: CreateParallelExpertComparisonInput): Promise<CreateParallelExpertComparisonOutput> {
  return createParallelExpertComparisonFlow(input);
}

const createParallelExpertComparisonPrompt = ai.definePrompt({
  name: 'createParallelExpertComparisonPrompt',
  input: {schema: CreateParallelExpertComparisonInputSchema},
  output: {schema: CreateParallelExpertComparisonOutputSchema},
  prompt: `You are an expert research synthesizer. You will receive a research question and a set of expert workflows, and you will generate a meta-summary that identifies agreements, divergences, conflicting methodologies, promising directions, and missed risks across all personas.

Research Question: {{{question}}}

Expert Workflows:
{{#each expertWorkflows}}
---
{{{this}}}
{{/each}}
---

Meta-Summary:
`,
});

const createParallelExpertComparisonFlow = ai.defineFlow(
  {
    name: 'createParallelExpertComparisonFlow',
    inputSchema: CreateParallelExpertComparisonInputSchema,
    outputSchema: CreateParallelExpertComparisonOutputSchema,
  },
  async input => {
    const {output} = await createParallelExpertComparisonPrompt(input);
    return output!;
  }
);
