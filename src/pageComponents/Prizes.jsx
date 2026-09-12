"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Prizes.css";

gsap.registerPlugin(ScrollTrigger);

const specialPrize = {
  label: "BEST AGENTIC AI SOLUTION",
  badge: "SPECIAL RECOGNITION",
  amount: "10,101",
  kanji: "知",
  perks: ["Cash Prize", "Recognition for the most innovative Agentic AI / Multi-Agent architecture"],
};

const prizes = [
  {
    rank: "02",
    place: "SECOND",
    label: "RUNNER-UP",
    kanji: "弐",
    amount: "20,202",
    perks: ["Cash Prize", "Certificate of Merit"],
    highlight: false,
    orderClass: "order-2 md:order-1",
  },
  {
    rank: "01",
    place: "FIRST",
    label: "CHAMPION",
    kanji: "壱",
    amount: "40,404",
    perks: [
      "Grand Cash Prize",
      "Internship Opportunity at a student-powered startup from IIIT Kottayam",
      "Exclusive Champion Trophy & Certificates",
    ],
    highlight: true,
    orderClass: "order-1 md:order-2",
  },
  {
    rank: "03",
    place: "THIRD",
    label: "2ND RUNNER-UP",
    kanji: "参",
    amount: "10,101",
    perks: ["Cash Prize", "Certificate of Merit"],
    highlight: false,
    orderClass: "order-3 md:order-3",
  },
];

export default function Prizes() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const specialRef = useRef(null);
  const perksRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Header
      const headerEls = headerRef.current?.querySelectorAll(
        ".section-header-tag, .section-heading-main, .section-subtitle-text"
      );
      if (headerEls?.length) {
        gsap.set(headerEls, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 82%",
          once: true,
          onEnter: () =>
            gsap.to(headerEls, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.12,
              ease: "power2.out",
            }),
        });
      }

      // Prize cards
      const cards = cardsRef.current?.querySelectorAll(".pr-card");
      if (cards?.length) {
        gsap.set(cards, { y: 40, opacity: 0 });
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
          onEnter: () =>
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.14,
              ease: "power2.out",
            }),
        });
      }

      // Special award
      const special = specialRef.current;
      if (special) {
        gsap.set(special, { y: 35, opacity: 0 });
        ScrollTrigger.create({
          trigger: special,
          start: "top 82%",
          once: true,
          onEnter: () =>
            gsap.to(special, {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power2.out",
            }),
        });
      }

      // Perks banner
      const perks = perksRef.current;
      if (perks) {
        gsap.set(perks, { y: 25, opacity: 0 });
        ScrollTrigger.create({
          trigger: perks,
          start: "top 85%",
          once: true,
          onEnter: () =>
            gsap.to(perks, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            }),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pr-section" id="prizes" ref={sectionRef}>
      <div className="pr-container">
        {/* Header */}
        <div className="pr-header" ref={headerRef}>
          <span className="section-header-tag">GLORY & BOUNTY</span>
          <h2 className="section-heading-main">PRIZES</h2>
          <p className="section-subtitle-text">
            ₹80,808 in total rewards. Stand atop the podium.
          </p>
        </div>

        {/* Podium Prize Cards: 2nd, 1st (dominant), 3rd */}
        <div className="pr-podium-grid" ref={cardsRef}>
          {prizes.map((p) => (
            <div
              key={p.rank}
              className={`pr-card asian-frame ${p.highlight ? "pr-card--champion" : ""} ${
                p.orderClass
              }`}
            >
              {p.highlight && (
                <div className="pr-champion-badge font-bebas">
                  <span>★ GRAND PRIZE ★</span>
                </div>
              )}

              <div className="pr-card-top">
                <div className="flex items-center gap-2">
                  <span className="pr-rank font-cinzel">{p.rank}</span>
                  <span className="pr-place font-bebas">{p.place}</span>
                </div>
                <div
                  className="hanko-seal"
                  style={{
                    width: p.highlight ? "32px" : "26px",
                    height: p.highlight ? "32px" : "26px",
                    fontSize: p.highlight ? "14px" : "11px",
                  }}
                >
                  {p.kanji}
                </div>
              </div>

              <div className="pr-label font-cinzel">{p.label}</div>

              <div className="pr-amount-box">
                <span className="pr-currency">₹</span>
                <span className="pr-amount font-cinzel">{p.amount}</span>
              </div>

              <div className="pr-divider" />

              <ul className="pr-perks-list">
                {p.perks.map((perk, idx) => (
                  <li key={idx} className="pr-perk-item">
                    <span className="pr-perk-bullet">✦</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Special Award: Agentic AI */}
        <div className="pr-special-section" ref={specialRef}>
          <div className="pr-special-card asian-frame">
            <div className="pr-special-top">
              <span className="pr-special-badge font-bebas">{specialPrize.badge}</span>
              <div className="hanko-seal" style={{ width: "26px", height: "26px", fontSize: "11px" }}>
                {specialPrize.kanji}
              </div>
            </div>

            <div className="pr-special-content">
              <div>
                <h3 className="pr-special-title font-cinzel">{specialPrize.label}</h3>
                <ul className="pr-special-perks">
                  {specialPrize.perks.map((perk, i) => (
                    <li key={i} className="pr-special-perk-item">
                      <span className="pr-perk-bullet">✦</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pr-special-amount-box">
                <span className="pr-currency">₹</span>
                <span className="pr-amount font-cinzel">{specialPrize.amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* All Participants Banner */}
        <div className="pr-cert-banner asian-frame" ref={perksRef}>
          <div className="pr-cert-icon">⛩</div>
          <div className="pr-cert-info">
            <h4 className="pr-cert-title font-cinzel">ALL PARTICIPANTS</h4>
            <p className="pr-cert-text">
              Every warrior who steps into the arena and submits a verified project receives an official{" "}
              <strong>TECHASHY</strong> Certificate of Participation from Betalabs & IIIT Kottayam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
