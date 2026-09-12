"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const contentEls = footerRef.current.querySelectorAll(
        ".ft-brand, .ft-links-col, .ft-contact-col"
      );
      if (contentEls.length) {
        gsap.set(contentEls, { y: 25, opacity: 0 });
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(contentEls, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
            });
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="ft-section" id="footer" ref={footerRef}>
      {/* Decorative Wave & Koi Watermark Asset (Transparent) */}
      <div className="ft-koi-bg" aria-hidden="true">
        <Image
          src="/pictures/koi-waves-nobg.png"
          alt="Traditional Japanese Koi Wave"
          width={320}
          height={400}
          className="ft-koi-img"
        />
      </div>

      <div className="ft-container">
        {/* Top Traditional Divider */}
        <div className="traditional-divider">
          <div className="traditional-divider-line" />
          <span className="traditional-divider-symbol">⛩ ✦ ⛩</span>
          <div className="traditional-divider-line right" />
        </div>

        {/* Main Footer Grid */}
        <div className="ft-main-grid">
          {/* Brand Column */}
          <div className="ft-brand">
            <div className="ft-logo-wrap">
              <span className="hanko-seal" style={{ width: "30px", height: "30px", fontSize: "13px" }}>
                極
              </span>
              <span className="ft-logo-text font-gang">TEKASHI 2.0</span>
            </div>

            <p className="ft-tagline font-bebas">FORGED IN 24 HOURS.</p>
            <p className="ft-desc">
              A premier technology hackathon powered by <strong className="text-[#D8B978]">Betalabs</strong> at{" "}
              <strong>Indian Institute of Information Technology, Kottayam</strong>.
            </p>

            <div className="ft-social-wrap">
              <a
                href="https://www.instagram.com/techashy26?utm_source=qr&igsh=MWsyZXU0b2FxOGU3dA=="
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="ft-social-btn"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bebas text-xs tracking-widest">FOLLOW INSTAGRAM</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="ft-links-col">
            <h4 className="ft-col-title font-cinzel">NAVIGATION</h4>
            <ul className="ft-links-list font-bebas">
              <li><a href="#about" className="ft-link">ABOUT</a></li>
              <li><a href="#timeline" className="ft-link">TIMELINE</a></li>
              <li><a href="#tracks" className="ft-link">TRACKS</a></li>
              <li><a href="#prizes" className="ft-link">PRIZES</a></li>
              <li><a href="#venue" className="ft-link">VENUE</a></li>
              <li><a href="#faq" className="ft-link">FAQ</a></li>
              <li><a href="#sponsors" className="ft-link">SPONSORS</a></li>
            </ul>
          </div>

          {/* Contact Dispatch Column */}
          <div className="ft-contact-col">
            <h4 className="ft-col-title font-cinzel">CONTACT DISPATCH</h4>
            <div className="ft-contact-items">
              <a href="mailto:techashy.betalabs@gmail.com" className="ft-contact-link">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>techashy.betalabs@gmail.com</span>
              </a>
              <a href="mailto:techclub@iiitkottayam.ac.in" className="ft-contact-link">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>techclub@iiitkottayam.ac.in</span>
              </a>
            </div>

            <div className="ft-kanji-seal-box">
              <span className="font-jp text-xs text-[#9E1825]">技術の極限 • 24時間</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ft-bottom-bar">
          <p className="ft-copyright">
            &copy; {new Date().getFullYear()} TEKASHI 2.0. All rights reserved.
          </p>
          <p className="ft-powered">
            Forged with honor by <span className="text-[#E63946] font-semibold">Betalabs</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
