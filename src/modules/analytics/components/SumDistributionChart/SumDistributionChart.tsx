'use client';

import { useMemo } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

import { ChartCard } from '@/modules/analytics/components/ChartCard';
import { axisTickStyle, CHART_COLORS, tooltipStyle } from '@/modules/analytics/utils/chartTheme';
import { SumDistributionItem } from '@/modules/analytics/utils/types';

interface Props {
    data: SumDistributionItem[];
    totalDraws: number;
}

export const SumDistributionChart = ({ data, totalDraws }: Props) => {
    const meanSum = useMemo(() => {
        // Mean of 6 numbers chosen from 1-49 = 6 * 25 = 150
        // But compute actual from data distribution
        let total = 0;
        let count = 0;
        for (const bin of data) {
            const [start, end] = bin.sumRange.split('-').map(Number);
            const mid = (start + end) / 2;
            total += mid * bin.count;
            count += bin.count;
        }
        return count > 0 ? Math.round(total / count) : 150;
    }, [data]);

    return (
        <ChartCard
            description={`Distribution of the sum of 6 winning numbers per draw. Mean: ~${meanSum}`}
            title="Sum of Winning Numbers">
            <ResponsiveContainer height={400} width="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                    <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" />
                    <XAxis
                        dataKey="sumRange"
                        tick={axisTickStyle}
                        tickLine={false}
                    />
                    <YAxis tick={axisTickStyle} tickLine={false} />
                    <Tooltip
                        {...tooltipStyle}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        formatter={(value: any) => [
                            `${value} draws (${((value / totalDraws) * 100).toFixed(1)}%)`,
                            'Count'
                        ]}
                    />
                    <Bar dataKey="count" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};
