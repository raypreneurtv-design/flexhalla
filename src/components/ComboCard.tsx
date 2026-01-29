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
import VideoModal from './VideoModal';

interface ComboCardProps {
    combo: Combo;
    onProgressChange?: () => void;
    index?: number;
}

export default function ComboCard({ combo, onProgressChange, index = 0 }: ComboCardProps) {
    const [practiced, setPracticed] = useState(false);
    const [mastered, setMastered] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setPracticed(isPracticed(combo.id));
        setMastered(isMastered(combo.id));
        setFavorite(isFavorite(combo.id));
    }, [combo.id]);

    const handlePractice = () => {
        setIsAnimating(true);
        markAsPracticed(combo.id);
        setPracticed(true);
        onProgressChange?.();
        setTimeout(() => setIsAnimating(false), 300);
    };

    const handleMaster = () => {
        setIsAnimating(true);
        markAsMastered(combo.id);
        setMastered(true);
        setPracticed(true);
        onProgressChange?.();
        setTimeout(() => setIsAnimating(false), 300);
    };

    const handleFavorite = () => {
        const newState = toggleFavorite(combo.id);
        setFavorite(newState);
        onProgressChange?.();
    };

    const difficultyStars = {
        easy: '1',
        medium: '2',
        hard: '3',
    };

    const difficultyColors = {
        easy: 'difficulty-easy',
        medium: 'difficulty-medium',
        hard: 'difficulty-hard',
    };

    const tagLabels: Record<string, string> = {
        'starter': 'Starter',
        'punish': 'Punish',
        'kill-confirm': 'Kill Confirm',
        'edge-guard': 'Edge Guard',
        'string-extension': 'String Extension',
        'aerial': 'Aerial',
        'grounded': 'Grounded',
        'recovery-punish': 'Recovery Punish'
    };

    return (
        <>
            <article
                className="card group relative animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
            >
                {/* Top Row - Favorite & Video Buttons */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    {combo.videoUrl && (
                        <button
                            onClick={() => setShowVideo(true)}
                            className="p-2 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-[var(--danger)]/20 transition-all btn-pulse"
                            aria-label="Watch video tutorial"
                            title="Watch tutorial"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </button>
                    )}
                    <button
                        onClick={handleFavorite}
                        className="text-2xl hover:scale-125 transition-transform btn-pulse"
                        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {favorite ? '❤️' : '🤍'}
                    </button>
                </div>

                {/* Header */}
                <div className="mb-4 pr-20">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
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

                {/* Tags */}
                {combo.tags && combo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {combo.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/20 text-[var(--primary-light)] border border-[var(--primary)]/30"
                            >
                                {tagLabels[tag] || tag}
                            </span>
                        ))}
                        {combo.tags.length > 3 && (
                            <span className="text-xs px-2 py-0.5 text-[var(--text-muted)]">
                                +{combo.tags.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-4">
                        <span className="text-[var(--text-secondary)]">
                            <span className="text-[var(--accent)] font-bold">{combo.damage}</span> DMG
                        </span>
                        <span className={`flex items-center gap-1 ${difficultyColors[combo.difficulty]}`}>
                            {Array.from({ length: parseInt(difficultyStars[combo.difficulty]) }).map((_, i) => (
                                <span key={i}>★</span>
                            ))}
                            <span className="text-xs ml-1 capitalize">{combo.difficulty}</span>
                        </span>
                    </div>
                </div>

                {/* Notes */}
                <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
                    {combo.notes}
                </p>

                {/* Progress Buttons */}
                <div className={`flex gap-2 ${isAnimating ? 'animate-pulse' : ''}`}>
                    {!mastered ? (
                        <>
                            <button
                                onClick={handlePractice}
                                disabled={practiced}
                                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all btn-pulse ${practiced
                                        ? 'bg-[var(--primary)]/30 text-[var(--primary-light)] cursor-default'
                                        : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--primary)] hover:text-white'
                                    }`}
                            >
                                {practiced ? '✓ Practiced' : 'Mark Practiced'}
                            </button>
                            <button
                                onClick={handleMaster}
                                className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--success)] hover:text-white transition-all btn-pulse"
                            >
                                Mark Mastered
                            </button>
                        </>
                    ) : (
                        <div className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-[var(--success)]/30 text-[var(--success)] text-center animate-bounce-once">
                            🏆 Mastered!
                        </div>
                    )}
                </div>
            </article>

            {/* Video Modal */}
            {combo.videoUrl && (
                <VideoModal
                    videoUrl={combo.videoUrl}
                    title={`${combo.name} - ${combo.legend}`}
                    isOpen={showVideo}
                    onClose={() => setShowVideo(false)}
                />
            )}
        </>
    );
}
