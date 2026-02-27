'use client';

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

import { formatAmount } from '@/common/utils';

import { ChartCard } from '@/modules/analytics/components/ChartCard';
import { axisTickStyle, CHART_COLORS, tooltipStyle } from '@/modules/analytics/utils/chartTheme';
import { TotalPrizePoolItem } from '@/modules/analytics/utils/types';

interface Props {
    data: TotalPrizePoolItem[];
}

const formatYAxis = (value: number) => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
    return String(value);
};

export const TotalPrizePoolChart = ({ data }: Props) => {
    return (
        <ChartCard
            description="Sum of all group payouts (prize x winners) per draw"
            title="Total Prize Pool per Draw">
            <ResponsiveContainer height={400} width="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                    <defs>
                        <linearGradient id="poolGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="5%" stopColor={CHART_COLORS.secondary} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={CHART_COLORS.secondary} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" />
                    <XAxis
                        dataKey="drawNumber"
                        tick={axisTickStyle}
                        tickLine={false}
                    />
                    <YAxis
                        tick={axisTickStyle}
                        tickFormatter={formatYAxis}
                        tickLine={false}
                    />
                    <Tooltip
                        {...tooltipStyle}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        formatter={(value: any) => [formatAmount(value), 'Total Payout']}
                        labelFormatter={(label) => `Draw #${label}`}
                    />
                    <Area
                        dataKey="totalPool"
                        fill="url(#poolGradient)"
                        stroke={CHART_COLORS.secondary}
                        strokeWidth={2}
                        type="monotone"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};
