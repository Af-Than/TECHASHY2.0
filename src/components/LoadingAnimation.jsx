"use client";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "./LoadingAnimation.css";

export default function LoadingAnimation({ onComplete }) {
  const [phase, setPhase] = useState("loading"); // loading | revealing
  const containerRef = useRef(null);
  const leftCurtainRef = useRef(null);
  const rightCurtainRef = useRef(null);
  const ensoRef = useRef(null);
  const textWrapperRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // Phase 1: Loading animation runs for 2.8s
    const revealTimeout = setTimeout(() => {
      setPhase("revealing");

      // Phase 2: Dramatic curtain reveal
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        },
      });

      // Flash the progress bar
      if (progressRef.current) {
        tl.to(progressRef.current, {
          boxShadow: "0 0 30px rgba(220, 20, 60, 1), 0 0 60px rgba(220, 20, 60, 0.6)",
          duration: 0.3,
          ease: "power2.in",
        }, 0);
      }

      // Scale up the enso circle and fade
      if (ensoRef.current) {
        tl.to(ensoRef.current, {
          scale: 2.5,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        }, 0.1);
      }

      // Fade text
      if (textWrapperRef.current) {
        tl.to(textWrapperRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.4,
          ease: "power2.in",
        }, 0);
      }

      // Curtain split — left panel slides left
      if (leftCurtainRef.current) {
        tl.to(leftCurtainRef.current, {
          x: "-100%",
          duration: 0.9,
          ease: "power3.inOut",
        }, 0.4);
      }

      // Curtain split — right panel slides right
      if (rightCurtainRef.current) {
        tl.to(rightCurtainRef.current, {
          x: "100%",
          duration: 0.9,
          ease: "power3.inOut",
        }, 0.4);
      }

    }, 2800);

    return () => {
      clearTimeout(revealTimeout);
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="loading-container">
      {/* Left curtain */}
      <div ref={leftCurtainRef} className="loading-curtain loading-curtain--left">
        {/* Red glows */}
        <div className="loading-glow-1" />
        {/* Corner decorations */}
        <div className="loading-corner loading-corner-tl" />
        <div className="loading-corner loading-corner-bl" />
      </div>

      {/* Right curtain */}
      <div ref={rightCurtainRef} className="loading-curtain loading-curtain--right">
        <div className="loading-glow-2" />
        <div className="loading-corner loading-corner-tr" />
        <div className="loading-corner loading-corner-br" />
      </div>

      {/* Center content (sits on top of curtains) */}
      <div className="loading-center-content">
        {/* Enso circle */}
        <div ref={ensoRef} className="loading-enso" />

        {/* TECHASHY text */}
        <div ref={textWrapperRef} className="loading-text-wrapper">
          <div className="loading-text-cycle">
            <span className="loading-text-item">TECHASHY</span>
            <span className="loading-text-item loading-text-jp">テックアシ</span>
            <span className="loading-text-item">TECHASHY</span>
          </div>
        </div>

        {/* Subtitle */}
        <div className="loading-subtitle">ハッカソン • HACKATHON</div>

        {/* Progress bar */}
        <div className="loading-progress-container">
          <div ref={progressRef} className="loading-progress-bar" />
        </div>
      </div>

      {/* Vertical split line */}
      <div className="loading-split-line" />

      {/* Wave decoration at bottom */}
      <div className="loading-wave" />
    </div>
  );
}
