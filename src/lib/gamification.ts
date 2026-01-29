// Gamification System for Flexhalla
// XP, Levels, Achievements, Streaks, Daily Challenges

import { combos, weapons } from '@/data/combos';

const STORAGE_KEYS = {
    XP: 'flexhalla_xp',
    LEVEL: 'flexhalla_level',
    ACHIEVEMENTS: 'flexhalla_achievements',
    STREAK: 'flexhalla_streak',
    LAST_PRACTICE: 'flexhalla_last_practice',
    DAILY_CHALLENGE: 'flexhalla_daily_challenge',
    DAILY_PROGRESS: 'flexhalla_daily_progress',
    STREAK_FREEZE: 'flexhalla_streak_freeze',
} as const;

const isBrowser = typeof window !== 'undefined';

// ==================== XP SYSTEM ====================

export const XP_REWARDS = {
    PRACTICE_COMBO: 10,
    MASTER_COMBO: 50,
    COMPLETE_DAILY: 100,
    STREAK_BONUS: 25,
    UNLOCK_ACHIEVEMENT: 75,
} as const;

export interface LevelInfo {
    level: number;
    title: string;
    minXp: number;
    maxXp: number;
}

export const LEVELS: LevelInfo[] = [
    { level: 1, title: 'Recruit', minXp: 0, maxXp: 100 },
    { level: 2, title: 'Trainee', minXp: 100, maxXp: 250 },
    { level: 3, title: 'Apprentice', minXp: 250, maxXp: 500 },
    { level: 4, title: 'Fighter', minXp: 500, maxXp: 800 },
    { level: 5, title: 'Warrior', minXp: 800, maxXp: 1200 },
    { level: 6, title: 'Veteran', minXp: 1200, maxXp: 1700 },
    { level: 7, title: 'Elite', minXp: 1700, maxXp: 2300 },
    { level: 8, title: 'Master', minXp: 2300, maxXp: 3000 },
    { level: 9, title: 'Grandmaster', minXp: 3000, maxXp: 4000 },
    { level: 10, title: 'Champion', minXp: 4000, maxXp: 5500 },
    { level: 15, title: 'Elite Champion', minXp: 5500, maxXp: 7500 },
    { level: 20, title: 'Legend', minXp: 7500, maxXp: 10000 },
    { level: 25, title: 'Valhallan', minXp: 10000, maxXp: 15000 },
    { level: 30, title: 'Immortal', minXp: 15000, maxXp: Infinity },
];

export function getXP(): number {
    if (!isBrowser) return 0;
    return parseInt(localStorage.getItem(STORAGE_KEYS.XP) || '0', 10);
}

export function addXP(amount: number): { newXp: number; leveledUp: boolean; newLevel: LevelInfo } {
    if (!isBrowser) return { newXp: 0, leveledUp: false, newLevel: LEVELS[0] };

    const currentXp = getXP();
    const currentLevel = getLevelFromXP(currentXp);
    const newXp = currentXp + amount;

    localStorage.setItem(STORAGE_KEYS.XP, newXp.toString());

    const newLevel = getLevelFromXP(newXp);
    const leveledUp = newLevel.level > currentLevel.level;

    return { newXp, leveledUp, newLevel };
}

export function getLevelFromXP(xp: number): LevelInfo {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (xp >= LEVELS[i].minXp) {
            return LEVELS[i];
        }
    }
    return LEVELS[0];
}

export function getXPProgress(): { current: number; required: number; percentage: number } {
    const xp = getXP();
    const level = getLevelFromXP(xp);
    const nextLevel = LEVELS.find(l => l.minXp > level.minXp) || level;

    const current = xp - level.minXp;
    const required = nextLevel.minXp - level.minXp;
    const percentage = required > 0 ? Math.min((current / required) * 100, 100) : 100;

    return { current, required, percentage };
}

// ==================== ACHIEVEMENTS ====================

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: 'progress' | 'mastery' | 'dedication' | 'exploration';
    requirement: number;
    checkFn: (stats: AchievementStats) => boolean;
}

export interface AchievementStats {
    totalPracticed: number;
    totalMastered: number;
    streakDays: number;
    weaponsMastered: number;
    trueCombosLearned: number;
    hardCombosLearned: number;
    totalXp: number;
    level: number;
}

