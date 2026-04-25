const sections = [
  {
    title: 'Scope',
    content:
      'The scope covers brand direction, visual identity, and a focused website concept that can be used to present the project clearly from the first screen onward.'
  },
  {
    title: 'Timeline',
    content: (
      <div className="panel-grid">
        <div className="metric">
          <span className="metric-label">Phase 1</span>
          <strong>Discovery & direction</strong>
          <div>2–3 days for alignment, references, and creative framing.</div>
        </div>
        <div className="metric">
          <span className="metric-label">Phase 2</span>
          <strong>Design development</strong>
          <div>4–6 days for identity, structure, and visual refinement.</div>
        </div>
        <div className="metric">
          <span className="metric-label">Phase 3</span>
          <strong>Website build</strong>
          <div>3–5 days to translate the proposal into a live page.</div>
        </div>
        <div className="metric">
          <span className="metric-label">Phase 4</span>
          <strong>Final polish</strong>
          <div>1–2 days for QA, adjustments, and launch prep.</div>
        </div>
      </div>
    )
  },
  {
    title: 'Deliverables',
    content: (
      <ul className="stack-list">
        <li>Brand direction and visual identity system.</li>
        <li>Homepage concept and supporting web sections.</li>
        <li>Responsive implementation for the proposal page.</li>
        <li>Basic launch-ready assets and handoff notes.</li>
      </ul>
    )
  },
  {
    title: 'Cost',
    content: (
      <>
        <strong>Project fee:</strong> to be finalized after scope confirmation.
        <br />
        <strong>Structure:</strong> milestone-based, with a booking deposit to begin work
        and the balance due before final handoff.
      </>
    )
  },
  {
    title: 'Tech stack',
    content: (
      <ul className="stack-list">
        <li>Next.js for the proposal build structure.</li>
        <li>Plain HTML/CSS for the published preview.</li>
        <li>Shared favicon from the main designedbyrish.com site.</li>
        <li>GitHub repo deployment with the proposal isolated at its own path.</li>
      </ul>
    )
  }
];

export default function Home() {
  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          <span>Discover Tomorrow</span>
        </a>
        <div className="topnote">Brand Proposal · Branding + Website</div>
      </header>

      <section className="hero" aria-labelledby="proposal-title">
        <p className="eyebrow">Branding + Website</p>
        <h1 id="proposal-title">Discover Tomorrow.</h1>
        <p className="intro">
          Discover Tomorrow needs a brand system and a website presence that feels modern,
          confident, and easy to expand. The direction should carry a clear identity, a
          deliberate editorial tone, and a structure that can support the launch without
          feeling overbuilt.
        </p>
      </section>

      <section className="section" aria-label="Project proposal details">
        <div className="accordion">
          {sections.map((section, index) => (
            <details key={section.title} open={index === 0}>
              <summary>{section.title}</summary>
              <div className="panel">{section.content}</div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
