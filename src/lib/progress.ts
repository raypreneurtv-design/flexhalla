// Local Storage Progress Tracking for Flexhalla
const STORAGE_KEYS = {
    PRACTICED: 'flexhalla_practiced_combos',
    MASTERED: 'flexhalla_mastered_combos',
    FAVORITES: 'flexhalla_favorite_combos',
    STATS: 'flexhalla_last_stats',
} as const;

// Check if we're in browser
const isBrowser = typeof window !== 'undefined';

// Practiced Combos
export function getPracticedCombos(): string[] {
    if (!isBrowser) return [];
    const data = localStorage.getItem(STORAGE_KEYS.PRACTICED);
    return data ? JSON.parse(data) : [];
}

export function markAsPracticed(comboId: string): void {
    if (!isBrowser) return;
    const practiced = getPracticedCombos();
    if (!practiced.includes(comboId)) {
        practiced.push(comboId);
        localStorage.setItem(STORAGE_KEYS.PRACTICED, JSON.stringify(practiced));
    }
}

export function removePracticed(comboId: string): void {
    if (!isBrowser) return;
    const practiced = getPracticedCombos().filter(id => id !== comboId);
    localStorage.setItem(STORAGE_KEYS.PRACTICED, JSON.stringify(practiced));
}

export function isPracticed(comboId: string): boolean {
    return getPracticedCombos().includes(comboId);
}

// Mastered Combos
export function getMasteredCombos(): string[] {
    if (!isBrowser) return [];
    const data = localStorage.getItem(STORAGE_KEYS.MASTERED);
    return data ? JSON.parse(data) : [];
}

export function markAsMastered(comboId: string): void {
    if (!isBrowser) return;
    const mastered = getMasteredCombos();
    if (!mastered.includes(comboId)) {
        mastered.push(comboId);
        localStorage.setItem(STORAGE_KEYS.MASTERED, JSON.stringify(mastered));
        // Also mark as practiced
        markAsPracticed(comboId);
    }
}

export function removeMastered(comboId: string): void {
    if (!isBrowser) return;
    const mastered = getMasteredCombos().filter(id => id !== comboId);
    localStorage.setItem(STORAGE_KEYS.MASTERED, JSON.stringify(mastered));
}

export function isMastered(comboId: string): boolean {
    return getMasteredCombos().includes(comboId);
}

// Favorite Combos
export function getFavoriteCombos(): string[] {
    if (!isBrowser) return [];
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
}

export function toggleFavorite(comboId: string): boolean {
    if (!isBrowser) return false;
    const favorites = getFavoriteCombos();
    const index = favorites.indexOf(comboId);
    if (index > -1) {
        favorites.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
        return false;
    } else {
        favorites.push(comboId);
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
        return true;
    }
}

export function isFavorite(comboId: string): boolean {
    return getFavoriteCombos().includes(comboId);
}

// Stats Storage
export interface PlayerStats {
    brawlhallaId: string;
    name: string;
    rank: string;
    elo: number;
    peakElo: number;
    wins: number;
    losses: number;
    mainLegend: string;
    legendWinRates: Record<string, number>;
    fetchedAt: string;
}

export function getLastStats(): PlayerStats | null {
    if (!isBrowser) return null;
    const data = localStorage.getItem(STORAGE_KEYS.STATS);
    return data ? JSON.parse(data) : null;
}

export function saveStats(stats: PlayerStats): void {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify({
        ...stats,
        fetchedAt: new Date().toISOString(),
    }));
}

export function clearStats(): void {
    if (!isBrowser) return;
    localStorage.removeItem(STORAGE_KEYS.STATS);
}

// Progress Summary
export function getProgressSummary() {
    return {
        practicedCount: getPracticedCombos().length,
        masteredCount: getMasteredCombos().length,
        favoritesCount: getFavoriteCombos().length,
        hasStats: getLastStats() !== null,
    };
}
