'use client';

import { useState } from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

import { SegmentedControl } from '@/common/components/SegmentedControl';

import { ChartCard } from '@/modules/analytics/components/ChartCard';
import { axisTickStyle, CHART_COLORS, CHART_PALETTE, tooltipStyle } from '@/modules/analytics/utils/chartTheme';
import { WinnerCountItem } from '@/modules/analytics/utils/types';

interface Props {
    data: WinnerCountItem[];
}

const formatYAxis = (value: number) => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
    return String(value);
};

const groupSets = {
    upper: {
        keys: ['group1', 'group2', 'group3', 'group4'] as const,
        labels: ['Group 1', 'Group 2', 'Group 3', 'Group 4']
    },
    lower: {
        keys: ['group5', 'group6', 'group7'] as const,
        labels: ['Group 5', 'Group 6', 'Group 7']
    }
};

export const WinnerCountChart = ({ data }: Props) => {
    const [view, setView] = useState('upper');
    const set = view === 'upper' ? groupSets.upper : groupSets.lower;

    return (
        <ChartCard
            description="Number of winners per prize group over time"
            title="Winner Count Trends">
            <SegmentedControl
                options={[
                    { value: 'upper', label: 'Groups 1-4' },
                    { value: 'lower', label: 'Groups 5-7' }
                ]}
                value={view}
                onValueChange={setView}
            />
            <ResponsiveContainer height={400} width="100%">
                <LineChart data={data} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
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
                        labelFormatter={(label) => `Draw #${label}`}
                    />
                    {set.keys.map((key, i) => (
                        <Line
                            key={key}
                            dataKey={key}
                            dot={false}
                            name={set.labels[i]}
                            stroke={CHART_PALETTE[i]}
                            strokeWidth={1.5}
                            type="monotone"
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};
