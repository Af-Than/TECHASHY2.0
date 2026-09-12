"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Venue.css";

gsap.registerPlugin(ScrollTrigger);

const arrivalSchedule = [
  { time: "1:30 PM", label: "Check-in & Registration Desk Opens" },
  { time: "2:30 PM", label: "Registration Closes & Inauguration Ceremony" },
  { time: "3:00 PM", label: "Hacking Begins (24-Hour Timer Starts)" },
];

export default function Venue() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

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

      // Panels
      const panels = contentRef.current?.querySelectorAll(".vn-panel");
      if (panels?.length) {
        gsap.set(panels, { y: 35, opacity: 0 });
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: "top 80%",
          once: true,
          onEnter: () =>
            gsap.to(panels, {
              y: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.14,
              ease: "power2.out",
            }),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="vn-section" id="venue" ref={sectionRef}>
      <div className="vn-container">
        {/* Header */}
        <div className="vn-header" ref={headerRef}>
          <span className="section-header-tag">THE SANCTUARY</span>
          <h2 className="section-heading-main">VENUE & ARENA</h2>
          <p className="section-subtitle-text">
            Ground zero for 24 hours of relentless ideation and product warfare.
          </p>
        </div>

        {/* Content Layout: Info + Map */}
        <div className="vn-content" ref={contentRef}>
          {/* Left: Info Cards */}
          <div className="vn-info-column">
            {/* Institution Card */}
            <div className="vn-panel asian-frame">
              <div className="vn-panel-top">
                <span className="vn-tag font-bebas">SANCTUARY LOCATION</span>
                <div className="hanko-seal" style={{ width: "24px", height: "24px", fontSize: "10px" }}>
                  京
                </div>
              </div>

              <h3 className="vn-institution font-cinzel">
                Indian Institute of<br />Information Technology
              </h3>
              <span className="vn-city">Kottayam, Kerala, India</span>

              <div className="vn-gold-line" />

              <div className="vn-meta">
                <span className="vn-meta-icon">⛩</span>
                <span>March 14 – 15, 2026</span>
              </div>

              <a
                href="https://maps.app.goo.gl/iVDK6m86nNCNhvo99"
                target="_blank"
                rel="noopener noreferrer"
                className="vn-directions-btn font-bebas"
              >
                OPEN IN GOOGLE MAPS →
              </a>
            </div>

            {/* Arrival Schedule Card */}
            <div className="vn-panel asian-frame">
              <span className="vn-tag font-bebas">DAY 1 ARRIVAL SCHEDULE</span>
              <ul className="vn-schedule-list">
                {arrivalSchedule.map((s, i) => (
                  <li key={i} className="vn-schedule-item">
                    <span className="vn-sched-time font-cinzel">{s.time}</span>
                    <span className="vn-sched-dot">✦</span>
                    <span className="vn-sched-label">{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Map Embed */}
          <div className="vn-panel vn-map-panel asian-frame">
            <iframe
              title="IIIT Kottayam Campus Location"
              src="https://maps.google.com/maps?q=Indian+Institute+of+Information+Technology+Kottayam&output=embed&z=15"
              className="vn-map-iframe"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="vn-map-overlay-tint" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
