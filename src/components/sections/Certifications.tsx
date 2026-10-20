"use client";

import React from "react";
import { CERTIFICATIONS } from "@/lib/data";

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-label="Certifications"
      className="bg-white border-y border-[rgba(13,13,13,0.1)] py-24 relative"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">
          {/* Left Sticky Header */}
          <div className="lg:sticky lg:top-28">
            <span className="tag-mono">04 — Certifications & Honors</span>
            <h2 className="heading-display mb-4">
              Always <span className="heading-italic">learning.</span>
            </h2>
            <p className="text-sm text-[#77756f] font-mono">
              {CERTIFICATIONS.length.toString().padStart(2, "0")} verified credentials &amp; honors.
            </p>
          </div>

          {/* Right: Numbered list with Ink-Flood Hover Animation */}
          <div className="border-t border-[rgba(13,13,13,0.1)]">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.index}
                tabIndex={0}
                className="cert-row group relative border-b border-[rgba(13,13,13,0.1)] py-6 px-4 md:px-6 transition-colors duration-300 cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d]"
              >
                {/* Ink flood background (scaleX 0 -> 1) */}
                <div className="ink-flood absolute inset-0 bg-[#0d0d0d] -z-0 origin-left scale-x-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus:scale-x-100" />

                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="font-mono text-xs md:text-sm text-[#77756f] group-hover:text-[#a9a6a0] group-focus:text-[#a9a6a0] transition-colors duration-300">
                      {cert.index}
                    </span>
                    <div>
                      <h3 className="text-base md:text-xl font-bold tracking-tight text-[#0d0d0d] group-hover:text-white group-focus:text-white transition-colors duration-300">
                        {cert.title}
                      </h3>
                      <span className="text-xs font-mono text-[#77756f] group-hover:text-[#ccc] group-focus:text-[#ccc] transition-colors duration-300 block mt-1">
                        {cert.issuer} · {cert.date}
                      </span>
                    </div>
                  </div>

                  {/* Sliding Arrow */}
                  <div className="translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100 transition-all duration-300 text-white font-mono text-lg">
                    ↗
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
