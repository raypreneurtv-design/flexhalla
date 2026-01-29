'use client';

import { useState, useMemo } from 'react';
import { combos, filterCombos } from '@/data/combos';
import ComboCard from '@/components/ComboCard';
import ComboFilters from '@/components/ComboFilters';

export default function CombosPage() {
    const [filters, setFilters] = useState({
        weapon: '',
        legend: '',
        difficulty: '',
        trueComboOnly: false,
        search: '',
    });

    const [, setRefreshKey] = useState(0);

    const filteredCombos = useMemo(() => {
        return filterCombos({
            weapon: filters.weapon || undefined,
            legend: filters.legend || undefined,
            difficulty: filters.difficulty || undefined,
            trueComboOnly: filters.trueComboOnly,
            search: filters.search || undefined,
        });
    }, [filters]);

    const handleProgressChange = () => {
        setRefreshKey(k => k + 1);
    };

    return (
        <div className="min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Brawlhalla Combos
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg max-w-3xl">
                        Browse our community-verified combo library. Filter by weapon, legend, or difficulty
                        to find the perfect combos for your playstyle.
                    </p>
                </header>

                {/* Filters */}
                <ComboFilters filters={filters} onFilterChange={setFilters} />

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-[var(--text-secondary)]">
                        Showing <span className="text-[var(--accent)] font-bold">{filteredCombos.length}</span> combos
                    </p>
                    <div className="flex gap-2 text-sm">
                        <span className="badge badge-true-combo">True Combo</span>
                        <span className="badge badge-string">String</span>
                    </div>
                </div>

                {/* Combo Grid */}
                {filteredCombos.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCombos.map((combo, index) => (
                            <ComboCard
                                key={combo.id}
                                combo={combo}
                                onProgressChange={handleProgressChange}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h2 className="text-xl font-bold mb-2">No combos found</h2>
                        <p className="text-[var(--text-secondary)] mb-6">
                            Try adjusting your filters or search query
                        </p>
                        <button
                            onClick={() => setFilters({
                                weapon: '',
                                legend: '',
                                difficulty: '',
                                trueComboOnly: false,
                                search: '',
                            })}
                            className="btn btn-outline"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Legend Quick Links */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">Browse by Weapon</h2>
                    <div className="flex flex-wrap gap-3">
                        {['Sword', 'Hammer', 'Spear', 'Gauntlets', 'Katars', 'Bow', 'Axe', 'Blasters', 'Scythe', 'Lance', 'Cannon', 'Orb', 'Greatsword'].map((weapon) => (
                            <button
                                key={weapon}
                                onClick={() => setFilters({ ...filters, weapon })}
                                className={`px-4 py-2 rounded-lg transition-all ${filters.weapon === weapon
                                        ? 'bg-[var(--accent)] text-[var(--bg-dark)]'
                                        : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]'
                                    }`}
                            >
                                {weapon}
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
