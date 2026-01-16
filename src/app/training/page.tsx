'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { combos, Combo } from '@/data/combos';
import {
    getPracticedCombos,
    getMasteredCombos,
    getFavoriteCombos,
    getLastStats,
    PlayerStats,
    markAsPracticed,
    markAsMastered
} from '@/lib/progress';

export default function TrainingPage() {
    const [practicedIds, setPracticedIds] = useState<string[]>([]);
    const [masteredIds, setMasteredIds] = useState<string[]>([]);
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    const [stats, setStats] = useState<PlayerStats | null>(null);
    const [activeTab, setActiveTab] = useState<'recommended' | 'practiced' | 'mastered' | 'favorites'>('recommended');

    useEffect(() => {
        setPracticedIds(getPracticedCombos());
        setMasteredIds(getMasteredCombos());
        setFavoriteIds(getFavoriteCombos());
        setStats(getLastStats());
    }, []);

    const refreshProgress = () => {
        setPracticedIds(getPracticedCombos());
        setMasteredIds(getMasteredCombos());
        setFavoriteIds(getFavoriteCombos());
    };

    // Get recommended combos based on player stats
    const getRecommendedCombos = (): Combo[] => {
        if (!stats) {
            // Default recommendations for new users
            return combos.filter(c => c.difficulty === 'easy' && c.isTrueCombo).slice(0, 6);
        }

        // Filter combos that haven't been mastered yet
        const unmasteredCombos = combos.filter(c => !masteredIds.includes(c.id));

        // Prioritize combos for their main legend's weapons
        const mainLegendCombos = unmasteredCombos.filter(c =>
            c.legend.toLowerCase() === stats.mainLegend.toLowerCase()
        );

        // Add some variety with true combos they haven't practiced
        const unpracticedTrueCombos = unmasteredCombos.filter(c =>
            c.isTrueCombo && !practicedIds.includes(c.id)
        );

        // Combine and deduplicate
        const combined = [...mainLegendCombos, ...unpracticedTrueCombos];
        const unique = combined.filter((c, i) => combined.findIndex(x => x.id === c.id) === i);

        return unique.slice(0, 6);
    };

    const practicedCombos = combos.filter(c => practicedIds.includes(c.id) && !masteredIds.includes(c.id));
    const masteredCombos = combos.filter(c => masteredIds.includes(c.id));
    const favoriteCombos = combos.filter(c => favoriteIds.includes(c.id));
    const recommendedCombos = getRecommendedCombos();

    const handlePractice = (comboId: string) => {
        markAsPracticed(comboId);
        refreshProgress();
    };

    const handleMaster = (comboId: string) => {
        markAsMastered(comboId);
        refreshProgress();
    };

    const renderComboList = (comboList: Combo[], showActions = true) => {
        if (comboList.length === 0) {
            return (
                <div className="text-center py-12">
                    <div className="text-4xl mb-4">📭</div>
                    <p className="text-[var(--text-secondary)]">No combos yet</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {comboList.map((combo) => (
                    <div
                        key={combo.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--border-accent)] transition-all"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="badge badge-weapon text-xs">{combo.weapon}</span>
                                {combo.isTrueCombo && (
                                    <span className="badge badge-true-combo text-xs">True</span>
                                )}
                                {masteredIds.includes(combo.id) && (
                                    <span className="text-[var(--success)] text-sm">🏆</span>
                                )}
                            </div>
                            <h3 className="font-bold">{combo.name}</h3>
                            <p className="text-sm text-[var(--text-muted)]">{combo.legend}</p>
                            <div className="flex items-center gap-2 mt-2">
                                {combo.inputs.map((input, i) => (
                                    <span key={i} className="flex items-center gap-1 text-sm">
                                        <span className="bg-[var(--bg-elevated)] px-2 py-0.5 rounded text-[var(--accent)]">{input}</span>
                                        {i < combo.inputs.length - 1 && <span className="text-[var(--text-muted)]">→</span>}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {showActions && !masteredIds.includes(combo.id) && (
                            <div className="flex gap-2">
                                {!practicedIds.includes(combo.id) && (
                                    <button
                                        onClick={() => handlePractice(combo.id)}
                                        className="btn btn-outline py-2 px-4 text-sm"
                                    >
                                        Mark Practiced
                                    </button>
                                )}
                                <button
                                    onClick={() => handleMaster(combo.id)}
                                    className="btn btn-primary py-2 px-4 text-sm"
                                >
                                    ✓ Mastered
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen py-8 md:py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Personalized Training
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg">
                        Track your progress and follow personalized recommendations to improve your gameplay.
                    </p>
                </header>

                {/* Stats Connection Banner */}
                {!stats && (
                    <div className="card mb-8 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 border-[var(--accent)]">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold mb-1">Connect Your Stats</h2>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Analyze your Brawlhalla account for personalized combo recommendations
                                </p>
                            </div>
                            <Link href="/stats" className="btn btn-accent">
                                Analyze My Stats
                            </Link>
                        </div>
                    </div>
                )}

                {/* Progress Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="card text-center">
                        <div className="text-3xl font-bold text-[var(--accent)]">{combos.length}</div>
                        <div className="text-sm text-[var(--text-muted)]">Total Combos</div>
                    </div>
                    <div className="card text-center">
                        <div className="text-3xl font-bold text-[var(--warning)]">{practicedIds.length}</div>
                        <div className="text-sm text-[var(--text-muted)]">Practiced</div>
                    </div>
                    <div className="card text-center">
                        <div className="text-3xl font-bold text-[var(--success)]">{masteredIds.length}</div>
                        <div className="text-sm text-[var(--text-muted)]">Mastered</div>
                    </div>
                    <div className="card text-center">
                        <div className="text-3xl font-bold text-[var(--danger)]">{favoriteIds.length}</div>
                        <div className="text-sm text-[var(--text-muted)]">Favorites</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="card mb-8">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-[var(--text-secondary)]">Overall Progress</span>
                        <span className="font-bold text-[var(--accent)]">
                            {Math.round((masteredIds.length / combos.length) * 100)}%
                        </span>
                    </div>
                    <div className="h-4 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-500"
                            style={{ width: `${(masteredIds.length / combos.length) * 100}%` }}
                        />
                    </div>
                    <p className="text-sm text-[var(--text-muted)] mt-2">
                        {masteredIds.length} of {combos.length} combos mastered
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                        { id: 'recommended', label: 'Recommended', count: recommendedCombos.length },
                        { id: 'practiced', label: 'Practicing', count: practicedCombos.length },
                        { id: 'mastered', label: 'Mastered', count: masteredCombos.length },
                        { id: 'favorites', label: 'Favorites', count: favoriteCombos.length },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                    ? 'bg-[var(--accent)] text-[var(--bg-dark)]'
                                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                                }`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <section>
                    {activeTab === 'recommended' && (
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl">🎯</span>
                                <h2 className="text-xl font-bold">Recommended for You</h2>
                            </div>
                            <p className="text-[var(--text-secondary)] mb-6">
                                {stats
                                    ? `Based on your main legend (${stats.mainLegend}) and current skill level`
                                    : 'Start with these foundational true combos every player should know'
                                }
                            </p>
                            {renderComboList(recommendedCombos)}
                        </div>
                    )}

                    {activeTab === 'practiced' && (
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl">📝</span>
                                <h2 className="text-xl font-bold">Currently Practicing</h2>
                            </div>
                            {renderComboList(practicedCombos)}
                        </div>
                    )}

                    {activeTab === 'mastered' && (
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl">🏆</span>
                                <h2 className="text-xl font-bold">Mastered Combos</h2>
                            </div>
                            {renderComboList(masteredCombos, false)}
                        </div>
                    )}

                    {activeTab === 'favorites' && (
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl">❤️</span>
                                <h2 className="text-xl font-bold">Favorite Combos</h2>
                            </div>
                            {renderComboList(favoriteCombos)}
                        </div>
                    )}
                </section>

                {/* Browse More CTA */}
                <div className="text-center mt-12 pt-8 border-t border-[var(--border-subtle)]">
                    <p className="text-[var(--text-secondary)] mb-4">
                        Looking for more combos to practice?
                    </p>
                    <Link href="/combos" className="btn btn-primary">
                        Browse Full Combo Library
                    </Link>
                </div>
            </div>
        </div>
    );
}
