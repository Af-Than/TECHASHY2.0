"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Timeline.css";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    step: 1,
    month: "FEB",
    day: "27",
    year: "2026",
    iso: "2026-02-27",
    kanji: "壱",
    title: "Registration Opens",
    desc: "Application portal goes live. Assemble your fellowship of 3–5 builders and lock in your slot.",
    time: "10:00 AM IST",
  },
  {
    step: 2,
    month: "MAR",
    day: "07",
    year: "2026",
    iso: "2026-03-07",
    kanji: "弐",
    title: "Registration & Submission Deadline",
    desc: "Strict deadline at 11:59 PM. Portals close and judging of preliminary submissions begins.",
    time: "11:59 PM IST",
  },
  {
    step: 3,
    month: "MAR",
    day: "08",
    year: "2026",
    iso: "2026-03-08",
    kanji: "参",
    title: "Round 1 Shortlisting",
    desc: "Selected teams notified via email dispatch. Check your inbox and prepare your battle strategy.",
    time: null,
  },
  {
    step: 4,
    month: "MAR",
    day: "11",
    year: "2026",
    iso: "2026-03-11",
    kanji: "四",
    title: "RSVP Confirmation Deadline",
    desc: "Shortlisted teams must lock in attendance confirmations. No RSVP — forfeiture of slot.",
    time: null,
  },
  {
    step: 5,
    month: "MAR",
    day: "14",
    year: "2026",
    iso: "2026-03-14",
    kanji: "伍",
    title: "Offline Hackathon — Day 1",
    desc: "The arena opens at IIIT Kottayam. 24 continuous hours of building commences.",
    time: "01:30 PM Onwards",
    schedule: [
      { time: "1:30 PM", label: "Check-in & Registration Starts" },
      { time: "2:30 PM", label: "Registration Closes & Inauguration Ceremony" },
      { time: "3:00 PM", label: "Hackathon Officially Begins (Hacking Commences)" },
      { time: "7:30 PM – 8:30 PM", label: "Dinner & Refreshments" },
      { time: "9:00 PM", label: "Mentorship & Judging Round 1" },
    ],
  },
  {
    step: 6,
    month: "MAR",
    day: "15",
    year: "2026",
    iso: "2026-03-15",
    kanji: "六",
    title: "Offline Hackathon — Day 2",
    desc: "Final sprint. Polish, submit, pitch before the grand jury, and claim victory.",
    time: "08:00 AM – 05:30 PM",
    schedule: [
      { time: "8:00 AM – 9:00 AM", label: "Breakfast" },
      { time: "10:00 AM", label: "Judging Round 2" },
      { time: "12:30 PM – 1:30 PM", label: "Lunch" },
      { time: "3:00 PM – 3:15 PM", label: "Final Code & PPT Submissions" },
      { time: "3:15 PM", label: "Grand Stage Pitching (Top 5 Finalists)" },
      { time: "4:30 PM", label: "Jury Deliberation & Final Decision" },
      { time: "5:00 PM – 5:30 PM", label: "Closing Ceremony & Prize Distribution" },
    ],
  },
];

function getStatus(iso, now) {
  const d = new Date(iso);
  if (d < now) return "past";
  if (d.toDateString() === now.toDateString()) return "active";
  return "future";
}

export default function Timeline() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stackRef = useRef(null);

  const enriched = useMemo(() => {
    const now = new Date();
    const statuses = events.map((event) => getStatus(event.iso, now));
    const nextIndex = statuses.findIndex((status) => status === "future");

    return events.map((event, index) => {
      return {
        ...event,
        status: statuses[index],
        isNext: index === nextIndex,
        isLocked: index > 0,
      };
    });
  }, []);

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

      // Timeline entries
      const entries = stackRef.current?.querySelectorAll(".tl-entry");
      if (entries?.length) {
        entries.forEach((entry) => {
          gsap.fromTo(
            entry,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: entry,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="tl-section" id="timeline" ref={sectionRef}>
      <img
        className="tl-dragon tl-dragon--left"
        src="/NEW PICS/japanese-chinese-dragon-printing-paper-chinese-new-year-red-white-background-dragon-tattoo-design-134502691-removebg-preview.png"
        alt=""
        aria-hidden="true"
      />
      <img
        className="tl-dragon tl-dragon--right"
        src="/NEW PICS/japanese-chinese-dragon-printing-paper-chinese-new-year-red-white-background-dragon-tattoo-design-134502691-removebg-preview.png"
        alt=""
        aria-hidden="true"
      />
      <div className="tl-container">
        {/* Header */}
        <div className="tl-header" ref={headerRef}>
          <span className="section-header-tag">THE MASTER PLAN</span>
          <h2 className="section-heading-main">TIMELINE</h2>
          <p className="section-subtitle-text">
            Every checkpoint counts. Mark the milestones on your path to victory.
          </p>
        </div>

        {/* Vertical Scroll Timeline */}
        <div className="tl-scroll-wrapper" ref={stackRef}>
          <div className="tl-spine-line" aria-hidden="true" />

          {enriched.map((e) => (
            <div
              key={e.step}
              className={`tl-entry tl-entry--${e.status} ${e.isNext ? "tl-entry--next" : ""}`}
            >
              {/* Center Seal Marker */}
              <div className="tl-marker-wrap">
                <div className="tl-seal-marker">
                  <span>{e.kanji}</span>
                </div>
              </div>

              {/* Plaque Card */}
              <div className={`tl-card asian-frame ${e.isLocked ? "tl-card--locked" : ""}`}>
                {e.isLocked && (
                  <div className="tl-lock-overlay" aria-label="Timeline event locked">
                    <span className="tl-lock-icon" aria-hidden="true">锁</span>
                    <span className="tl-lock-label">TIMELINE LOCKED</span>
                    <span className="tl-lock-caption">TO BE DECLARED</span>
                  </div>
                )}
                <div className="tl-card-top">
                  <div className="tl-date-badge font-bebas">
                    <span className="tl-year">DATE</span>
                    <span className="tl-month">TO BE</span>
                    <span className="tl-month">DECLARED</span>
                  </div>

                  <div className="tl-status-badges">
                    {e.status === "past" && <span className="tl-badge tl-badge--past font-bebas">COMPLETED</span>}
                    {e.status === "active" && <span className="tl-badge tl-badge--live font-bebas">● LIVE TODAY</span>}
                    {e.isNext && <span className="tl-badge tl-badge--next font-bebas">▶ UP NEXT</span>}
                    {e.time && <span className="tl-badge tl-badge--time font-bebas">{e.time}</span>}
                  </div>
                </div>

                <h3 className="tl-title font-cinzel">{e.title}</h3>
                <p className="tl-desc">{e.desc}</p>

                {e.schedule && (
                  <div className="tl-schedule-box">
                    <span className="tl-schedule-heading font-bebas">DAILY ITINERARY</span>
                    <ul className="tl-schedule-list">
                      {e.schedule.map((item, idx) => (
                        <li key={idx} className="tl-schedule-row">
                          <span className="tl-schedule-time font-cinzel">{item.time}</span>
                          <span className="tl-schedule-dot">✦</span>
                          <span className="tl-schedule-label">{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
