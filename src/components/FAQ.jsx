"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FAQ.css";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "What is Techashy?", a: "Techashy is a premier technology hackathon powered by Betalabs. It's an intensive event where innovators, developers, and creators come together to build groundbreaking projects." },
  { q: "Who can participate?", a: "Students, professionals, and technology enthusiasts of all backgrounds are welcome. Teams of 3–5 members are recommended for collaborative innovation." },
  { q: "Is there a registration fee?", a: "Absolutely none. Techashy is completely free to participate in — no registration fee, no hidden charges. Just bring your skills and ideas." },
  { q: "When and where is Techashy?", a: "Techashy takes place on March 14–15, 2026 at the Indian Institute of Information Technology (IIIT), Kottayam, Kerala. Registration opens at 1:30 PM on March 14, followed by the inauguration ceremony at 2:30 PM and the hackathon kicking off at 3:00 PM. The event wraps up on March 15 with the closing ceremony from 5:00 PM – 5:30 PM." },
  { q: "What can I build?", a: "Anything impactful—web apps, mobile applications, AI/ML solutions, hardware projects, or open-source tools. Specific tracks will be announced at the event." },
  { q: "Are there prizes?", a: "Yes — ₹80,808 in total prizes. 1st place wins ₹40,404 plus an internship opportunity at a student-powered startup from IIIT Kottayam. 2nd place takes ₹20,202, and 3rd place wins ₹10,101. Every participant also receives an official Techashy certificate." },
  { q: "What should I bring?", a: "Bring your laptop, chargers, valid ID, and your creativity. If your project involves hardware, make sure to bring all the equipment and components you need — we will not be providing any hardware. Plan ahead and pack everything required to bring your idea to life." },
  { q: "Will food be provided?", a: "Yes, meals and refreshments will be provided throughout the event to keep you energized." },
];

export default function FAQ() {
  const [open, setOpen] = useState(-1);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header — fade up
      const headerEls = headerRef.current?.querySelectorAll(".faq-header-accent, .faq-title, .faq-subtitle");
      if (headerEls?.length) {
        gsap.set(headerEls, { y: 25, opacity: 0 });
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(headerEls, {
              y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power2.out",
            });
            // Accent line
            const accent = headerRef.current?.querySelector(".faq-header-accent");
            if (accent) {
              gsap.fromTo(accent, { width: 0 }, { width: 100, duration: 1, ease: "power2.out", delay: 0.2 });
            }
          },
        });
      }

      // Cards — staggered fade up
      const cards = listRef.current?.querySelectorAll(".faq-card");
      if (cards?.length) {
        gsap.set(cards, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: listRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power2.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="faq-section" id="faq" ref={sectionRef}>
      <div className="faq-bg-glow"></div>
      <div className="faq-grid-pattern"></div>
      <div className="faq-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="faq-particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
          }}></div>
        ))}
      </div>

      <div className="faq-container">
        <div className="faq-header" ref={headerRef}>
          <div className="faq-header-accent"></div>
          <h2 className="faq-title">FAQ</h2>
          <p className="faq-subtitle">Everything you need to know</p>
        </div>

        <div className="faq-list" ref={listRef}>
          {faqs.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                className={`faq-card katana-shine katana-shine-crimson ${isOpen ? "faq-card--open" : ""}`}
                onClick={() => setOpen(isOpen ? -1 : idx)}
                role="button"
                aria-expanded={isOpen}
              >
                <div className="faq-card__glow"></div>
                <div className="faq-card__content">
                  <div className="faq-card__top">
                    <span className="faq-card__num">{String(idx + 1).padStart(2, "0")}</span>
                    <h3 className="faq-card__q">{item.q}</h3>
                    <div className={`faq-toggle ${isOpen ? "open" : ""}`} aria-hidden>
                      <div className="faq-toggle__line"></div>
                      <div className="faq-toggle__line"></div>
                    </div>
                  </div>
                  <div className="faq-card__a" style={{ maxHeight: isOpen ? '400px' : '0' }}>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
