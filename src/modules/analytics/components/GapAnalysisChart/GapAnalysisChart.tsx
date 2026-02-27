'use client';

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

import { ChartCard } from '@/modules/analytics/components/ChartCard';
import { axisTickStyle, CHART_COLORS, tooltipStyle } from '@/modules/analytics/utils/chartTheme';
import { GapAnalysisItem } from '@/modules/analytics/utils/types';

interface Props {
    data: GapAnalysisItem[];
}

const EXPECTED_GAP = 49 / 6; // ~8.17

export const GapAnalysisChart = ({ data }: Props) => {
    return (
        <ChartCard
            description="Average number of draws between appearances of each number. Red = overdue (>1.5x expected)."
            title="Gap Analysis">
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
                        formatter={(value: any) => [`${value} draws`, 'Avg Gap']}
                    />
                    <ReferenceLine
                        label={{ fill: CHART_COLORS.textMid, position: 'right', value: 'Expected' }}
                        stroke={CHART_COLORS.amber}
                        strokeDasharray="5 5"
                        y={EXPECTED_GAP}
                    />
                    <Bar dataKey="averageGap" radius={[2, 2, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={
                                    entry.averageGap > EXPECTED_GAP * 1.5
                                        ? CHART_COLORS.error
                                        : CHART_COLORS.primary
                                }
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};
