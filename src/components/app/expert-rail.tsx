import { getPersonaIcon } from './icons';

type ExpertRailProps = {
  personas: string[];
  onSelectPersona: (personaName: string) => void;
};

export default function ExpertRail({ personas, onSelectPersona }: ExpertRailProps) {
  return (
    <aside className="hidden h-full w-64 flex-col border-r bg-card p-4 md:flex">
      <h2 className="mb-4 font-headline text-lg font-semibold tracking-tight">
        Expert Personas
      </h2>
      <nav className="flex flex-col gap-1">
        {personas.map(persona => (
          <button
            key={persona}
            onClick={() => onSelectPersona(persona)}
            className="group flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent/50 focus:outline-none"
          >
            {getPersonaIcon(persona, 'size-5 text-muted-foreground group-hover:text-accent-foreground transition-colors')}
            <span>{persona}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
