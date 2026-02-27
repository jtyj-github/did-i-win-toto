import { TotoCardProps } from '@/modules/toto/components/TotoCard';

import { JackpotTrendItem, TotalPrizePoolItem, WinnerCountItem } from './types';

export const computeJackpotTrend = (draws: TotoCardProps[]): JackpotTrendItem[] => {
    return draws.map((draw) => {
        const group1 = draw.winningPool[0];
        return {
            drawNumber: draw.drawNumber,
            drawDate: draw.drawDate,
            prize: group1?.prize ?? 0,
            winners: group1?.winners ?? 0
        };
    });
};

export const computeWinnerCounts = (draws: TotoCardProps[]): WinnerCountItem[] => {
    return draws.map((draw) => ({
        drawNumber: draw.drawNumber,
        drawDate: draw.drawDate,
        group1: draw.winningPool[0]?.winners ?? 0,
        group2: draw.winningPool[1]?.winners ?? 0,
        group3: draw.winningPool[2]?.winners ?? 0,
        group4: draw.winningPool[3]?.winners ?? 0,
        group5: draw.winningPool[4]?.winners ?? 0,
        group6: draw.winningPool[5]?.winners ?? 0,
        group7: draw.winningPool[6]?.winners ?? 0
    }));
};

export const computeTotalPrizePool = (draws: TotoCardProps[]): TotalPrizePoolItem[] => {
    return draws.map((draw) => {
        const totalPool = draw.winningPool.reduce((sum, pool) => {
            return sum + (pool.prize ?? 0) * (pool.winners ?? 0);
        }, 0);
        return {
            drawNumber: draw.drawNumber,
            drawDate: draw.drawDate,
            totalPool
        };
    });
};
