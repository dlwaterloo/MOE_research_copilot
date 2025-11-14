import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GraduationCap, GitCompareArrows } from 'lucide-react';

type ComparisonViewProps = {
  summary: string;
  insights: string;
};

function ViewContent({ content }: { content: string }) {
    // Simple markdown-to-html. A more robust library could be used for complex markdown.
  const paragraphs = content.split('\n').filter(p => p.trim() !== '');
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90 space-y-2">
      {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  );
}

export default function ComparisonView({ summary, insights }: ComparisonViewProps) {
  return (
    <section className="space-y-6">
      <Accordion type="multiple" defaultValue={['summary', 'insights']} className="w-full space-y-4">
        <AccordionItem value="summary" className="border rounded-lg bg-card shadow-md">
          <AccordionTrigger className="px-6 py-4 font-headline text-xl hover:no-underline">
            <div className="flex items-center gap-3">
                <GitCompareArrows className="h-6 w-6 text-primary" />
                Cross-Persona Comparison
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <ViewContent content={summary} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="insights" className="border rounded-lg bg-card shadow-md">
          <AccordionTrigger className="px-6 py-4 font-headline text-xl hover:no-underline">
            <div className="flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-primary" />
                Meta-Learning Panel
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <ViewContent content={insights} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
