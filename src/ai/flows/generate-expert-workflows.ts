'use server';

/**
 * @fileOverview Generates detailed workflows for each expert persona based on the user's research question.
 *
 * - generateExpertWorkflows - A function that generates expert workflows.
 * - GenerateExpertWorkflowsInput - The input type for the generateExpertWorkflows function.
 * - GenerateExpertWorkflowsOutput - The return type for the generateExpertWorkflows function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExpertPersonaSchema = z.object({
  name: z.string().describe('The name of the expert persona.'),
});

const GenerateExpertWorkflowsInputSchema = z.object({
  researchQuestion: z.string().describe('The research question provided by the user.'),
  expertPersonas: z.array(ExpertPersonaSchema).describe('The list of expert personas selected by the user.'),
});
export type GenerateExpertWorkflowsInput = z.infer<typeof GenerateExpertWorkflowsInputSchema>;

const ExpertWorkflowSchema = z.object({
  personaName: z.string().describe('The name of the expert persona.'),
  problemReframing: z.string().describe('How this persona reframes the problem, including their lens, assumptions, sub-questions, and constraints.'),
  hypothesisFormulation: z.string().describe('The primary, alternative, and null hypotheses stated by the expert, including measurable outcomes.'),
  experimentalDesign: z.string().describe('The preferred methods, tools, data needs, metrics, and feasibility estimates outlined by the expert.'),
  expectedFailureModes: z.string().describe('Persona-specific failure modes and potential pitfalls.'),
  priorLiteratureComparison: z.string().describe('Relevant known work identified by the expert, their communitys interpretation, and any contradictions or gaps.'),
});

const GenerateExpertWorkflowsOutputSchema = z.object({
  expertWorkflows: z.array(ExpertWorkflowSchema).describe('The generated workflows for each expert persona.'),
});
export type GenerateExpertWorkflowsOutput = z.infer<typeof GenerateExpertWorkflowsOutputSchema>;

export async function generateExpertWorkflows(input: GenerateExpertWorkflowsInput): Promise<GenerateExpertWorkflowsOutput> {
  return generateExpertWorkflowsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExpertWorkflowsPrompt',
  input: {schema: GenerateExpertWorkflowsInputSchema},
  output: {schema: GenerateExpertWorkflowsOutputSchema},
  prompt: `For each expert persona, generate a detailed workflow including problem reframing, hypothesis formulation, experimental design, expected failure modes, and prior literature comparison based on the following research question: {{{researchQuestion}}}.\n\nExpert Personas:\n{{#each expertPersonas}}\n- {{this.name}}\n{{/each}}\n\nFor each persona, provide:

*   **Problem Reframing:** How this persona reframes the problem, including their lens, assumptions, sub-questions, and constraints.
*   **Hypothesis Formulation:** The primary, alternative, and null hypotheses stated by the expert, including measurable outcomes.
*   **Experimental Design:** The preferred methods, tools, data needs, metrics, and feasibility estimates outlined by the expert.
*   **Expected Failure Modes:** Persona-specific failure modes and potential pitfalls.
*   **Prior Literature Comparison:** Relevant known work identified by the expert, their community\'s interpretation, and any contradictions or gaps.
\nEnsure each workflow is tailored to the specific expertise and perspective of the persona.\n\nFormat the output as a JSON array of expertWorkflows, where each workflow includes the personaName, problemReframing, hypothesisFormulation, experimentalDesign, expectedFailureModes, and priorLiteratureComparison.
`,
});

const generateExpertWorkflowsFlow = ai.defineFlow(
  {
    name: 'generateExpertWorkflowsFlow',
    inputSchema: GenerateExpertWorkflowsInputSchema,
    outputSchema: GenerateExpertWorkflowsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
