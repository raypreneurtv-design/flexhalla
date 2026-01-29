'use client';

import { useState, useEffect } from 'react';
import { Achievement, GamificationEvent, LevelInfo } from '@/lib/gamification';

interface ToastItem {
    id: string;
    type: 'achievement' | 'level_up' | 'xp' | 'streak' | 'challenge';
    title: string;
    description: string;
    icon: string;
}

interface AchievementToastProps {
    events: GamificationEvent[];
    onClear: () => void;
}

export default function AchievementToast({ events, onClear }: AchievementToastProps) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const [visible, setVisible] = useState<string[]>([]);

    useEffect(() => {
        const newToasts: ToastItem[] = [];

        for (const event of events) {
            switch (event.type) {
                case 'achievement_unlocked': {
                    const achievement = event.data.achievement as Achievement;
                    newToasts.push({
                        id: `ach-${achievement.id}-${Date.now()}`,
                        type: 'achievement',
                        title: 'Achievement Unlocked!',
                        description: achievement.name,
                        icon: achievement.icon,
                    });
                    break;
                }
                case 'level_up': {
                    const level = event.data.level as LevelInfo;
                    newToasts.push({
                        id: `level-${level.level}-${Date.now()}`,
                        type: 'level_up',
                        title: 'Level Up!',
                        description: `You are now ${level.title}`,
                        icon: '⬆️',
                    });
                    break;
                }
                case 'challenge_completed': {
                    newToasts.push({
                        id: `challenge-${Date.now()}`,
                        type: 'challenge',
                        title: 'Daily Challenge Complete!',
                        description: '+100 XP',
                        icon: '✅',
                    });
                    break;
                }
                case 'streak_increased': {
                    const streak = event.data.streak as number;
                    if (streak % 7 === 0) {
                        newToasts.push({
                            id: `streak-${streak}-${Date.now()}`,
                            type: 'streak',
                            title: `${streak} Day Streak!`,
                            description: 'Keep it up!',
                            icon: '🔥',
                        });
                    }
                    break;
                }
            }
        }

        if (newToasts.length > 0) {
            setToasts(prev => [...prev, ...newToasts]);
            // Animate in new toasts
            setTimeout(() => {
                setVisible(prev => [...prev, ...newToasts.map(t => t.id)]);
            }, 50);
        }
    }, [events]);

    const removeToast = (id: string) => {
        setVisible(prev => prev.filter(v => v !== id));
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
            if (toasts.length <= 1) {
                onClear();
            }
        }, 300);
    };

    // Auto-dismiss toasts after 4 seconds
    useEffect(() => {
        if (toasts.length === 0) return;

        const timers = toasts.map(toast =>
            setTimeout(() => removeToast(toast.id), 4000)
        );

        return () => timers.forEach(clearTimeout);
    }, [toasts]);

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-24 right-4 z-50 flex flex-col gap-3 max-w-sm">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`
                        bg-[var(--bg-card)] border border-[var(--border-accent)] rounded-xl p-4 shadow-xl
                        transform transition-all duration-300 cursor-pointer hover:scale-105
                        ${visible.includes(toast.id) ? 'animate-toast-in' : 'animate-toast-out'}
                    `}
                    onClick={() => removeToast(toast.id)}
                >
                    <div className="flex items-start gap-3">
                        <div className="text-3xl animate-confetti-pop">{toast.icon}</div>
                        <div className="flex-1">
                            <div className="font-bold text-[var(--accent)] text-sm uppercase tracking-wide">
                                {toast.title}
                            </div>
                            <div className="text-[var(--text-primary)] font-medium">
                                {toast.description}
                            </div>
                        </div>
                        <button
                            className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeToast(toast.id);
                            }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Progress bar for auto-dismiss */}
                    <div className="mt-3 h-1 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[var(--accent)] animate-shrink"
                            style={{ animation: 'shrink 4s linear forwards' }}
                        />
                    </div>
                </div>
            ))}

            <style jsx>{`
                @keyframes shrink {
                    from { width: 100%; }
                    to { width: 0%; }
                }
            `}</style>
        </div>
    );
}
