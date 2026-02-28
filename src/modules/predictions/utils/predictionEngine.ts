import { TotoCardProps } from '@/modules/toto/components/TotoCard';

export interface PredictionResult {
    name: string;
    description: string;
    numbers: number[];
    confidence: number;
    reasoning: string[];
}

export interface NumberStats {
    number: number;
    frequency: number;
    recentFrequency: number;
    drawsSinceLastSeen: number;
}

const TOTAL_NUMBERS = 49;
const PICK_COUNT = 6;
const RECENT_WINDOW = 20;

function getNumberStats(draws: TotoCardProps[]): NumberStats[] {
    const freq: Record<number, number> = {};
    const recentFreq: Record<number, number> = {};
    const lastSeen: Record<number, number> = {};

    for (let i = 1; i <= TOTAL_NUMBERS; i++) {
        freq[i] = 0;
        recentFreq[i] = 0;
        lastSeen[i] = draws.length;
    }

    draws.forEach((draw, idx) => {
        const nums = draw.winningNum.map(Number);
        nums.forEach((n) => {
            freq[n]++;
            if (idx < RECENT_WINDOW) recentFreq[n]++;
            if (lastSeen[n] === draws.length) lastSeen[n] = idx;
        });
    });

    return Array.from({ length: TOTAL_NUMBERS }, (_, i) => ({
        number: i + 1,
        frequency: freq[i + 1],
        recentFrequency: recentFreq[i + 1],
        drawsSinceLastSeen: lastSeen[i + 1]
    }));
}

function weightedPick(weights: { number: number; weight: number }[], count: number): number[] {
    const result: number[] = [];
    const pool = [...weights];

    for (let i = 0; i < count; i++) {
        const totalWeight = pool.reduce((sum, w) => sum + w.weight, 0);
        let rand = Math.random() * totalWeight;
        let picked = pool[0];

        for (const item of pool) {
            rand -= item.weight;
            if (rand <= 0) {
                picked = item;
                break;
            }
        }

        result.push(picked.number);
        const idx = pool.indexOf(picked);
        pool.splice(idx, 1);
    }

    return result.sort((a, b) => a - b);
}

function frequencyStrategy(stats: NumberStats[]): PredictionResult {
    const weights = stats.map((s) => ({
        number: s.number,
        weight: s.frequency + 1
    }));

    const numbers = weightedPick(weights, PICK_COUNT);
    const top5 = [...stats].sort((a, b) => b.frequency - a.frequency).slice(0, 5);

    return {
        name: 'Frequency Analysis',
        description: 'Numbers weighted by how often they have appeared historically',
        numbers,
        confidence: 35,
        reasoning: [
            `Based on ${stats.reduce((s, n) => s + n.frequency, 0) / 6} total draws`,
            `Most frequent: ${top5.map((s) => `${s.number} (${s.frequency}x)`).join(', ')}`,
            'Higher frequency numbers have slightly higher selection probability'
        ]
    };
}

function hotNumbersStrategy(stats: NumberStats[]): PredictionResult {
    const weights = stats.map((s) => ({
        number: s.number,
        weight: s.recentFrequency * 3 + 1
    }));

    const numbers = weightedPick(weights, PICK_COUNT);
    const hottest = [...stats].sort((a, b) => b.recentFrequency - a.recentFrequency).slice(0, 5);

    return {
        name: 'Hot Numbers',
        description: `Numbers trending in the last ${RECENT_WINDOW} draws`,
        numbers,
        confidence: 30,
        reasoning: [
            `Analyzing last ${RECENT_WINDOW} draws for recent trends`,
            `Hottest: ${hottest.map((s) => `${s.number} (${s.recentFrequency}x)`).join(', ')}`,
            'Assumes recent momentum may continue short-term'
        ]
    };
}

function overdueStrategy(stats: NumberStats[]): PredictionResult {
    const weights = stats.map((s) => ({
        number: s.number,
        weight: s.drawsSinceLastSeen + 1
    }));

    const numbers = weightedPick(weights, PICK_COUNT);
    const mostOverdue = [...stats]
        .sort((a, b) => b.drawsSinceLastSeen - a.drawsSinceLastSeen)
        .slice(0, 5);

    return {
        name: 'Overdue Numbers',
        description: 'Numbers that haven\'t appeared recently — "due" for a comeback',
        numbers,
        confidence: 25,
        reasoning: [
            'Based on regression-to-the-mean principle',
            `Most overdue: ${mostOverdue.map((s) => `${s.number} (${s.drawsSinceLastSeen} draws ago)`).join(', ')}`,
            'Numbers absent for many draws are weighted higher'
        ]
    };
}

