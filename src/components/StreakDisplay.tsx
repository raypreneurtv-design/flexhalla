'use client';

import { useState, useEffect } from 'react';
import { getStreakInfo, StreakInfo } from '@/lib/gamification';

interface StreakDisplayProps {
    compact?: boolean;
    onRefresh?: () => void;
}

export default function StreakDisplay({ compact = false, onRefresh }: StreakDisplayProps) {
    const [streak, setStreak] = useState<StreakInfo | null>(null);

    useEffect(() => {
        setStreak(getStreakInfo());
    }, []);

    useEffect(() => {
        if (onRefresh) {
            setStreak(getStreakInfo());
        }
    }, [onRefresh]);

    if (!streak) return null;

    // Flame size based on streak
    const flameSize = streak.currentStreak <= 3 ? 'text-xl' :
                      streak.currentStreak <= 7 ? 'text-2xl' :
                      streak.currentStreak <= 14 ? 'text-3xl' :
                      streak.currentStreak <= 30 ? 'text-4xl' : 'text-5xl';

    const flameColor = streak.currentStreak <= 3 ? 'text-orange-400' :
                       streak.currentStreak <= 7 ? 'text-orange-500' :
                       streak.currentStreak <= 14 ? 'text-red-500' :
                       streak.currentStreak <= 30 ? 'text-red-600' : 'text-purple-500';

    if (compact) {
        return (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--bg-elevated)]">
                <span className={`${streak.currentStreak > 0 ? 'animate-flame' : ''} ${flameColor}`}>
                    🔥
                </span>
                <span className="text-sm font-bold text-[var(--accent)]">
                    {streak.currentStreak}
                </span>
            </div>
        );
    }

    return (
        <div className="bg-[var(--bg-card)] rounded-xl p-4 border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`${flameSize} ${streak.currentStreak > 0 ? 'animate-flame' : ''}`}>
                        {streak.currentStreak > 0 ? '🔥' : '❄️'}
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-[var(--text-primary)]">
                            {streak.currentStreak} Day{streak.currentStreak !== 1 ? 's' : ''}
                        </div>
                        <div className="text-sm text-[var(--text-muted)]">
                            {streak.currentStreak === 0 ? 'Start your streak!' : 'Current Streak'}
                        </div>
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-lg font-bold text-[var(--accent)]">
                        {streak.longestStreak}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">Best Streak</div>
                </div>
            </div>

            {/* Streak bonus info */}
            {streak.currentStreak > 0 && (
                <div className="mt-3 pt-3 border-t border-[var(--border-subtle)]">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-muted)]">Daily streak bonus</span>
                        <span className="font-bold text-[var(--success)]">+25 XP</span>
                    </div>
                </div>
            )}

            {/* Streak freeze indicator */}
            {streak.streakFreezeAvailable && (
                <div className="mt-2 flex items-center gap-2 text-sm">
                    <span>🧊</span>
                    <span className="text-[var(--teal)]">Streak Freeze available</span>
                </div>
            )}

            {/* Motivation message */}
            <div className="mt-3 text-sm text-center text-[var(--text-muted)]">
                {streak.currentStreak === 0 && 'Practice today to start your streak!'}
                {streak.currentStreak === 1 && 'Great start! Come back tomorrow!'}
                {streak.currentStreak >= 2 && streak.currentStreak < 7 && `${7 - streak.currentStreak} days to a week streak!`}
                {streak.currentStreak >= 7 && streak.currentStreak < 30 && 'Amazing dedication! Keep going!'}
                {streak.currentStreak >= 30 && "You're a legend! Unstoppable!"}
            </div>
        </div>
    );
}
