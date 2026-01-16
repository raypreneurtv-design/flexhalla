'use client';

import { useState, useEffect } from 'react';
import { Combo } from '@/data/combos';
import {
    isPracticed,
    isMastered,
    isFavorite,
    markAsPracticed,
    markAsMastered,
    toggleFavorite
} from '@/lib/progress';

interface ComboCardProps {
    combo: Combo;
    onProgressChange?: () => void;
}

export default function ComboCard({ combo, onProgressChange }: ComboCardProps) {
    const [practiced, setPracticed] = useState(false);
    const [mastered, setMastered] = useState(false);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        setPracticed(isPracticed(combo.id));
        setMastered(isMastered(combo.id));
        setFavorite(isFavorite(combo.id));
    }, [combo.id]);

    const handlePractice = () => {
        markAsPracticed(combo.id);
        setPracticed(true);
        onProgressChange?.();
    };

    const handleMaster = () => {
        markAsMastered(combo.id);
        setMastered(true);
        setPracticed(true);
        onProgressChange?.();
    };

    const handleFavorite = () => {
        const newState = toggleFavorite(combo.id);
        setFavorite(newState);
        onProgressChange?.();
    };

    const difficultyStars = {
        easy: '⭐',
        medium: '⭐⭐',
        hard: '⭐⭐⭐',
    };

    const difficultyColors = {
        easy: 'difficulty-easy',
        medium: 'difficulty-medium',
        hard: 'difficulty-hard',
    };

    return (
        <article className="card group relative">
            {/* Favorite Button */}
            <button
                onClick={handleFavorite}
                className="absolute top-4 right-4 text-2xl hover:scale-125 transition-transform"
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                {favorite ? '❤️' : '🤍'}
            </button>

            {/* Header */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-weapon">{combo.weapon}</span>
                    {combo.isTrueCombo ? (
                        <span className="badge badge-true-combo">True Combo</span>
                    ) : (
                        <span className="badge badge-string">String</span>
                    )}
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {combo.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">{combo.legend}</p>
            </div>

            {/* Combo Notation */}
            <div className="mb-4 p-3 bg-[var(--bg-elevated)] rounded-lg border border-[var(--border-subtle)]">
                <div className="combo-notation flex-wrap">
                    {combo.inputs.map((input, index) => (
                        <span key={index} className="flex items-center gap-1">
                            <span className="combo-input">{input}</span>
                            {index < combo.inputs.length - 1 && (
                                <span className="combo-arrow">→</span>
                            )}
                        </span>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center gap-4">
                    <span className="text-[var(--text-secondary)]">
                        <span className="text-[var(--accent)] font-bold">{combo.damage}</span> DMG
                    </span>
                    <span className={difficultyColors[combo.difficulty]}>
                        {difficultyStars[combo.difficulty]}
                    </span>
                </div>
            </div>

            {/* Notes */}
            <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
                {combo.notes}
            </p>

            {/* Progress Buttons */}
            <div className="flex gap-2">
                {!mastered ? (
                    <>
                        <button
                            onClick={handlePractice}
                            disabled={practiced}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${practiced
                                    ? 'bg-[var(--primary)]/30 text-[var(--primary-light)] cursor-default'
                                    : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--primary)] hover:text-white'
                                }`}
                        >
                            {practiced ? '✓ Practiced' : 'Mark Practiced'}
                        </button>
                        <button
                            onClick={handleMaster}
                            className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--success)] hover:text-white transition-all"
                        >
                            Mark Mastered
                        </button>
                    </>
                ) : (
                    <div className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-[var(--success)]/30 text-[var(--success)] text-center">
                        🏆 Mastered!
                    </div>
                )}
            </div>
        </article>
    );
}
