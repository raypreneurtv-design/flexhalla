// Smart Recommendation Engine for Flexhalla
import { Combo, ComboTag, combos, getCombosByWeapon, getCombosByTag } from '@/data/combos';
import { PlayerStats } from './progress';

export type WeaknessCategory = 'edge-guarding' | 'neutral-game' | 'kill-confirms' | 'string-extensions' | 'defense';

export interface WeaknessAnalysis {
    category: WeaknessCategory;
    severity: 'low' | 'medium' | 'high';
    title: string;
    description: string;
    recommendedTags: ComboTag[];
}

export interface RecommendationResult {
    combos: Combo[];
    reason: string;
    priority: number;
}

// Weapon to legend mapping for recommendations
const legendWeapons: Record<string, string[]> = {
    'Orion': ['Spear', 'Lance'],
    'Bodvar': ['Sword', 'Hammer'],
    'Hattori': ['Sword', 'Spear'],
    'Teros': ['Axe', 'Hammer'],
    'Val': ['Sword', 'Gauntlets'],
    'Diana': ['Bow', 'Blasters'],
    'Koji': ['Sword', 'Bow'],
    'Lucien': ['Katars', 'Blasters'],
    'Asuri': ['Katars', 'Sword'],
    'Nix': ['Scythe', 'Blasters'],
    'Mordex': ['Scythe', 'Gauntlets'],
    'Wu Shang': ['Spear', 'Gauntlets'],
    'Scarlet': ['Hammer', 'Lance'],
    'Artemis': ['Scythe', 'Lance'],
    'Fait': ['Scythe', 'Orb'],
    'Petra': ['Orb', 'Gauntlets'],
    'Jaeyun': ['Sword', 'Greatsword'],
    'Mako': ['Katars', 'Greatsword'],
};

/**
 * Analyze player weaknesses based on their stats
 */
export function analyzeWeaknesses(stats: PlayerStats): WeaknessAnalysis[] {
    const weaknesses: WeaknessAnalysis[] = [];
    const winRate = (stats.wins / (stats.wins + stats.losses)) * 100;
    const legendRates = Object.values(stats.legendWinRates);
    const avgLegendWinRate = legendRates.reduce((a, b) => a + b, 0) / legendRates.length;

    // Check for edge guarding weakness
    // Simulated: If elo is below 1700 or win rate variance is high
    const eloThreshold = 1700;
    if (stats.elo < eloThreshold) {
        weaknesses.push({
            category: 'edge-guarding',
            severity: stats.elo < 1500 ? 'high' : 'medium',
            title: 'Edge Guarding',
            description: 'Your off-stage play could use improvement. Focus on gimping with Dair and Recovery moves to secure earlier kills.',
            recommendedTags: ['edge-guard', 'recovery-punish']
        });
    }

    // Check for neutral game weakness
    // Simulated: If average damage per stock seems low (approximated by win rate)
    if (winRate < 52) {
        weaknesses.push({
            category: 'neutral-game',
            severity: winRate < 48 ? 'high' : 'medium',
            title: 'Neutral Game',
            description: 'You may be struggling to win neutral exchanges. Practice starter combos to build damage more consistently.',
            recommendedTags: ['starter', 'punish', 'grounded']
        });
    }

    // Check for kill confirm weakness
    // Simulated: If they have high games but average elo (can build damage but not secure kills)
    const gamesPlayed = stats.wins + stats.losses;
    if (gamesPlayed > 500 && stats.elo < stats.peakElo - 100) {
        weaknesses.push({
            category: 'kill-confirms',
            severity: 'medium',
            title: 'Kill Confirms',
            description: 'You might be building damage but struggling to close out stocks. Focus on kill confirm combos to convert your advantage.',
            recommendedTags: ['kill-confirm']
        });
    }

    // Check for string extension weakness
    // Simulated: If win rate is okay but elo growth is slow
    if (avgLegendWinRate < 54 && winRate > 50) {
        weaknesses.push({
            category: 'string-extensions',
            severity: 'low',
            title: 'String Extensions',
            description: 'You\'re winning games but leaving damage on the table. Practice extending your true combos into strings for higher damage.',
            recommendedTags: ['string-extension', 'aerial']
        });
    }

    // If player is doing well, add a positive note and suggest advanced content
    if (weaknesses.length === 0 || (winRate > 55 && stats.elo > 1800)) {
        weaknesses.push({
            category: 'defense',
            severity: 'low',
            title: 'Solid Foundation',
            description: 'Your fundamentals look strong! Consider learning advanced techniques and weapon-specific strings to reach the next level.',
            recommendedTags: ['string-extension', 'aerial']
        });
    }

    return weaknesses;
}

/**
 * Get the weapons used by a legend
 */
export function getLegendWeapons(legend: string): string[] {
    return legendWeapons[legend] || [];
}

/**
 * Generate personalized combo recommendations based on player stats
 */
