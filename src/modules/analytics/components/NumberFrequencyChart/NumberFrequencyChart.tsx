'use client';

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
import { NumberFrequencyItem } from '@/modules/analytics/utils/types';

interface Props {
    data: NumberFrequencyItem[];
}

export const NumberFrequencyChart = ({ data }: Props) => {
    return (
        <ChartCard
            description="How often each number (1-49) appears as a winning number"
            title="Number Frequency">
            <ResponsiveContainer height={400} width="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                    <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" />
                    <XAxis
                        dataKey="number"
                        interval={1}
                        tick={{ ...axisTickStyle, fontSize: 10 }}
                        tickLine={false}
                    />
                    <YAxis tick={axisTickStyle} tickLine={false} />
                    <Tooltip
                        {...tooltipStyle}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        formatter={(value: any, _: any, entry: any) => [
                            `${value} times (${entry.payload.percentage.toFixed(1)}%)`,
                            'Appearances'
                        ]}
                    />
                    <Bar dataKey="count" fill={CHART_COLORS.primary} radius={[2, 2, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};
