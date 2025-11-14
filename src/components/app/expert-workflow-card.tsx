import type { ExpertWorkflow } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPersonaIcon } from './icons';

type ExpertWorkflowCardProps = {
  workflow: ExpertWorkflow;
};

function WorkflowContent({ content }: { content: string }) {
  // Simple markdown-to-html. A more robust library could be used for complex markdown.
  const paragraphs = content.split('\n').filter(p => p.trim() !== '');
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90 space-y-2">
      {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  );
}

export default function ExpertWorkflowCard({ workflow }: ExpertWorkflowCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-4">
          {getPersonaIcon(workflow.personaName)}
          {workflow.personaName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="reframing" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-4 h-auto flex-wrap">
            <TabsTrigger value="reframing">Reframing</TabsTrigger>
            <TabsTrigger value="hypothesis">Hypothesis</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="failures">Failures</TabsTrigger>
            <TabsTrigger value="literature">Literature</TabsTrigger>
          </TabsList>
          <TabsContent value="reframing" className="p-4 bg-secondary/50 rounded-md">
            <WorkflowContent content={workflow.problemReframing} />
          </TabsContent>
          <TabsContent value="hypothesis" className="p-4 bg-secondary/50 rounded-md">
            <WorkflowContent content={workflow.hypothesisFormulation} />
          </TabsContent>
          <TabsContent value="design" className="p-4 bg-secondary/50 rounded-md">
            <WorkflowContent content={workflow.experimentalDesign} />
          </TabsContent>
          <TabsContent value="failures" className="p-4 bg-secondary/50 rounded-md">
            <WorkflowContent content={workflow.expectedFailureModes} />
          </TabsContent>
          <TabsContent value="literature" className="p-4 bg-secondary/50 rounded-md">
            <WorkflowContent content={workflow.priorLiteratureComparison} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
