import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileQuestion } from 'lucide-react';

type ProblemWorkspaceProps = {
  question: string;
};

export default function ProblemWorkspace({ question }: ProblemWorkspaceProps) {
  return (
    <section>
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-3">
            <FileQuestion className="text-primary"/>
            Your Research Question
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-foreground/80">
            {question}
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
