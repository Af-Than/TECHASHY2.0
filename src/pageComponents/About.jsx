"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const intel = [
  {
    index: "01",
    label: "DIRECTIVE",
    heading: "Our Mission",
    body: "Techashy exists to turn pressure into product. We compress months of ideation into 24 relentless hours — forcing decisions, demanding output, rewarding execution.",
  },
  {
    index: "02",
    label: "ORIGIN",
    heading: "Who We Are",
    body: "Powered by Betalabs. Built by builders. A community of developers, designers, and domain experts who believe the best ideas survive contact with reality.",
  },
  {
    index: "03",
    label: "ARSENAL",
    heading: "What We Provide",
    body: "Mentors with scars. Prizes worth chasing. Infrastructure that doesn't fail. A network that outlasts the weekend.",
  },
  {
    index: "04",
    label: "TERRAIN",
    heading: "The Experience",
    body: "Immersive. Loud. Exhausting. Unforgettable. You will ship something real. You will meet someone who changes your trajectory.",
  },
];

const stats = [
  { value: "24", unit: "HRS", label: "Non-stop" },
  { value: "150", unit: "+", label: "Participants" },
  { value: "80,808", unit: "₹", label: "In prizes" },
  { value: "3-5", unit: "", label: "Team Size" },
];

export default function About() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const intelRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      // Headline — smooth slide up
      const headline = headerRef.current?.querySelector(".ab-headline");
      if (headline) {
        gsap.set(headline, { y: 50, opacity: 0 });
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(headline, { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" });
          },
        });
      }

      // Chapter label — fade in from left
      const chapter = headerRef.current?.querySelector(".ab-chapter");
      if (chapter) {
        gsap.set(chapter, { x: -30, opacity: 0 });
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(chapter, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
          },
        });
      }

      // Lede text
      const lede = headerRef.current?.querySelector(".ab-lede");
      if (lede) {
        gsap.set(lede, { y: 20, opacity: 0 });
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(lede, { y: 0, opacity: 1, duration: 0.9, delay: 0.3, ease: "power2.out" });
          },
        });
      }

      // Intel strips — staggered slide from left
      const strips = intelRef.current?.querySelectorAll(".ab-strip");
      if (strips?.length) {
        gsap.set(strips, { x: -40, opacity: 0 });
        ScrollTrigger.create({
          trigger: intelRef.current,
          start: "top 78%",
          once: true,
          onEnter: () => {
            gsap.to(strips, {
              x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out",
            });
          },
        });
      }

      // Stats — fade up with counter
      const statEls = statsRef.current?.querySelectorAll(".ab-stat");
      if (statEls?.length) {
        gsap.set(statEls, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(statEls, {
              y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
            });

            // Counter animation
            const counters = statsRef.current.querySelectorAll("[data-count]");
            counters.forEach((el) => {
              const raw = el.dataset.count;
              const numericTarget = parseFloat(raw.replace(/[^0-9.]/g, ""));
              gsap.fromTo(
                { val: 0 },
                { val: numericTarget },
                {
                  val: numericTarget,
                  duration: 2.5,
                  ease: "power2.out",
                  delay: 0.4,
                  onUpdate: function () {
                    el.textContent = Math.round(this.targets()[0].val);
                  },
                }
              );
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ab-section" id="about" ref={sectionRef}>
      <div className="ab-dotgrid" aria-hidden="true" />
      <div className="ab-container">
        <div className="ab-header" ref={headerRef}>
          <span className="ab-chapter">&#x2014;&nbsp;ABOUT&nbsp;&#x2014;</span>
          <h2 className="ab-headline">
            FORGED IN
            <br />
            <em className="ab-headline-red">24 HOURS.</em>
          </h2>
          <p className="ab-lede">
            A hackathon is not an event.&nbsp;
            It&apos;s a controlled detonation.
          </p>
        </div>

        <div className="ab-intel" ref={intelRef}>
          {intel.map((item, i) => (
            <div className="ab-strip katana-shine katana-shine-crimson" key={item.index} style={{ "--i": i }}>
              <div className="ab-strip-index">
                <span className="ab-strip-num">{item.index}</span>
                <span className="ab-strip-tag">{item.label}</span>
              </div>
              <div className="ab-strip-divider" aria-hidden="true" />
              <div className="ab-strip-body">
                <h3 className="ab-strip-heading">{item.heading}</h3>
                <p className="ab-strip-text">{item.body}</p>
              </div>
              <div className="ab-strip-bar" aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="ab-stats" ref={statsRef}>
          {stats.map((s, i) => (
            <div className="ab-stat" key={s.label} style={{ "--i": i }}>
              <div className="ab-stat-num">
                {/[^\d,.]/.test(s.value) ? (
                  <span>{s.value}</span>
                ) : (
                  <span data-count={s.value}>0</span>
                )}
                <span className="ab-stat-unit">{s.unit}</span>
              </div>
              <div className="ab-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
