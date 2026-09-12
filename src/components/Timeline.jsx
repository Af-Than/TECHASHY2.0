"use client";

import { useEffect, useMemo, useRef } from "react";
import "./Timeline.css";

const events = [
  {
    step: 1,
    month: "FEB",
    day: "27",
    year: "2026",
    iso: "2026-02-27",
    title: "Registration Opens",
    desc: "Google Form goes live at 10:00 AM. Assemble your team and lock in your slot — limited seats.",
    time: "10:00 AM",
    cta: null,
  },
  {
    step: 2,
    month: "MAR",
    day: "07",
    year: "2026",
    iso: "2026-03-07",
    title: "Registration & Submission Deadline",
    desc: "Hard deadline at 11:59 PM. Registrations are now closed.",
    time: "11:59 PM",
    cta: null,
  },
  {
    step: 3,
    month: "MAR",
    day: "08",
    year: "2026",
    iso: "2026-03-08",
    title: "Round 1 Shortlisting",
    desc: "Selected teams notified by email. Check your inbox and confirm your spot.",
    time: null,
    cta: null,
  },
  {
    step: 4,
    month: "MAR",
    day: "11",
    year: "2026",
    iso: "2026-03-11",
    title: "RSVP Deadline",
    desc: "Shortlisted teams must confirm attendance. No RSVP — no entry.",
    time: null,
    cta: null,
  },
  {
    step: 5,
    month: "MAR",
    day: "14",
    year: "2026",
    iso: "2026-03-14",
    title: "Offline Hackathon — Day 1",
    desc: "The arena opens. 24 hours of building starts NOW.",
    time: null,
    cta: null,
    schedule: [
      { time: "1:30 PM",  label: "Registration Starts" },
      { time: "2:30 PM", label: "Registration Ends" },
      { time: "2:30 PM", label: "Inauguration Ceremony" },
      { time: "3:00 PM", label: "Hackathon Begins" },
      { time: "7:30 PM - 8:30 PM",  label: "Dinner" },
      { time: "9:00 PM",  label: "Judging Round 1" },
    ],
  },
  {
    step: 6,
    month: "MAR",
    day: "15",
    year: "2026",
    iso: "2026-03-15",
    title: "Offline Hackathon — Day 2",
    desc: "Final stretch. Submit, present, and claim your victory.",
    time: null,
    cta: null,
    schedule: [
      { time: "8:00 AM - 9:00 AM",  label: "Breakfast" },
      { time: "10:00 AM", label: "Round 2 Judging" },
      { time: "12:30 PM- 1:30 PM", label: "Lunch" },
      { time: "3:00 PM - 3 :15 PM",  label: "Product & PPT Submission" },
      { time: "3:15 PM",  label: "Judging Starts(Top 5 Teams)" },
      { time: "4:30 PM",  label: "Final Decision" },
      { time: "5:00 PM - 5:30 PM",  label: "Closing Ceremony" },
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

  const enriched = useMemo(() => {
    const now = new Date();
    let markedNext = false;
    return events.map((e) => {
      const status = getStatus(e.iso, now);
      const isNext = status === "future" && !markedNext;
      if (isNext) markedNext = true;
      return { ...e, status, isNext };
    });
  }, []);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".tl-card");
    if (!cards) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("tl-card--in", entry.isIntersecting);
        });
      },
      { threshold: 0.12 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="tl-section" id="timeline" ref={sectionRef}>
      {/* Horizontal scan lines */}
      <div className="tl-scanlines" aria-hidden="true" />

      <div className="tl-wrap">

        {/* ── Header ── */}
        <div className="tl-header">
          <span className="tl-eyebrow">WHEN ARE YOU SHIPPING</span>
          <h2 className="tl-hdr-title">
            <span className="tl-heading-slash">/</span>TIMELINE
          </h2>
          <p className="tl-hdr-sub">Every checkpoint counts. Miss one. Miss all.</p>
        </div>

        {/* ── Cards ── */}
        <div className="tl-stack">
          {enriched.map((e, i) => (
            <article
              key={e.step}
              className={`tl-card tl-card--${e.status}${e.isNext ? " tl-card--next" : ""}`}
              style={{ "--i": i }}
            >
              {/* Step counter */}
              <div className="tl-step-col">
                <span className="tl-step-num">0{e.step}</span>
                <span className="tl-step-divider" aria-hidden="true" />
              </div>

              {/* Date block */}
              <div className="tl-date-col">
                <span className="tl-date-month">{e.month}</span>
                <span className="tl-date-day">{e.day}</span>
                <span className="tl-date-year">{e.year}</span>
              </div>

              {/* Main content */}
              <div className="tl-content-col">
                <div className="tl-status-row">
                  {e.status === "past" && <span className="tl-badge tl-badge--done">COMPLETED</span>}
                  {e.status === "future" && !e.isNext && <span className="tl-badge tl-badge--soon">UPCOMING</span>}
                  {e.isNext && <span className="tl-badge tl-badge--next">▶ UP NEXT</span>}
                  {e.status === "active" && <span className="tl-badge tl-badge--live">● LIVE NOW</span>}
                  {e.time && <span className="tl-badge tl-badge--time">{e.time}</span>}
                </div>
                <h3 className="tl-title">{e.title}</h3>
                <p className="tl-desc">{e.desc}</p>
                {e.schedule && (
                  <ul className="tl-schedule">
                    {e.schedule.map((s, si) => (
                      <li key={si} className="tl-schedule-item">
                        <span className="tl-schedule-time">{s.time}</span>
                        <span className="tl-schedule-label">{s.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {e.cta && <a href="https://docs.google.com/forms/d/e/1FAIpQLSc4frcVdElaOrQMDpq12-OkmvQPQo52Loqz14MZSTEeR09__Q/viewform" target="_blank" rel="noopener noreferrer" className="tl-cta">{e.cta}</a>}
              </div>

              {/* Pulsing ring on next event */}
              {e.isNext && (
                <div className="tl-next-ring" aria-hidden="true">
                  <span /><span />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
