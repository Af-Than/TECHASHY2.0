"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Prizes.css";

gsap.registerPlugin(ScrollTrigger);

const specialPrize = {
  label: "BEST AGENTIC AI SOLUTION",
  badge: "SPECIAL AWARD",
  amount: "10,101",
  perks: ["Cash Prize", "Recognition for the most innovative Agentic AI solution"],
};

const prizes = [
  {
    rank: "01",
    place: "FIRST",
    label: "CHAMPION",
    amount: "40,404",
    perks: ["Cash Prize", "Internship Opportunity at a student-powered startup from IIIT Kottayam"],
    highlight: true,
  },
  {
    rank: "02",
    place: "SECOND",
    label: "RUNNER-UP",
    amount: "20,202",
    perks: ["Cash Prize"],
    highlight: false,
  },
  {
    rank: "03",
    place: "THIRD",
    label: "2ND RUNNER-UP",
    amount: "10,101",
    perks: ["Cash Prize"],
    highlight: false,
  },
];

export default function Prizes() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const cardsRef   = useRef(null);
  const perksRef   = useRef(null);
  const specialRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      // Header
      const headerEls = headerRef.current?.querySelectorAll(
        ".pr-eyebrow, .pr-heading, .pr-sub"
      );
      if (headerEls?.length) {
        gsap.set(headerEls, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 82%",
          once: true,
          onEnter: () =>
            gsap.to(headerEls, {
              y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power2.out",
            }),
        });
      }

      // Prize cards — staggered fade up
      const cards = cardsRef.current?.querySelectorAll(".pr-card");
      if (cards?.length) {
        gsap.set(cards, { y: 40, opacity: 0 });
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
          onEnter: () =>
            gsap.to(cards, {
              y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out",
            }),
        });
      }

      // Perks banner
      const perks = perksRef.current;
      if (perks) {
        gsap.set(perks, { y: 24, opacity: 0 });
        ScrollTrigger.create({
          trigger: perks,
          start: "top 85%",
          once: true,
          onEnter: () =>
            gsap.to(perks, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }),
        });
      }

      // Special award card
      const special = specialRef.current;
      if (special) {
        gsap.set(special, { y: 40, opacity: 0 });
        ScrollTrigger.create({
          trigger: special,
          start: "top 82%",
          once: true,
          onEnter: () =>
            gsap.to(special, { y: 0, opacity: 1, duration: 0.85, ease: "power2.out" }),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pr-section" id="prizes" ref={sectionRef}>
      <div className="pr-bg" aria-hidden="true" />

      <div className="pr-container">

        {/* ── Header ── */}
        <div className="pr-header" ref={headerRef}>
          <span className="pr-eyebrow">WHAT YOU ARE FIGHTING FOR</span>
          <h2 className="pr-heading">
            <span className="pr-slash">/</span>PRIZES
          </h2>
          <p className="pr-sub">₹80,808 in total prizes. One weekend to claim them.</p>
        </div>

        {/* ── Prize cards ── */}
        <div className="pr-grid" ref={cardsRef}>
          {prizes.map((p) => (
            <div
              key={p.rank}
              className={`pr-card katana-shine katana-shine-crimson${p.highlight ? " pr-card--first" : ""}`}
            >
              <div className="pr-card__scan" aria-hidden="true" />

              <div className="pr-card__top">
                <span className="pr-card__rank">{p.rank}</span>
                <span className="pr-card__label">{p.label}</span>
              </div>

              <div className="pr-card__amount">
                <span className="pr-rupee">₹</span>
                {p.amount}
              </div>

              <div className="pr-card__divider" aria-hidden="true" />

              <ul className="pr-card__perks">
                {p.perks.map((perk, i) => (
                  <li key={i} className="pr-card__perk">
                    <span className="pr-perk-dot" aria-hidden="true" />
                    {perk}
                  </li>
                ))}
              </ul>

              {p.highlight && (
                <div className="pr-card__glow-ring" aria-hidden="true">
                  <span /><span />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Special Award ── */}
        <div className="pr-special-wrapper" ref={specialRef}>
          <div className="pr-special-card katana-shine katana-shine-crimson">
            <div className="pr-card__scan" aria-hidden="true" />
            <div className="pr-special-card__top">
              <span className="pr-special-card__badge">{specialPrize.badge}</span>
            </div>
            <div className="pr-special-card__title">{specialPrize.label}</div>
            <div className="pr-special-card__amount">
              <span className="pr-special-rupee">₹</span>
              {specialPrize.amount}
            </div>
            <div className="pr-card__divider" aria-hidden="true" />
            <ul className="pr-card__perks">
              {specialPrize.perks.map((perk, i) => (
                <li key={i} className="pr-card__perk">
                  <span className="pr-perk-dot pr-perk-dot--gold" aria-hidden="true" />
                  {perk}
                </li>
              ))}
            </ul>
            <div className="pr-special-card__glow-ring" aria-hidden="true">
              <span /><span />
            </div>
          </div>
        </div>

        {/* ── All participants banner ── */}
        <div className="pr-perks-banner" ref={perksRef}>
          <div className="pr-perks-icon" aria-hidden="true">✦</div>
          <div className="pr-perks-body">
            <span className="pr-perks-title">ALL PARTICIPANTS</span>
            <span className="pr-perks-text">
              Every team that competes walks away with an official Techashy participation certificate.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
