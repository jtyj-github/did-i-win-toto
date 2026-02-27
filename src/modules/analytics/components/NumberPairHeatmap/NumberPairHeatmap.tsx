'use client';

import { useMemo, useState } from 'react';

import { ChartCard } from '@/modules/analytics/components/ChartCard';
import { CHART_COLORS } from '@/modules/analytics/utils/chartTheme';
import { PairFrequencyItem } from '@/modules/analytics/utils/types';

interface Props {
    data: PairFrequencyItem[];
}

const interpolateColor = (ratio: number): string => {
    const r = Math.round(22 + (43 - 22) * ratio);
    const g = Math.round(27 + (113 - 27) * ratio);
    const b = Math.round(34 + (233 - 34) * ratio);
    return `rgb(${r},${g},${b})`;
};

export const NumberPairHeatmap = ({ data }: Props) => {
    const [hoveredPair, setHoveredPair] = useState<{ num1: number; num2: number; count: number } | null>(null);

    const { matrix, maxCount } = useMemo(() => {
        const m = new Map<string, number>();
        let max = 0;
        for (const { num1, num2, count } of data) {
            m.set(`${num1}-${num2}`, count);
            if (count > max) max = count;
        }
        return { matrix: m, maxCount: max };
    }, [data]);

    const top20 = data.slice(0, 20);
    const cellSize = 7;
    const gridSize = 49 * cellSize;

    return (
        <ChartCard
            description="How often pairs of numbers appear together. Brighter = more frequent."
            title="Number Pair Frequency">
            <div className="flex flex-col gap-6 lg:flex-row">
                {/* Heatmap - hidden on mobile */}
                <div className="hidden md:block">
                    <div className="relative">
                        {hoveredPair && (
                            <div className="absolute -top-8 left-0 rounded bg-surface-base px-2 py-1 text-xs text-text-em-high">
                                ({hoveredPair.num1}, {hoveredPair.num2}) = {hoveredPair.count} times
                            </div>
                        )}
                        <svg
                            height={gridSize + 20}
                            viewBox={`0 0 ${gridSize + 20} ${gridSize + 20}`}
                            width={gridSize + 20}>
                            {Array.from({ length: 49 }, (_, i) =>
                                Array.from({ length: 49 }, (_, j) => {
                                    if (i >= j) return null;
                                    const num1 = i + 1;
                                    const num2 = j + 1;
                                    const count = matrix.get(`${num1}-${num2}`) ?? 0;
                                    const ratio = maxCount > 0 ? count / maxCount : 0;
                                    return (
                                        <rect
                                            key={`${i}-${j}`}
                                            fill={count > 0 ? interpolateColor(ratio) : CHART_COLORS.background}
                                            height={cellSize}
                                            width={cellSize}
                                            x={j * cellSize + 10}
                                            y={i * cellSize + 10}
                                            onMouseEnter={() => setHoveredPair({ num1, num2, count })}
                                            onMouseLeave={() => setHoveredPair(null)}
                                        />
                                    );
                                })
                            )}
                        </svg>
                    </div>
                </div>

                {/* Top pairs table */}
                <div className="flex-1">
                    <p className="mb-2 text-sm font-medium text-text-em-mid">Top 20 Pairs</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        {top20.map(({ num1, num2, count }, i) => (
                            <div key={i} className="flex justify-between font-mono">
                                <span className="text-text-em-high">
                                    ({num1}, {num2})
                                </span>
                                <span className="text-text-em-low">{count}x</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ChartCard>
    );
};
