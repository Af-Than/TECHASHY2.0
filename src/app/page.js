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
import Memories from "../pageComponents/Memories";
import Timeline from "../components/Timeline";
import Venue from "../components/Venue";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

function CountdownUnit({ value, label }) {
  const formatted = String(value).padStart(2, "0");
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <span style={{
        fontFamily: "'Shuriken', 'Gang of Three', serif",
        fontSize: "clamp(36px, 6vw, 80px)",
color: "#D4C4A0",
        lineHeight: 1,
        textShadow: "0 0 30px rgba(255,240,200,0.35), 0 0 60px rgba(158,24,37,0.5), 0 4px 12px rgba(0,0,0,0.95)",
        letterSpacing: "-0.01em",
        fontWeight: "normal",
      }}>
        {formatted}
      </span>
      <span style={{
        fontFamily: "'YoungSerif', Georgia, serif",
        fontSize: "clamp(9px, 1vw, 11px)",
        letterSpacing: "0.32em",
        color: "#C9A45C",
        textTransform: "uppercase",
        fontWeight: 300,
      }}>
        {label}
      </span>
    </div>
  );
}

function CountdownSep() {
  return (
    <span aria-hidden="true" style={{
      fontFamily: "'Shuriken', 'Gang of Three', serif",
      fontSize: "clamp(36px, 6vw, 80px)",
      color: "rgba(158,24,37,0.75)",
      lineHeight: 1,
      marginBottom: "20px",
      userSelect: "none",
      fontWeight: "normal",
    }}>
      :
    </span>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 24, hours: 8, minutes: 42, seconds: 15 });

  const heroRef = useRef(null);
  const artworkWrapRef = useRef(null);
  const titleRef = useRef(null);
  const countdownRef = useRef(null);
  const lanternsRef = useRef(null);
  const waveRef = useRef(null);
  const metaRef = useRef(null);

  const playHeroEntrance = useCallback(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    if (artworkWrapRef.current) {
      tl.fromTo(artworkWrapRef.current,
        { opacity: 0, scale: 0.97, y: 18 },
        { opacity: 1, scale: 1, y: 0, duration: 1.6 }, 0.1);
    }
    if (waveRef.current) {
      tl.fromTo(waveRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 }, 0.4);
    }
    if (lanternsRef.current) {
      tl.fromTo(lanternsRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 }, 0.5);
    }
    if (titleRef.current) {
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }, 0.7);
    }
    if (countdownRef.current) {
      tl.fromTo(countdownRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0 }, 0.95);
    }
    if (metaRef.current) {
      tl.fromTo(metaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 }, 1.15);
    }

    if (lanternsRef.current) {
      gsap.to(lanternsRef.current, {
        rotation: 1.8, y: 6, duration: 3.6,
        ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.5,
      });
    }

    if (artworkWrapRef.current && heroRef.current) {
      gsap.to(artworkWrapRef.current, {
        yPercent: 8, ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top", end: "bottom top", scrub: true,
        },
      });
    }
  }, []);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      let target = new Date(2026, 9, 10, 15, 0, 0);
      if (target <= now) {
        target = new Date(now.getFullYear() + 1, 9, 10, 15, 0, 0);
        if (target <= now) {
          target = new Date(now.getTime() + (24 * 86400000 + 8 * 3600000 + 42 * 60000));
        }
      }
      const diff = target - now;
      setTimeLeft({
        days: Math.max(0, Math.floor(diff / 86400000)),
        hours: Math.max(0, Math.floor((diff % 86400000) / 3600000)),
        minutes: Math.max(0, Math.floor((diff % 3600000) / 60000)),
        seconds: Math.max(0, Math.floor((diff % 60000) / 1000)),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    requestAnimationFrame(() => requestAnimationFrame(playHeroEntrance));
  }, [playHeroEntrance]);

  return (
    <div
      className="min-h-screen bg-[#0C0201] relative text-[#EFE1BD] overflow-x-hidden"
      style={{ visibility: isLoading ? "hidden" : "visible" }}
    >
      <div className="sakura-container">
        {[...Array(8)].map((_, i) => <div key={i} className="sakura-petal" />)}
      </div>

      {isLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
      <Navbar />

      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#0C0201]"
      >
        {/* Full-bleed background */}
        <div
          ref={artworkWrapRef}
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{ zIndex: 1 }}
        >
          <img
            src="/pictures/hero-landscape-clean.jpg"
            alt="TECHASHY 2.0 Mountain Landscape"
            className="w-full h-full object-cover object-center select-none"
            style={{ filter: "brightness(0.72) contrast(1.08) saturate(1.1)" }}
          />

          {/* Top-to-bottom gradient — heavier at bottom */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(12,2,1,0.60) 0%, rgba(12,2,1,0.05) 25%, rgba(12,2,1,0.45) 55%, rgba(12,2,1,0.97) 100%)"
          }} />

          {/* Left/right edge darken */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to right, rgba(12,2,1,0.4) 0%, transparent 28%, transparent 72%, rgba(12,2,1,0.4) 100%)"
          }} />

          {/* Radial dark pool behind countdown area */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 80% 55% at 50% 82%, rgba(6,1,1,0.78) 0%, transparent 100%)",
          }} />
        </div>

        {/* Hanging Lanterns */}
        <div
          ref={lanternsRef}
          className="absolute top-0 right-0 sm:right-4 md:right-8 lg:right-16 w-[130px] sm:w-[175px] md:w-[220px] lg:w-[260px] pointer-events-none select-none"
          style={{
            zIndex: 30,
            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.9)) drop-shadow(0 0 12px rgba(216,160,80,0.25))",
          }}
        >
          <img
            src="/pictures/lanterns-nobg.png"
            alt="Traditional Hanging Lanterns"
            className="w-full h-auto block select-none"
          />
        </div>

        {/* Hero content */}
        <div
          className="relative w-full flex flex-col items-center justify-center text-center px-4 md:px-8"
          style={{ zIndex: 10, minHeight: "100vh", paddingTop: "5rem", paddingBottom: "4rem" }}
        >
          {/* Title block */}
          <div ref={titleRef} className="flex flex-col items-center">
            <span style={{
              fontFamily: "'YoungSerif', Georgia, serif",
              fontSize: "clamp(10px, 1.2vw, 13px)",
              fontWeight: 300,
              letterSpacing: "0.42em",
              color: "#C9A45C",
              textTransform: "uppercase",
              marginBottom: "14px",
              userSelect: "none",
              textShadow: "0 1px 8px rgba(0,0,0,0.9)",
            }}>
              Betalabs · IIIT Kottayam
          </span>

            <h1 className="uppercase select-none leading-none" style={{
              fontFamily: "'Shuriken', 'Gang of Three', serif",
              fontSize: "clamp(52px, 11vw, 140px)",
              color: "#EFE1BD",
              textShadow: "0 0 60px rgba(158,24,37,0.9), 0 0 20px rgba(216,185,120,0.5), 0 2px 8px rgba(0,0,0,0.8)",
              letterSpacing: "0.04em",
              fontWeight: "normal",
            }}>
              TECHASHY
            </h1>

            {/* Gold ornament divider */}
            <div className="flex items-center gap-4 mt-4 mb-4">
              <span style={{
                height: "1px",
                width: "clamp(40px,6vw,90px)",
                background: "linear-gradient(to right, transparent, rgba(201,164,92,0.6))",
                display: "block",
              }} />
              <span style={{ color: "#C9A45C", fontSize: "10px", letterSpacing: "0.5em" }}>✦</span>
              <span style={{
                height: "1px",
                width: "clamp(40px,6vw,90px)",
                background: "linear-gradient(to left, transparent, rgba(201,164,92,0.6))",
                display: "block",
              }} />
            </div>

            <h2 className="uppercase select-none" style={{
              fontFamily: "'Shuriken', 'Gang of Three', serif",
              fontSize: "clamp(15px, 2.8vw, 34px)",
              color: "#EFE1BD",
              letterSpacing: "0.14em",
              textShadow: "0 2px 8px rgba(0,0,0,0.7)",
              fontWeight: "normal",
            }}>
              Forged in <span style={{ color: "#A8182B" }}>24 Hours</span>
            </h2>

            <p style={{
              fontFamily: "'YoungSerif', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(12px, 1.3vw, 16px)",
              color: "rgba(209,194,158,0.75)",
              letterSpacing: "0.02em",
              marginTop: "10px",
              maxWidth: "480px",
              userSelect: "none",
            }}>
              &ldquo;A hackathon is not an event. It&apos;s a controlled detonation.&rdquo;
            </p>
          </div>

          {/* ── COUNTDOWN — open, no box ── */}
          <div
            ref={countdownRef}
            style={{ marginTop: "clamp(32px, 5vh, 60px)", display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            {/* "commences in" label */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "clamp(16px, 2.5vh, 28px)" }}>
              <span style={{ height: "1px", width: "48px", background: "rgba(201,164,92,0.35)", display: "block" }} />
              <span style={{
                fontFamily: "'YoungSerif', Georgia, serif",
                fontSize: "clamp(9px, 1vw, 11px)",
                letterSpacing: "0.34em",
                color: "#C9A45C",
                textTransform: "uppercase",
                fontWeight: 300,
              }}>
                commences in
              </span>
              <span style={{ height: "1px", width: "48px", background: "rgba(201,164,92,0.35)", display: "block" }} />
            </div>

            {/* Numbers bare on the image */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(8px, 2vw, 28px)" }}>
              <CountdownUnit value={timeLeft.days} label="Days" />
              <CountdownSep />
              <CountdownUnit value={timeLeft.hours} label="Hours" />
              <CountdownSep />
              <CountdownUnit value={timeLeft.minutes} label="Minutes" />
              <CountdownSep />
              <CountdownUnit value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>

          {/* Event metadata */}
          <div
            ref={metaRef}
            style={{
              marginTop: "clamp(20px, 3.5vh, 40px)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              fontFamily: "'YoungSerif', Georgia, serif",
              fontSize: "clamp(10px, 1.2vw, 13px)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(209,194,158,0.65)",
              fontWeight: 300,
            }}
          >
            <span>October 10, 2026</span>
            <span style={{ color: "#9E1825", fontSize: "8px" }}>✦</span>
            <span>03:00 PM IST</span>
            <span style={{ color: "#9E1825", fontSize: "8px" }}>✦</span>
            <span>IIIT Kottayam</span>
          </div>
        </div>

        {/* Wave transition */}
        <div
          ref={waveRef}
          className="absolute bottom-0 left-0 right-0 pointer-events-none select-none"
          style={{ zIndex: 20 }}
        >
          <svg
            viewBox="0 0 1440 110"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "auto" }}
          >
            <path
              d="M0,60 C240,110 480,20 720,65 C960,110 1200,30 1440,70 L1440,110 L0,110 Z"
              fill="#0C0201"
            />
            <path
              d="M0,60 C240,110 480,20 720,65 C960,110 1200,30 1440,70"
              fill="none"
              stroke="rgba(216,185,120,0.25)"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </section>

      <About />
      <Tracks />
      <Prizes />
      <Timeline />
      <Venue />
      <FAQ />
      <Sponsors />
      <Memories />
      <Footer />
    </div>
  );
}