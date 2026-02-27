import { TotoCardProps } from '@/modules/toto/components/TotoCard';

import {
    GapAnalysisItem,
    HotColdItem,
    NumberFrequencyItem,
    PairFrequencyItem
} from './types';

const parseNums = (nums: (string | number)[]): number[] => nums.map(Number);

export const computeNumberFrequency = (draws: TotoCardProps[]): NumberFrequencyItem[] => {
    const counts = new Map<number, number>();
    for (let i = 1; i <= 49; i++) counts.set(i, 0);

    for (const draw of draws) {
        for (const num of parseNums(draw.winningNum)) {
            counts.set(num, (counts.get(num) ?? 0) + 1);
        }
    }

    return Array.from(counts.entries()).map(([number, count]) => ({
        number,
        count,
        percentage: (count / draws.length) * 100
    }));
};

export const computeHotColdNumbers = (
    draws: TotoCardProps[],
    recentCount = 30
): HotColdItem[] => {
    const allTimeCounts = new Map<number, number>();
    const recentCounts = new Map<number, number>();
    const lastSeen = new Map<number, number>();

    for (let i = 1; i <= 49; i++) {
        allTimeCounts.set(i, 0);
        recentCounts.set(i, 0);
        lastSeen.set(i, draws.length);
    }

    for (let i = 0; i < draws.length; i++) {
        const nums = parseNums(draws[i].winningNum);
        for (const num of nums) {
            allTimeCounts.set(num, (allTimeCounts.get(num) ?? 0) + 1);
            if (i >= draws.length - recentCount) {
                recentCounts.set(num, (recentCounts.get(num) ?? 0) + 1);
            }
            lastSeen.set(num, i);
        }
    }

    return Array.from({ length: 49 }, (_, i) => {
        const number = i + 1;
        return {
            number,
            recentCount: recentCounts.get(number) ?? 0,
            allTimeCount: allTimeCounts.get(number) ?? 0,
            lastSeenDrawsAgo: draws.length - 1 - (lastSeen.get(number) ?? 0)
        };
    });
};

export const computePairFrequency = (draws: TotoCardProps[]): PairFrequencyItem[] => {
    const pairCounts = new Map<string, number>();

    for (const draw of draws) {
        const nums = parseNums(draw.winningNum).sort((a, b) => a - b);
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                const key = `${nums[i]}-${nums[j]}`;
                pairCounts.set(key, (pairCounts.get(key) ?? 0) + 1);
            }
        }
    }

    return Array.from(pairCounts.entries())
        .map(([key, count]) => {
            const [num1, num2] = key.split('-').map(Number);
            return { num1, num2, count };
        })
        .sort((a, b) => b.count - a.count);
};

export const computeGapAnalysis = (draws: TotoCardProps[]): GapAnalysisItem[] => {
    const appearances = new Map<number, number[]>();
    for (let i = 1; i <= 49; i++) appearances.set(i, []);

    for (let i = 0; i < draws.length; i++) {
        for (const num of parseNums(draws[i].winningNum)) {
            appearances.get(num)!.push(i);
        }
    }

    return Array.from(appearances.entries()).map(([number, indices]) => {
        if (indices.length <= 1) {
            return {
                number,
                averageGap: indices.length === 0 ? draws.length : draws.length - 1,
                maxGap: draws.length,
                currentGap: indices.length === 0 ? draws.length : draws.length - 1 - indices[indices.length - 1]
            };
        }

        const gaps: number[] = [];
        for (let i = 1; i < indices.length; i++) {
            gaps.push(indices[i] - indices[i - 1]);
        }

        return {
            number,
            averageGap: Math.round((gaps.reduce((a, b) => a + b, 0) / gaps.length) * 10) / 10,
            maxGap: Math.max(...gaps),
            currentGap: draws.length - 1 - indices[indices.length - 1]
        };
    });
};
