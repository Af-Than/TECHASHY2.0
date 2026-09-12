"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Navbar.css";

const navItems = [
  { label: "ABOUT", link: "#about", sectionId: "about" },
  { label: "TRACKS", link: "#tracks", sectionId: "tracks" },
  { label: "PRIZES", link: "#prizes", sectionId: "prizes" },
  { label: "TIMELINE", link: "#timeline", sectionId: "timeline" },
  { label: "VENUE", link: "#venue", sectionId: "venue" },
  { label: "FAQ", link: "#faq", sectionId: "faq" },
  { label: "CONTACTS", link: "#footer", sectionId: "footer" },
];

function smoothScrollTo(targetY, duration = 250) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutQuad(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", onScroll, { passive: true });

    const sectionIds = navItems.map((m) => m.sectionId);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    sections.forEach((sec) => observerRef.current.observe(sec));

    const homeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveSection("home");
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    const heroSection = document.getElementById("home");
    if (heroSection) homeObserver.observe(heroSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observerRef.current?.disconnect();
      homeObserver.disconnect();
    };
  }, []);

  const scrollToSection = (targetId) => {
    const target = document.getElementById(targetId);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      smoothScrollTo(top, 250);
      setActiveSection(targetId);
    }
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToSection(item.link.replace("#", ""));
  };

  const mobileMenu =
    mounted &&
    createPortal(
      <div className={`tekashi-mobile-overlay ${isOpen ? "open" : ""}`}>
        <div className="tekashi-mobile-backdrop" onClick={() => setIsOpen(false)} />
        <div className="tekashi-mobile-drawer">
          <div className="tekashi-mobile-header">
            <span className="tekashi-mobile-brand">
              <span className="hanko-seal" style={{ width: "26px", height: "26px", fontSize: "11px" }}>極</span>
              TECHASHY
            </span>
            <button
              className="tekashi-mobile-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="tekashi-mobile-nav">
            <ul>
              {navItems.map((item, idx) => (
                <li key={item.label}>
                  <Link
                    href={item.link}
                    className={`tekashi-mobile-link ${
                      activeSection === item.sectionId ? "active" : ""
                    }`}
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    <span className="tekashi-mobile-index">0{idx + 1}</span>
                    <span className="tekashi-mobile-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="tekashi-mobile-footer">
            <span className="tekashi-mobile-tagline">FORGED IN 24 HOURS</span>
            <span className="tekashi-mobile-sub">POWERED BY BETALABS</span>
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <>
      <header className={`tekashi-nav-wrapper ${scrolled ? "scrolled" : ""}`}>
        <nav className="tekashi-nav-pill">
          {/* Brand Logo & Name */}
          <a
            href="#home"
            className="tekashi-nav-logo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            <span className="tekashi-nav-seal">極</span>
            <span className="tekashi-nav-title">TECHASHY</span>
          </a>

          {/* Floating Pill Menu */}
          <ul className="tekashi-nav-menu">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.link}
                  className={`tekashi-nav-item ${
                    activeSection === item.sectionId ? "active" : ""
                  }`}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className={`tekashi-nav-toggle ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      {mobileMenu}
    </>
  );
}
