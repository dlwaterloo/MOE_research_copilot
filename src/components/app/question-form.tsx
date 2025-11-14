'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const formSchema = z.object({
  question: z.string().min(10, {
    message: 'Please enter a more detailed question (at least 10 characters).',
  }),
});

type QuestionFormProps = {
  onSubmit: (question: string) => void;
};

export default function QuestionForm({ onSubmit }: QuestionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.question);
  };

  return (
    <Card className="w-full shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Enter Your Research Question</CardTitle>
        <CardDescription>
          Provide a question, project idea, or even a vague concept. The more detail, the better the expert analysis.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Research Question</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Does LLM chain-of-thought improve reasoning accuracy?"
                      className="min-h-[120px] resize-y text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" size="lg" className="w-full">
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Expert Personas
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
