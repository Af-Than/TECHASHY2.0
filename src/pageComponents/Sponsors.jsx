"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Sponsors.css";

gsap.registerPlugin(ScrollTrigger);

const platinum = [
  { name: "Alibi", tag: "PLATINUM PATRON", img: "/alibi.png" },
  { name: "Dojo Works", tag: "PLATINUM PATRON", img: "/Dojo Works.png" },
];

const gold = [
  { name: "Tosh NXT", tag: "GOLD PATRON", img: "/tosh.png" },
];

const clothing = [
  { name: "Midfede T-Shirt Company", tag: "OFFICIAL APPAREL PARTNER", img: "/Midfede T-shirt Company.jpeg" },
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

      // Sponsor cards
      const allCards = sectionRef.current.querySelectorAll(".sp-card");
      if (allCards?.length) {
        gsap.set(allCards, { y: 35, opacity: 0 });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
          onEnter: () => {
            gsap.to(allCards, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
            });
          },
        });
      }

      // CTA
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { y: 25, opacity: 0 });
        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(ctaRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sp-section" id="sponsors" ref={sectionRef}>
      <div className="sp-container">
        {/* Header */}
        <div className="sp-header" ref={headerRef}>
          <span className="section-header-tag">ALLIES & PATRONS</span>
          <h2 className="section-heading-main">SPONSORS & PARTNERS</h2>
          <p className="section-subtitle-text">
            The esteemed organizations powering TEKASHI 2.0.
          </p>
        </div>

        {/* Platinum Tier */}
        <div className="sp-tier-section" ref={platinumRef}>
          <div className="sp-tier-badge font-bebas">
            <span className="sp-tier-dot" style={{ background: "#E63946" }} />
            <span>PLATINUM PATRONS</span>
          </div>

          <div className="sp-grid sp-grid--two">
            {platinum.map((s, i) => (
              <div key={i} className="sp-card asian-frame">
                <div className="sp-logo-box">
                  <img src={s.img} alt={s.name} className="sp-logo-img" />
                </div>
                <div className="sp-info">
                  <h3 className="sp-name font-cinzel">{s.name}</h3>
                  <span className="sp-tag font-bebas">{s.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gold & Apparel Grid */}
        <div className="sp-secondary-tiers">
          {/* Gold */}
          <div className="sp-tier-section flex-1" ref={goldRef}>
            <div className="sp-tier-badge font-bebas">
              <span className="sp-tier-dot" style={{ background: "#D8B978" }} />
              <span>GOLD PATRON</span>
            </div>
            <div className="sp-grid">
              {gold.map((s, i) => (
                <div key={i} className="sp-card asian-frame">
                  <div className="sp-logo-box">
                    <img src={s.img} alt={s.name} className="sp-logo-img" />
                  </div>
                  <div className="sp-info">
                    <h3 className="sp-name font-cinzel">{s.name}</h3>
                    <span className="sp-tag font-bebas">{s.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clothing Partner */}
          <div className="sp-tier-section flex-1" ref={clothingRef}>
            <div className="sp-tier-badge font-bebas">
              <span className="sp-tier-dot" style={{ background: "#C9A45C" }} />
              <span>APPAREL PARTNER</span>
            </div>
            <div className="sp-grid">
              {clothing.map((s, i) => (
                <div key={i} className="sp-card asian-frame">
                  <div className="sp-logo-box">
                    <img src={s.img} alt={s.name} className="sp-logo-img" />
                  </div>
                  <div className="sp-info">
                    <h3 className="sp-name font-cinzel">{s.name}</h3>
                    <span className="sp-tag font-bebas">{s.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sponsor Call to Action */}
        <div className="sp-cta-box asian-frame" ref={ctaRef}>
          <div className="sp-cta-text">
            <h4 className="font-cinzel text-lg md:text-xl text-[#FFF1D0]">
              Interested in supporting TEKASHI 2.0?
            </h4>
            <p className="text-sm text-[#D1C29E]">
              Partner with the next generation of visionary engineers and builders.
            </p>
          </div>
          <a
            href="mailto:techashy.betalabs@gmail.com"
            className="sp-cta-btn font-bebas"
          >
            BECOME A PATRON →
          </a>
        </div>
      </div>
    </section>
  );
}
