"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Venue.css";

gsap.registerPlugin(ScrollTrigger);

const arrivalSchedule = [
  { time: "1:30 PM",  label: "Registration Starts" },
  { time: "2:30 PM", label: "Registration Ends" },
  { time: "2:30 PM", label: "Inauguration Ceremony" },
  { time: "3:00 PM", label: "Hackathon Begins" },
];

export default function Venue() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      // Header — staggered fade up
      const headerEls = headerRef.current?.querySelectorAll(
        ".vn-eyebrow, .vn-title, .vn-sub"
      );
      if (headerEls?.length) {
        gsap.set(headerEls, { y: 25, opacity: 0 });
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 82%",
          once: true,
          onEnter: () =>
            gsap.to(headerEls, {
              y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power2.out",
            }),
        });
      }

      // Cards + map — fade up
      const panels = contentRef.current?.querySelectorAll(
        ".vn-info-card, .vn-map-wrap"
      );
      if (panels?.length) {
        gsap.set(panels, { y: 32, opacity: 0 });
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: "top 80%",
          once: true,
          onEnter: () =>
            gsap.to(panels, {
              y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: "power2.out",
            }),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="vn-section" id="venue" ref={sectionRef}>
      <div className="vn-scanlines" aria-hidden="true" />

      <div className="vn-wrap">

        {/* ── Header ── */}
        <div className="vn-header" ref={headerRef}>
          <span className="vn-eyebrow">FIND YOUR WAY IN</span>
          <h2 className="vn-title">
            <span className="vn-slash">/</span>VENUE
          </h2>
          <p className="vn-sub">Ground zero for 24 hours of relentless building.</p>
        </div>

        {/* ── Content ── */}
        <div className="vn-content" ref={contentRef}>

          {/* Left — Info cards */}
          <div className="vn-info">

            {/* Location card */}
            <div className="vn-info-card">
              <span className="vn-info-tag">LOCATION</span>
              <h3 className="vn-institution">
                Indian Institute of<br />Information Technology
              </h3>
              <span className="vn-city">Kottayam, Kerala</span>
              <div className="vn-divider" aria-hidden="true" />
              <div className="vn-meta-row">
                <span className="vn-meta-dot" aria-hidden="true" />
                <span className="vn-meta-text">March 14 – 15, 2026</span>
              </div>
              <a
                href="https://maps.app.goo.gl/iVDK6m86nNCNhvo99"
                target="_blank"
                rel="noopener noreferrer"
                className="vn-directions-btn"
              >
                GET DIRECTIONS →
              </a>
            </div>

            {/* Arrival schedule card */}
            <div className="vn-info-card">
              <span className="vn-info-tag">MARCH 14 — ARRIVAL SCHEDULE</span>
              <ul className="vn-schedule">
                {arrivalSchedule.map((s, i) => (
                  <li key={i} className="vn-schedule-item">
                    <span className="vn-sched-time">{s.time}</span>
                    <span className="vn-sched-label">{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right — Map */}
          <div className="vn-map-wrap">
            <div className="vn-map-corner vn-map-corner--tl" aria-hidden="true" />
            <div className="vn-map-corner vn-map-corner--tr" aria-hidden="true" />
            <div className="vn-map-corner vn-map-corner--bl" aria-hidden="true" />
            <div className="vn-map-corner vn-map-corner--br" aria-hidden="true" />
            <iframe
              title="IIIT Kottayam Location"
              src="https://maps.google.com/maps?q=Indian+Institute+of+Information+Technology+Kottayam&output=embed&z=15"
              className="vn-map-iframe"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="vn-map-overlay" aria-hidden="true" />
          </div>

        </div>
      </div>
    </section>
  );
}
