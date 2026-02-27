'use client';

import { useMemo, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

import { SegmentedControl } from '@/common/components/SegmentedControl';

import { ChartCard } from '@/modules/analytics/components/ChartCard';
import { axisTickStyle, CHART_COLORS, tooltipStyle } from '@/modules/analytics/utils/chartTheme';
import { HotColdItem } from '@/modules/analytics/utils/types';

interface Props {
    data: HotColdItem[];
}

export const HotColdNumbers = ({ data }: Props) => {
    const [view, setView] = useState('hot');

    const chartData = useMemo(() => {
        const sorted = [...data].sort((a, b) =>
            view === 'hot'
                ? b.recentCount - a.recentCount
                : a.recentCount - b.recentCount
        );
        return sorted.slice(0, 10);
    }, [data, view]);

    return (
        <ChartCard
            description="Most and least frequently drawn numbers in the last 30 draws vs all-time"
            title="Hot & Cold Numbers">
            <SegmentedControl
                options={[
                    { value: 'hot', label: 'Hot' },
                    { value: 'cold', label: 'Cold' }
                ]}
                value={view}
                onValueChange={setView}
            />
            <ResponsiveContainer height={400} width="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                    <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" />
                    <XAxis
                        dataKey="number"
                        tick={axisTickStyle}
                        tickLine={false}
                    />
                    <YAxis tick={axisTickStyle} tickLine={false} />
                    <Tooltip {...tooltipStyle} />
                    <Bar
                        dataKey="recentCount"
                        fill={view === 'hot' ? CHART_COLORS.amber : '#3B82F6'}
                        name="Last 30 draws"
                        radius={[2, 2, 0, 0]}
                    />
                    <Bar
                        dataKey="allTimeCount"
                        fill={CHART_COLORS.textLow}
                        name="All-time"
                        radius={[2, 2, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};
