"use client";

import React, { useEffect } from "react";
import { Navigation } from "./Navigation";
import { Hero } from "./hero/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Work } from "./sections/Work";
import { Certifications } from "./sections/Certifications";
import { Experience } from "./sections/Experience";
import { Contact } from "./sections/Contact";

export function App() {
  // Global RevealObserver: adds .is-in to .rv and .rv-mask (animates once only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const revealElements = document.querySelectorAll(".rv, .rv-mask");
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[var(--paper)] text-[var(--ink)] overflow-x-hidden selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
      <Navigation />
      <main id="main-content" className="w-full">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
      </main>
      <Contact />
    </div>
  );
}
