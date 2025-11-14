import { Loader2 } from 'lucide-react';

const messages = [
  "Experts are thinking...",
  "Synthesizing diverse perspectives...",
  "Comparing mental models...",
  "Generating research workflows...",
  "Identifying hidden assumptions...",
  "Simulating expert collaboration...",
];

export default function LoadingSpinner() {
  // Simple way to show a random message, not using useEffect to avoid client/server mismatch issues.
  const message = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 font-headline text-lg text-foreground">{message}</p>
    </div>
  );
}
