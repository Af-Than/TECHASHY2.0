"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-triggered reveal for a container's direct children.
 * @param {Object} opts
 * @param {number} opts.y        – Starting translateY (default 60)
 * @param {number} opts.x        – Starting translateX (default 0)
 * @param {number} opts.opacity  – Starting opacity (default 0)
 * @param {number} opts.stagger  – Stagger between children (default 0.12)
 * @param {number} opts.duration – Duration per item (default 0.8)
 * @param {string} opts.ease     – GSAP ease (default "power3.out")
 * @param {string} opts.start    – ScrollTrigger start (default "top 85%")
 * @param {string} opts.selector – Child selector (default "> *")
 * @param {number} opts.rotation – Starting rotation (default 0)
 * @param {number} opts.scale    – Starting scale (default 1)
 */
export default function useGsapReveal({
    y = 60,
    x = 0,
    opacity = 0,
    stagger = 0.12,
    duration = 0.8,
    ease = "power3.out",
    start = "top 85%",
    selector = "> *",
    rotation = 0,
    scale = 1,
} = {}) {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const children = ref.current.querySelectorAll(selector);
        if (!children.length) return;

        // Set initial state
        gsap.set(children, { y, x, opacity, rotation, scale });

        const trigger = ScrollTrigger.create({
            trigger: ref.current,
            start,
            onEnter: () => {
                gsap.to(children, {
                    y: 0,
                    x: 0,
                    opacity: 1,
                    rotation: 0,
                    scale: 1,
                    duration,
                    stagger,
                    ease,
                    overwrite: "auto",
                });
            },
            once: true,
        });

        return () => {
            trigger.kill();
        };
    }, [y, x, opacity, stagger, duration, ease, start, selector, rotation, scale]);

    return ref;
}

/**
 * Parallax effect for a background element.
 * @param {number} speed – Parallax speed multiplier (default 0.3)
 */
export function useParallax(speed = 0.3) {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const tl = gsap.to(ref.current, {
            y: () => speed * 100,
            ease: "none",
            scrollTrigger: {
                trigger: ref.current.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, [speed]);

    return ref;
}

/**
 * Counter animation – animates a number from 0 to target.
 * Triggers on scroll.
 */
export function useCountUp() {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const counters = ref.current.querySelectorAll("[data-count]");
        if (!counters.length) return;

        const trigger = ScrollTrigger.create({
            trigger: ref.current,
            start: "top 80%",
            onEnter: () => {
                counters.forEach((el) => {
                    const target = el.dataset.count;
                    const hasPrefix = target.startsWith("$");
                    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ""));
                    const suffix = target.replace(/[0-9.$]/g, "");
                    const prefix = hasPrefix ? "$" : "";

                    gsap.fromTo(
                        { val: 0 },
                        { val: numericTarget },
                        {
                            val: numericTarget,
                            duration: 2,
                            ease: "power2.out",
                            onUpdate: function () {
                                const current = Math.round(this.targets()[0].val);
                                el.textContent = prefix + current + suffix;
                            },
                        }
                    );
                });
            },
            once: true,
        });

        return () => trigger.kill();
    }, []);

    return ref;
}

/**
 * Magnetic hover effect for interactive elements.
 */
export function useMagneticHover() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: "power2.out",
            });
        };

        const handleLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        };

        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", handleLeave);

        return () => {
            el.removeEventListener("mousemove", handleMove);
            el.removeEventListener("mouseleave", handleLeave);
        };
    }, []);

    return ref;
}
