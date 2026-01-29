'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { combos } from '@/data/combos';
import { getProgressSummary, getLastStats } from '@/lib/progress';
import { getXP, getLevelFromXP, getStreakInfo, getDailyChallenge, LevelInfo, StreakInfo, DailyChallenge } from '@/lib/gamification';

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const [progress, setProgress] = useState({ practicedCount: 0, masteredCount: 0, favoritesCount: 0, hasStats: false });
    const [level, setLevel] = useState<LevelInfo | null>(null);
    const [streak, setStreak] = useState<StreakInfo | null>(null);
    const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge | null>(null);
    const [hasProgress, setHasProgress] = useState(false);

    useEffect(() => {
        setMounted(true);
        const progressData = getProgressSummary();
        setProgress(progressData);
        setLevel(getLevelFromXP(getXP()));
        setStreak(getStreakInfo());
        setDailyChallenge(getDailyChallenge());
        setHasProgress(progressData.practicedCount > 0 || progressData.masteredCount > 0);
    }, []);

    // Featured combos for homepage
    const featuredCombos = combos.slice(0, 3);

    return (
        <>
            {/* Returning User Progress Widget */}
            {mounted && hasProgress && (
                <section className="bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 py-4 border-b border-[var(--border-accent)]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                {level && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center text-lg font-bold text-[var(--bg-dark)]">
                                            {level.level}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-[var(--accent)]">{level.title}</div>
                                            <div className="text-xs text-[var(--text-muted)]">{getXP()} XP</div>
                                        </div>
                                    </div>
                                )}
                                {streak && streak.currentStreak > 0 && (
                                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--bg-elevated)]">
                                        <span className="animate-flame">🔥</span>
                                        <span className="font-bold text-[var(--accent)]">{streak.currentStreak} day streak</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="text-[var(--text-secondary)]">
                                    <span className="font-bold text-[var(--success)]">{progress.masteredCount}</span>/{combos.length} mastered
                                </span>
                                {dailyChallenge && !dailyChallenge.completed && (
                                    <Link href="/training" className="text-[var(--accent)] hover:underline">
                                        Daily challenge available →
                                    </Link>
                                )}
                                {dailyChallenge?.completed && (
                                    <span className="text-[var(--success)]">✓ Daily complete</span>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 md:py-28">
                {/* Background Glow Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[var(--accent)] rounded-full blur-[200px] opacity-20"></div>
                    <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[var(--teal)] rounded-full blur-[180px] opacity-15"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Logo Image */}
                    <div className="mb-8 animate-float logo-container">
                        <Image
                            src="/flexhalla-logo.jpg"
                            alt="Flexhalla - Brawlhalla Training Companion"
                            width={320}
                            height={320}
                            className="mx-auto w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain rounded-2xl"
                            priority
                        />
                    </div>

                    <h1 className="hero-title mb-6 leading-tight">
                        Master Brawlhalla
                        <br />
                        <span className="text-[var(--text-primary)] text-3xl md:text-4xl lg:text-5xl" style={{ textShadow: '2px 2px 0 #1a1a2e' }}>
                            with AI-Powered Training
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10">
                        Analyze your stats, discover your weaknesses, and dominate Valhalla with
                        personalized combo recommendations tailored to your playstyle.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/combos" className="btn btn-accent text-lg py-4 px-8">
                            Browse {combos.length} Combos
                        </Link>
                        <Link href="/stats" className="btn btn-primary text-lg py-4 px-8">
                            Analyze My Stats
                        </Link>
                    </div>

                    {/* Stats Preview */}
                    <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                        <div className="text-center glass rounded-xl p-4">
                            <div className="text-3xl md:text-4xl font-bold text-[var(--accent)]" style={{ fontFamily: 'Russo One, sans-serif' }}>{combos.length}</div>
                            <div className="text-sm text-[var(--text-muted)] uppercase tracking-wide">Combos</div>
                        </div>
                        <div className="text-center glass rounded-xl p-4">
                            <div className="text-3xl md:text-4xl font-bold text-[var(--accent)]" style={{ fontFamily: 'Russo One, sans-serif' }}>13</div>
                            <div className="text-sm text-[var(--text-muted)] uppercase tracking-wide">Weapons</div>
                        </div>
                        <div className="text-center glass rounded-xl p-4">
                            <div className="text-3xl md:text-4xl font-bold text-[var(--accent)]" style={{ fontFamily: 'Russo One, sans-serif' }}>15+</div>
                            <div className="text-sm text-[var(--text-muted)] uppercase tracking-wide">Achievements</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 glass">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="mb-4">
                            Your Path to Valhallan
                        </h2>
                        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                            Whether you&apos;re Bronze or Diamond, Flexhalla helps you identify gaps in your game and close them fast.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {/* Feature 1 */}
                        <article className="card text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-xl flex items-center justify-center text-3xl shadow-lg">
                                📚
                            </div>
                            <h3 className="mb-3">Combo Library</h3>
                            <p className="text-[var(--text-secondary)] text-sm">
                                {combos.length} verified combos for all 13 weapons with video tutorials.
                            </p>
                        </article>

                        {/* Feature 2 */}
                        <article className="card text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] rounded-xl flex items-center justify-center text-3xl shadow-lg">
                                📊
                            </div>
                            <h3 className="mb-3">Smart Analysis</h3>
                            <p className="text-[var(--text-secondary)] text-sm">
                                AI-powered weakness detection with personalized recommendations.
                            </p>
                        </article>

                        {/* Feature 3 */}
                        <article className="card text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--teal)] to-emerald-600 rounded-xl flex items-center justify-center text-3xl shadow-lg">
                                🎯
                            </div>
                            <h3 className="mb-3">Training Plans</h3>
                            <p className="text-[var(--text-secondary)] text-sm">
                                Track your progress and follow personalized learning paths.
                            </p>
                        </article>

                        {/* Feature 4 */}
                        <article className="card text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--warning)] to-orange-600 rounded-xl flex items-center justify-center text-3xl shadow-lg">
                                🏆
                            </div>
                            <h3 className="mb-3">Gamification</h3>
                            <p className="text-[var(--text-secondary)] text-sm">
                                XP, levels, achievements, streaks, and daily challenges.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Featured Combos */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="mb-2">
                                Featured Combos
                            </h2>
                            <p className="text-[var(--text-secondary)]">
                                Start with these fundamental combos every player should know
                            </p>
                        </div>
                        <Link href="/combos" className="btn btn-outline hidden md:inline-flex">
                            View All {combos.length} Combos
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {featuredCombos.map((combo, index) => (
                            <article
                                key={combo.id}
                                className="card animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="badge badge-weapon">{combo.weapon}</span>
                                    {combo.isTrueCombo && (
                                        <span className="badge badge-true-combo">True Combo</span>
                                    )}
                                </div>
                                <h3 className="text-lg mb-1">{combo.name}</h3>
                                <p className="text-sm text-[var(--text-secondary)] mb-4">{combo.legend}</p>

                                <div className="p-3 bg-[var(--bg-elevated)] rounded-lg mb-4">
                                    <div className="combo-notation flex-wrap">
                                        {combo.inputs.map((input, idx) => (
                                            <span key={idx} className="flex items-center gap-1">
                                                <span className="combo-input">{input}</span>
                                                {idx < combo.inputs.length - 1 && (
                                                    <span className="combo-arrow">→</span>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[var(--text-secondary)]">
                                        <span className="text-[var(--accent)] font-bold">{combo.damage}</span> DMG
                                    </span>
                                    <span className="difficulty-easy">★ Easy</span>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="text-center mt-8 md:hidden">
                        <Link href="/combos" className="btn btn-outline">
                            View All Combos
                        </Link>
                    </div>
                </div>
            </section>

            {/* Gamification Preview */}
            <section className="py-20 glass border-y border-[var(--border-accent)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="mb-4">Level Up Your Game</h2>
                        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                            Earn XP, unlock achievements, maintain streaks, and complete daily challenges as you master combos.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="card text-center">
                            <div className="text-4xl mb-3">⚡</div>
                            <h3 className="text-lg mb-2">Earn XP</h3>
                            <p className="text-sm text-[var(--text-muted)]">
                                +10 XP per practice, +50 XP per mastery
                            </p>
                        </div>
                        <div className="card text-center">
                            <div className="text-4xl mb-3">🔥</div>
                            <h3 className="text-lg mb-2">Build Streaks</h3>
                            <p className="text-sm text-[var(--text-muted)]">
                                Practice daily for bonus XP rewards
                            </p>
                        </div>
                        <div className="card text-center">
                            <div className="text-4xl mb-3">🏆</div>
                            <h3 className="text-lg mb-2">Achievements</h3>
                            <p className="text-sm text-[var(--text-muted)]">
                                15+ achievements to unlock
                            </p>
                        </div>
                        <div className="card text-center">
                            <div className="text-4xl mb-3">📅</div>
                            <h3 className="text-lg mb-2">Daily Challenges</h3>
                            <p className="text-sm text-[var(--text-muted)]">
                                New goals every day for +100 XP
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/profile" className="btn btn-accent">
                            View Your Profile
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="mb-6">
                        Ready to Climb the Ranks?
                    </h2>
                    <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                        Join thousands of Brawlhalla players using Flexhalla to improve their game.
                        Start your training journey today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/training" className="btn btn-accent text-lg py-4 px-8">
                            Start Training
                        </Link>
                        <a
                            href="https://discord.gg/brawlhalla"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline text-lg py-4 px-8"
                        >
                            Join Discord Community
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
