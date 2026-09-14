"use client";

import { useRef } from "react";
import Image from "next/image";
import "./Memories.css";

// Replace or extend this list with the final previous-hackathon photographs.
const memories = [
  { src: "/NEW%20PICS/63ae2e24-5b96-4b22-ae5d-bc3d67dfbe1f.jpg", alt: "Previous hackathon memory 1" },
  { src: "/NEW%20PICS/eec430c0-3d77-40d0-931e-041feb347cb9.jpg", alt: "Previous hackathon memory 2" },
  { src: "/NEW%20PICS/fe41927d-b56b-4e22-bbb0-9d57602ee6cb.jpg", alt: "Previous hackathon memory 3" },
  { src: "/NEW%20PICS/Screenshot%202026-09-12%20141855.png", alt: "Previous hackathon memory 4" },
  { src: "/NEW%20PICS/Screenshot%202026-09-12%20152840.png", alt: "Previous hackathon memory 5" },
  { src: "/NEW%20PICS/WhatsApp%20Image%202026-09-12%20at%204.14.55%20PM.jpeg", alt: "Previous hackathon memory 6" },
];

export default function Memories() {
  const railRef = useRef(null);

  const moveRail = (direction) => {
    railRef.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  };

  return (
    <section className="mm-section" id="memories">
      <div className="mm-container">
        <div className="mm-heading-row">
          <div>
            <span className="section-header-tag">ARCHIVE / 01</span>
            <h2 className="section-heading-main">PAST FORGES</h2>
            <p className="section-subtitle-text">A glimpse into the people, pressure, and sparks that came before.</p>
          </div>
          <div className="mm-controls" aria-label="Photo gallery controls">
            <button type="button" className="mm-control" onClick={() => moveRail(-1)} aria-label="Show previous photos">←</button>
            <button type="button" className="mm-control" onClick={() => moveRail(1)} aria-label="Show next photos">→</button>
          </div>
        </div>

        <div className="mm-rail" ref={railRef} tabIndex="0" aria-label="Previous hackathon photos">
          {memories.map((memory, index) => (
            <figure className="mm-card asian-frame" key={memory.src}>
              <Image src={memory.src} alt={memory.alt} fill sizes="(max-width: 640px) 82vw, (max-width: 1000px) 45vw, 31vw" className="mm-image" />
              <figcaption>FRAME 0{index + 1}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