function balancedStrategy(stats: NumberStats[], draws: TotoCardProps[]): PredictionResult {
    const totalDraws = draws.length;
    const expectedFreq = (totalDraws * 6) / TOTAL_NUMBERS;

    const weights = stats.map((s) => {
        const freqScore = s.frequency / expectedFreq;
        const recentScore = s.recentFrequency / (RECENT_WINDOW * 6 / TOTAL_NUMBERS);
        const overdueScore = Math.min(s.drawsSinceLastSeen / 10, 3);
        return {
            number: s.number,
            weight: freqScore * 0.3 + recentScore * 0.4 + overdueScore * 0.3 + 0.1
        };
    });

    const numbers = weightedPick(weights, PICK_COUNT);

    return {
        name: 'Balanced Mix',
        description: 'Combines frequency, recency, and overdue factors',
        numbers,
        confidence: 40,
        reasoning: [
            'Weighted blend: 30% frequency + 40% recency + 30% overdue',
            'Balances historical trends with recent momentum',
            'Most well-rounded strategy across all factors'
        ]
    };
}

function patternStrategy(stats: NumberStats[], _draws: TotoCardProps[]): PredictionResult {
    // Target: 3 odd / 3 even (most common pattern at 35%)
    // Target sum: 120-180 (centered around mean of 150)
    // Target: spread across all ranges

    const maxAttempts = 1000;
    let bestPick: number[] = [];
    let bestScore = -1;

    const weights = stats.map((s) => ({
        number: s.number,
        weight: s.frequency + s.recentFrequency * 2 + 1
    }));

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const pick = weightedPick(weights, PICK_COUNT);

        const oddCount = pick.filter((n) => n % 2 === 1).length;
        const sum = pick.reduce((a, b) => a + b, 0);
        const ranges = new Set(pick.map((n) => Math.ceil(n / 10)));

        // Score the pick
        let score = 0;

        // Odd/even balance (prefer 3/3 or 2/4 or 4/2)
        if (oddCount === 3) score += 10;
        else if (oddCount === 2 || oddCount === 4) score += 7;
        else score += 2;

        // Sum in ideal range
        if (sum >= 120 && sum <= 180) score += 10;
        else if (sum >= 100 && sum <= 200) score += 5;
        else score += 1;

        // Range spread (more ranges = better)
        score += ranges.size * 2;

        // No more than 2 consecutive numbers
        let maxConsec = 1;
        let curConsec = 1;
        for (let i = 1; i < pick.length; i++) {
            if (pick[i] - pick[i - 1] === 1) {
                curConsec++;
                maxConsec = Math.max(maxConsec, curConsec);
            } else {
                curConsec = 1;
            }
        }
        if (maxConsec <= 2) score += 5;

        if (score > bestScore) {
            bestScore = score;
            bestPick = pick;
        }
    }

    const oddCount = bestPick.filter((n) => n % 2 === 1).length;
    const sum = bestPick.reduce((a, b) => a + b, 0);

    return {
        name: 'Pattern Matched',
        description: 'Optimized for realistic winning patterns (odd/even, sum, spread)',
        numbers: bestPick,
        confidence: 45,
        reasoning: [
            `Odd/Even: ${oddCount}/${PICK_COUNT - oddCount} (target: ~3/3)`,
            `Sum: ${sum} (target range: 120-180, historical avg: 150)`,
            `Spread across ${new Set(bestPick.map((n) => Math.ceil(n / 10))).size} of 5 number ranges`,
            'Filters 1000 candidates for the most realistic combination'
        ]
    };
}

export function generatePredictions(draws: TotoCardProps[]): PredictionResult[] {
    const stats = getNumberStats(draws);

    return [
        patternStrategy(stats, draws),
        balancedStrategy(stats, draws),
        frequencyStrategy(stats),
        hotNumbersStrategy(stats),
        overdueStrategy(stats)
    ];
}

export function getStatsForDisplay(draws: TotoCardProps[]): NumberStats[] {
    return getNumberStats(draws);
}
