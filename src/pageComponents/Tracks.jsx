"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Tracks.css";

gsap.registerPlugin(ScrollTrigger);

const tracks = [
  { num: "01", tag: "Heal", full: "Healthcare & MedTech", description: "Reimagine diagnostics, patient care, and medical devices. Build the tech that saves lives at scale." },
  { num: "02", tag: "Intelligence", full: "AI & ML", description: "Train, fine-tune, or deploy models that make machines think. Build the brain behind the next breakthrough." },
  { num: "03", tag: "GreenTech", full: "Agriculture & Climate Tech", description: "Tackle food security, precision farming, and climate resilience. Engineer solutions for a sustainable planet." },
  { num: "04", tag: "Connect", full: "Smart Cities & IoT", description: "Sensors, embedded systems, and urban data pipelines — make infrastructure intelligent and cities liveable." },
  { num: "05", tag: "Learn", full: "Education & EdTech", description: "Personalise learning, close access gaps, and reinvent classrooms. Education is the greatest equaliser." },
  { num: "06", tag: "Secure", full: "Blockchain & Cybersecurity", description: "Smart contracts, zero-trust systems, and decentralised trust layers. Build stacks that no one can compromise." },
  { num: "07", tag: "Impact", full: "Social Good & Governance", description: "Civic tech, transparency tools, and platforms that amplify underrepresented voices. Hack for humanity." },
];

export default function Tracks() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header — fade up
      const headerEls = headerRef.current?.querySelectorAll(".tr-eyebrow, .tr-heading, .tr-sub");
      if (headerEls?.length) {
        gsap.set(headerEls, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(headerEls, {
              y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power2.out",
            });
          },
        });
      }

      // Cards — staggered fade up
      const cards = gridRef.current?.querySelectorAll(".tr-card");
      if (cards?.length) {
        gsap.set(cards, { y: 40, opacity: 0 });
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="tr-section" id="tracks" ref={sectionRef}>
      <div className="tr-bg" aria-hidden="true" />
      <div className="tr-container">
        <div className="tr-header" ref={headerRef}>
          <span className="tr-eyebrow">WHAT ARE YOU BUILDING</span>
          <h2 className="tr-heading">
            <span className="tr-heading-slash">/</span>TRACKS
          </h2>
          <p className="tr-sub">Seven arenas. One winner.</p>
        </div>

        <div className="tr-grid" ref={gridRef}>
          {tracks.map((t) => (
            <div key={t.num} className="tr-card katana-shine katana-shine-crimson">
              <div className="tr-scan" aria-hidden="true" />
              <span className="tr-ghost-num" aria-hidden="true">{t.num}</span>
              <div className="tr-card-inner">
                <div className="tr-top">
                  <span className="tr-num">{t.num}</span>
                  <span className="tr-tag">{t.tag}</span>
                </div>
                <h3 className="tr-title">{t.full}</h3>
                <p className="tr-desc">{t.description}</p>
                <div className="tr-slash-divider" aria-hidden="true">
                  <span /><span /><span />
                </div>
              </div>
              <div className="tr-bar" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
