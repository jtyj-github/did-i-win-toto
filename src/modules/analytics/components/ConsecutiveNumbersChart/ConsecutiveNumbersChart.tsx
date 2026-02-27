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
import { ConsecutiveNumbersData } from '@/modules/analytics/utils/types';

interface Props {
    data: ConsecutiveNumbersData;
}

export const ConsecutiveNumbersChart = ({ data }: Props) => {
    const chartData = data.distribution.map(({ pairs, count }) => ({
        label: pairs === 0 ? 'None' : `${pairs} pair${pairs > 1 ? 's' : ''}`,
        count
    }));

    return (
        <ChartCard
            description={`${data.percentageWithConsecutive}% of draws contain at least one consecutive pair`}
            title="Consecutive Numbers">
            <ResponsiveContainer height={350} width="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                    <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" />
                    <XAxis
                        dataKey="label"
                        tick={axisTickStyle}
                        tickLine={false}
                    />
                    <YAxis tick={axisTickStyle} tickLine={false} />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="count" fill={CHART_COLORS.secondary} name="Draws" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};