export const ACHIEVEMENTS: Achievement[] = [
    // Progress achievements
    {
        id: 'first-steps',
        name: 'First Steps',
        description: 'Practice your first combo',
        icon: '👣',
        category: 'progress',
        requirement: 1,
        checkFn: (s) => s.totalPracticed >= 1,
    },
    {
        id: 'getting-started',
        name: 'Getting Started',
        description: 'Master your first combo',
        icon: '🌟',
        category: 'progress',
        requirement: 1,
        checkFn: (s) => s.totalMastered >= 1,
    },
    {
        id: 'combo-collector',
        name: 'Combo Collector',
        description: 'Practice 10 different combos',
        icon: '📚',
        category: 'progress',
        requirement: 10,
        checkFn: (s) => s.totalPracticed >= 10,
    },
    {
        id: 'true-warrior',
        name: 'True Warrior',
        description: 'Master 10 true combos',
        icon: '⚔️',
        category: 'mastery',
        requirement: 10,
        checkFn: (s) => s.trueCombosLearned >= 10,
    },
    {
        id: 'combo-master',
        name: 'Combo Master',
        description: 'Master 25 combos',
        icon: '🏅',
        category: 'mastery',
        requirement: 25,
        checkFn: (s) => s.totalMastered >= 25,
    },
    {
        id: 'completionist',
        name: 'Completionist',
        description: 'Master all 50 combos',
        icon: '🏆',
        category: 'mastery',
        requirement: 50,
        checkFn: (s) => s.totalMastered >= 50,
    },

    // Dedication achievements
    {
        id: 'dedicated',
        name: 'Dedicated',
        description: 'Maintain a 7-day practice streak',
        icon: '🔥',
        category: 'dedication',
        requirement: 7,
        checkFn: (s) => s.streakDays >= 7,
    },
    {
        id: 'unstoppable',
        name: 'Unstoppable',
        description: 'Maintain a 30-day practice streak',
        icon: '💫',
        category: 'dedication',
        requirement: 30,
        checkFn: (s) => s.streakDays >= 30,
    },
    {
        id: 'legendary-dedication',
        name: 'Legendary Dedication',
        description: 'Maintain a 100-day practice streak',
        icon: '👑',
        category: 'dedication',
        requirement: 100,
        checkFn: (s) => s.streakDays >= 100,
    },

    // Exploration achievements
    {
        id: 'weapon-explorer',
        name: 'Weapon Explorer',
        description: 'Master a combo for 5 different weapons',
        icon: '🗺️',
        category: 'exploration',
        requirement: 5,
        checkFn: (s) => s.weaponsMastered >= 5,
    },
    {
        id: 'weapon-master',
        name: 'Weapon Master',
        description: 'Master a combo for all 13 weapons',
        icon: '🎖️',
        category: 'exploration',
        requirement: 13,
        checkFn: (s) => s.weaponsMastered >= 13,
    },
    {
        id: 'string-theory',
        name: 'String Theory',
        description: 'Master 5 hard difficulty combos',
        icon: '🧠',
        category: 'mastery',
        requirement: 5,
        checkFn: (s) => s.hardCombosLearned >= 5,
    },

    // Level achievements
    {
        id: 'level-5',
        name: 'Rising Warrior',
        description: 'Reach level 5',
        icon: '📈',
        category: 'progress',
        requirement: 5,
        checkFn: (s) => s.level >= 5,
    },
    {
        id: 'level-10',
        name: 'Champion Status',
        description: 'Reach level 10',
        icon: '🥇',
        category: 'progress',
        requirement: 10,
        checkFn: (s) => s.level >= 10,
    },
    {
        id: 'level-20',
        name: 'Legendary',
        description: 'Reach level 20',
        icon: '⭐',
        category: 'progress',
        requirement: 20,
        checkFn: (s) => s.level >= 20,
    },
];

export function getUnlockedAchievements(): string[] {
    if (!isBrowser) return [];
    const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return data ? JSON.parse(data) : [];
}

export function unlockAchievement(achievementId: string): boolean {
    if (!isBrowser) return false;
    const unlocked = getUnlockedAchievements();
    if (unlocked.includes(achievementId)) return false;

    unlocked.push(achievementId);
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(unlocked));
    return true;
}

export function checkAchievements(stats: AchievementStats): Achievement[] {
    const unlocked = getUnlockedAchievements();
    const newlyUnlocked: Achievement[] = [];

    for (const achievement of ACHIEVEMENTS) {
        if (!unlocked.includes(achievement.id) && achievement.checkFn(stats)) {
            if (unlockAchievement(achievement.id)) {
                newlyUnlocked.push(achievement);
            }
        }
    }

    return newlyUnlocked;
}

