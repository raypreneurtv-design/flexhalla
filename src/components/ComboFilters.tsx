'use client';

import { weapons, difficulties } from '@/data/combos';
import { legends } from '@/data/legends';

interface ComboFiltersProps {
    filters: {
        weapon: string;
        legend: string;
        difficulty: string;
        trueComboOnly: boolean;
        search: string;
    };
    onFilterChange: (filters: ComboFiltersProps['filters']) => void;
}

export default function ComboFilters({ filters, onFilterChange }: ComboFiltersProps) {
    const handleChange = (key: keyof typeof filters, value: string | boolean) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const clearFilters = () => {
        onFilterChange({
            weapon: '',
            legend: '',
            difficulty: '',
            trueComboOnly: false,
            search: '',
        });
    };

    const hasActiveFilters = filters.weapon || filters.legend || filters.difficulty || filters.trueComboOnly || filters.search;

    return (
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 md:p-6 mb-8">
            {/* Search */}
            <div className="mb-4">
                <label htmlFor="combo-search" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Search Combos
                </label>
                <input
                    id="combo-search"
                    type="text"
                    placeholder="Search by name, legend, or input..."
                    value={filters.search}
                    onChange={(e) => handleChange('search', e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] transition-colors"
                />
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Weapon Filter */}
                <div>
                    <label htmlFor="weapon-filter" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Weapon
                    </label>
                    <select
                        id="weapon-filter"
                        value={filters.weapon}
                        onChange={(e) => handleChange('weapon', e.target.value)}
                        className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:border-[var(--accent)] transition-colors cursor-pointer"
                    >
                        <option value="">All Weapons</option>
                        {weapons.map((weapon) => (
                            <option key={weapon} value={weapon}>
                                {weapon}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Legend Filter */}
                <div>
                    <label htmlFor="legend-filter" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Legend
                    </label>
                    <select
                        id="legend-filter"
                        value={filters.legend}
                        onChange={(e) => handleChange('legend', e.target.value)}
                        className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:border-[var(--accent)] transition-colors cursor-pointer"
                    >
                        <option value="">All Legends</option>
                        {legends.map((legend) => (
                            <option key={legend.id} value={legend.name}>
                                {legend.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                    <label htmlFor="difficulty-filter" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Difficulty
                    </label>
                    <select
                        id="difficulty-filter"
                        value={filters.difficulty}
                        onChange={(e) => handleChange('difficulty', e.target.value)}
                        className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:border-[var(--accent)] transition-colors cursor-pointer"
                    >
                        <option value="">All Difficulties</option>
                        {difficulties.map((diff) => (
                            <option key={diff} value={diff}>
                                {diff.charAt(0).toUpperCase() + diff.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* True Combo Toggle */}
                <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Combo Type
                    </label>
                    <button
                        onClick={() => handleChange('trueComboOnly', !filters.trueComboOnly)}
                        className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${filters.trueComboOnly
                                ? 'bg-[var(--success)] text-white'
                                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent)]'
                            }`}
                    >
                        {filters.trueComboOnly ? '✓ True Combos Only' : 'Show All Types'}
                    </button>
                </div>
            </div>

            {/* Clear Button */}
            {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className="text-sm text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors"
                >
                    ✕ Clear all filters
                </button>
            )}
        </div>
    );
}
