"use client";

import { useRef } from "react";
import Image from "next/image";
import "./Memories.css";

const memories = [
  { src: "/NEW%20PICS/TECHASKY%202025/WhatsApp%20Image%202026-09-14%20at%206.22.29%20PM%20(1).jpeg", alt: "TECHASKY 2025 memory 1" },
  { src: "/NEW%20PICS/TECHASKY%202025/WhatsApp%20Image%202026-09-14%20at%206.22.29%20PM.jpeg", alt: "TECHASKY 2025 memory 2" },
  { src: "/NEW%20PICS/TECHASKY%202025/WhatsApp%20Image%202026-09-14%20at%206.22.30%20PM%20(1).jpeg", alt: "TECHASKY 2025 memory 3" },
  { src: "/NEW%20PICS/TECHASKY%202025/WhatsApp%20Image%202026-09-14%20at%206.22.30%20PM%20(2).jpeg", alt: "TECHASKY 2025 memory 4" },
  { src: "/NEW%20PICS/TECHASKY%202025/WhatsApp%20Image%202026-09-14%20at%206.22.30%20PM%20(3).jpeg", alt: "TECHASKY 2025 memory 5" },
  { src: "/NEW%20PICS/TECHASKY%202025/WhatsApp%20Image%202026-09-14%20at%206.22.30%20PM%20(4).jpeg", alt: "TECHASKY 2025 memory 6" },
  { src: "/NEW%20PICS/TECHASKY%202025/WhatsApp%20Image%202026-09-14%20at%206.22.30%20PM.jpeg", alt: "TECHASKY 2025 memory 7" },
  { src: "/NEW%20PICS/TECHASKY%202025/WhatsApp%20Image%202026-09-14%20at%206.22.31%20PM%20(1).jpeg", alt: "TECHASKY 2025 memory 8" },
  { src: "/NEW%20PICS/TECHASKY%202025/WhatsApp%20Image%202026-09-14%20at%206.22.31%20PM%20(2).jpeg", alt: "TECHASKY 2025 memory 9" },
  { src: "/NEW%20PICS/TECHASKY%202025/WhatsApp%20Image%202026-09-14%20at%206.22.31%20PM.jpeg", alt: "TECHASKY 2025 memory 10" },
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
