"use client";

import React, { useState } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

export function Contact() {
  const { scrollTo } = useScroll();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const line1 = "Let's build";
  const line2 = "something together.";

  return (
    <footer id="contact" aria-label="Contact" className="site-section pb-12 pt-28 border-t border-[rgba(13,13,13,0.1)] bg-[var(--paper)]">
      <div className="site-container">
        {/* Section Tag */}
        <span className="tag-mono">06 — Contact</span>

        {/* Bouncing Letter Heading */}
        <div className="my-8">
          <h2 className="heading-display select-none">
            <span className="block">
              {line1.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block transition-transform duration-300 hover:-translate-y-3 cursor-default"
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="block">
              {line2.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block transition-transform duration-300 hover:-translate-y-3 cursor-default"
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h2>
        </div>

        {/* Email + Interactive Copy Chip */}
        <div className="my-12 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0d0d0d] underline decoration-2 underline-offset-8 hover:opacity-80 transition-opacity"
          >
            {PROFILE.email}
          </a>

          <button
            onClick={copyEmail}
            aria-label="Copy email address"
            className="px-4 py-2 rounded-full border border-[rgba(13,13,13,0.15)] text-xs font-mono font-medium hover:bg-[#0d0d0d] hover:text-white transition-colors duration-200"
          >
            <span aria-live="polite">
              {copied ? "Copied ✓" : "Copy email"}
            </span>
          </button>
        </div>

        {/* Direct Links + Spinning Circular Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t border-[rgba(13,13,13,0.1)] mb-16">
          <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-[#3a3a3a]">
            <a
              href={PROFILE.phoneHref}
              className="hover:text-[#0d0d0d] hover:underline"
            >
              {PROFILE.phone}
            </a>
            {PROFILE.linkedin && (
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0d0d0d] hover:underline"
              >
                LinkedIn ↗
              </a>
            )}
            {PROFILE.github && (
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0d0d0d] hover:underline"
              >
                GitHub ↗
              </a>
            )}
            <a
              href={PROFILE.resumePath}
              download="Sreeram_Ravishankar_Resume.pdf"
              className="hover:text-[#0d0d0d] hover:underline"
            >
              Download CV ↓
            </a>
          </div>

          {/* Spinning "Say Hello" circular text badge */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg
              className="w-full h-full animate-[spin_16s_linear_infinite]"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                />
              </defs>
              <text fontSize="10.5" fontFamily="var(--font-mono)" fill="#77756f" letterSpacing="2.5">
                <textPath href="#circlePath">
                  · SAY HELLO · GET IN TOUCH
                </textPath>
              </text>
            </svg>
            <div className="absolute w-3 h-3 rounded-full bg-[#0d0d0d]" />
          </div>
        </div>

        {/* Footer bottom line */}
        <div className="pt-8 border-t border-[rgba(13,13,13,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#77756f]">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </span>

          <button
            onClick={() => scrollTo(0)}
            className="hover:text-[#0d0d0d] underline transition-colors"
          >
            Back to top ↑
          </button>

          <span>Built with Next.js 15 &amp; React 19</span>
        </div>
      </div>
    </footer>
  );
}
