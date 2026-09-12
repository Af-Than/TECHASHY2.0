"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const waveRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Wave divider — expand
      if (waveRef.current) {
        gsap.set(waveRef.current, { scaleX: 0, transformOrigin: "center center" });
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(waveRef.current, { scaleX: 1, duration: 1.2, ease: "power2.out" });
          },
        });
      }

      // Content — fade up
      const contentEls = footerRef.current.querySelectorAll(".footer-brand, .footer-contact");
      if (contentEls.length) {
        gsap.set(contentEls, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(contentEls, {
              y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out", delay: 0.3,
            });
          },
        });
      }

      // Social links — staggered fade in
      const socialLinks = socialRef.current?.querySelectorAll(".footer-social-link");
      if (socialLinks?.length) {
        gsap.set(socialLinks, { y: 15, opacity: 0 });
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(socialLinks, {
              y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.6,
            });
          },
        });
      }

      // Bottom bar
      const bottomBar = footerRef.current.querySelector(".footer-bottom");
      if (bottomBar) {
        gsap.set(bottomBar, { y: 15, opacity: 0 });
        ScrollTrigger.create({
          trigger: bottomBar,
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.to(bottomBar, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-techashy" ref={footerRef}>
      <div className="footer-content">
        <div className="footer-wave-divider" ref={waveRef}></div>
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">⛩</span> TECHASHY
            </div>
            <p className="footer-tagline-jp">テックアシ</p>
            <p className="footer-tagline">Powered by <strong className="accent-red">Betalabs</strong></p>
            <p className="footer-description">Where innovation meets excellence. Join us in building the future of technology.</p>
            <div className="footer-social" ref={socialRef}>
              <a href="https://www.instagram.com/techashy26?utm_source=qr&igsh=MWsyZXU0b2FxOGU3dA==" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-social-link katana-shine">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" clipRule="evenodd" /></svg>
              </a>
              {/* LinkedIn removed per request
              <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="footer-social-link katana-shine">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              </a>
              */}
              {/* Twitter removed per request
              <a href="#" target="_blank" rel="noreferrer" aria-label="Twitter" className="footer-social-link katana-shine">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
              </a>
              */}
            </div>
          </div>
          <div className="footer-contact">
            <h3 className="footer-section-title">Contact Us</h3>
            <div className="footer-contact-list">
              <a href="mailto:techashy.betalabs@gmail.com" className="footer-contact-item">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                <span>techashy.betalabs@gmail.com</span>
              </a>
              <a href="mailto:techclub@iiitkottayam.ac.in" className="footer-contact-item">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                <span>techclub@iiitkottayam.ac.in</span>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {new Date().getFullYear()} Techashy. All rights reserved.</p>
          <p className="footer-love">Powered by <span className="accent-red">Betalabs</span></p>
        </div>
      </div>
    </footer>
  );
}
