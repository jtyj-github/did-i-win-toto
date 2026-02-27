'use client';

import { useEffect, useMemo, useState } from 'react';

import { TotoCardProps } from '@/modules/toto/components/TotoCard';

import {
    computeGapAnalysis,
    computeHotColdNumbers,
    computeNumberFrequency,
    computePairFrequency
} from '../utils/numberAnalytics';
import {
    computeOddEvenHighLow,
    computeSumDistribution,
    computeConsecutiveNumbers
} from '../utils/patternAnalytics';
import {
    computeJackpotTrend,
    computeTotalPrizePool,
    computeWinnerCounts
} from '../utils/prizeAnalytics';
import { AnalyticsData } from '../utils/types';

export const useAnalyticsData = () => {
    const [draws, setDraws] = useState<TotoCardProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/tickets/cards')
            .then((res) => res.json())
            .then((res) => {
                setDraws(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load draws for analytics', err);
                setLoading(false);
            });
    }, []);

    const analytics = useMemo<AnalyticsData | null>(() => {
        if (!draws.length) return null;
        const chronological = [...draws].reverse();
        return {
            numberFrequency: computeNumberFrequency(chronological),
            hotColdNumbers: computeHotColdNumbers(chronological),
            pairFrequency: computePairFrequency(chronological),
            gapAnalysis: computeGapAnalysis(chronological),
            jackpotTrend: computeJackpotTrend(chronological),
            winnerCounts: computeWinnerCounts(chronological),
            totalPrizePool: computeTotalPrizePool(chronological),
            oddEvenHighLow: computeOddEvenHighLow(chronological),
            sumDistribution: computeSumDistribution(chronological),
            consecutiveNumbers: computeConsecutiveNumbers(chronological)
        };
    }, [draws]);

    return { analytics, loading, totalDraws: draws.length };
};
