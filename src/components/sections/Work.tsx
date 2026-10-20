"use client";

import React, { useState } from "react";
import { PROJECTS, ProjectItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

export function Work() {
  const [activeProject, setActiveProject] = useState<string>(PROJECTS[0].id);

  return (
    <section id="work" aria-label="Work" className="site-section">
      <div className="site-container">
        {/* Section Header */}
        <div className="mb-12">
          <span className="tag-mono">03 — Selected Work</span>
          <h2 className="heading-display">
            Engineered <span className="heading-italic">solutions.</span>
          </h2>
        </div>

        {/* Desktop Expanding Horizontal Accordion (h: min(78svh, 600px)) */}
        <div className="hidden lg:flex gap-3 h-[580px] w-full">
          {PROJECTS.map((proj) => {
            const isOpen = activeProject === proj.id;

            return (
              <div
                key={proj.id}
                role="region"
                tabIndex={0}
                aria-label={`${proj.title}. ${isOpen ? "Currently expanded" : "Click to expand"}`}
                onClick={() => setActiveProject(proj.id)}
                onFocus={() => setActiveProject(proj.id)}
                className={`card-premium relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer outline-none ${
                  isOpen
                    ? "flex-[8] p-8 cursor-default shadow-lg"
                    : "flex-[1] p-4 flex flex-col justify-between items-center hover:bg-[#eae8e3]"
                }`}
              >
                {isOpen ? (
                  /* Expanded Panel: Two Columns */
                  <div className="h-full flex gap-8 animate-[fadeIn_0.4s_ease-out]">
                    {/* Left details */}
                    <div className="flex-1 flex flex-col justify-between overflow-y-auto pr-2">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-xs font-semibold text-[#77756f]">
                            {proj.index}
                          </span>
                          <span className="text-xs font-mono uppercase tracking-wider text-[#999]">
                            {proj.kicker}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold tracking-tight text-[#0d0d0d] mb-3">
                          {proj.title}
                        </h3>

                        <p className="text-sm text-[#3a3a3a] leading-relaxed mb-6">
                          {proj.description}
                        </p>

                        {/* 2-column feature list */}
                        <div className="mb-6">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#999] block mb-2">
                            Key Capabilities
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {proj.features.map((feat, i) => (
                              <div
                                key={i}
                                className="text-xs text-[#3a3a3a] flex items-start gap-1.5 p-2 rounded-lg bg-[#f9f8f6] border border-[rgba(13,13,13,0.04)]"
                              >
                                <span className="text-[#0d0d0d] font-mono">✓</span>
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Tech Chips + Link */}
                      <div className="pt-4 border-t border-[rgba(13,13,13,0.08)] flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                          {proj.tech.map((t, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f2ee] text-xs font-mono text-[#3a3a3a]"
                            >
                              <TechLogo logoKey={t.toLowerCase().split(" ")[0]} size={14} />
                              <span>{t}</span>
                            </span>
                          ))}
                        </div>

                        {proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-pill-primary !h-9 !px-4 !text-xs"
                          >
                            View on GitHub ↗
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right side: Illustrative Mini-UI */}
                    <div className="flex-1 rounded-2xl bg-[#0d0d0d] text-[#f4f2ee] p-5 flex flex-col justify-between overflow-hidden relative border border-[#222]">
                      <div className="flex items-center justify-between border-b border-[#262626] pb-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#444]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#444]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#444]" />
                        </div>
                        <span className="text-[10px] font-mono tracking-widest text-[#888] uppercase">
                          Illustrative UI · Mock Sandbox
                        </span>
                      </div>

                      {/* Mock UI Content */}
                      <div className="my-auto">
                        <IllustrativeUi type={proj.miniUiType} />
                      </div>

                      <div className="border-t border-[#262626] pt-2 text-[10px] font-mono text-[#666] flex justify-between">
                        <span>Status: Verified Specification</span>
                        <span>Arch: Clean OOP / Microservices</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Folded spine */
                  <>
                    <span className="font-mono text-sm font-bold text-[#77756f]">
                      {proj.index}
                    </span>
                    <div className="writing-vertical text-sm font-semibold tracking-tight text-[#0d0d0d] my-auto">
                      {proj.title}
                    </div>
                    <div className="w-8 h-8 rounded-full border border-[rgba(13,13,13,0.2)] flex items-center justify-center text-xs group-hover:rotate-90 transition-transform duration-300">
                      +
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Accordion */}
        <div className="lg:hidden flex flex-col gap-4">
          {PROJECTS.map((proj) => {
            const isOpen = activeProject === proj.id;

            return (
              <div
                key={proj.id}
                className="card-premium overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveProject(isOpen ? "" : proj.id)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-[#77756f]">
                      {proj.index}
                    </span>
                    <h3 className="text-base font-bold text-[#0d0d0d]">
                      {proj.title}
                    </h3>
                  </div>
                  <span className="text-lg font-mono text-[#77756f]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[rgba(13,13,13,0.06)]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#999] block mb-2">
                      {proj.kicker}
                    </span>
                    <p className="text-xs text-[#3a3a3a] leading-relaxed mb-4">
                      {proj.description}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      {proj.features.map((feat, idx) => (
                        <div key={idx} className="text-xs text-[#555] flex items-center gap-1.5">
                          <span>✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[rgba(13,13,13,0.06)]">
                      {proj.tech.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f4f2ee]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}

function IllustrativeUi({ type }: { type: "hospital" | "cards" | "telemetry" }) {
  if (type === "hospital") {
    return (
      <div className="space-y-3 font-mono text-xs">
        <div className="flex justify-between items-center bg-[#1a1a1a] p-2.5 rounded-lg border border-[#333]">
          <span className="text-[#888]">PATIENT INTAKE</span>
          <span className="text-emerald-400">ACTIVE / PERSISTED</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="bg-[#161616] p-2 rounded border border-[#2a2a2a]">
            <span className="text-[#777] block text-[9px]">DOCTOR ALLOCATED</span>
            <span>Dr. S. Nair (Cardiology)</span>
          </div>
          <div className="bg-[#161616] p-2 rounded border border-[#2a2a2a]">
            <span className="text-[#777] block text-[9px]">STATUS</span>
            <span>Admitted · Ward 4B</span>
          </div>
        </div>
        <div className="bg-[#141414] p-2 rounded border border-[#262626] text-[10px] text-[#aaa]">
          SQL Query: SELECT p.id, d.name, a.slot FROM admissions a JOIN doctors d ON a.doc_id = d.id;
        </div>
      </div>
    );
  }

  if (type === "cards") {
    return (
      <div className="space-y-3 font-mono text-xs">
        <div className="flex justify-between items-center bg-[#1a1a1a] p-2.5 rounded-lg border border-[#333]">
          <span className="text-[#888]">GAME SESSION #2021-IT</span>
          <span className="text-amber-400">TURN: PLAYER 2</span>
        </div>
        <div className="flex justify-center gap-2 py-2">
          {["🂡 A♠", "🂮 K♥", "🂭 Q♦", "🂫 J♣"].map((card, i) => (
            <div
              key={i}
              className="w-12 h-16 rounded-md bg-[#252525] border border-[#444] flex items-center justify-center text-sm font-bold text-white shadow-xs"
            >
              {card}
            </div>
          ))}
        </div>
        <div className="bg-[#141414] p-2 rounded border border-[#262626] text-[10px] text-[#aaa]">
          TurnValidator.enforceRuleSet(gameState, currentCardAction);
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex justify-between items-center bg-[#1a1a1a] p-2.5 rounded-lg border border-[#333]">
        <span className="text-[#888]">ISRO U.R.S.C TELEMETRY</span>
        <span className="text-cyan-400">SYNC LOCKED</span>
      </div>
      <div className="bg-[#161616] p-2.5 rounded border border-[#2a2a2a] space-y-1 text-[11px]">
        <div className="flex justify-between">
          <span className="text-[#777]">FRAME BITRATE:</span>
          <span>1024 kbps QPSK</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#777]">PACKET LOSS:</span>
          <span>0.000% (BER &lt; 10⁻⁷)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#777]">STATUS:</span>
          <span>PASSED VERIFICATION</span>
        </div>
      </div>
      <div className="bg-[#141414] p-2 rounded border border-[#262626] text-[10px] text-[#aaa]">
        basebandVerifier.runChecksumPipeline(framePayload);
      </div>
    </div>
  );
}
