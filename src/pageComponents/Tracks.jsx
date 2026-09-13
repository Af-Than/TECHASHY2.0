"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Tracks.css";

gsap.registerPlugin(ScrollTrigger);

const tracks = [
  {
    num: "01",
    tag: "HEAL",
    kanji: "医",
    full: "Healthcare & MedTech",
    description:
      "Reimagine diagnostics, patient care, and medical devices. Build the resilient tech that saves human lives at scale.",
  },
  {
    num: "02",
    tag: "INTELLIGENCE",
    kanji: "智",
    full: "AI & Machine Learning",
    description:
      "Create intelligent systems that learn, adapt, and solve meaningful problems. Turn data into decisions that shape what comes next.",
  },
  {
    num: "03",
    tag: "GREENTECH",
    kanji: "緑",
    full: "Agriculture & Climate Tech",
    description:
      "Tackle food security, precision farming, and ecological resilience. Engineer solutions for a sustainable planet.",
  },
  {
    num: "04",
    tag: "CONNECT",
    kanji: "結",
    full: "Smart Cities & IoT",
    description:
      "Sensors, embedded hardware, and urban data pipelines — make physical infrastructure intelligent and cities liveable.",
  },
  {
    num: "05",
    tag: "LEARN",
    kanji: "学",
    full: "Education & EdTech",
    description:
      "Personalize learning, bridge accessibility divides, and reinvent classrooms. Education is the greatest equalizer.",
  },
  {
    num: "06",
    tag: "SECURE",
    kanji: "防",
    full: "Blockchain & Cybersecurity",
    description:
      "Smart contracts, zero-trust cryptographic systems, and decentralized trust layers. Build stacks no adversary can compromise.",
  },
  {
    num: "07",
    tag: "IMPACT",
    kanji: "創",
    full: "Social Good & Governance",
    description:
      "Civic technology, transparency tools, and platforms amplifying underrepresented voices. Hack for humanity.",
  },
];

export default function Tracks() {
  const isLocked = true;
  const [selectedTrack, setSelectedTrack] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const headerEls = headerRef.current?.querySelectorAll(
        ".section-header-tag, .section-heading-main, .section-subtitle-text"
      );
      if (headerEls?.length) {
        gsap.set(headerEls, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(headerEls, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.12,
              ease: "power2.out",
            });
          },
        });
      }

      const cards = gridRef.current?.querySelectorAll(".tr-card");
      if (cards?.length) {
        gsap.set(cards, { y: 40, opacity: 0 });
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="tr-section" id="tracks" ref={sectionRef}>

      {/* Red wave artwork anchors the left edge of the track arena. */}
      <div className="tr-decorative-wave" aria-hidden="true">
        <Image
          src="/NEW%20PICS/WAVE.png"
          alt="Wave artwork"
          fill
          className="tr-wave-img"
          sizes="(max-width: 640px) 72vw, (max-width: 992px) 48vw, 520px"
        />
      </div>

      <div className="tr-decorative-wave tr-decorative-wave--top-right" aria-hidden="true">
        <Image
          src="/NEW%20PICS/WAVES.png"
          alt="Red koi wave artwork"
          fill
          className="tr-wave-img"
          sizes="(max-width: 640px) 64vw, (max-width: 992px) 42vw, 480px"
        />
      </div>

      <div className="tr-container">
        {/* Header */}
        <div className="tr-header" ref={headerRef}>
          <span className="section-header-tag">COMPETITIVE ARENAS</span>
          <h2 className="section-heading-main">TRACKS</h2>
          <p className="section-subtitle-text">
            Seven battlegrounds of innovation. Pick your discipline and forge greatness.
          </p>
        </div>

        {/* Traditional Plaque Grid */}
        <div className="tr-grid" ref={gridRef}>
          {tracks.map((t) => (
            <div
              key={t.num}
              className="tr-card asian-frame"
              role="button"
              tabIndex={0}
              onClick={() => setSelectedTrack(t)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedTrack(t);
                }
              }}
              aria-label={`Open track ${t.num}`}
            >
              <span className="tr-watermark" aria-hidden="true">
                {t.kanji}
              </span>

              <div className="tr-lock-overlay" aria-label="Track locked">
                <span className="tr-lock-icon" aria-hidden="true">锁</span>
                <span className="tr-lock-label">TRACK LOCKED</span>
                <span className="tr-lock-caption">REVEAL SOON</span>
              </div>

              <div className="tr-card-header">
                <div className="flex items-center gap-2">
                  <span className="tr-num font-cinzel">{t.num}</span>
                  <span className="tr-tag font-bebas">{isLocked ? "CLASSIFIED" : t.tag}</span>
                </div>
                <div className="hanko-seal" style={{ width: "26px", height: "26px", fontSize: "11px" }}>
                  {t.kanji}
                </div>
              </div>

              <div className="tr-gold-line" />

              <h3 className="tr-title font-cinzel">{isLocked ? "???" : t.full}</h3>
              <p className="tr-desc">{isLocked ? "???" : t.description}</p>

              <div className="tr-footer">
                <span className="tr-footer-ornament">✦ ✦ ✦</span>
              </div>
            </div>
          ))}
        </div>

        {selectedTrack && (
          <div className="tr-mini-backdrop" role="presentation" onClick={() => setSelectedTrack(null)}>
            <div
              className="tr-mini-card asian-frame"
              role="dialog"
              aria-modal="true"
              aria-label={`Track ${selectedTrack.num} details`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="tr-mini-close"
                onClick={() => setSelectedTrack(null)}
                aria-label="Close track details"
              >
                ×
              </button>
              <span className="tr-mini-kicker">TRACK {selectedTrack.num} / CLASSIFIED</span>
              <span className="tr-mini-kanji">{selectedTrack.kanji}</span>
              <h3>TOPIC SEALED</h3>
              <p>The challenge brief will be revealed on October 10.</p>
              <span className="tr-mini-status">REVEAL SOON</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}