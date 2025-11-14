import type { ExpertWorkflow } from '@/lib/types';
import ExpertWorkflowCard from './expert-workflow-card';
import type { MutableRefObject } from 'react';

type ParallelExpertViewProps = {
  workflows: ExpertWorkflow[];
  contentRefs: MutableRefObject<Record<string, HTMLDivElement | null>>;
};

export default function ParallelExpertView({ workflows, contentRefs }: ParallelExpertViewProps) {
  return (
    <section className="space-y-6">
      {workflows.map(workflow => (
        <div
          key={workflow.personaName}
          ref={el => (contentRefs.current[workflow.personaName] = el)}
          className="scroll-mt-24"
        >
          <ExpertWorkflowCard workflow={workflow} />
        </div>
      ))}
    </section>
  );
}
