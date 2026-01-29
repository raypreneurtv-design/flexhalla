'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getXP, getLevelFromXP, getStreakInfo, LevelInfo, StreakInfo } from '@/lib/gamification';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [level, setLevel] = useState<LevelInfo | null>(null);
    const [streak, setStreak] = useState<StreakInfo | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const xp = getXP();
        setLevel(getLevelFromXP(xp));
        setStreak(getStreakInfo());

        // Listen for storage changes (when user practices combos)
        const handleStorage = () => {
            const newXp = getXP();
            setLevel(getLevelFromXP(newXp));
            setStreak(getStreakInfo());
        };

        window.addEventListener('storage', handleStorage);
        // Also update periodically
        const interval = setInterval(handleStorage, 5000);

        return () => {
            window.removeEventListener('storage', handleStorage);
            clearInterval(interval);
        };
    }, []);

    return (
        <header className="sticky top-0 z-50 glass border-b border-[var(--border-subtle)]">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group logo-container">
                        <Image
                            src="/flexhalla-logo.jpg"
                            alt="Flexhalla Logo"
                            width={160}
                            height={50}
                            className="h-14 w-auto object-contain group-hover:scale-105 transition-transform"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/combos"
                            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-semibold uppercase tracking-wide text-sm"
                        >
                            Combos
                        </Link>
                        <Link
                            href="/training"
                            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-semibold uppercase tracking-wide text-sm"
                        >
                            Training
                        </Link>
                        <Link
                            href="/stats"
                            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-semibold uppercase tracking-wide text-sm"
                        >
                            Stats
                        </Link>
                        <Link
                            href="/achievements"
                            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-semibold uppercase tracking-wide text-sm"
                        >
                            Achievements
                        </Link>

                        {/* Gamification Indicators */}
                        {mounted && level && (
                            <div className="flex items-center gap-2 ml-2">
                                {/* Streak Indicator */}
                                {streak && streak.currentStreak > 0 && (
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[var(--bg-elevated)]" title={`${streak.currentStreak} day streak`}>
                                        <span className="animate-flame">🔥</span>
                                        <span className="text-sm font-bold text-[var(--accent)]">{streak.currentStreak}</span>
                                    </div>
                                )}

                                {/* Level/XP Indicator */}
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-card-hover)] transition-colors"
                                    title={`Level ${level.level} - ${level.title}`}
                                >
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center text-xs font-bold text-[var(--bg-dark)]">
                                        {level.level}
                                    </div>
                                    <span className="text-xs font-bold text-[var(--text-secondary)] hidden lg:inline">
                                        {level.title}
                                    </span>
                                </Link>
                            </div>
                        )}

                        <a
                            href="https://discord.gg/brawlhalla"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-accent text-sm py-2 px-4"
                        >
                            Discord
                        </a>
                    </div>

                    {/* Mobile - Right Side */}
                    <div className="flex md:hidden items-center gap-2">
                        {/* Mobile Gamification Indicators */}
                        {mounted && level && (
                            <Link
                                href="/profile"
                                className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--bg-elevated)]"
                            >
                                {streak && streak.currentStreak > 0 && (
                                    <span className="animate-flame text-sm">🔥{streak.currentStreak}</span>
                                )}
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center text-xs font-bold text-[var(--bg-dark)]">
                                    {level.level}
                                </div>
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-[var(--accent)] hover:text-[var(--text-primary)]"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-[var(--border-subtle)]">
                        <div className="flex flex-col gap-4">
                            <Link
                                href="/combos"
                                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-semibold uppercase tracking-wide py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Combo Library
                            </Link>
                            <Link
                                href="/training"
                                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-semibold uppercase tracking-wide py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Training
                            </Link>
                            <Link
                                href="/stats"
                                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-semibold uppercase tracking-wide py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Stats Lookup
                            </Link>
                            <Link
                                href="/achievements"
                                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-semibold uppercase tracking-wide py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Achievements
                            </Link>
                            <Link
                                href="/profile"
                                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-semibold uppercase tracking-wide py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Profile
                            </Link>
                            <a
                                href="https://discord.gg/brawlhalla"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-accent text-sm py-2 px-4 w-full text-center"
                            >
                                Join Discord
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
