"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import "./LoadingAnimation.css";

export default function LoadingAnimation({ onComplete }) {
  const containerRef = useRef(null);
  const inkDropRef = useRef(null);
  const ringWrapRef = useRef(null);
  const ensoPathRef = useRef(null);
  const sealRef = useRef(null);
  const titleBoxRef = useRef(null);
  const kanjiRef = useRef(null);
  const titleRef = useRef(null);
  const goldLineRef = useRef(null);
  const subtitleRef = useRef(null);
  const breatheTweenRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(container, { opacity: 1, visibility: "visible" });
      const timer = setTimeout(() => {
        gsap.to(container, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            document.body.style.overflow = prevOverflow;
            onComplete?.();
          },
        });
      }, 500);
      return () => clearTimeout(timer);
    }

    const ctx = gsap.context(() => {
      const ensoLength = ensoPathRef.current?.getTotalLength?.() ?? 240;

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = prevOverflow;
          onComplete?.();
        },
      });

      // ── Initial states ──
      gsap.set(container, { opacity: 1, visibility: "visible" });
      gsap.set(inkDropRef.current, { opacity: 0, scale: 0.85 });
      gsap.set(sealRef.current, { scale: 0.6, opacity: 0 });
      gsap.set(ensoPathRef.current, {
        strokeDasharray: ensoLength,
        strokeDashoffset: ensoLength,
        opacity: 0,
      });
      gsap.set(kanjiRef.current, { opacity: 0, y: 10, letterSpacing: "0.1em" });
      gsap.set(titleRef.current, { opacity: 0, y: 16, scale: 0.97 });
      gsap.set(goldLineRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 12 });

      // 0.2s — background glow breathes in
      tl.to(inkDropRef.current, {
        opacity: 0.85,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
      }, 0.2);

      // 0.3s — seal fades and scales in
      tl.to(sealRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.55,
        ease: "back.out(1.6)",
      }, 0.3);

      // 0.6s — enso ring draws around the seal like a brushstroke
      tl.to(ensoPathRef.current, {
        opacity: 1,
        duration: 0.15,
      }, 0.6)
        .to(ensoPathRef.current, {
          strokeDashoffset: ensoLength * 0.08,
          duration: 1.0,
          ease: "power2.inOut",
        }, 0.6);

      // 0.8s — Japanese subtitle fades/tracks in
      tl.to(kanjiRef.current, {
        opacity: 1,
        y: 0,
        letterSpacing: "0.4em",
        duration: 0.55,
        ease: "power2.out",
      }, 0.8);

      // 1.0s — TECHASHY logo fades/slides in
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      }, 1.0);

      // 1.3s — gold divider draws open
      tl.to(goldLineRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }, 1.3);

      // 1.5s — bottom tagline fades in
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      }, 1.5);

      // Hold, then cinematic exit — brighten + settle + fade
      tl.to(titleRef.current, {
        textShadow:
          "0 0 46px rgba(216,185,120,0.85), 0 0 16px rgba(255,241,208,0.6)",
        duration: 0.35,
        ease: "power1.out",
      }, 2.35)
        .to(container, {
          scale: 1.015,
          duration: 0.55,
          ease: "power2.inOut",
        }, 2.35)
        .to(container, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        }, 2.55);

      // Continuous subtle breathing glow on the seal while loading
      breatheTweenRef.current = gsap.to(sealRef.current, {
        boxShadow:
          "0 0 26px rgba(230,57,70,0.75), 0 6px 18px rgba(0,0,0,0.6)",
        duration: 1.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.85,
      });
    }, containerRef);

    return () => {
      document.body.style.overflow = prevOverflow;
      breatheTweenRef.current?.kill();
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="tekashi-loader" aria-hidden="true">
      <div className="tekashi-loader-grain" />
      <div ref={inkDropRef} className="tekashi-loader-ink" />

      {/* Faint corner wave art — decorative, doesn't compete with the logo */}
      <div className="tekashi-loader-wave tekashi-loader-wave--bl">
        <Image
          src="/NEW%20PICS/WAVE.png"
          alt=""
          width={420}
          height={420}
          className="tekashi-loader-wave-img"
        />
      </div>
      <div className="tekashi-loader-wave tekashi-loader-wave--tr">
        <Image
          src="/NEW%20PICS/WAVE.png"
          alt=""
          width={360}
          height={360}
          className="tekashi-loader-wave-img"
        />
      </div>

      {/* Drifting petals — subtle, few, slow */}
      <div className="tekashi-loader-petals" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <span key={i} className={`tekashi-loader-petal tekashi-loader-petal-${i}`} />
        ))}
      </div>

      <div className="tekashi-loader-content">
        {/* Ensō ring + Hanko seal */}
        <div className="tekashi-loader-seal-box" ref={ringWrapRef}>
          <svg
            className="tekashi-enso-svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={ensoPathRef}
              d="M 50 8
                 A 42 42 0 1 1 15 30"
              fill="none"
              stroke="#D8B978"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
          <div ref={sealRef} className="tekashi-loader-stamp">
            <span>極</span>
          </div>
        </div>

        {/* Title */}
        <div ref={titleBoxRef} className="tekashi-loader-title-wrap">
          <span ref={kanjiRef} className="tekashi-loader-kanji">技術の祭典</span>
          <h1 ref={titleRef} className="tekashi-loader-title">TECHASHY</h1>
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