'use client';

import { Heading } from '@/common/components/Heading';
import { cn } from '@/common/utils/cn';

import { usePredictions } from '../../hooks/usePredictions';
import { NumberStats } from '../../utils/predictionEngine';
import { PredictionCard } from '../PredictionCard';

const LoadingSkeleton = () => (
    <div className="space-y-6">
        {/* Disclaimer skeleton */}
        <div className="h-12 animate-pulse rounded-lg bg-amber-400/5" />
        {/* Prediction card skeletons */}
        {Array.from({ length: 3 }).map((_, i) => (
            <div
                key={i}
                className="space-y-4 rounded-lg border-t border-t-white/10 bg-blue-900/30 px-6 py-6 md:px-10 md:py-8">
                <div className="flex items-center gap-3">
                    <div className="h-7 w-7 animate-pulse rounded-full bg-white/10" />
                    <div className="h-5 w-40 animate-pulse rounded bg-white/10" />
                </div>
                <div className="flex justify-center gap-4 py-4">
                    {Array.from({ length: 6 }).map((_, j) => (
                        <div
                            key={j}
                            className="h-12 w-12 animate-pulse rounded-full bg-white/10 md:h-14 md:w-14"
                        />
                    ))}
                </div>
                <div className="space-y-2 border-t border-white/5 pt-4">
                    <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
                    <div className="h-3 w-3/4 animate-pulse rounded bg-white/5" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-white/5" />
                </div>
            </div>
        ))}
    </div>
);

const NumberHeatmap = ({ stats, totalDraws }: { stats: NumberStats[]; totalDraws: number }) => {
    const maxFreq = Math.max(...stats.map((s) => s.frequency));
    const minFreq = Math.min(...stats.map((s) => s.frequency));

    const getIntensity = (freq: number) => {
        if (maxFreq === minFreq) return 0.5;
        return (freq - minFreq) / (maxFreq - minFreq);
    };

    const getColor = (intensity: number) => {
        if (intensity >= 0.8) return 'bg-emerald-500/80 text-white';
        if (intensity >= 0.6) return 'bg-emerald-500/50 text-emerald-100';
        if (intensity >= 0.4) return 'bg-blue-500/40 text-blue-100';
        if (intensity >= 0.2) return 'bg-blue-500/20 text-text-em-mid';
        return 'bg-white/5 text-text-em-low';
    };

    return (
        <div className="space-y-4 rounded-lg border-t border-t-white/30 bg-blue-900/50 px-6 py-6 shadow-lg backdrop-blur md:px-10 md:py-8">
            <div>
                <Heading as="h3" className="text-lg font-bold">
                    Number Frequency Heatmap
                </Heading>
                <p className="mt-1 text-sm text-text-em-low">
                    Brighter = more frequent across {totalDraws} draws
                </p>
            </div>
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {stats.map((s) => {
                    const intensity = getIntensity(s.frequency);
                    return (
                        <div
                            key={s.number}
                            className={cn(
                                'flex flex-col items-center justify-center rounded-md py-2 transition-colors',
                                getColor(intensity)
                            )}
                            title={`Number ${s.number}: ${s.frequency} times (${(s.frequency / totalDraws * 100).toFixed(1)}%)`}>
                            <span className="font-mono text-sm font-bold">{s.number}</span>
                            <span className="text-[10px] opacity-70">{s.frequency}</span>
                        </div>
                    );
                })}
            </div>
            <div className="flex items-center justify-between text-xs text-text-em-low">
                <div className="flex items-center gap-1.5">
                    <span className="inline-block h-3 w-3 rounded bg-white/5" />
                    <span>Least frequent ({minFreq})</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="inline-block h-3 w-3 rounded bg-emerald-500/80" />
                    <span>Most frequent ({maxFreq})</span>
                </div>
            </div>
        </div>
    );
};

const OverdueTable = ({ stats }: { stats: NumberStats[] }) => {
    const overdue = [...stats]
        .sort((a, b) => b.drawsSinceLastSeen - a.drawsSinceLastSeen)
        .slice(0, 10);

    return (
        <div className="space-y-4 rounded-lg border-t border-t-white/30 bg-blue-900/50 px-6 py-6 shadow-lg backdrop-blur md:px-10 md:py-8">
            <div>
                <Heading as="h3" className="text-lg font-bold">
                    Most Overdue Numbers
                </Heading>
                <p className="mt-1 text-sm text-text-em-low">
                    Numbers that haven&apos;t appeared for the longest time
                </p>
            </div>
            <div className="grid gap-2">
                {overdue.map((s) => (
                    <div key={s.number} className="flex items-center gap-3">
                        <span className="w-8 text-center font-mono text-lg font-bold text-amber-400">
                            {s.number}
                        </span>
                        <div className="flex-1">
                            <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                <div
                                    className="h-full rounded-full bg-red-400/70"
                                    style={{
                                        width: `${Math.min((s.drawsSinceLastSeen / 40) * 100, 100)}%`
                                    }}
                                />
                            </div>
                        </div>
                        <span className="w-24 text-right text-sm text-text-em-mid">
                            {s.drawsSinceLastSeen} draws ago
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const PredictionsPage = () => {
    const { predictions, stats, loading, totalDraws, lastDraw, regenerate, generationCount } =
        usePredictions();

    if (loading) return <LoadingSkeleton />;
    if (!predictions.length) return <p className="text-text-em-low">No data available.</p>;

    return (
        <div className="space-y-6">
            {/* Header info */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-text-em-low">
                    Based on {totalDraws} draws
                    {lastDraw && <> &middot; Latest: Draw #{lastDraw.drawNumber}</>}
                </p>
                <button
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-text-em-mid transition-colors hover:bg-white/10 hover:text-text-em-high"
                    onClick={regenerate}>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                        />
                    </svg>
                    Re-generate ({generationCount})
                </button>
            </div>

            {/* Disclaimer */}
            <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-sm text-amber-200/80">
                Lottery numbers are random. These predictions use statistical analysis of past draws
                but cannot guarantee future results. Play responsibly.
            </div>

            {/* Predictions */}
            <div className="space-y-4">
                {predictions.map((prediction, i) => (
                    <PredictionCard key={`${generationCount}-${i}`} prediction={prediction} rank={i + 1} />
                ))}
            </div>

            {/* Stats */}
            <Heading as="h2" className="pt-4 text-xl font-bold">
                Number Insights
            </Heading>
            <div className="space-y-6">
                <NumberHeatmap stats={stats} totalDraws={totalDraws} />
                <OverdueTable stats={stats} />
            </div>
        </div>
    );
};
