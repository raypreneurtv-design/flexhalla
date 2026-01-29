'use client';

import { useState, useEffect } from 'react';
import { getDailyChallenge, DailyChallenge as DailyChallengeType } from '@/lib/gamification';

interface DailyChallengeProps {
    onRefresh?: () => void;
}

export default function DailyChallenge({ onRefresh }: DailyChallengeProps) {
    const [challenge, setChallenge] = useState<DailyChallengeType | null>(null);

    useEffect(() => {
        setChallenge(getDailyChallenge());
    }, []);

    // Refresh challenge when onRefresh prop changes
    useEffect(() => {
        if (onRefresh) {
            setChallenge(getDailyChallenge());
        }
    }, [onRefresh]);

    if (!challenge) return null;

    const progressPercentage = Math.min((challenge.progress / challenge.target) * 100, 100);

    return (
        <div className={`
            bg-gradient-to-r rounded-xl p-4 border transition-all
            ${challenge.completed
                ? 'from-[var(--success)]/20 to-[var(--success)]/10 border-[var(--success)]'
                : 'from-[var(--accent)]/20 to-[var(--primary)]/10 border-[var(--accent)]'
            }
        `}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">
                        {challenge.completed ? '✅' : '📅'}
                    </span>
                    <div>
                        <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold">
                            Daily Challenge
                        </div>
                        <div className="font-bold text-[var(--text-primary)]">
                            {challenge.description}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-[var(--text-muted)]">Reward</div>
                    <div className="font-bold text-[var(--accent)]">+{challenge.xpReward} XP</div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
                <div className="h-2.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ${
                            challenge.completed
                                ? 'bg-[var(--success)]'
                                : 'bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
                <div className="flex justify-between mt-1 text-xs">
                    <span className={challenge.completed ? 'text-[var(--success)]' : 'text-[var(--text-muted)]'}>
                        {challenge.completed ? 'Completed!' : `${challenge.progress}/${challenge.target}`}
                    </span>
                    {!challenge.completed && (
                        <span className="text-[var(--text-muted)]">
                            {challenge.target - challenge.progress} remaining
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