export function getPersonalizedRecommendations(
    stats: PlayerStats | null,
    masteredIds: string[],
    practicedIds: string[]
): RecommendationResult[] {
    const results: RecommendationResult[] = [];
    const unmasteredCombos = combos.filter(c => !masteredIds.includes(c.id));

    if (!stats) {
        // New user recommendations - start with fundamentals
        const easyCombos = unmasteredCombos
            .filter(c => c.difficulty === 'easy' && c.isTrueCombo)
            .slice(0, 6);

        results.push({
            combos: easyCombos,
            reason: 'Start with these foundational true combos every player should know',
            priority: 1
        });

        return results;
    }

    // Analyze weaknesses
    const weaknesses = analyzeWeaknesses(stats);

    // Get main legend's weapons
    const mainWeapons = getLegendWeapons(stats.mainLegend);

    // Priority 1: Combos for their main legend's weapons that address weaknesses
    const weaknessTags = weaknesses.flatMap(w => w.recommendedTags);
    const mainWeaponWeaknessCombos = unmasteredCombos.filter(c =>
        mainWeapons.includes(c.weapon) &&
        c.tags.some(tag => weaknessTags.includes(tag))
    );

    if (mainWeaponWeaknessCombos.length > 0) {
        results.push({
            combos: mainWeaponWeaknessCombos.slice(0, 4),
            reason: `Combos for your main (${stats.mainLegend}) that address your weaknesses`,
            priority: 1
        });
    }

    // Priority 2: Easy combos for their main weapons they haven't practiced
    const unpracticedMainWeapon = unmasteredCombos.filter(c =>
        mainWeapons.includes(c.weapon) &&
        !practicedIds.includes(c.id) &&
        c.difficulty === 'easy'
    );

    if (unpracticedMainWeapon.length > 0) {
        results.push({
            combos: unpracticedMainWeapon.slice(0, 3),
            reason: `Easy ${mainWeapons.join('/')} combos to build your foundation`,
            priority: 2
        });
    }

    // Priority 3: Address specific weaknesses with any weapon
    for (const weakness of weaknesses.filter(w => w.severity !== 'low')) {
        const weaknessCombos = unmasteredCombos.filter(c =>
            c.tags.some(tag => weakness.recommendedTags.includes(tag))
        );

        if (weaknessCombos.length > 0) {
            results.push({
                combos: weaknessCombos.slice(0, 3),
                reason: `Improve your ${weakness.title.toLowerCase()}`,
                priority: 3
            });
        }
    }

    // Priority 4: Weapon diversity - suggest weapons they haven't explored
    const practicedWeapons = new Set(
        combos
            .filter(c => practicedIds.includes(c.id))
            .map(c => c.weapon)
    );

    const unexploredWeapons = [...new Set(combos.map(c => c.weapon))]
        .filter(w => !practicedWeapons.has(w));

    if (unexploredWeapons.length > 0) {
        const unexploredCombos = unmasteredCombos.filter(c =>
            unexploredWeapons.includes(c.weapon) &&
            c.difficulty === 'easy' &&
            c.isTrueCombo
        );

        if (unexploredCombos.length > 0) {
            results.push({
                combos: unexploredCombos.slice(0, 3),
                reason: `Try a new weapon: ${unexploredWeapons.slice(0, 2).join(', ')}`,
                priority: 4
            });
        }
    }

    return results.sort((a, b) => a.priority - b.priority);
}

/**
 * Get combos that match specific weakness categories
 */
export function getCombosForWeakness(weakness: WeaknessAnalysis, masteredIds: string[]): Combo[] {
    return combos.filter(c =>
        !masteredIds.includes(c.id) &&
        c.tags.some(tag => weakness.recommendedTags.includes(tag))
    );
}

/**
 * Calculate a difficulty-appropriate progression path
 */
export function getLearningPath(
    weapon: string,
    masteredIds: string[]
): { easy: Combo[]; medium: Combo[]; hard: Combo[] } {
    const weaponCombos = getCombosByWeapon(weapon).filter(c => !masteredIds.includes(c.id));

    return {
        easy: weaponCombos.filter(c => c.difficulty === 'easy'),
        medium: weaponCombos.filter(c => c.difficulty === 'medium'),
        hard: weaponCombos.filter(c => c.difficulty === 'hard'),
    };
}

/**
 * Get a summary of player's combo mastery by weapon
 */
export function getWeaponMasteryStats(masteredIds: string[]): Record<string, { mastered: number; total: number; percentage: number }> {
    const weapons = [...new Set(combos.map(c => c.weapon))];
    const stats: Record<string, { mastered: number; total: number; percentage: number }> = {};

    for (const weapon of weapons) {
        const weaponCombos = getCombosByWeapon(weapon);
        const mastered = weaponCombos.filter(c => masteredIds.includes(c.id)).length;
        stats[weapon] = {
            mastered,
            total: weaponCombos.length,
            percentage: Math.round((mastered / weaponCombos.length) * 100)
        };
    }

    return stats;
}
