"use client";

import { useEffect, useState } from "react";

type Screen = {
  id: string;
  group: string;
  title: string;
  source: string;
  pattern: string;
  partial?: boolean;
};

const screens: Screen[] = [
  { id: "01", group: "Landing", title: "Choose a ride", source: "/screens/landing-01-choose-ride.png", pattern: "Map-led entry, selection sheet, featured option, persistent action" },
  { id: "02", group: "Onboarding", title: "Route introduction", source: "/screens/onboarding-01-route-map.png", pattern: "Context map, progressive disclosure, bottom action area" },
  { id: "03", group: "Onboarding", title: "Service selection", source: "/screens/onboarding-02-services.png", pattern: "Visual category tiles, grouped choices, persistent navigation" },
  { id: "04", group: "Authentication", title: "Account entry", source: "/screens/auth-01-account.png", pattern: "Identity header, status badges, utility actions, account checklist" },
  { id: "05", group: "Homepage", title: "Rides home", source: "/screens/homepage-01-rides.png", pattern: "Mode switcher, search slab, recent rows, suggestions, promo rail" },
  { id: "06", group: "MVP", title: "Services catalogue", source: "/screens/mvp-01-services.png", pattern: "Dense tile catalogue, section hierarchy, four-tab navigation" },
  { id: "07", group: "MVP", title: "Add funds", source: "/screens/mvp-02-add-funds.png", pattern: "Focused form, one value input, quick chips, bottom CTA" },
  { id: "08", group: "MVP", title: "Reservation confirmed", source: "/screens/mvp-03-reservation.png", pattern: "Status headline, single summary card, compact edit action" },
  { id: "09", group: "AI MVP shell", title: "Context detail", source: "/screens/ai-mvp-01-route-detail.png", pattern: "Contextual map card for future assisted-intent explanation", partial: true },
  { id: "10", group: "AI MVP shell", title: "Recommendation options", source: "/screens/ai-mvp-02-driver-options.png", pattern: "Ranked options, verification cues, utility cards, recommendation area" },
];

function SourceAsset({ screen, compact = false }: { screen: Screen; compact?: boolean }) {
  return (
    <div className={`source-frame${screen.partial ? " partial" : ""}${compact ? " compact" : ""}`}>
      <img src={screen.source} alt={`${screen.title} source export`} />
    </div>
  );
}

export default function BaselinePage() {
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState<"grid" | "inspect">("grid");

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setSelected((value) => (value + 1) % screens.length);
      if (event.key === "ArrowLeft") setSelected((value) => (value - 1 + screens.length) % screens.length);
      if (event.key === "Enter" && view === "grid") setView("inspect");
      if (event.key === "Escape" && view === "inspect") setView("grid");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [view]);

  const current = screens[selected];

  return (
    <main className="baseline">
      <header className="topbar">
        <div><b>SOURCE / 10</b><span>Uber community mockup import</span></div>
        <nav aria-label="View options">
          <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>All screens</button>
          <button className={view === "inspect" ? "active" : ""} onClick={() => setView("inspect")}>Inspect</button>
        </nav>
      </header>

      {view === "grid" ? (
        <section className="grid-page">
          <header className="intro">
            <span>Direct React import · no product layer</span>
            <h1>Mobile UI source baseline</h1>
            <p>Exact visual exports extracted from supplied Figma community file. No Kapit branding, copy, roles, flows, or colors added.</p>
          </header>
          <div className="screen-grid">
            {screens.map((screen, index) => (
              <button key={screen.id} className={selected === index ? "screen-card selected" : "screen-card"} onClick={() => { setSelected(index); setView("inspect"); }}>
                <div className="card-number">{screen.id}</div>
                <SourceAsset screen={screen} compact />
                <span className="card-copy"><small>{screen.group}</small><strong>{screen.title}</strong></span>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="inspector">
          <aside className="screen-rail" aria-label="Imported screens">
            {screens.map((screen, index) => (
              <button key={screen.id} className={selected === index ? "rail-item active" : "rail-item"} onClick={() => setSelected(index)}>
                <span>{screen.id}</span><div><small>{screen.group}</small><strong>{screen.title}</strong></div>
              </button>
            ))}
          </aside>
          <div className="inspect-stage"><SourceAsset screen={current} /></div>
          <aside className="inspect-notes">
            <span className="note-label">{current.group} · {current.id} / 10</span>
            <h1>{current.title}</h1>
            <p>{current.pattern}</p>
            <dl><div><dt>Source</dt><dd>Embedded PNG from supplied `.fig`</dd></div><div><dt>Rendering</dt><dd>Direct asset import in React</dd></div><div><dt>Changes</dt><dd>None inside source artwork</dd></div></dl>
            {current.partial && <div className="partial-note"><b>Partial source asset</b><span>Kept intact. Intended as structural context for later AI concept work.</span></div>}
            <div className="key-hint"><kbd>←</kbd><kbd>→</kbd><span>Browse</span><kbd>Esc</kbd><span>Grid</span></div>
          </aside>
        </section>
      )}
    </main>
  );
}
