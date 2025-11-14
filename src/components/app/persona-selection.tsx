'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Check, Sparkles, Users } from 'lucide-react';
import { getPersonaIcon } from './icons';
import { cn } from '@/lib/utils';

type PersonaSelectionProps = {
  personas: string[];
  question: string;
  onSubmit: (selectedPersonas: string[]) => void;
  onBack: () => void;
};

export default function PersonaSelection({ personas, question, onSubmit, onBack }: PersonaSelectionProps) {
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>(personas);

  const togglePersona = (persona: string) => {
    setSelectedPersonas(prev =>
      prev.includes(persona) ? prev.filter(p => p !== persona) : [...prev, persona]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPersonas.length === personas.length) {
      setSelectedPersonas([]);
    } else {
      setSelectedPersonas(personas);
    }
  };

  const isAllSelected = selectedPersonas.length === personas.length;

  return (
    <Card className="w-full shadow-2xl animate-in fade-in-50 duration-500">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="font-headline text-3xl flex items-center gap-3"><Users /> Select Expert Personas</CardTitle>
                <CardDescription className="mt-2">
                    We've generated these expert personas based on your question. Choose which mindsets to explore.
                </CardDescription>
            </div>
            <Button variant="ghost" onClick={onBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
        </div>
        <p className="text-sm text-muted-foreground pt-4"><strong>Your Question:</strong> "{question}"</p>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="select-all" checked={isAllSelected} onCheckedChange={toggleSelectAll} />
              <Label htmlFor="select-all" className="font-bold">
                {isAllSelected ? 'Deselect All' : 'Select All'}
              </Label>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {personas.map(persona => {
            const isSelected = selectedPersonas.includes(persona);
            return (
              <div
                key={persona}
                onClick={() => togglePersona(persona)}
                className={cn(
                  "flex items-start gap-4 rounded-lg border p-4 transition-all cursor-pointer hover:bg-accent/50",
                  isSelected && "ring-2 ring-primary bg-accent/20"
                )}
              >
                <div className="mt-1">
                  {getPersonaIcon(persona, 'size-6')}
                </div>
                <div className="flex-1">
                  <Label htmlFor={persona} className="font-bold text-base cursor-pointer">{persona}</Label>
                </div>
                <div className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full border border-primary transition-colors",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-transparent"
                )}>
                   {isSelected && <Check className="h-4 w-4" />}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onSubmit(selectedPersonas)}
          disabled={selectedPersonas.length === 0}
          size="lg"
          className="w-full"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Generate Expert Workflows ({selectedPersonas.length})
        </Button>
      </CardFooter>
    </Card>
  );
}
