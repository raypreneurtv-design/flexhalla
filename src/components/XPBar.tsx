'use client';

import { useState, useEffect } from 'react';
import { getXP, getXPProgress, getLevelFromXP, LevelInfo } from '@/lib/gamification';

interface XPBarProps {
    compact?: boolean;
    showLevel?: boolean;
}

export default function XPBar({ compact = false, showLevel = true }: XPBarProps) {
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState<LevelInfo | null>(null);
    const [progress, setProgress] = useState({ current: 0, required: 100, percentage: 0 });

    useEffect(() => {
        const currentXp = getXP();
        setXp(currentXp);
        setLevel(getLevelFromXP(currentXp));
        setProgress(getXPProgress());
    }, []);

    if (!level) return null;

    if (compact) {
        return (
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--bg-elevated)]">
                    <span className="text-sm font-bold text-[var(--accent)]">Lv.{level.level}</span>
                    <div className="w-16 h-1.5 bg-[var(--bg-dark)] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] animate-xp-fill"
                            style={{ width: `${progress.percentage}%` }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[var(--bg-card)] rounded-xl p-4 border border-[var(--border-subtle)]">
            {showLevel && (
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center text-lg font-bold text-[var(--bg-dark)]">
                            {level.level}
                        </div>
                        <div>
                            <div className="font-bold text-[var(--text-primary)]">{level.title}</div>
                            <div className="text-xs text-[var(--text-muted)]">{xp.toLocaleString()} XP</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-[var(--text-secondary)]">Next Level</div>
                        <div className="text-sm font-bold text-[var(--accent)]">{progress.required - progress.current} XP</div>
                    </div>
                </div>
            )}

            {/* XP Bar */}
            <div className="relative">
                <div className="h-3 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-500 animate-xp-fill"
                        style={{ width: `${progress.percentage}%` }}
                    />
                </div>
                <div className="flex justify-between mt-1 text-xs text-[var(--text-muted)]">
                    <span>{progress.current.toLocaleString()} XP</span>
                    <span>{progress.required.toLocaleString()} XP</span>
                </div>
            </div>
        </div>
    );
}
