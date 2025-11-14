'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getPersonas, getResearch } from './actions';
import type { AppState } from '@/lib/types';
import Header from '@/components/app/header';
import QuestionForm from '@/components/app/question-form';
import PersonaSelection from '@/components/app/persona-selection';
import ResearchDashboard from '@/components/app/research-dashboard';
import LoadingSpinner from '@/components/app/loading-spinner';

const initialState: AppState = {
  step: 1,
  researchQuestion: '',
  personas: [],
  selectedPersonas: [],
  expertWorkflows: [],
  comparisonSummary: '',
  metaLearningInsights: '',
};

export default function Home() {
  const [state, setState] = useState<AppState>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleQuestionSubmit = async (question: string) => {
    setIsLoading(true);
    setState(prev => ({ ...prev, researchQuestion: question }));
    try {
      const personas = await getPersonas(question);
      setState(prev => ({ ...prev, step: 2, personas }));
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Personas',
        description: 'Could not generate expert personas. Please try again.',
      });
      setState(prev => ({ ...prev, researchQuestion: '' }));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonaSubmit = async (selected: string[]) => {
    setIsLoading(true);
    setState(prev => ({ ...prev, selectedPersonas: selected }));
    try {
      const researchData = await getResearch(state.researchQuestion, selected);
      setState(prev => ({
        ...prev,
        step: 3,
        expertWorkflows: researchData.expertWorkflows,
        comparisonSummary: researchData.comparisonSummary,
        metaLearningInsights: researchData.metaLearningInsights,
      }));
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Research',
        description: 'Could not generate expert workflows. Please try again.',
      });
      setState(prev => ({ ...prev, selectedPersonas: [] }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setState(initialState);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onRestart={handleRestart} showRestart={state.step > 1} />
      <main className="flex-1 w-full">
        {isLoading && <LoadingSpinner />}
        {!isLoading && state.step === 1 && (
          <div className="container mx-auto max-w-3xl py-12 md:py-24">
            <QuestionForm onSubmit={handleQuestionSubmit} />
          </div>
        )}
        {!isLoading && state.step === 2 && (
          <div className="container mx-auto max-w-5xl py-12">
            <PersonaSelection
              personas={state.personas}
              question={state.researchQuestion}
              onSubmit={handlePersonaSubmit}
              onBack={() => setState(prev => ({ ...prev, step: 1, personas: []}))}
            />
          </div>
        )}
        {!isLoading && state.step === 3 && <ResearchDashboard data={state} />}
      </main>
    </div>
  );
}
