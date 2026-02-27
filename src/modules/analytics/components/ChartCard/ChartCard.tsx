'use client';

import { ReactNode } from 'react';

import { Heading } from '@/common/components/Heading';
import { cn } from '@/common/utils/cn';

interface ChartCardProps {
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

export const ChartCard = ({ title, description, children, className }: ChartCardProps) => {
    return (
        <div
            className={cn(
                'space-y-4 rounded-lg border-t border-t-white/30 bg-blue-900/50 px-6 py-6 shadow-lg backdrop-blur md:px-10 md:py-8',
                className
            )}>
            <div>
                <Heading as="h3" className="text-lg font-bold">
                    {title}
                </Heading>
                {description && (
                    <p className="mt-1 text-sm text-text-em-low">{description}</p>
                )}
            </div>
            {children}
        </div>
    );
};
