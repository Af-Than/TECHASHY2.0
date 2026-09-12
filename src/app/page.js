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

/* ── Countdown Unit ── */
function CountdownUnit({ value, label }) {
  const formatted = String(value).padStart(2, "0");
  return (
    <div className="tekashi-cd-unit">
      <div className="tekashi-cd-card asian-frame">
        <span className="tekashi-cd-num">{formatted}</span>
      </div>
      <span className="tekashi-cd-label">{label}</span>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 24,
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  const heroRef = useRef(null);
  const artworkWrapRef = useRef(null);
  const titleRef = useRef(null);
  const statementRef = useRef(null);
  const countdownRef = useRef(null);
  const lanternsRef = useRef(null);
  const waveRef = useRef(null);

  const playHeroEntrance = useCallback(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // 1. Artwork fade & subtle scale
    if (artworkWrapRef.current) {
      tl.fromTo(
        artworkWrapRef.current,
        { opacity: 0, scale: 0.97, y: 18 },
        { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: "power2.out" },
        0.1
      );
    }

    // 2. Wave swoops in from bottom
    if (waveRef.current) {
      tl.fromTo(
        waveRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
        0.4
      );
    }

    // 3. Hanging Lanterns float in from top
    if (lanternsRef.current) {
      tl.fromTo(
        lanternsRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        0.5
      );
    }

    // 4. Title reveal
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        0.6
      );
    }

    // 5. Statement
    if (statementRef.current) {
      tl.fromTo(
        statementRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.5"
      );
    }

    // 6. Countdown board
    if (countdownRef.current) {
      tl.fromTo(
        countdownRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.4"
      );
    }

    // Subtle sway for lanterns
    if (lanternsRef.current) {
      gsap.to(lanternsRef.current, {
        rotation: 1.8,
        y: 6,
        duration: 3.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.5,
      });
    }

    // Mountain parallax on scroll
    if (artworkWrapRef.current && heroRef.current) {
      gsap.to(artworkWrapRef.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      let target = new Date(2026, 2, 14, 15, 0, 0);
      if (target <= now) {
        target = new Date(now.getFullYear(), 9, 24, 15, 0, 0);
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
    setHeroVisible(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        playHeroEntrance();
      });
    });
  }, [playHeroEntrance]);

  return (
    <div className="min-h-screen bg-[#0C0201] relative text-[#EFE1BD] overflow-x-hidden" style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
      {/* Floating Sakura Petals */}
      <div className="sakura-container">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="sakura-petal" />
        ))}
      </div>

      {isLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
      <Navbar />

      {/* ══════════════════════════════════════════════
          HERO SECTION — SEAMLESS LANDSCAPE POSTER
         ══════════════════════════════════════════════ */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#0C0201]"
      >
        {/* === FULL-BLEED BACKGROUND IMAGE === */}
        <div
          ref={artworkWrapRef}
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{ zIndex: 1 }}
        >
          <img
            src="/pictures/hero-landscape-clean.jpg"
            alt="TEKASHI 2.0 Mountain Landscape"
            className="w-full h-full object-cover object-center select-none"
            style={{
              filter: "brightness(0.72) contrast(1.08) saturate(1.1)",
            }}
          />
          {/* Dark vignette top + sides */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(12,2,1,0.55) 0%, rgba(12,2,1,0.10) 35%, rgba(12,2,1,0.15) 60%, rgba(12,2,1,0.80) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(12,2,1,0.35) 0%, transparent 30%, transparent 70%, rgba(12,2,1,0.35) 100%)",
            }}
          />
        </div>

        {/* === HANGING LANTERNS (top-right) === */}
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

        {/* === PAGODA TOWER (left side, tall & prominent) === */}
        <div
          className="absolute bottom-0 left-0 pointer-events-none select-none"
          style={{
            zIndex: 15,
            width: "clamp(180px, 22vw, 340px)",
            filter: "drop-shadow(-8px 0 30px rgba(0,0,0,0.95)) drop-shadow(0 0 20px rgba(74,14,22,0.5)) brightness(0.88) contrast(1.12)",
          }}
        >
          <img
            src="/pictures/pagoda-blossoms-nobg.png"
            alt="Japanese Pagoda Tower"
            className="w-full block select-none"
            style={{ objectFit: "contain", objectPosition: "bottom left", maxHeight: "100vh" }}
          />
        </div>

        {/* === HERO CONTENT === */}
        <div
          className="relative w-full flex flex-col items-center justify-center text-center px-4 md:px-8"
          style={{ zIndex: 10, minHeight: "100vh", paddingTop: "5rem", paddingBottom: "3rem" }}
        >
          {/* Event title centered on image */}
          <div ref={titleRef} className="flex flex-col items-center">
            {/* Tagline above */}
            <span
              className="mb-3 tracking-[0.35em] text-[#C9A45C] uppercase select-none"
              style={{
                fontFamily: "'YoungSerif', Georgia, serif",
                fontSize: "clamp(10px, 1.4vw, 14px)",
                fontWeight: 300,
                letterSpacing: "0.38em",
              }}
            >
              BETALABS · IIIT KOTTAYAM
            </span>

            {/* Main Event Name */}
            <h1
              className="uppercase select-none leading-none"
              style={{
                fontFamily: "'Shuriken', 'Gang of Three', serif",
                fontSize: "clamp(52px, 11vw, 140px)",
                color: "#EFE1BD",
                textShadow:
                  "0 0 60px rgba(158,24,37,0.9), 0 0 20px rgba(216,185,120,0.5), 0 2px 8px rgba(0,0,0,0.8)",
                letterSpacing: "0.04em",
              }}
            >
              TECHASHY
            </h1>

            {/* Gold ornament divider */}
            <div className="flex items-center gap-3 mt-3 mb-3">
              <span className="h-px w-16 md:w-28 bg-gradient-to-r from-transparent to-[#C9A45C] opacity-70" />
              <span className="text-[#C9A45C] text-xs select-none" style={{ letterSpacing: "0.5em" }}>✦</span>
              <span className="h-px w-16 md:w-28 bg-gradient-to-l from-transparent to-[#C9A45C] opacity-70" />
            </div>

            {/* Subheading */}
            <h2
              className="uppercase select-none"
              style={{
                fontFamily: "'Shuriken', 'Gang of Three', serif",
                fontSize: "clamp(16px, 3.2vw, 38px)",
                color: "#EFE1BD",
                letterSpacing: "0.12em",
                textShadow: "0 2px 8px rgba(0,0,0,0.7)",
              }}
            >
              FORGED IN{" "}
              <span style={{ color: "#A8182B" }}>24 HOURS</span>
            </h2>

            {/* Italic quote */}
            <p
              className="mt-3 max-w-lg select-none"
              style={{
                fontFamily: "'YoungSerif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(13px, 1.5vw, 17px)",
                color: "rgba(209,194,158,0.85)",
                letterSpacing: "0.02em",
              }}
            >
              &ldquo;A hackathon is not an event. It&apos;s a controlled detonation.&rdquo;
            </p>
          </div>

          {/* Countdown Timer */}
          <div
            ref={countdownRef}
            className="w-full max-w-lg mt-8 p-5 md:p-7 rounded-2xl flex flex-col items-center text-center relative overflow-hidden"
            style={{
              background: "rgba(12,2,1,0.72)",
              border: "1px solid rgba(216,185,120,0.28)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.85), inset 0 0 40px rgba(74,14,22,0.2)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Corner brackets */}
            <div className="absolute top-2.5 left-2.5 text-[#D8B978]/40 text-xs select-none">⌜</div>
            <div className="absolute top-2.5 right-2.5 text-[#D8B978]/40 text-xs select-none">⌝</div>
            <div className="absolute bottom-2.5 left-2.5 text-[#D8B978]/40 text-xs select-none">⌞</div>
            <div className="absolute bottom-2.5 right-2.5 text-[#D8B978]/40 text-xs select-none">⌟</div>

            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-[#C9A45C]/45" />
              <span
                style={{
                  fontFamily: "'YoungSerif', Georgia, serif",
                  fontSize: "clamp(10px, 1.4vw, 12px)",
                  letterSpacing: "0.28em",
                  color: "#D8B978",
                  textTransform: "uppercase",
                  fontWeight: 400,
                }}
              >
                HACKATHON COMMENCES IN
              </span>
              <span className="h-px w-6 bg-[#C9A45C]/45" />
            </div>

            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-sm">
              <CountdownUnit value={timeLeft.days} label="DAYS" />
              <CountdownUnit value={timeLeft.hours} label="HRS" />
              <CountdownUnit value={timeLeft.minutes} label="MINS" />
              <CountdownUnit value={timeLeft.seconds} label="SECS" />
            </div>

            {/* Date & Location */}
            <div
              className="mt-5 pt-4 border-t border-[rgba(216,185,120,0.12)] flex flex-wrap items-center justify-center gap-2 text-[#D1C29E]/80"
              style={{
                fontFamily: "'YoungSerif', Georgia, serif",
                fontSize: "clamp(10px, 1.3vw, 12px)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 300,
              }}
            >
              <span>March 14 – 15, 2026</span>
              <span className="text-[#9E1825]">✦</span>
              <span>03:00 PM IST</span>
              <span className="text-[#9E1825]">✦</span>
              <span>IIIT Kottayam</span>
            </div>
          </div>
        </div>

        {/* === WAVE TRANSITION at bottom === */}
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
            {/* Deep wave fill */}
            <path
              d="M0,60 C240,110 480,20 720,65 C960,110 1200,30 1440,70 L1440,110 L0,110 Z"
              fill="#0C0201"
            />
            {/* Subtle gold shimmer line */}
            <path
              d="M0,60 C240,110 480,20 720,65 C960,110 1200,30 1440,70"
              fill="none"
              stroke="rgba(216,185,120,0.25)"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </section>

      {/* ══ BODY SECTIONS ══ */}
      <About />
      <Tracks />
      <Prizes />
      <Timeline />
      <Venue />
      <FAQ />
      <Sponsors />
      <Footer />
    </div>
  );
}
