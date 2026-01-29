'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { saveStats, getLastStats, PlayerStats, clearStats, getMasteredCombos } from '@/lib/progress';
import { analyzeWeaknesses, WeaknessAnalysis, getWeaponMasteryStats } from '@/lib/recommendations';

// Mock player data for demonstration
const mockPlayerData: Record<string, PlayerStats> = {
    'demo': {
        brawlhallaId: '12345678',
        name: 'DemoPlayer',
        rank: 'Platinum',
        elo: 1856,
        peakElo: 1923,
        wins: 487,
        losses: 392,
        mainLegend: 'Orion',
        legendWinRates: {
            'Orion': 58,
            'Bodvar': 52,
            'Hattori': 61,
            'Teros': 45,
            'Val': 55,
        },
        fetchedAt: new Date().toISOString(),
    },
    'newbie': {
        brawlhallaId: '87654321',
        name: 'NewPlayer',
        rank: 'Silver',
        elo: 1350,
        peakElo: 1420,
        wins: 89,
        losses: 112,
        mainLegend: 'Bodvar',
        legendWinRates: {
            'Bodvar': 44,
            'Hattori': 38,
        },
        fetchedAt: new Date().toISOString(),
    },
    'pro': {
        brawlhallaId: '11111111',
        name: 'ProPlayer',
        rank: 'Diamond',
        elo: 2150,
        peakElo: 2234,
        wins: 1243,
        losses: 876,
        mainLegend: 'Mordex',
        legendWinRates: {
            'Mordex': 62,
            'Nix': 58,
            'Artemis': 55,
            'Val': 54,
        },
        fetchedAt: new Date().toISOString(),
    },
};

