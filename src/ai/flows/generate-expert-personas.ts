'use server';

/**
 * @fileOverview A flow for generating expert personas tailored to a research question.
 *
 * - generateExpertPersonas - A function that generates a list of expert personas.
 * - GenerateExpertPersonasInput - The input type for the generateExpertPersonas function.
 * - GenerateExpertPersonasOutput - The return type for the generateExpertPersonas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExpertPersonasInputSchema = z.object({
  researchQuestion: z.string().describe('The research question to generate personas for.'),
});
export type GenerateExpertPersonasInput = z.infer<typeof GenerateExpertPersonasInputSchema>;

const GenerateExpertPersonasOutputSchema = z.array(z.string().describe('A list of expert personas.'));
export type GenerateExpertPersonasOutput = z.infer<typeof GenerateExpertPersonasOutputSchema>;

export async function generateExpertPersonas(input: GenerateExpertPersonasInput): Promise<GenerateExpertPersonasOutput> {
  return generateExpertPersonasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExpertPersonasPrompt',
  input: {schema: GenerateExpertPersonasInputSchema},
  output: {schema: GenerateExpertPersonasOutputSchema},
  prompt: `You are an AI assistant designed to generate a diverse set of expert personas tailored to a research question.

  Given the following research question:
  {{researchQuestion}}

  Generate a list of 6 expert personas who would have valuable perspectives on this question. The personas should be diverse and represent different fields of expertise.

  Return the personas as a JSON array of strings.  Do NOT include any other preamble or explanation text.  Only return the JSON array.`,
});

const generateExpertPersonasFlow = ai.defineFlow(
  {
    name: 'generateExpertPersonasFlow',
    inputSchema: GenerateExpertPersonasInputSchema,
    outputSchema: GenerateExpertPersonasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
