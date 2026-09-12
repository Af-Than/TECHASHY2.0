"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingAnimation from "../components/LoadingAnimation";
import Navbar from "../components/Navbar";
import About from "../pageComponents/About";
import Tracks from "../pageComponents/Tracks";
import Prizes from "../pageComponents/Prizes";
import Sponsors from "../pageComponents/Sponsors";
import Timeline from "../components/Timeline";
import Venue from "../components/Venue";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ── Slot-machine rolling digit ── */
function RollingDigit({ digit }) {
  const d = parseInt(digit, 10);
  return (
    <div className="cd-reel-window">
      <div className="cd-reel-strip" style={{ transform: `translateY(-${d * 10}%)` }}>
        {[0,1,2,3,4,5,6,7,8,9].map(n => (
          <div key={n} className="cd-reel-cell">{n}</div>
        ))}
      </div>
    </div>
  );
}

function RollingUnit({ value, label }) {
  const s = String(value).padStart(2, "0");
  return (
    <div className="cd-unit">
      <div className="cd-cell">
        <div className="cd-scanlines" />
        <div className="cd-digits">
          <RollingDigit digit={s[0]} />
          <RollingDigit digit={s[1]} />
        </div>
        <div className="cd-cell-split" />
        <div className="cd-cell-glow" />
      </div>
      <div className="cd-unit-label">{label}</div>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  const playHeroEntrance = useCallback(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Title — smooth fade up as one block
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4 },
        0.2
      );
    }

    // Subtitle — fade in after title
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.6"
      );
    }

    // CTA — gentle fade up
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.5"
      );
    }

    // Slow floating for title
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        y: -6,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 3,
      });
    }
  }, []);

  useEffect(() => {
    // new Date(year, monthIndex, day, hour, min, sec) — always local time, no timezone ambiguity
    const deadline = new Date(2026, 2, 14, 15, 0, 0);
    const calc = () => {
      const diff = deadline - new Date();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }); return; }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
        expired: false,
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        playHeroEntrance();
      });
    });
  }, [playHeroEntrance]);

  return (
    <div className="min-h-screen bg-black relative">
      {/* Sakura petals */}
      <div className="sakura-container">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="sakura-petal" />
        ))}
      </div>

      {isLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
      {!isLoading && (
        <>
          <Navbar />

          {/* ═══ HERO ═══ */}
          <section
            id="home"
            ref={heroRef}
            className="min-h-screen flex items-center justify-center relative gradient-red-black"
          >
            {/* Video BG — scoped to hero only */}
            <video
              autoPlay loop muted playsInline preload="auto"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center", zIndex: 1,
              }}
            >
              <source src="/Japan BG.mp4" type="video/mp4" />
            </video>

            {/* Overlay */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 2,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(80,0,20,0.35) 50%, rgba(0,0,0,0.65) 100%)",
            }} />
            <div className="absolute inset-0 gradient-overlay" style={{ zIndex: 3 }} />

            <div
              className="relative text-center w-full mx-auto"
              style={{ zIndex: 10, padding: "clamp(24px, 5vw, 48px) clamp(16px, 4vw, 32px)", maxWidth: "100%", overflowX: "hidden" }}
            >
              {/* Title — single line */}
              <div style={{ marginTop: "clamp(48px, 9vw, 120px)", marginBottom: "clamp(16px, 3vw, 40px)", display: "flex", justifyContent: "center" }}>
                <h1
                  ref={titleRef}
                  className="text-white"
                  style={{
                    fontFamily: "'Gang of Three', sans-serif",
                    fontSize: "clamp(28px, 14vw, 180px)",
                    fontWeight: "normal",
                    letterSpacing: "0.05em",
                    lineHeight: 1,
                    wordBreak: "break-word",
                    maxWidth: "100%",
                    opacity: 0,
                    textShadow: "0 0 30px rgba(220,20,60,0.7), 0 0 50px rgba(220,20,60,0.5), 4px 4px 0px rgba(139,0,0,0.6)",
                  }}
                >
                  TECHASHY
                </h1>
              </div>

              {/* Subtitle */}
              <div ref={subtitleRef} style={{ opacity: 0, marginBottom: "clamp(20px, 4vw, 40px)" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "clamp(8px, 1.5vw, 20px)",
                }}>
                  <div style={{ height: "1px", width: "clamp(30px, 6vw, 80px)", background: "linear-gradien 20,20,60,0.9), transparent)" }} />
                  <div className="sword-draw-wrapper">
                    <span
                      className="sword-draw-text"
                      style={{
                        fontFamily: "'Iceberg', sans-serif",
                        fontSize: "clamp(10px, 3vw, 22px)",
                        letterSpacing: "clamp(0.1em, 1vw, 0.35em)",
                        textTransform: "uppercase",
                        background: "linear-gradient(90deg, #FF4560 0%, #FFD700 50%, #FF4560 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: "drop-shadow(0 0 8px rgba(220,20,60,0.7))",
                        fontWeight: "400",
                        animationDelay: "1.0s",
                      }}
                    >
                      ⚔ &nbsp;Forge Your Legacy&nbsp; ⚔
                    </span>
                    <div className="sword-gleam" style={{ animationDelay: "1.0s" }} />
                  </div>
                  <div style={{ height: "1px", width: "clamp(30px, 6vw, 80px)", background: "linear-gradient(to right, rgba(220,20,60,0.9), transparent)" }} />
                </div>
              </div>

              {/* CTA — Registrations Closed */}
              <div
                ref={ctaRef}
                style={{
                  fontFamily: "'Iceberg', sans-serif",
                  borderRadius: "8px",
                  fontSize: "clamp(14px, 1.5vw, 17px)",
                  fontWeight: "normal",
                  padding: "clamp(10px, 1.2vw, 14px) clamp(24px, 3vw, 40px)",
                  display: "inline-block",
                  letterSpacing: "0.1em",
                  cursor: "not-allowed",
                  background: "rgba(30,0,0,0.6)",
                  border: "1px solid rgba(220,20,60,0.35)",
                  color: "rgba(220,20,60,0.6)",
                  textTransform: "uppercase",
                }}
              >
                ✕ &nbsp;Registrations Closed
              </div>

              {/* ── Countdown ── */}
              <div className="countdown-wrap">
                <div className="cd-header-line">
                  <span className="cd-header-tick" />
                  <span className="cd-header-text">Hackathon Starts In</span>
                  <span className="cd-header-tick" />
                </div>

                {!timeLeft ? null : timeLeft.expired ? (
                  <div className="countdown-expired">// Hackathon Has Begun //</div>
                ) : (
                  <div className="cd-board">
                    <div className="cd-board-glow" />
                    <div className="cd-board-corner cd-board-corner--tl" />
                    <div className="cd-board-corner cd-board-corner--tr" />
                    <div className="cd-board-corner cd-board-corner--bl" />
                    <div className="cd-board-corner cd-board-corner--br" />
                    <div className="cd-inner">
                      <RollingUnit value={timeLeft.days}    label="DAYS" />
                      <div className="cd-colon"><span /><span /></div>
                      <RollingUnit value={timeLeft.hours}   label="HRS" />
                      <div className="cd-colon"><span /><span /></div>
                      <RollingUnit value={timeLeft.minutes} label="MIN" />
                      <div className="cd-colon"><span /><span /></div>
                      <RollingUnit value={timeLeft.seconds} label="SEC" />
                    </div>
                  </div>
                )}

                <div className="cd-footer">&#x2044;&nbsp; Hackathon Day 1&nbsp;&nbsp;14 . 03 . 2026&nbsp;&nbsp;03:00 PM &nbsp;&#x2044;</div>
              </div>
            </div>
          </section>

          <About />
          <Tracks />
          <Prizes />
          <Timeline />
          <Venue />
          <FAQ />

          <Sponsors />
          <Footer />
        </>
      )}
    </div>
  );
}
