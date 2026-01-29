'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { combos, weapons } from '@/data/combos';
import { getPracticedCombos, getMasteredCombos, getFavoriteCombos, getLastStats, PlayerStats } from '@/lib/progress';
import {
    getXP,
    getLevelFromXP,
    getStreakInfo,
    getUnlockedAchievements,
    ACHIEVEMENTS,
    getAchievementStats,
    getDailyChallenge,
    StreakInfo,
    LevelInfo,
    DailyChallenge
} from '@/lib/gamification';
import { getWeaponMasteryStats } from '@/lib/recommendations';
import XPBar from '@/components/XPBar';
import StreakDisplay from '@/components/StreakDisplay';
import DailyChallengeComponent from '@/components/DailyChallenge';

export default function ProfilePage() {
    const [level, setLevel] = useState<LevelInfo | null>(null);
    const [xp, setXp] = useState(0);
    const [streak, setStreak] = useState<StreakInfo | null>(null);
    const [practicedCount, setPracticedCount] = useState(0);
    const [masteredCount, setMasteredCount] = useState(0);
    const [favoritesCount, setFavoritesCount] = useState(0);
    const [achievementsUnlocked, setAchievementsUnlocked] = useState(0);
    const [stats, setStats] = useState<PlayerStats | null>(null);
    const [weaponStats, setWeaponStats] = useState<Record<string, { mastered: number; total: number; percentage: number }>>({});
    const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge | null>(null);

    useEffect(() => {
        const currentXp = getXP();
        setXp(currentXp);
        setLevel(getLevelFromXP(currentXp));
        setStreak(getStreakInfo());

        const practiced = getPracticedCombos();
        const mastered = getMasteredCombos();
        setPracticedCount(practiced.length);
        setMasteredCount(mastered.length);
        setFavoritesCount(getFavoriteCombos().length);
        setAchievementsUnlocked(getUnlockedAchievements().length);
        setStats(getLastStats());
        setWeaponStats(getWeaponMasteryStats(mastered));
        setDailyChallenge(getDailyChallenge());
    }, []);

    const totalCombos = combos.length;
    const masteryPercentage = Math.round((masteredCount / totalCombos) * 100);

    // Find best and worst weapons
    const sortedWeapons = Object.entries(weaponStats)
        .sort((a, b) => b[1].percentage - a[1].percentage);
    const bestWeapon = sortedWeapons[0];
    const worstWeapon = sortedWeapons[sortedWeapons.length - 1];

    return (
        <div className="min-h-screen py-8 md:py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <header className="text-center mb-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] flex items-center justify-center text-4xl shadow-xl">
                        {level ? level.level : '?'}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        {stats?.name || 'Brawlhalla Warrior'}
                    </h1>
                    {level && (
                        <p className="text-lg text-[var(--accent)] font-bold uppercase tracking-wider">
                            {level.title}
                        </p>
                    )}
                    {stats && (
                        <p className="text-[var(--text-muted)] mt-2">
                            {stats.rank} • {stats.elo} Elo • Main: {stats.mainLegend}
                        </p>
                    )}
                </header>

                {/* XP and Streak */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <XPBar showLevel={true} />
                    <StreakDisplay />
                </div>

                {/* Daily Challenge */}
                <div className="mb-8">
                    <DailyChallengeComponent />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="card text-center animate-slide-up" style={{ animationDelay: '50ms' }}>
                        <div className="text-3xl font-bold text-[var(--accent)]">{xp.toLocaleString()}</div>
                        <div className="text-sm text-[var(--text-muted)]">Total XP</div>
                    </div>
                    <div className="card text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <div className="text-3xl font-bold text-[var(--success)]">{masteredCount}</div>
                        <div className="text-sm text-[var(--text-muted)]">Combos Mastered</div>
                    </div>
                    <div className="card text-center animate-slide-up" style={{ animationDelay: '150ms' }}>
                        <div className="text-3xl font-bold text-[var(--warning)]">{achievementsUnlocked}</div>
                        <div className="text-sm text-[var(--text-muted)]">Achievements</div>
                    </div>
                    <div className="card text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <div className="text-3xl font-bold text-[var(--danger)]">{streak?.longestStreak || 0}</div>
                        <div className="text-sm text-[var(--text-muted)]">Best Streak</div>
                    </div>
                </div>

                {/* Overall Progress */}
                <div className="card mb-8 animate-slide-up" style={{ animationDelay: '250ms' }}>
                    <h2 className="text-xl font-bold mb-4">Overall Mastery</h2>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[var(--text-secondary)]">Combo Mastery Progress</span>
                        <span className="font-bold text-[var(--accent)]">{masteryPercentage}%</span>
                    </div>
                    <div className="h-4 bg-[var(--bg-elevated)] rounded-full overflow-hidden mb-4">
                        <div
                            className="h-full bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--success)] animate-xp-fill"
                            style={{ width: `${masteryPercentage}%` }}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="font-bold text-[var(--primary-light)]">{practicedCount}</div>
                            <div className="text-xs text-[var(--text-muted)]">Practiced</div>
                        </div>
                        <div>
                            <div className="font-bold text-[var(--success)]">{masteredCount}</div>
                            <div className="text-xs text-[var(--text-muted)]">Mastered</div>
                        </div>
                        <div>
                            <div className="font-bold text-[var(--text-muted)]">{totalCombos - masteredCount}</div>
                            <div className="text-xs text-[var(--text-muted)]">Remaining</div>
                        </div>
                    </div>
                </div>

                {/* Weapon Mastery */}
                <div className="card mb-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
                    <h2 className="text-xl font-bold mb-4">Weapon Mastery</h2>

                    {/* Best/Worst Weapons */}
                    {bestWeapon && worstWeapon && (
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-[var(--success)]/10 rounded-lg p-3 border border-[var(--success)]/30">
                                <div className="text-xs text-[var(--success)] uppercase font-bold mb-1">Best Weapon</div>
                                <div className="font-bold">{bestWeapon[0]}</div>
                                <div className="text-sm text-[var(--text-muted)]">{bestWeapon[1].mastered}/{bestWeapon[1].total} mastered</div>
                            </div>
                            <div className="bg-[var(--danger)]/10 rounded-lg p-3 border border-[var(--danger)]/30">
                                <div className="text-xs text-[var(--danger)] uppercase font-bold mb-1">Needs Work</div>
                                <div className="font-bold">{worstWeapon[0]}</div>
                                <div className="text-sm text-[var(--text-muted)]">{worstWeapon[1].mastered}/{worstWeapon[1].total} mastered</div>
                            </div>
                        </div>
                    )}

                    {/* Weapon Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {Object.entries(weaponStats).map(([weapon, stat]) => (
                            <div
                                key={weapon}
                                className="bg-[var(--bg-elevated)] rounded-lg p-3"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">{weapon}</span>
                                    <span className={`text-xs font-bold ${
                                        stat.percentage === 100 ? 'text-[var(--success)]' :
                                        stat.percentage > 50 ? 'text-[var(--warning)]' :
                                        stat.percentage > 0 ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
                                    }`}>
                                        {stat.percentage}%
                                    </span>
                                </div>
                                <div className="h-1.5 bg-[var(--bg-dark)] rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{
                                            width: `${stat.percentage}%`,
                                            backgroundColor: stat.percentage === 100 ? 'var(--success)' :
                                                           stat.percentage > 50 ? 'var(--warning)' :
                                                           stat.percentage > 0 ? 'var(--accent)' : 'var(--text-muted)'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Achievements */}
                <div className="card mb-8 animate-slide-up" style={{ animationDelay: '350ms' }}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Recent Achievements</h2>
                        <Link href="/achievements" className="text-sm text-[var(--accent)] hover:underline">
                            View all →
                        </Link>
                    </div>

                    {achievementsUnlocked > 0 ? (
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {ACHIEVEMENTS
                                .filter(a => getUnlockedAchievements().includes(a.id))
                                .slice(-5)
                                .reverse()
                                .map((achievement) => (
                                    <div
                                        key={achievement.id}
                                        className="flex-shrink-0 w-24 text-center"
                                    >
                                        <div className="text-4xl mb-2">{achievement.icon}</div>
                                        <div className="text-xs font-bold text-[var(--accent)] truncate">
                                            {achievement.name}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-[var(--text-muted)]">
                            <div className="text-4xl mb-2">🔒</div>
                            <p>No achievements unlocked yet</p>
                            <p className="text-sm">Start practicing to earn achievements!</p>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-3 gap-4">
                    <Link href="/training" className="card text-center hover:border-[var(--accent)] transition-colors">
                        <div className="text-3xl mb-2">🎯</div>
                        <div className="font-bold">Continue Training</div>
                        <div className="text-sm text-[var(--text-muted)]">Pick up where you left off</div>
                    </Link>
                    <Link href="/combos" className="card text-center hover:border-[var(--accent)] transition-colors">
                        <div className="text-3xl mb-2">📚</div>
                        <div className="font-bold">Browse Combos</div>
                        <div className="text-sm text-[var(--text-muted)]">Explore all {totalCombos} combos</div>
                    </Link>
                    <Link href="/stats" className="card text-center hover:border-[var(--accent)] transition-colors">
                        <div className="text-3xl mb-2">📊</div>
                        <div className="font-bold">Analyze Stats</div>
                        <div className="text-sm text-[var(--text-muted)]">Get personalized insights</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
