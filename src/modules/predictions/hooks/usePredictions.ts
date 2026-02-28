'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { TotoCardProps } from '@/modules/toto/components/TotoCard';

import {
    generatePredictions,
    getStatsForDisplay,
    NumberStats,
    PredictionResult
} from '../utils/predictionEngine';

export const usePredictions = () => {
    const [draws, setDraws] = useState<TotoCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [predictions, setPredictions] = useState<PredictionResult[]>([]);
    const [generationCount, setGenerationCount] = useState(0);

    useEffect(() => {
        fetch('/api/tickets/cards')
            .then((res) => res.json())
            .then((res) => {
                setDraws(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load draws for predictions', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (draws.length > 0 && predictions.length === 0) {
            setPredictions(generatePredictions(draws));
            setGenerationCount(1);
        }
    }, [draws, predictions.length]);

    const regenerate = useCallback(() => {
        if (draws.length > 0) {
            setPredictions(generatePredictions(draws));
            setGenerationCount((c) => c + 1);
        }
    }, [draws]);

    const stats: NumberStats[] = useMemo(() => {
        if (!draws.length) return [];
        return getStatsForDisplay(draws);
    }, [draws]);

    const lastDraw = draws[0] ?? null;

    return {
        predictions,
        stats,
        loading,
        totalDraws: draws.length,
        lastDraw,
        regenerate,
        generationCount
    };
};
