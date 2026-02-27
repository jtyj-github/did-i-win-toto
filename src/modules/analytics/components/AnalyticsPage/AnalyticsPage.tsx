'use client';

import { Heading } from '@/common/components/Heading';

import { useAnalyticsData } from '../../hooks/useAnalyticsData';
import { ConsecutiveNumbersChart } from '../ConsecutiveNumbersChart';
import { GapAnalysisChart } from '../GapAnalysisChart';
import { HotColdNumbers } from '../HotColdNumbers';
import { JackpotTrendChart } from '../JackpotTrendChart';
import { NumberFrequencyChart } from '../NumberFrequencyChart';
import { NumberPairHeatmap } from '../NumberPairHeatmap';
import { OddEvenHighLowChart } from '../OddEvenHighLowChart';
import { SumDistributionChart } from '../SumDistributionChart';
import { TotalPrizePoolChart } from '../TotalPrizePoolChart';
import { WinnerCountChart } from '../WinnerCountChart';

const SectionHeading = ({ id, title }: { id: string; title: string }) => (
    <div className="pt-6" id={id}>
        <Heading as="h2" className="text-xl font-bold">
            {title}
        </Heading>
    </div>
);

const LoadingSkeleton = () => (
    <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
            <div
                key={i}
                className="h-[460px] animate-pulse rounded-lg bg-blue-900/30"
            />
        ))}
    </div>
);

export const AnalyticsPage = () => {
    const { analytics, loading, totalDraws } = useAnalyticsData();

    if (loading) return <LoadingSkeleton />;
    if (!analytics) return <p className="text-text-em-low">No data available.</p>;

    return (
        <div className="space-y-6">
            {/* Section Nav */}
            <nav className="flex gap-4 text-sm">
                <a className="text-text-em-mid hover:text-text-em-high" href="#number-analytics">
                    Numbers
                </a>
                <a className="text-text-em-mid hover:text-text-em-high" href="#prize-analytics">
                    Prizes
                </a>
                <a className="text-text-em-mid hover:text-text-em-high" href="#pattern-analytics">
                    Patterns
                </a>
            </nav>

            <p className="text-sm text-text-em-low">
                Based on {totalDraws} draws
            </p>

            {/* Number Analytics */}
            <SectionHeading id="number-analytics" title="Number Analytics" />
            <div className="space-y-6">
                <NumberFrequencyChart data={analytics.numberFrequency} />
                <HotColdNumbers data={analytics.hotColdNumbers} />
                <NumberPairHeatmap data={analytics.pairFrequency} />
                <GapAnalysisChart data={analytics.gapAnalysis} />
            </div>

            {/* Prize & Winner Analytics */}
            <SectionHeading id="prize-analytics" title="Prize & Winner Analytics" />
            <div className="space-y-6">
                <JackpotTrendChart data={analytics.jackpotTrend} />
                <WinnerCountChart data={analytics.winnerCounts} />
                <TotalPrizePoolChart data={analytics.totalPrizePool} />
            </div>

            {/* Pattern Analytics */}
            <SectionHeading id="pattern-analytics" title="Pattern Analytics" />
            <div className="space-y-6">
                <OddEvenHighLowChart data={analytics.oddEvenHighLow} />
                <SumDistributionChart data={analytics.sumDistribution} totalDraws={totalDraws} />
                <ConsecutiveNumbersChart data={analytics.consecutiveNumbers} />
            </div>
        </div>
    );
};
