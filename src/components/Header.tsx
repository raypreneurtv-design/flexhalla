'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/combos"
                            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-semibold uppercase tracking-wide text-sm"
                        >
                            Combo Library
                        </Link>
                        <Link
                            href="/stats"
                            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-semibold uppercase tracking-wide text-sm"
                        >
                            Stats Lookup
                        </Link>
                        <Link
                            href="/training"
                            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-semibold uppercase tracking-wide text-sm"
                        >
                            Training
                        </Link>
                        <a
                            href="https://discord.gg/brawlhalla"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-accent text-sm py-2 px-5"
                        >
                            Join Discord
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-[var(--accent)] hover:text-[var(--text-primary)]"
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
                                href="/stats"
                                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-semibold uppercase tracking-wide py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Stats Lookup
                            </Link>
                            <Link
                                href="/training"
                                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-semibold uppercase tracking-wide py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Training
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
