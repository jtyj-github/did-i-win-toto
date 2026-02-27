/**
 * Merges two arrays of Toto results, deduplicating by drawNumber.
 * When duplicates exist, the entry from `newResults` takes precedence.
 * Returns results sorted by drawNumber descending (newest first).
 */
export function mergeAndDedup<T extends { drawNumber: number }>(
    existingResults: T[],
    newResults: T[],
): T[] {
    const resultMap = new Map<number, T>();

    for (const result of existingResults) {
        resultMap.set(result.drawNumber, result);
    }
    for (const result of newResults) {
        resultMap.set(result.drawNumber, result);
    }

    return Array.from(resultMap.values())
        .sort((a, b) => b.drawNumber - a.drawNumber);
}