export default function StatsPage() {
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [stats, setStats] = useState<PlayerStats | null>(null);
    const [weaknesses, setWeaknesses] = useState<WeaknessAnalysis[]>([]);
    const [weaponStats, setWeaponStats] = useState<Record<string, { mastered: number; total: number; percentage: number }>>({});

    useEffect(() => {
        const saved = getLastStats();
        if (saved) {
            setStats(saved);
            setWeaknesses(analyzeWeaknesses(saved));
        }
        setWeaponStats(getWeaponMasteryStats(getMasteredCombos()));
    }, []);

    const handleLookup = async () => {
        if (!searchInput.trim()) {
            setError('Please enter a Brawlhalla ID or username');
            return;
        }

        setIsLoading(true);
        setError('');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Check for mock data or generate random stats
        const mockStats = mockPlayerData[searchInput.toLowerCase()] || {
            brawlhallaId: Math.random().toString().slice(2, 10),
            name: searchInput,
            rank: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'][Math.floor(Math.random() * 5)],
            elo: 1200 + Math.floor(Math.random() * 800),
            peakElo: 1400 + Math.floor(Math.random() * 800),
            wins: 100 + Math.floor(Math.random() * 500),
            losses: 100 + Math.floor(Math.random() * 400),
            mainLegend: ['Orion', 'Bodvar', 'Hattori', 'Teros', 'Val', 'Mordex', 'Nix'][Math.floor(Math.random() * 7)],
            legendWinRates: {
                'Orion': 45 + Math.floor(Math.random() * 20),
                'Bodvar': 45 + Math.floor(Math.random() * 20),
                'Hattori': 45 + Math.floor(Math.random() * 20),
            },
            fetchedAt: new Date().toISOString(),
        };

        setStats(mockStats);
        setWeaknesses(analyzeWeaknesses(mockStats));
        saveStats(mockStats);
        setIsLoading(false);
    };

    const handleClear = () => {
        setStats(null);
        setWeaknesses([]);
        setSearchInput('');
        clearStats();
    };

    const getRankColor = (rank: string) => {
        const colors: Record<string, string> = {
            'Bronze': '#cd7f32',
            'Silver': '#c0c0c0',
            'Gold': '#ffd700',
            'Platinum': '#00d9ff',
            'Diamond': '#b9f2ff',
            'Valhallan': '#ff6b6b',
        };
        return colors[rank] || 'var(--text-primary)';
    };

    const getSeverityColor = (severity: WeaknessAnalysis['severity']) => {
        switch (severity) {
            case 'high': return 'var(--danger)';
            case 'medium': return 'var(--warning)';
            case 'low': return 'var(--success)';
        }
    };

    const getSeverityBorder = (severity: WeaknessAnalysis['severity']) => {
        switch (severity) {
            case 'high': return 'border-[var(--danger)]';
            case 'medium': return 'border-[var(--warning)]';
            case 'low': return 'border-[var(--success)]';
        }
    };

    const winRate = stats ? Math.round((stats.wins / (stats.wins + stats.losses)) * 100) : 0;

    return (
        <div className="min-h-screen py-8 md:py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Brawlhalla Stats Analysis
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                        Analyze your gameplay stats to discover strengths and weaknesses.
                        Get personalized training recommendations based on your performance.
                    </p>
                </header>

                {/* Search Box */}
                <div className="card mb-8 animate-slide-up">
                    <label htmlFor="player-search" className="block text-lg font-semibold mb-4">
                        Look Up Player Stats
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            id="player-search"
                            type="text"
                            placeholder="Enter Brawlhalla ID or Steam username..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                            className="flex-1 px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] transition-colors"
                        />
                        <button
                            onClick={handleLookup}
                            disabled={isLoading}
                            className="btn btn-accent py-3 px-6 min-w-[160px]"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Searching...
                                </span>
                            ) : (
                                'Analyze My Stats'
                            )}
                        </button>
                    </div>
                    {error && (
                        <p className="mt-3 text-[var(--danger)] text-sm">{error}</p>
                    )}
                    <p className="mt-3 text-[var(--text-muted)] text-sm">
                        Try: &quot;demo&quot; (Platinum), &quot;newbie&quot; (Silver), or &quot;pro&quot; (Diamond) for sample data
                    </p>
                </div>

                {/* Stats Display */}
                {stats && (
                    <div className="space-y-6">
                        {/* Player Overview */}
                        <section className="card animate-slide-up" style={{ animationDelay: '50ms' }}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold">{stats.name}</h2>
                                    <p className="text-[var(--text-muted)]">ID: {stats.brawlhallaId}</p>
                                </div>
                                <button
                                    onClick={handleClear}
                                    className="text-sm text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors"
                                >
                                    Clear data
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-[var(--bg-elevated)] rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold" style={{ color: getRankColor(stats.rank) }}>
                                        {stats.rank}
                                    </div>
                                    <div className="text-sm text-[var(--text-muted)]">Current Rank</div>
                                </div>
                                <div className="bg-[var(--bg-elevated)] rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-[var(--accent)]">{stats.elo}</div>
                                    <div className="text-sm text-[var(--text-muted)]">Current Elo</div>
                                </div>
                                <div className="bg-[var(--bg-elevated)] rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-[var(--primary-light)]">{stats.peakElo}</div>
                                    <div className="text-sm text-[var(--text-muted)]">Peak Elo</div>
                                </div>
                                <div className="bg-[var(--bg-elevated)] rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold" style={{ color: winRate >= 50 ? 'var(--success)' : 'var(--danger)' }}>
                                        {winRate}%
                                    </div>
                                    <div className="text-sm text-[var(--text-muted)]">Win Rate</div>
                                </div>
                            </div>
                        </section>

                        {/* Win/Loss Breakdown */}
                        <section className="card animate-slide-up" style={{ animationDelay: '100ms' }}>
                            <h3 className="text-xl font-bold mb-4">Match History</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-[var(--success)]">Wins: {stats.wins}</span>
                                        <span className="text-[var(--danger)]">Losses: {stats.losses}</span>
                                    </div>
                                    <div className="h-4 bg-[var(--danger)] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[var(--success)] transition-all animate-xp-fill"
                                            style={{ width: `${winRate}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Total games played: <span className="font-bold">{stats.wins + stats.losses}</span>
                            </p>
                        </section>

                        {/* Legend Win Rates */}
                        <section className="card animate-slide-up" style={{ animationDelay: '150ms' }}>
                            <h3 className="text-xl font-bold mb-4">Legend Performance</h3>
                            <div className="space-y-3">
                                {Object.entries(stats.legendWinRates).map(([legend, rate]) => (
                                    <div key={legend} className="flex items-center gap-4">
                                        <span className="w-20 text-sm font-medium">{legend}</span>
                                        <div className="flex-1 h-3 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all animate-xp-fill"
                                                style={{
                                                    width: `${rate}%`,
                                                    backgroundColor: rate >= 55 ? 'var(--success)' : rate >= 50 ? 'var(--warning)' : 'var(--danger)',
                                                    animationDelay: '0.3s'
                                                }}
                                            />
                                        </div>
                                        <span className="w-12 text-right text-sm font-bold">{rate}%</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-[var(--text-muted)] mt-4">
                                Main: <span className="text-[var(--accent)] font-bold">{stats.mainLegend}</span>
                            </p>
                        </section>

                        {/* Dynamic Weakness Analysis */}
                        <section className="card bg-gradient-to-br from-[var(--bg-card)] to-[var(--primary)]/10 animate-slide-up" style={{ animationDelay: '200ms' }}>
                            <h3 className="text-xl font-bold mb-4">Weakness Scanner</h3>
                            <div className="space-y-4">
                                {weaknesses.map((weakness, index) => (
                                    <div
                                        key={weakness.category}
                                        className={`p-4 bg-[var(--bg-elevated)] rounded-lg border-l-4 ${getSeverityBorder(weakness.severity)} animate-slide-up`}
                                        style={{ animationDelay: `${250 + index * 50}ms` }}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-bold" style={{ color: getSeverityColor(weakness.severity) }}>
                                                {weakness.title}
                                            </h4>
                                            <span
                                                className="text-xs px-2 py-0.5 rounded-full uppercase font-bold"
                                                style={{
                                                    backgroundColor: `${getSeverityColor(weakness.severity)}20`,
                                                    color: getSeverityColor(weakness.severity)
                                                }}
                                            >
                                                {weakness.severity}
                                            </span>
                                        </div>
                                        <p className="text-sm text-[var(--text-secondary)] mb-2">
                                            {weakness.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {weakness.recommendedTags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/20 text-[var(--primary-light)]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href="/training" className="btn btn-accent w-full mt-6">
                                Start Training Based on Analysis
                            </Link>
                        </section>

                        {/* Weapon Mastery Overview */}
                        <section className="card animate-slide-up" style={{ animationDelay: '300ms' }}>
                            <h3 className="text-xl font-bold mb-4">Your Combo Mastery</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {Object.entries(weaponStats).map(([weapon, stat]) => (
                                    <div
                                        key={weapon}
                                        className="bg-[var(--bg-elevated)] rounded-lg p-3 text-center"
                                    >
                                        <div className="text-sm font-medium text-[var(--text-secondary)] mb-1">{weapon}</div>
                                        <div className="text-lg font-bold" style={{
                                            color: stat.percentage === 100 ? 'var(--success)' :
                                                   stat.percentage > 50 ? 'var(--warning)' :
                                                   stat.percentage > 0 ? 'var(--accent)' : 'var(--text-muted)'
                                        }}>
                                            {stat.mastered}/{stat.total}
                                        </div>
                                        <div className="text-xs text-[var(--text-muted)]">{stat.percentage}%</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* Empty State */}
                {!stats && !isLoading && (
                    <div className="text-center py-16 animate-slide-up">
                        <div className="text-6xl mb-4">📊</div>
                        <h2 className="text-xl font-bold mb-2">No stats loaded</h2>
                        <p className="text-[var(--text-secondary)] mb-6">
                            Enter your Brawlhalla ID above to analyze your gameplay
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