export function getAchievementStats(
    practicedIds: string[],
    masteredIds: string[],
    streakDays: number
): AchievementStats {
    const masteredCombos = combos.filter(c => masteredIds.includes(c.id));
    const weaponsMastered = new Set(masteredCombos.map(c => c.weapon)).size;
    const trueCombosLearned = masteredCombos.filter(c => c.isTrueCombo).length;
    const hardCombosLearned = masteredCombos.filter(c => c.difficulty === 'hard').length;
    const xp = getXP();
    const level = getLevelFromXP(xp);

    return {
        totalPracticed: practicedIds.length,
        totalMastered: masteredIds.length,
        streakDays,
        weaponsMastered,
        trueCombosLearned,
        hardCombosLearned,
        totalXp: xp,
        level: level.level,
    };
}

// ==================== STREAK SYSTEM ====================

export interface StreakInfo {
    currentStreak: number;
    longestStreak: number;
    lastPracticeDate: string | null;
    streakFreezeAvailable: boolean;
}

export function getStreakInfo(): StreakInfo {
    if (!isBrowser) {
        return { currentStreak: 0, longestStreak: 0, lastPracticeDate: null, streakFreezeAvailable: false };
    }

    const data = localStorage.getItem(STORAGE_KEYS.STREAK);
    if (!data) {
        return { currentStreak: 0, longestStreak: 0, lastPracticeDate: null, streakFreezeAvailable: false };
    }

    return JSON.parse(data);
}

export function updateStreak(): { streakInfo: StreakInfo; streakIncreased: boolean; streakLost: boolean } {
    if (!isBrowser) {
        return { streakInfo: getStreakInfo(), streakIncreased: false, streakLost: false };
    }

    const info = getStreakInfo();
    const today = new Date().toISOString().split('T')[0];
    const lastDate = info.lastPracticeDate;

    let streakIncreased = false;
    let streakLost = false;

    if (!lastDate) {
        // First practice ever
        info.currentStreak = 1;
        info.longestStreak = 1;
        streakIncreased = true;
    } else if (lastDate === today) {
        // Already practiced today
    } else {
        const lastPractice = new Date(lastDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate.getTime() - lastPractice.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            // Consecutive day
            info.currentStreak += 1;
            streakIncreased = true;
        } else if (diffDays === 2 && info.streakFreezeAvailable) {
            // Use streak freeze
            info.currentStreak += 1;
            info.streakFreezeAvailable = false;
            streakIncreased = true;
        } else {
            // Streak broken
            if (info.currentStreak > 0) {
                streakLost = true;
            }
            info.currentStreak = 1;
        }

        if (info.currentStreak > info.longestStreak) {
            info.longestStreak = info.currentStreak;
        }
    }

    info.lastPracticeDate = today;

    // Grant streak freeze at level 10
    const level = getLevelFromXP(getXP());
    if (level.level >= 10 && !info.streakFreezeAvailable) {
        info.streakFreezeAvailable = true;
    }

    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(info));

    return { streakInfo: info, streakIncreased, streakLost };
}

// ==================== DAILY CHALLENGES ====================

export interface DailyChallenge {
    id: string;
    type: 'practice' | 'master' | 'weapon' | 'difficulty';
    description: string;
    target: number;
    progress: number;
    completed: boolean;
    xpReward: number;
}

const DAILY_CHALLENGE_TEMPLATES = [
    { type: 'practice', description: 'Practice {target} combos today', targets: [3, 5, 7] },
    { type: 'master', description: 'Master {target} new combo', targets: [1, 2] },
    { type: 'weapon', description: 'Practice a {weapon} combo', targets: weapons },
    { type: 'difficulty', description: 'Practice a {difficulty} difficulty combo', targets: ['easy', 'medium', 'hard'] },
];

export function generateDailyChallenge(): DailyChallenge {
    const template = DAILY_CHALLENGE_TEMPLATES[Math.floor(Math.random() * DAILY_CHALLENGE_TEMPLATES.length)];
    const today = new Date().toISOString().split('T')[0];

    let description = template.description;
    let target = 1;

    if (template.type === 'practice' || template.type === 'master') {
        target = template.targets[Math.floor(Math.random() * template.targets.length)] as number;
        description = description.replace('{target}', target.toString());
    } else if (template.type === 'weapon') {
        const weapon = template.targets[Math.floor(Math.random() * template.targets.length)] as string;
        description = description.replace('{weapon}', weapon);
    } else if (template.type === 'difficulty') {
        const difficulty = template.targets[Math.floor(Math.random() * template.targets.length)] as string;
        description = description.replace('{difficulty}', difficulty);
    }

    return {
        id: `daily-${today}`,
        type: template.type as DailyChallenge['type'],
        description,
        target,
        progress: 0,
        completed: false,
        xpReward: XP_REWARDS.COMPLETE_DAILY,
    };
}

