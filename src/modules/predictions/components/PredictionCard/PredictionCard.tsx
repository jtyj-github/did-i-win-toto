'use client';

import { Heading } from '@/common/components/Heading';
import { cn } from '@/common/utils/cn';

import { PredictionResult } from '../../utils/predictionEngine';

interface PredictionCardProps {
    prediction: PredictionResult;
    rank: number;
}

const confidenceColor = (confidence: number) => {
    if (confidence >= 40) return 'text-emerald-400';
    if (confidence >= 30) return 'text-amber-400';
    return 'text-text-em-mid';
};

const confidenceBarColor = (confidence: number) => {
    if (confidence >= 40) return 'bg-emerald-400';
    if (confidence >= 30) return 'bg-amber-400';
    return 'bg-text-em-mid';
};

export const PredictionCard = ({ prediction, rank }: PredictionCardProps) => {
    return (
        <div className="space-y-4 rounded-lg border-t border-t-white/30 bg-blue-900/50 px-6 py-6 shadow-lg backdrop-blur md:px-10 md:py-8">
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-text-em-mid">
                            {rank}
                        </span>
                        <Heading as="h3" className="text-lg font-bold">
                            {prediction.name}
                        </Heading>
                    </div>
                    <p className="mt-1 text-sm text-text-em-low">{prediction.description}</p>
                </div>
                <div className="text-right">
                    <span className={cn('text-sm font-semibold', confidenceColor(prediction.confidence))}>
                        {prediction.confidence}%
                    </span>
                    <div className="mt-1 h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                        <div
                            className={cn('h-full rounded-full transition-all', confidenceBarColor(prediction.confidence))}
                            style={{ width: `${prediction.confidence}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Predicted Numbers */}
            <div className="flex items-center justify-center gap-3 py-4 md:gap-6">
                {prediction.numbers.map((num) => (
                    <div
                        key={num}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10 md:h-14 md:w-14">
                        <span className="font-mono text-2xl font-bold text-amber-400 md:text-3xl">
                            {num}
                        </span>
                    </div>
                ))}
            </div>

            {/* Reasoning */}
            <div className="space-y-1.5 border-t border-white/10 pt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-em-low">
                    Reasoning
                </span>
                <ul className="space-y-1">
                    {prediction.reasoning.map((reason, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-em-mid">
                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-text-em-low" />
                            {reason}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
