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
import {
    getPersonalizedRecommendations,
    analyzeWeaknesses,
    WeaknessAnalysis,
    RecommendationResult
} from '@/lib/recommendations';

export default function TrainingPage() {
    const [practicedIds, setPracticedIds] = useState<string[]>([]);
    const [masteredIds, setMasteredIds] = useState<string[]>([]);
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    const [stats, setStats] = useState<PlayerStats | null>(null);
    const [weaknesses, setWeaknesses] = useState<WeaknessAnalysis[]>([]);
    const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
    const [activeTab, setActiveTab] = useState<'recommended' | 'practiced' | 'mastered' | 'favorites'>('recommended');

    useEffect(() => {
        const practiced = getPracticedCombos();
        const mastered = getMasteredCombos();
        const favorites = getFavoriteCombos();
        const playerStats = getLastStats();

        setPracticedIds(practiced);
        setMasteredIds(mastered);
        setFavoriteIds(favorites);
        setStats(playerStats);

        if (playerStats) {
            setWeaknesses(analyzeWeaknesses(playerStats));
        }

        setRecommendations(getPersonalizedRecommendations(playerStats, mastered, practiced));
    }, []);

    const refreshProgress = () => {
        const practiced = getPracticedCombos();
        const mastered = getMasteredCombos();
        setPracticedIds(practiced);
        setMasteredIds(mastered);
        setFavoriteIds(getFavoriteCombos());
        setRecommendations(getPersonalizedRecommendations(stats, mastered, practiced));
    };

    const practicedCombos = combos.filter(c => practicedIds.includes(c.id) && !masteredIds.includes(c.id));
    const masteredCombos = combos.filter(c => masteredIds.includes(c.id));
    const favoriteCombos = combos.filter(c => favoriteIds.includes(c.id));

    // Flatten recommendations for the recommended tab
    const allRecommendedCombos = recommendations.flatMap(r => r.combos);
    const uniqueRecommendedCombos = allRecommendedCombos.filter(
        (combo, index) => allRecommendedCombos.findIndex(c => c.id === combo.id) === index
    );

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
                {comboList.map((combo, index) => (
                    <div
                        key={combo.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--border-accent)] transition-all animate-slide-up"
                        style={{ animationDelay: `${index * 30}ms` }}
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
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
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                {combo.inputs.map((input, i) => (
                                    <span key={i} className="flex items-center gap-1 text-sm">
                                        <span className="bg-[var(--bg-elevated)] px-2 py-0.5 rounded text-[var(--accent)]">{input}</span>
                                        {i < combo.inputs.length - 1 && <span className="text-[var(--text-muted)]">→</span>}
                                    </span>
                                ))}
                            </div>
                            {/* Tags */}
                            {combo.tags && combo.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {combo.tags.slice(0, 2).map(tag => (
                                        <span
                                            key={tag}
                                            className="text-xs px-1.5 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary-light)]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {showActions && !masteredIds.includes(combo.id) && (
                            <div className="flex gap-2">
                                {!practicedIds.includes(combo.id) && (
                                    <button
                                        onClick={() => handlePractice(combo.id)}
                                        className="btn btn-outline py-2 px-4 text-sm btn-pulse"
                                    >
                                        Mark Practiced
                                    </button>
                                )}
                                <button
                                    onClick={() => handleMaster(combo.id)}
                                    className="btn btn-primary py-2 px-4 text-sm btn-pulse"
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
                    <div className="card mb-8 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 border-[var(--accent)] animate-slide-up">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold mb-1">Connect Your Stats</h2>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Analyze your Brawlhalla account for personalized combo recommendations based on your weaknesses
                                </p>
                            </div>
                            <Link href="/stats" className="btn btn-accent">
                                Analyze My Stats
                            </Link>
                        </div>
                    </div>
                )}

                {/* Weakness Summary (if stats connected) */}
                {stats && weaknesses.length > 0 && (
                    <div className="card mb-8 bg-gradient-to-r from-[var(--bg-card)] to-[var(--primary)]/10 animate-slide-up">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold">Your Focus Areas</h2>
                            <Link href="/stats" className="text-sm text-[var(--accent)] hover:underline">
                                View full analysis →
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {weaknesses.filter(w => w.severity !== 'low').map(weakness => (
                                <div
                                    key={weakness.category}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)]"
                                >
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{
                                            backgroundColor: weakness.severity === 'high' ? 'var(--danger)' : 'var(--warning)'
                                        }}
                                    />
                                    <span className="text-sm font-medium">{weakness.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Progress Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="card text-center animate-slide-up" style={{ animationDelay: '50ms' }}>
                        <div className="text-3xl font-bold text-[var(--accent)]">{combos.length}</div>
                        <div className="text-sm text-[var(--text-muted)]">Total Combos</div>
                    </div>
                    <div className="card text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <div className="text-3xl font-bold text-[var(--warning)]">{practicedIds.length}</div>
                        <div className="text-sm text-[var(--text-muted)]">Practiced</div>
                    </div>
                    <div className="card text-center animate-slide-up" style={{ animationDelay: '150ms' }}>
                        <div className="text-3xl font-bold text-[var(--success)]">{masteredIds.length}</div>
                        <div className="text-sm text-[var(--text-muted)]">Mastered</div>
                    </div>
                    <div className="card text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <div className="text-3xl font-bold text-[var(--danger)]">{favoriteIds.length}</div>
                        <div className="text-sm text-[var(--text-muted)]">Favorites</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="card mb-8 animate-slide-up" style={{ animationDelay: '250ms' }}>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-[var(--text-secondary)]">Overall Progress</span>
                        <span className="font-bold text-[var(--accent)]">
                            {Math.round((masteredIds.length / combos.length) * 100)}%
                        </span>
                    </div>
                    <div className="h-4 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-500 animate-xp-fill"
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
                        { id: 'recommended', label: 'Recommended', count: uniqueRecommendedCombos.length },
                        { id: 'practiced', label: 'Practicing', count: practicedCombos.length },
                        { id: 'mastered', label: 'Mastered', count: masteredCombos.length },
                        { id: 'favorites', label: 'Favorites', count: favoriteCombos.length },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all btn-pulse ${activeTab === tab.id
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
                            {recommendations.length > 0 ? (
                                <div className="space-y-8">
                                    {recommendations.map((rec, idx) => (
                                        <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-2xl">
                                                    {idx === 0 ? '🎯' : idx === 1 ? '📈' : idx === 2 ? '💪' : '🔄'}
                                                </span>
                                                <div>
                                                    <h2 className="text-lg font-bold">{rec.reason}</h2>
                                                    <p className="text-sm text-[var(--text-muted)]">
                                                        {rec.combos.length} combo{rec.combos.length !== 1 ? 's' : ''} recommended
                                                    </p>
                                                </div>
                                            </div>
                                            {renderComboList(rec.combos)}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🏆</div>
                                    <h2 className="text-xl font-bold mb-2">All caught up!</h2>
                                    <p className="text-[var(--text-secondary)]">
                                        You&apos;ve mastered all available combos. Check back soon for new content!
                                    </p>
                                </div>
                            )}
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
