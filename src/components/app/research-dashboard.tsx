'use client';

import type { AppState } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProblemWorkspace from './problem-workspace';
import ParallelExpertView from './parallel-expert-view';
import ComparisonView from './comparison-view';
import ExpertRail from './expert-rail';
import { useRef } from 'react';

type ResearchDashboardProps = {
  data: AppState;
};

export default function ResearchDashboard({ data }: ResearchDashboardProps) {
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToPersona = (personaName: string) => {
    contentRefs.current[personaName]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] animate-in fade-in-50 duration-500">
      <ExpertRail personas={data.selectedPersonas} onSelectPersona={scrollToPersona} />
      <ScrollArea className="flex-1">
        <div className="container mx-auto max-w-5xl space-y-8 p-4 pt-8 md:p-8">
          <ProblemWorkspace question={data.researchQuestion} />
          <ParallelExpertView workflows={data.expertWorkflows} contentRefs={contentRefs} />
          <ComparisonView
            summary={data.comparisonSummary}
            insights={data.metaLearningInsights}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
