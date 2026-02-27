import { TotoCardProps } from '@/modules/toto/components/TotoCard';

import { ConsecutiveNumbersData, OddEvenHighLowItem, SumDistributionItem } from './types';

const parseNums = (nums: (string | number)[]): number[] => nums.map(Number);

export const computeOddEvenHighLow = (draws: TotoCardProps[]): OddEvenHighLowItem[] => {
    return draws.map((draw) => {
        const nums = parseNums(draw.winningNum);
        const oddCount = nums.filter((n) => n % 2 !== 0).length;
        const highCount = nums.filter((n) => n >= 25).length;
        return {
            drawNumber: draw.drawNumber,
            oddCount,
            evenCount: 6 - oddCount,
            highCount,
            lowCount: 6 - highCount
        };
    });
};

export const computeSumDistribution = (draws: TotoCardProps[]): SumDistributionItem[] => {
    const bins = new Map<string, number>();
    const binSize = 20;
    // Theoretical range: 21 (1+2+3+4+5+6) to 279 (44+45+46+47+48+49)
    for (let start = 20; start <= 280; start += binSize) {
        bins.set(`${start}-${start + binSize - 1}`, 0);
    }

    for (const draw of draws) {
        const sum = parseNums(draw.winningNum).reduce((a, b) => a + b, 0);
        const binStart = Math.floor(sum / binSize) * binSize;
        const key = `${binStart}-${binStart + binSize - 1}`;
        bins.set(key, (bins.get(key) ?? 0) + 1);
    }

    return Array.from(bins.entries())
        .map(([sumRange, count]) => ({ sumRange, count }))
        .filter((item) => item.count > 0);
};

export const computeConsecutiveNumbers = (draws: TotoCardProps[]): ConsecutiveNumbersData => {
    const pairCounts: number[] = [];

    for (const draw of draws) {
        const nums = parseNums(draw.winningNum).sort((a, b) => a - b);
        let pairs = 0;
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] - nums[i - 1] === 1) pairs++;
        }
        pairCounts.push(pairs);
    }

    const distribution = new Map<number, number>();
    for (const count of pairCounts) {
        distribution.set(count, (distribution.get(count) ?? 0) + 1);
    }

    const drawsWithConsecutive = pairCounts.filter((c) => c > 0).length;

    return {
        distribution: Array.from(distribution.entries())
            .map(([pairs, count]) => ({ pairs, count }))
            .sort((a, b) => a.pairs - b.pairs),
        percentageWithConsecutive: Math.round((drawsWithConsecutive / draws.length) * 1000) / 10
    };
};
