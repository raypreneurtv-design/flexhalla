import Link from 'next/link';
import Image from 'next/image';
import { combos } from '@/data/combos';

export default function Home() {
  // Featured combos for homepage
  const featuredCombos = combos.slice(0, 3);

  return (
    <>
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
              Browse Combos
            </Link>
            <Link href="/stats" className="btn btn-primary text-lg py-4 px-8">
              Analyze My Stats
            </Link>
          </div>

          {/* Stats Preview */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center glass rounded-xl p-4">
              <div className="text-3xl md:text-4xl font-bold text-[var(--accent)]" style={{ fontFamily: 'Russo One, sans-serif' }}>{combos.length}+</div>
              <div className="text-sm text-[var(--text-muted)] uppercase tracking-wide">Combos</div>
            </div>
            <div className="text-center glass rounded-xl p-4">
              <div className="text-3xl md:text-4xl font-bold text-[var(--accent)]" style={{ fontFamily: 'Russo One, sans-serif' }}>13</div>
              <div className="text-sm text-[var(--text-muted)] uppercase tracking-wide">Weapons</div>
            </div>
            <div className="text-center glass rounded-xl p-4">
              <div className="text-3xl md:text-4xl font-bold text-[var(--accent)]" style={{ fontFamily: 'Russo One, sans-serif' }}>21+</div>
              <div className="text-sm text-[var(--text-muted)] uppercase tracking-wide">Legends</div>
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

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <article className="card text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-xl flex items-center justify-center text-3xl shadow-lg">
                📚
              </div>
              <h3 className="mb-3">Combo Library</h3>
              <p className="text-[var(--text-secondary)]">
                Browse verified combos organized by weapon, legend, and difficulty. Filter by true combos or strings.
              </p>
            </article>

            {/* Feature 2 */}
            <article className="card text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] rounded-xl flex items-center justify-center text-3xl shadow-lg">
                📊
              </div>
              <h3 className="mb-3">Stats Analysis</h3>
              <p className="text-[var(--text-secondary)]">
                Connect your Brawlhalla account and get a detailed breakdown of your strengths, weaknesses, and win rates.
              </p>
            </article>

            {/* Feature 3 */}
            <article className="card text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--teal)] to-emerald-600 rounded-xl flex items-center justify-center text-3xl shadow-lg">
                🎯
              </div>
              <h3 className="mb-3">Personalized Training</h3>
              <p className="text-[var(--text-secondary)]">
                Get custom combo recommendations based on your main legends and playstyle. Track what you&apos;ve mastered.
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
                True Combos by Legend
              </h2>
              <p className="text-[var(--text-secondary)]">
                Start with these fundamental combos every player should know
              </p>
            </div>
            <Link href="/combos" className="btn btn-outline hidden md:inline-flex">
              View All Combos
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredCombos.map((combo) => (
              <article key={combo.id} className="card">
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

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">
                    <span className="text-[var(--accent)] font-bold">{combo.damage}</span> DMG
                  </span>
                  <span className="difficulty-easy">⭐ Easy</span>
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

      {/* CTA Section */}
      <section className="py-20 glass border-y border-[var(--border-accent)]">
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

      {/* Verification Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              Community-Verified Combos
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
              Every combo in our library is verified by experienced players in our Discord community.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 card">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] rounded-full flex items-center justify-center text-xl font-bold text-[#1a1a2e]" style={{ fontFamily: 'Russo One, sans-serif' }}>
                1
              </div>
              <h3 className="mb-2">Submit</h3>
              <p className="text-sm text-[var(--text-muted)]">Share your combo with notation and video proof</p>
            </div>
            <div className="text-center p-6 card">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] rounded-full flex items-center justify-center text-xl font-bold text-[#1a1a2e]" style={{ fontFamily: 'Russo One, sans-serif' }}>
                2
              </div>
              <h3 className="mb-2">Review</h3>
              <p className="text-sm text-[var(--text-muted)]">Community mods test and verify the combo</p>
            </div>
            <div className="text-center p-6 card">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] rounded-full flex items-center justify-center text-xl font-bold text-[#1a1a2e]" style={{ fontFamily: 'Russo One, sans-serif' }}>
                3
              </div>
              <h3 className="mb-2">Label</h3>
              <p className="text-sm text-[var(--text-muted)]">Tagged as True Combo or String with difficulty</p>
            </div>
            <div className="text-center p-6 card">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] rounded-full flex items-center justify-center text-xl font-bold text-[#1a1a2e]" style={{ fontFamily: 'Russo One, sans-serif' }}>
                4
              </div>
              <h3 className="mb-2">Published</h3>
              <p className="text-sm text-[var(--text-muted)]">Added to the library for all players</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="https://discord.gg/brawlhalla"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Submit a Combo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
