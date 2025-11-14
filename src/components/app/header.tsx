import { BrainCircuit, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HeaderProps = {
  onRestart: () => void;
  showRestart: boolean;
};

export default function Header({ onRestart, showRestart }: HeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-xl font-bold tracking-tighter sm:text-2xl">
            ExpertMind Research Engine
          </h1>
        </div>
        {showRestart && (
          <Button variant="outline" size="sm" onClick={onRestart}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Start New
          </Button>
        )}
      </div>
    </header>
  );
}
