export interface NumberFrequencyItem {
    number: number;
    count: number;
    percentage: number;
}

export interface HotColdItem {
    number: number;
    recentCount: number;
    allTimeCount: number;
    lastSeenDrawsAgo: number;
}

export interface PairFrequencyItem {
    num1: number;
    num2: number;
    count: number;
}

export interface GapAnalysisItem {
    number: number;
    averageGap: number;
    maxGap: number;
    currentGap: number;
}

export interface JackpotTrendItem {
    drawNumber: number;
    drawDate: string;
    prize: number;
    winners: number;
}

export interface WinnerCountItem {
    drawNumber: number;
    drawDate: string;
    group1: number;
    group2: number;
    group3: number;
    group4: number;
    group5: number;
    group6: number;
    group7: number;
}

export interface TotalPrizePoolItem {
    drawNumber: number;
    drawDate: string;
    totalPool: number;
}

export interface OddEvenHighLowItem {
    drawNumber: number;
    oddCount: number;
    evenCount: number;
    highCount: number;
    lowCount: number;
}

export interface SumDistributionItem {
    sumRange: string;
    count: number;
}

export interface ConsecutiveNumbersData {
    distribution: { pairs: number; count: number }[];
    percentageWithConsecutive: number;
}

export interface AnalyticsData {
    numberFrequency: NumberFrequencyItem[];
    hotColdNumbers: HotColdItem[];
    pairFrequency: PairFrequencyItem[];
    gapAnalysis: GapAnalysisItem[];
    jackpotTrend: JackpotTrendItem[];
    winnerCounts: WinnerCountItem[];
    totalPrizePool: TotalPrizePoolItem[];
    oddEvenHighLow: OddEvenHighLowItem[];
    sumDistribution: SumDistributionItem[];
    consecutiveNumbers: ConsecutiveNumbersData;
}
