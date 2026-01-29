'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    ACHIEVEMENTS,
    Achievement,
    getUnlockedAchievements,
    getAchievementStats,
    AchievementStats,
    getXP,
    getLevelFromXP,
    getStreakInfo
} from '@/lib/gamification';
import { getPracticedCombos, getMasteredCombos } from '@/lib/progress';
import XPBar from '@/components/XPBar';

export default function AchievementsPage() {
    const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
    const [stats, setStats] = useState<AchievementStats | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<'all' | Achievement['category']>('all');

    useEffect(() => {
        const practiced = getPracticedCombos();
        const mastered = getMasteredCombos();
        const streak = getStreakInfo();

        setUnlockedIds(getUnlockedAchievements());
        setStats(getAchievementStats(practiced, mastered, streak.currentStreak));
    }, []);

    const categories = [
        { id: 'all', label: 'All', icon: '📋' },
        { id: 'progress', label: 'Progress', icon: '📈' },
        { id: 'mastery', label: 'Mastery', icon: '🏆' },
        { id: 'dedication', label: 'Dedication', icon: '🔥' },
        { id: 'exploration', label: 'Exploration', icon: '🗺️' },
    ] as const;

    const filteredAchievements = selectedCategory === 'all'
        ? ACHIEVEMENTS
        : ACHIEVEMENTS.filter(a => a.category === selectedCategory);

    const unlockedCount = unlockedIds.length;
    const totalCount = ACHIEVEMENTS.length;
    const progressPercentage = Math.round((unlockedCount / totalCount) * 100);

    return (
        <div className="min-h-screen py-8 md:py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Achievements
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                        Track your progress and unlock rewards as you master combos and build your skills.
                    </p>
                </header>

                {/* Progress Overview */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <XPBar showLevel={true} />

                    <div className="bg-[var(--bg-card)] rounded-xl p-4 border border-[var(--border-subtle)]">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <div className="text-2xl font-bold text-[var(--accent)]">
                                    {unlockedCount}/{totalCount}
                                </div>
                                <div className="text-sm text-[var(--text-muted)]">Achievements Unlocked</div>
                            </div>
                            <div className="text-5xl">🏆</div>
                        </div>
                        <div className="h-3 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--warning)] animate-xp-fill"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                        <div className="text-right mt-1 text-sm text-[var(--text-muted)]">
                            {progressPercentage}% Complete
                        </div>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all btn-pulse flex items-center gap-2 ${
                                selectedCategory === cat.id
                                    ? 'bg-[var(--accent)] text-[var(--bg-dark)]'
                                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                            }`}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.label}</span>
                        </button>
                    ))}
                </div>

                {/* Achievement Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAchievements.map((achievement, index) => {
                        const isUnlocked = unlockedIds.includes(achievement.id);

                        return (
                            <div
                                key={achievement.id}
                                className={`
                                    relative overflow-hidden rounded-xl border p-4 transition-all animate-slide-up
                                    ${isUnlocked
                                        ? 'bg-gradient-to-br from-[var(--bg-card)] to-[var(--accent)]/10 border-[var(--accent)]'
                                        : 'bg-[var(--bg-card)] border-[var(--border-subtle)] opacity-60'
                                    }
                                `}
                                style={{ animationDelay: `${index * 30}ms` }}
                            >
                                {/* Icon */}
                                <div className={`text-4xl mb-3 ${isUnlocked ? 'animate-confetti-pop' : 'grayscale'}`}>
                                    {achievement.icon}
                                </div>

                                {/* Content */}
                                <h3 className={`font-bold mb-1 ${isUnlocked ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                                    {achievement.name}
                                </h3>
                                <p className="text-sm text-[var(--text-muted)] mb-3">
                                    {achievement.description}
                                </p>

                                {/* Status Badge */}
                                <div className="flex items-center justify-between">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        isUnlocked
                                            ? 'bg-[var(--success)]/20 text-[var(--success)]'
                                            : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]'
                                    }`}>
                                        {isUnlocked ? 'Unlocked' : 'Locked'}
                                    </span>
                                    <span className="text-xs text-[var(--text-muted)]">
                                        +75 XP
                                    </span>
                                </div>

                                {/* Locked Overlay */}
                                {!isUnlocked && (
                                    <div className="absolute top-3 right-3">
                                        <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Stats Breakdown */}
                {stats && (
                    <div className="mt-12 pt-8 border-t border-[var(--border-subtle)]">
                        <h2 className="text-xl font-bold mb-6 text-center">Your Stats</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="card text-center">
                                <div className="text-3xl font-bold text-[var(--accent)]">{stats.totalPracticed}</div>
                                <div className="text-sm text-[var(--text-muted)]">Combos Practiced</div>
                            </div>
                            <div className="card text-center">
                                <div className="text-3xl font-bold text-[var(--success)]">{stats.totalMastered}</div>
                                <div className="text-sm text-[var(--text-muted)]">Combos Mastered</div>
                            </div>
                            <div className="card text-center">
                                <div className="text-3xl font-bold text-[var(--warning)]">{stats.weaponsMastered}</div>
                                <div className="text-sm text-[var(--text-muted)]">Weapons Explored</div>
                            </div>
                            <div className="card text-center">
                                <div className="text-3xl font-bold text-[var(--danger)]">{stats.streakDays}</div>
                                <div className="text-sm text-[var(--text-muted)]">Day Streak</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-[var(--text-secondary)] mb-4">
                        Keep practicing to unlock more achievements!
                    </p>
                    <Link href="/training" className="btn btn-accent">
                        Continue Training
                    </Link>
                </div>
            </div>
        </div>
    );
}
