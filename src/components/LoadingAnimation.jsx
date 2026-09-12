"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./LoadingAnimation.css";

export default function LoadingAnimation({ onComplete }) {
  const containerRef = useRef(null);
  const inkDropRef = useRef(null);
  const ensoRingRef = useRef(null);
  const titleBoxRef = useRef(null);
  const subtitleRef = useRef(null);
  const sealRef = useRef(null);
  const goldLineRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        document.body.style.overflow = prevOverflow;
        onComplete?.();
      }, 300);
      return () => clearTimeout(timer);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = prevOverflow;
          onComplete?.();
        },
      });

      // Initial States
      gsap.set(container, { opacity: 1, visibility: "visible" });
      gsap.set(inkDropRef.current, { scale: 0, opacity: 0 });
      gsap.set(ensoRingRef.current, { rotation: -45, scale: 0.8, opacity: 0 });
      gsap.set(titleBoxRef.current, { opacity: 0, y: 25, scale: 0.95 });
      gsap.set(goldLineRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 15 });
      gsap.set(sealRef.current, { scale: 1.6, opacity: 0 });

      // 1. Red Ink Droplet Bloom
      tl.to(inkDropRef.current, {
        scale: 1,
        opacity: 0.85,
        duration: 0.35,
        ease: "power2.out",
      }, 0.1);

      // 2. Gold Ensō Ring reveal
      tl.to(ensoRingRef.current, {
        opacity: 0.9,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "back.out(1.4)",
      }, 0.3);

      // 3. TEKASHI 2.0 title reveal
      tl.to(titleBoxRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      }, 0.5);

      // 4. Gold line expand
      tl.to(goldLineRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      }, 0.7);

      // 5. Subtitle & Red Seal Stamp
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      }, 0.8);

      tl.to(sealRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.25,
        ease: "back.out(2)",
      }, 0.85);

      // 6. Hold and smoothly fade out to hero
      tl.to(container, {
        opacity: 0,
        duration: 0.45,
        ease: "power2.inOut",
      }, 1.7);

    }, containerRef);

    return () => {
      document.body.style.overflow = prevOverflow;
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="tekashi-loader" aria-hidden="true">
      <div className="tekashi-loader-grain" />

      {/* Ink Bloom Background */}
      <div ref={inkDropRef} className="tekashi-loader-ink" />

      <div className="tekashi-loader-content">
        {/* Ensō Ring with Hanko Seal */}
        <div className="tekashi-loader-seal-box">
          <div ref={ensoRingRef} className="tekashi-enso-circle" />
          <div ref={sealRef} className="tekashi-loader-stamp">
            <span>極</span>
          </div>
        </div>

        {/* Title */}
        <div ref={titleBoxRef} className="tekashi-loader-title-wrap">
          <span className="tekashi-loader-kanji">技術の祭典</span>
          <h1 className="tekashi-loader-title">TECHASHY</h1>
        </div>

        {/* Gold ornamental line */}
        <div ref={goldLineRef} className="tekashi-loader-goldline" />

        {/* Subtitle */}
        <div ref={subtitleRef} className="tekashi-loader-sub">
          <span className="tekashi-loader-sub-item">FORGED IN 24 HOURS</span>
          <span className="tekashi-loader-sub-dot">✦</span>
          <span className="tekashi-loader-sub-item">POWERED BY BETALABS</span>
        </div>
      </div>
    </div>
  );
}