export function getDailyChallenge(): DailyChallenge | null {
    if (!isBrowser) return null;

    const today = new Date().toISOString().split('T')[0];
    const data = localStorage.getItem(STORAGE_KEYS.DAILY_CHALLENGE);

    if (data) {
        const challenge = JSON.parse(data) as DailyChallenge;
        if (challenge.id === `daily-${today}`) {
            return challenge;
        }
    }

    // Generate new challenge for today
    const newChallenge = generateDailyChallenge();
    localStorage.setItem(STORAGE_KEYS.DAILY_CHALLENGE, JSON.stringify(newChallenge));
    return newChallenge;
}

export function updateDailyChallengeProgress(type: 'practice' | 'master'): DailyChallenge | null {
    if (!isBrowser) return null;

    const challenge = getDailyChallenge();
    if (!challenge || challenge.completed) return challenge;

    if (
        (challenge.type === 'practice' && type === 'practice') ||
        (challenge.type === 'master' && type === 'master')
    ) {
        challenge.progress += 1;
        if (challenge.progress >= challenge.target) {
            challenge.completed = true;
            addXP(challenge.xpReward);
        }
        localStorage.setItem(STORAGE_KEYS.DAILY_CHALLENGE, JSON.stringify(challenge));
    }

    return challenge;
}

// ==================== GAMIFICATION HOOKS ====================

export interface GamificationEvent {
    type: 'xp_gained' | 'level_up' | 'achievement_unlocked' | 'streak_increased' | 'streak_lost' | 'challenge_completed';
    data: Record<string, unknown>;
}

export function onComboPracticed(
    comboId: string,
    practicedIds: string[],
    masteredIds: string[]
): GamificationEvent[] {
    const events: GamificationEvent[] = [];

    // Add XP
    const xpResult = addXP(XP_REWARDS.PRACTICE_COMBO);
    events.push({ type: 'xp_gained', data: { amount: XP_REWARDS.PRACTICE_COMBO, newXp: xpResult.newXp } });

    if (xpResult.leveledUp) {
        events.push({ type: 'level_up', data: { level: xpResult.newLevel } });
    }

    // Update streak
    const streakResult = updateStreak();
    if (streakResult.streakIncreased) {
        events.push({ type: 'streak_increased', data: { streak: streakResult.streakInfo.currentStreak } });
        addXP(XP_REWARDS.STREAK_BONUS);
    }
    if (streakResult.streakLost) {
        events.push({ type: 'streak_lost', data: { previousStreak: streakResult.streakInfo.longestStreak } });
    }

    // Update daily challenge
    const challenge = updateDailyChallengeProgress('practice');
    if (challenge?.completed) {
        events.push({ type: 'challenge_completed', data: { challenge } });
    }

    // Check achievements
    const stats = getAchievementStats(practicedIds, masteredIds, streakResult.streakInfo.currentStreak);
    const newAchievements = checkAchievements(stats);
    for (const achievement of newAchievements) {
        events.push({ type: 'achievement_unlocked', data: { achievement } });
        addXP(XP_REWARDS.UNLOCK_ACHIEVEMENT);
    }

    return events;
}

export function onComboMastered(
    comboId: string,
    practicedIds: string[],
    masteredIds: string[]
): GamificationEvent[] {
    const events: GamificationEvent[] = [];

    // Add XP
    const xpResult = addXP(XP_REWARDS.MASTER_COMBO);
    events.push({ type: 'xp_gained', data: { amount: XP_REWARDS.MASTER_COMBO, newXp: xpResult.newXp } });

    if (xpResult.leveledUp) {
        events.push({ type: 'level_up', data: { level: xpResult.newLevel } });
    }

    // Update streak
    const streakResult = updateStreak();
    if (streakResult.streakIncreased) {
        events.push({ type: 'streak_increased', data: { streak: streakResult.streakInfo.currentStreak } });
        addXP(XP_REWARDS.STREAK_BONUS);
    }

    // Update daily challenge
    const challenge = updateDailyChallengeProgress('master');
    if (challenge?.completed) {
        events.push({ type: 'challenge_completed', data: { challenge } });
    }

    // Check achievements
    const stats = getAchievementStats(practicedIds, masteredIds, streakResult.streakInfo.currentStreak);
    const newAchievements = checkAchievements(stats);
    for (const achievement of newAchievements) {
        events.push({ type: 'achievement_unlocked', data: { achievement } });
        addXP(XP_REWARDS.UNLOCK_ACHIEVEMENT);
    }

    return events;
}
