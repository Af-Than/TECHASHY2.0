"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const intel = [
  {
    index: "01",
    label: "DIRECTIVE",
    heading: "Our Mission",
    body: "TEKASHI 2.0 exists to turn pressure into product. We compress months of ideation into 24 relentless hours — forcing decisions, demanding output, rewarding execution.",
  },
  {
    index: "02",
    label: "ORIGIN",
    heading: "Who We Are",
    body: "Powered by Betalabs at IIIT Kottayam. Built by builders for builders. A high-octane community of developers, designers, and domain experts pushing the frontiers of engineering.",
  },
  {
    index: "03",
    label: "ARSENAL",
    heading: "What We Provide",
    body: "Seasoned mentors with scars. Prizes worth chasing. High-speed infrastructure that doesn't fail. A network and brotherhood that outlasts the weekend.",
  },
  {
    index: "04",
    label: "TERRAIN",
    heading: "The Experience",
    body: "Immersive. Loud. Exhausting. Unforgettable. You will ship something real. You will meet innovators who change your trajectory forever.",
  },
];

const stats = [
  { value: "24", unit: "HRS", label: "Non-stop Hacking" },
  { value: "150", unit: "+", label: "Elite Participants" },
  { value: "80,808", unit: "₹", label: "Total Prize Pool" },
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
      // Header animation
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
              stagger: 0.15,
              ease: "power2.out",
            });
          },
        });
      }

      // Strips animation
      const strips = intelRef.current?.querySelectorAll(".ab-plaque");
      if (strips?.length) {
        gsap.set(strips, { y: 35, opacity: 0 });
        ScrollTrigger.create({
          trigger: intelRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(strips, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: "power2.out",
            });
          },
        });
      }

      // Stats animation & counter
      const statEls = statsRef.current?.querySelectorAll(".ab-stat-box");
      if (statEls?.length) {
        gsap.set(statEls, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(statEls, {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: "power2.out",
            });

            const counters = statsRef.current.querySelectorAll("[data-count]");
            counters.forEach((el) => {
              const raw = el.dataset.count;
              const numericTarget = parseFloat(raw.replace(/[^0-9.]/g, ""));
              gsap.fromTo(
                { val: 0 },
                { val: numericTarget },
                {
                  val: numericTarget,
                  duration: 2.2,
                  ease: "power2.out",
                  delay: 0.2,
                  onUpdate: function () {
                    el.textContent = Math.round(this.targets()[0].val).toLocaleString();
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
      {/* Decorative Pagoda Blossom Silhouette (Transparent) */}
      <div className="ab-decorative-bg" aria-hidden="true">
        <Image
          src="/pictures/pagoda-blossoms-nobg.png"
          alt="Pagoda artwork"
          width={400}
          height={600}
          className="ab-pagoda-img"
        />
      </div>

      <div className="ab-container">
        {/* Header */}
        <div className="ab-header" ref={headerRef}>
          <span className="section-header-tag">THE INITIATIVE</span>
          <h2 className="section-heading-main">ABOUT TEKASHI 2.0</h2>
          <p className="section-subtitle-text">
            &ldquo;A crucible for relentless creators, coders, and architects.&rdquo;
          </p>
        </div>

        {/* Traditional Intel Plaques */}
        <div className="ab-grid" ref={intelRef}>
          {intel.map((item, i) => (
            <div className="ab-plaque asian-frame" key={item.index} style={{ "--i": i }}>
              <div className="ab-plaque-top">
                <span className="ab-plaque-num">{item.index}</span>
                <span className="ab-plaque-tag">{item.label}</span>
                <span className="hanko-seal" style={{ marginLeft: "auto", width: "24px", height: "24px", fontSize: "10px" }}>
                  志
                </span>
              </div>
              <div className="ab-plaque-goldline" />
              <h3 className="ab-plaque-heading">{item.heading}</h3>
              <p className="ab-plaque-body">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="ab-stats" ref={statsRef}>
          {stats.map((s, i) => (
            <div className="ab-stat-box asian-frame" key={s.label} style={{ "--i": i }}>
              <div className="ab-stat-val">
                {s.unit === "₹" && <span className="ab-stat-curr">₹</span>}
                {/[^\d,.]/.test(s.value) ? (
                  <span>{s.value}</span>
                ) : (
                  <span data-count={s.value}>0</span>
                )}
                {s.unit !== "₹" && <span className="ab-stat-unit">{s.unit}</span>}
              </div>
              <div className="ab-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
