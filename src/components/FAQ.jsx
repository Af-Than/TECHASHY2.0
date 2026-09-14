"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FAQ.css";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What is TECHASHY 2.0?",
    a: "TECHASHY 2.0 is a premier national technology hackathon powered by Betalabs at IIIT Kottayam. It is a 24-hour intensive crucible where developers, designers, and innovators unite to engineer groundbreaking hardware and software solutions.",
  },
  {
    q: "Who is eligible to participate?",
    a: "Undergraduate and postgraduate students, developers, and tech enthusiasts from all disciplines across India are welcome. Teams of 3–5 members are recommended to foster cross-disciplinary synergy.",
  },
  {
    q: "Is there any registration fee?",
    a: "Zero. TECHASHY 2.0 is completely free of charge. No registration fees, no hidden costs. Just bring your passion, skills, and laptops.",
  },
  {
    q: "When and where is TECHASHY 2.0 hosted?",
    a: "TECHASHY 2.0 takes place on October 10, 2026, on the permanent campus of the Indian Institute of Information Technology (IIIT), Kottayam, Kerala. Check-in and the opening ceremony begin at 1:30 PM.",
  },
  {
    q: "What categories and projects can we build?",
    a: "Anything that moves humanity forward—AI & Machine Learning models, Web & Mobile applications, Climate/GreenTech systems, Smart Cities & IoT embedded devices, Blockchain security, or Civic tech platforms across our 7 official tracks.",
  },
  {
    q: "What are the prizes and recognition?",
    a: "A total cash prize pool of ₹80,808 is up for grabs! 1st Place wins ₹40,404 plus internship opportunities at student-founded startups from IIIT Kottayam, 2nd Place wins ₹20,202, 3rd Place wins ₹10,101, and the Special Agentic AI Award winner takes ₹10,101. Every submitting team receives an official TECHASHY 2.0 certificate of participation.",
  },
  {
    q: "What should participants bring to the venue?",
    a: "Bring your laptop, chargers, extension cords, valid college ID cards, and personal toiletries. If your project involves hardware or IoT sensors, please bring your own components and boards.",
  },
  {
    q: "Will food, internet, and resting areas be provided?",
    a: "Yes! High-speed network infrastructure, delicious meals, midnight snacks, and designated rest/recharge areas will be provided on-campus throughout the 24 hours.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(-1);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);

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

      // FAQ Cards
      const cards = listRef.current?.querySelectorAll(".faq-item");
      if (cards?.length) {
        gsap.set(cards, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: listRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.08,
              ease: "power2.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="faq-section" id="faq" ref={sectionRef}>
      <div className="faq-container">
        {/* Header */}
        <div className="faq-header" ref={headerRef}>
          <span className="section-header-tag">INQUIRIES & DIRECTIVES</span>
          <h2 className="section-heading-main">FAQ</h2>
          <p className="section-subtitle-text">
            Everything you need to know before stepping into the arena.
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-list" ref={listRef}>
          {faqs.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                className={`faq-item asian-frame ${isOpen ? "faq-item--open" : ""}`}
                onClick={() => setOpen(isOpen ? -1 : idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen(isOpen ? -1 : idx);
                  }
                }}
                aria-expanded={isOpen}
              >
                <div className="faq-question-row">
                  <span className="faq-num font-cinzel">{String(idx + 1).padStart(2, "0")}</span>
                  <h3 className="faq-q-text font-cinzel">{item.q}</h3>
                  <div className={`faq-icon ${isOpen ? "open" : ""}`} aria-hidden="true">
                    <span>{isOpen ? "−" : "+"}</span>
                  </div>
                </div>

                <div
                  className="faq-answer-wrap"
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="faq-gold-line" />
                  <p className="faq-a-text">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
