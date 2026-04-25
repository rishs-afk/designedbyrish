import Link from 'next/link';

const highlights = [
  {
    title: 'Isolated deployment',
    body: 'This proposal can ship from the same repository without inheriting the main site structure or routes.'
  },
  {
    title: 'Path-aware routing',
    body: 'The app is configured with a base path so it resolves cleanly at /proposals/discover-tomorrow.'
  },
  {
    title: 'Simple handoff',
    body: 'The folder is self-contained, which makes it easy to build, review, and deploy separately.'
  }
];

const milestones = [
  'Outline the core narrative and visual direction.',
  'Add sections, interactions, and content blocks as the proposal evolves.',
  'Deploy the finished proposal without affecting the main marketing site.'
];

export default function Home() {
  return (
    <main className="page-shell">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="grid-noise" />

      <header className="topbar">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          <span>Discover Tomorrow</span>
        </Link>
        <nav className="topnav" aria-label="Section links">
          <a href="#scope">Scope</a>
          <a href="#stack">Stack</a>
          <a href="#delivery">Delivery</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Proposal workspace / Next.js / isolated route</p>
          <h1>Built to live at designedbyrish.com/proposals/discover-tomorrow.</h1>
          <p className="lede">
            This project is a standalone Next.js app inside the same GitHub repository.
            It does not hook into the main site structure, and its base path is set so
            the deployed URL matches the proposal route exactly.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#scope">
              Review the scope
            </a>
            <a className="button button-secondary" href="#delivery">
              See delivery notes
            </a>
          </div>
        </div>

        <aside className="hero-card" aria-label="Deployment summary">
          <p className="card-label">Deployment target</p>
          <h2>Same repo. Separate app. One clean URL.</h2>
          <p className="card-copy">
            The proposal can be developed independently while still deploying under the
            designedbyrish.com domain.
          </p>
          <dl className="stat-grid">
            <div>
              <dt>Base path</dt>
              <dd>/proposals/discover-tomorrow</dd>
            </div>
            <div>
              <dt>Framework</dt>
              <dd>Next.js App Router</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>Standalone proposal</dd>
            </div>
            <div>
              <dt>Host impact</dt>
              <dd>None on the main site</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="section" id="scope">
        <div className="section-heading">
          <p className="eyebrow">Scope</p>
          <h2>Designed to stay separate from the existing site.</h2>
        </div>
        <div className="cards-grid">
          {highlights.map((item) => (
            <article className="info-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="stack">
        <div className="section-heading">
          <p className="eyebrow">Stack</p>
          <h2>A minimal setup that is easy to grow.</h2>
          <p className="section-copy">
            The scaffold uses Next.js, TypeScript, and a single app directory so the
            proposal can evolve without needing any changes to the main site.
          </p>
        </div>
        <div className="feature-panel">
          <div>
            <p className="panel-kicker">What is included</p>
            <ul className="checklist">
              <li>Base-path aware routing.</li>
              <li>Standalone package manifest.</li>
              <li>Dedicated global styles.</li>
              <li>Self-contained proposal README.</li>
            </ul>
          </div>
          <div>
            <p className="panel-kicker">What is not included</p>
            <ul className="checklist muted">
              <li>No shared routes with the main site.</li>
              <li>No dependency on the root HTML pages.</li>
              <li>No cross-wiring into the main navigation.</li>
              <li>No forced changes to the homepage build.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="delivery">
        <div className="section-heading">
          <p className="eyebrow">Delivery</p>
          <h2>Ready for iterative proposal work.</h2>
        </div>
        <div className="timeline">
          {milestones.map((milestone, index) => (
            <article className="timeline-item" key={milestone}>
              <span className="timeline-index">0{index + 1}</span>
              <p>{milestone}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
