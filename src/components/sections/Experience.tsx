"use client";

import React, { useRef, useState, useEffect } from "react";
import { TIMELINE } from "@/lib/data";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;

      // Start when top reaches middle of viewport, end when bottom reaches middle
      const start = windowHeight * 0.7;
      const current = start - rect.top;
      const progress = Math.min(Math.max(current / totalHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="experience" aria-label="Experience & Education" className="site-section">
      <div className="site-container">
        {/* Section Header */}
        <div className="mb-16">
          <span className="tag-mono">05 — Experience &amp; Education</span>
          <h2 className="heading-display">
            One continuous <span className="heading-italic">path.</span>
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 md:pl-12 max-w-4xl mx-auto">
          {/* Background Spine Line */}
          <div className="absolute left-[11px] md:left-[23px] top-4 bottom-12 w-[2px] bg-[rgba(13,13,13,0.1)]" />

          {/* Active Ink Spine (Draws as you scroll) */}
          <div
            className="absolute left-[11px] md:left-[23px] top-4 w-[2px] bg-[#0d0d0d] origin-top transition-transform duration-75"
            style={{
              height: "calc(100% - 48px)",
              transform: `scaleY(${scrollProgress})`
            }}
          />

          <div className="space-y-12">
            {TIMELINE.map((item, idx) => {
              const itemProgress = idx / (TIMELINE.length - 1);
              const isPassed = scrollProgress >= itemProgress * 0.85;

              return (
                <div key={idx} className="relative group">
                  {/* Stop Node Dot */}
                  <div
                    className={`absolute -left-[30px] md:-left-[43px] top-1.5 w-5 h-5 rounded-full border-2 transition-all duration-400 flex items-center justify-center ${
                      isPassed
                        ? "bg-[#0d0d0d] border-[#0d0d0d] text-white shadow-sm scale-110"
                        : "bg-[#f4f2ee] border-[rgba(13,13,13,0.3)] text-transparent"
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  {/* Timeline Card */}
                  <div
                    className={`card-premium p-6 md:p-8 transition-all duration-400 ${
                      isPassed ? "opacity-100 shadow-sm" : "opacity-60"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#f0eee9] text-[#0d0d0d]">
                        {item.year}
                      </span>
                      <span className="text-xs font-mono text-[#77756f]">
                        {item.location}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-[#0d0d0d]">
                      {item.title}
                    </h3>
                    <h4 className="text-sm font-semibold text-[#77756f] mt-0.5 mb-4">
                      {item.organization}
                    </h4>

                    <ul className="space-y-2 mt-4 pt-4 border-t border-[rgba(13,13,13,0.06)]">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs md:text-sm text-[#3a3a3a] leading-relaxed flex items-start gap-2">
                          <span className="text-[#0d0d0d] font-mono mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}

            {/* Ending Dashed Card */}
            <div className="relative">
              <div className="absolute -left-[30px] md:-left-[43px] top-1.5 w-5 h-5 rounded-full border-2 border-dashed border-[#0d0d0d] bg-[#f4f2ee]" />
              <div className="rounded-[28px] border-2 border-dashed border-[rgba(13,13,13,0.2)] p-6 md:p-8 text-center bg-transparent">
                <span className="font-mono text-xs uppercase tracking-widest text-[#77756f] block mb-1">
                  Forward Looking
                </span>
                <h3 className="text-xl font-bold text-[#0d0d0d]">
                  Next — Your team?
                </h3>
                <p className="text-xs text-[#77756f] mt-2 max-w-md mx-auto">
                  Available for Senior Backend, Java &amp; Distributed Systems engineering opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
