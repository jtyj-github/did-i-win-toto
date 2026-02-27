'use client';

import { useMemo, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

import { SegmentedControl } from '@/common/components/SegmentedControl';

import { ChartCard } from '@/modules/analytics/components/ChartCard';
import { axisTickStyle, CHART_COLORS, tooltipStyle } from '@/modules/analytics/utils/chartTheme';
import { OddEvenHighLowItem } from '@/modules/analytics/utils/types';

interface Props {
    data: OddEvenHighLowItem[];
}

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.amber];

export const OddEvenHighLowChart = ({ data }: Props) => {
    const [view, setView] = useState('oddeven');

    const summary = useMemo(() => {
        const totalOdd = data.reduce((s, d) => s + d.oddCount, 0);
        const totalHigh = data.reduce((s, d) => s + d.highCount, 0);
        const total = data.length * 6;
        return {
            oddEven: [
                { name: 'Odd', value: totalOdd },
                { name: 'Even', value: total - totalOdd }
            ],
            highLow: [
                { name: 'High (25-49)', value: totalHigh },
                { name: 'Low (1-24)', value: total - totalHigh }
            ]
        };
    }, [data]);

    const isOddEven = view === 'oddeven';
    const barKey1 = isOddEven ? 'oddCount' : 'highCount';
    const barKey2 = isOddEven ? 'evenCount' : 'lowCount';
    const label1 = isOddEven ? 'Odd' : 'High (25-49)';
    const label2 = isOddEven ? 'Even' : 'Low (1-24)';
    const pieData = isOddEven ? summary.oddEven : summary.highLow;

    return (
        <ChartCard
            description="Distribution of odd vs even and high vs low numbers per draw"
            title="Odd/Even & High/Low Distribution">
            <SegmentedControl
                options={[
                    { value: 'oddeven', label: 'Odd / Even' },
                    { value: 'highlow', label: 'High / Low' }
                ]}
                value={view}
                onValueChange={setView}
            />
            <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1">
                    <ResponsiveContainer height={350} width="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 10, right: 10, bottom: 20, left: 10 }}
                            stackOffset="none">
                            <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" />
                            <XAxis
                                dataKey="drawNumber"
                                tick={axisTickStyle}
                                tickLine={false}
                            />
                            <YAxis domain={[0, 6]} tick={axisTickStyle} tickLine={false} />
                            <Tooltip
                                {...tooltipStyle}
                                labelFormatter={(label) => `Draw #${label}`}
                            />
                            <Bar
                                dataKey={barKey1}
                                fill={CHART_COLORS.primary}
                                name={label1}
                                stackId="a"
                            />
                            <Bar
                                dataKey={barKey2}
                                fill={CHART_COLORS.amber}
                                name={label2}
                                stackId="a"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-col items-center">
                    <p className="mb-2 text-sm font-medium text-text-em-mid">Overall Split</p>
                    <ResponsiveContainer height={200} width={200}>
                        <PieChart>
                            <Pie
                                cx="50%"
                                cy="50%"
                                data={pieData}
                                dataKey="value"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={2}>
                                {pieData.map((_, i) => (
                                    <Cell key={i} fill={PIE_COLORS[i]} />
                                ))}
                            </Pie>
                            <Tooltip {...tooltipStyle} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex gap-4 text-xs">
                        <span className="flex items-center gap-1">
                            <span
                                className="inline-block h-2.5 w-2.5 rounded-full"
                                style={{ background: PIE_COLORS[0] }}
                            />
                            {label1}
                        </span>
                        <span className="flex items-center gap-1">
                            <span
                                className="inline-block h-2.5 w-2.5 rounded-full"
                                style={{ background: PIE_COLORS[1] }}
                            />
                            {label2}
                        </span>
                    </div>
                </div>
            </div>
        </ChartCard>
    );
};
