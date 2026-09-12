"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Navbar.css";

const menuItems = [
  { label: "Home",     link: "#home",     sectionId: "home" },
  { label: "About",    link: "#about",    sectionId: "about" },
  { label: "Tracks",   link: "#tracks",   sectionId: "tracks" },
  { label: "Prizes",   link: "#prizes",   sectionId: "prizes" },
  { label: "Timeline", link: "#timeline", sectionId: "timeline" },
  { label: "Venue",    link: "#venue",    sectionId: "venue" },
  { label: "FAQ",      link: "#faq",      sectionId: "faq" },
  { label: "Sponsors", link: "#sponsors", sectionId: "sponsors" },
];

function smoothScrollTo(targetY, duration = 100) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function Navbar() {
  const [isOpen, setIsOpen]           = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled]       = useState(false);
  const [mounted, setMounted]         = useState(false);
  const observerRef = useRef(null);

  // Portal needs document to be available
  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    const sectionIds = menuItems.map((m) => m.sectionId).filter((id) => id !== "home");
    const sections   = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((sec) => observerRef.current.observe(sec));

    const homeObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection("home"); },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    const heroSection = document.querySelector(".gradient-red-black");
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
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      smoothScrollTo(top, 100);
      setActiveSection(targetId);
    }
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToSection(item.link.replace("#", ""));
  };

  // Mobile fullscreen overlay rendered via portal directly on body
  const mobileMenu = mounted && createPortal(
    <div className={`mobile-menu-overlay${isOpen ? " mobile-menu-overlay--open" : ""}`}>
      <button
        className="mobile-menu-close"
        onClick={() => setIsOpen(false)}
        aria-label="Close menu"
      >
        <span></span>
        <span></span>
      </button>
      <nav className="mobile-menu-nav">
        <ul className="mobile-menu-list">
          {menuItems.map((item) => (
            <li key={item.label} className="mobile-menu-item">
              <Link
                href={item.link}
                className={`mobile-menu-link${activeSection === item.sectionId ? " nav-active" : ""}`}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>,
    document.body
  );

  return (
    <>
      <nav className={`navbar-techashy${scrolled ? " navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          <div className="navbar-logo">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>
              <Image
                src="/Techashi_Logo-removebg-preview.png"
                alt="Techashy Logo"
                width={38}
                height={38}
                className="navbar-logo-img"
                priority
              />
              TECHASHY
            </a>
          </div>

          {/* Desktop menu */}
          <ul className="navbar-menu">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.link}
                  className={activeSection === item.sectionId ? "nav-active" : ""}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger / X — always on top */}
          <button
            className={`navbar-toggle${isOpen ? " open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Portal overlay — rendered straight on document.body */}
      {mobileMenu}
    </>
  );
}
