"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Sponsors.css";

gsap.registerPlugin(ScrollTrigger);

const platinum = [
  { name: "Alibi", tag: "PLATINUM SPONSOR", img: "/alibi.png" },
  { name: "Dojo Works", tag: "PLATINUM SPONSOR", img: "/Dojo Works.png" },
];

const gold = [
  { name: "Tosh NXT", tag: "GOLD SPONSOR", img: "/tosh.png" },
];

const clothing = [
  { name: "Midfede T-Shirt Company", tag: "CLOTHING PARTNER", img: "/Midfede T-shirt Company.jpeg" },
];

export default function Sponsors() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const platinumRef = useRef(null);
  const goldRef = useRef(null);
  const clothingRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header — fade up
      const headerEls = headerRef.current?.querySelectorAll(".sp-eyebrow, .sp-heading, .sp-sub");
      if (headerEls?.length) {
        gsap.set(headerEls, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(headerEls, {
              y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power2.out",
            });
          },
        });
      }

      // Platinum — staggered fade up
      const platCards = platinumRef.current?.querySelectorAll(".sp-plat-card");
      if (platCards?.length) {
        gsap.set(platCards, { y: 40, opacity: 0 });
        ScrollTrigger.create({
          trigger: platinumRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(platCards, {
              y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out",
            });
          },
        });
      }

      // Gold — staggered fade up
      const goldCards = goldRef.current?.querySelectorAll(".sp-gold-card");
      if (goldCards?.length) {
        gsap.set(goldCards, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: goldRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(goldCards, {
              y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out",
            });
          },
        });
      }

      // Clothing partner — fade up
      const clothingCards = clothingRef.current?.querySelectorAll(".sp-gold-card");
      if (clothingCards?.length) {
        gsap.set(clothingCards, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: clothingRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(clothingCards, {
              y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
            });
          },
        });
      }

      // CTA — fade up with line draw
      if (ctaRef.current) {
        const ctaEls = ctaRef.current.querySelectorAll(".sp-cta-line, .sp-cta-text, .sp-cta-btn");
        gsap.set(ctaEls, { y: 20, opacity: 0 });
        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(ctaEls, {
              y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sp-section" id="sponsors" ref={sectionRef}>
      <div className="sp-diag" aria-hidden="true" />
      <div className="sp-glow" aria-hidden="true" />

      <div className="sp-wrap">
        <div className="sp-header" ref={headerRef}>
          <span className="sp-eyebrow">BACKED BY THE BEST</span>
          <h2 className="sp-heading"><span className="sp-slash">/</span>SPONSORS</h2>
          <p className="sp-sub">The companies powering Techashy</p>
        </div>

        {/* ── Platinum ── */}
        <div className="sp-tier">
          <div className="sp-tier-label">
            <span className="sp-tier-dot" style={{ background: "#FF4757" }} />
            <span className="sp-tier-name" style={{ color: "#FF4757" }}>Platinum</span>
          </div>
          <div className="sp-platinum-grid sp-platinum-grid--two" ref={platinumRef}>
            {platinum.map((s, i) => (
              <div key={i} className="sp-plat-card katana-shine katana-shine-crimson">
                <div className="sp-plat-corner sp-plat-corner--tl" />
                <div className="sp-plat-corner sp-plat-corner--tr" />
                <div className="sp-plat-corner sp-plat-corner--bl" />
                <div className="sp-plat-corner sp-plat-corner--br" />
                <div className="sp-plat-scan" aria-hidden="true" />
                <div className="sp-plat-inner">
                  <div className="sp-logo-img-wrap">
                    <img src={s.img} alt={s.name} className="sp-logo-img" />
                  </div>
                  <div className="sp-plat-name">{s.name}</div>
                  <div className="sp-plat-tier-tag">{s.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Gold ── */}
        <div className="sp-tier">
          <div className="sp-tier-label">
            <span className="sp-tier-dot" style={{ background: "#FFB84D" }} />
            <span className="sp-tier-name" style={{ color: "#FFB84D" }}>Gold</span>
          </div>
          <div className="sp-single-grid" ref={goldRef}>
            {gold.map((s, i) => (
              <div key={i} className="sp-gold-card sp-gold-card--wide katana-shine katana-shine-crimson">
                <div className="sp-gold-bar" />
                <div className="sp-gold-inner">
                  <div className="sp-logo-img-wrap sp-logo-img-wrap--gold">
                    <img src={s.img} alt={s.name} className="sp-logo-img" />
                  </div>
                  <div className="sp-gold-name">{s.name}</div>
                  <div className="sp-plat-tier-tag" style={{ color: "rgba(255,184,77,0.6)" }}>{s.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Clothing Partner ── */}
        <div className="sp-tier">
          <div className="sp-tier-label">
            <span className="sp-tier-dot" style={{ background: "#FF9F43" }} />
            <span className="sp-tier-name" style={{ color: "#FF9F43" }}>Clothing Partner</span>
          </div>
          <div className="sp-single-grid" ref={clothingRef}>
            {clothing.map((s, i) => (
              <div key={i} className="sp-gold-card sp-gold-card--wide sp-gold-card--clothing katana-shine katana-shine-crimson">
                <div className="sp-gold-bar sp-gold-bar--clothing" />
                <div className="sp-gold-inner">
                  <div className="sp-logo-img-wrap sp-logo-img-wrap--gold">
                    <img src={s.img} alt={s.name} className="sp-logo-img" />
                  </div>
                  <div className="sp-gold-name">{s.name}</div>
                  <div className="sp-plat-tier-tag" style={{ color: "rgba(255,159,67,0.6)" }}>{s.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sp-cta" ref={ctaRef}>
          <div className="sp-cta-line" />
          <p className="sp-cta-text">Interested in sponsoring Techashy?</p>
          <a href="mailto:sponsor@techashy.com" className="sp-cta-btn">
            BECOME A SPONSOR <span className="sp-cta-arrow">&rarr;</span>
          </a>
          <div className="sp-cta-line" />
        </div>
      </div>
    </section>
  );
}
