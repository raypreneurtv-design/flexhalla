import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[var(--bg-dark)] border-t border-[var(--border-subtle)] mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-lg flex items-center justify-center text-2xl">
                                💪
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-[var(--primary-light)] to-[var(--accent)] bg-clip-text text-transparent">
                                Flexhalla
                            </span>
                        </Link>
                        <p className="text-[var(--text-secondary)] text-sm max-w-md mb-4">
                            AI-powered Brawlhalla training companion. Analyze your stats, discover your weaknesses,
                            and master combos with personalized recommendations.
                        </p>
                        <a
                            href="https://discord.gg/brawlhalla"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary text-sm py-2 px-4"
                        >
                            Join Our Discord
                        </a>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-[var(--text-primary)] font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/combos" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-sm">
                                    Combo Library
                                </Link>
                            </li>
                            <li>
                                <Link href="/stats" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-sm">
                                    Stats Lookup
                                </Link>
                            </li>
                            <li>
                                <Link href="/training" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-sm">
                                    Training Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="text-[var(--text-primary)] font-semibold mb-4">Community</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://discord.gg/brawlhalla"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-sm"
                                >
                                    Discord Server
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#submit-combo"
                                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-sm"
                                >
                                    Submit a Combo
                                </a>
                            </li>
                            <li>
                                <span className="text-[var(--text-muted)] text-sm">
                                    Verification Process
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[var(--text-muted)] text-sm">
                        © 2026 Flexhalla. Not affiliated with Blue Mammoth Games.
                    </p>
                    <p className="text-[var(--text-muted)] text-sm">
                        Brawlhalla is a trademark of Blue Mammoth Games.
                    </p>
                </div>
            </div>
        </footer>
    );
}
