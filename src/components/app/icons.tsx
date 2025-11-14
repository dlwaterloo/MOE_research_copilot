import { BrainCircuit, Cpu, Sigma, BarChart3, BrainCog, Rocket, Code, FlaskConical, Landmark, Scale, Lightbulb, User, MessageSquare, TestTube2, Building } from 'lucide-react';
import { cn } from '@/lib/utils';

export const getPersonaIcon = (persona: string, className?: string) => {
    const lowerPersona = persona.toLowerCase();
    const iconProps = { className: cn("size-8 text-accent", className) };

    if (lowerPersona.includes('neuro')) return <BrainCircuit {...iconProps} />;
    if (lowerPersona.includes('machine learning') || lowerPersona.includes('ml')) return <Cpu {...iconProps} />;
    if (lowerPersona.includes('mathematician')) return <Sigma {...iconProps} />;
    if (lowerPersona.includes('statistician')) return <BarChart3 {...iconProps} />;
    if (lowerPersona.includes('cognitive')) return <BrainCog {...iconProps} />;
    if (lowerPersona.includes('founder')) return <Rocket {...iconProps} />;
    if (lowerPersona.includes('engineer')) return <Code {...iconProps} />;
    if (lowerPersona.includes('biomedical') || lowerPersona.includes('biologist')) return <FlaskConical {...iconProps} />;
    if (lowerPersona.includes('economist')) return <Landmark {...iconProps} />;
    if (lowerPersona.includes('philosopher')) return <Scale {...iconProps} />;
    if (lowerPersona.includes('ethicist')) return <Scale {...iconProps} />;
    if (lowerPersona.includes('sociologist')) return <MessageSquare {...iconProps} />;
    if (lowerPersona.includes('physicist')) return <TestTube2 {...iconProps} />;
    if (lowerPersona.includes('urban planner')) return <Building {...iconProps} />;
    if (lowerPersona.includes('historian')) return <Landmark {...iconProps} />;


    return <Lightbulb {...iconProps} />; 
};
