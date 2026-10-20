"use client";

import React from "react";
import { PROFILE } from "@/lib/data";
import { IdCard } from "@/components/ui/IdCard";

export function About() {
  return (
    <section id="about" aria-label="About" className="site-section">
      <div className="site-container">
        {/* Section Tag & Heading */}
        <div className="mb-12">
          <span className="tag-mono">01 — About</span>
          <h2 className="heading-display">
            Behind the <span className="heading-italic">terminal.</span>
          </h2>
        </div>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 items-stretch">
          {/* Left Column: Bio & Links */}
          <div className="card-premium p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#77756f] block mb-2">
                Introduction
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-[#0d0d0d] mb-4">
                Hi, I&apos;m {PROFILE.firstName}.
              </h3>
              <p className="text-[#3a3a3a] leading-relaxed text-sm md:text-base mb-4">
                {PROFILE.resumeSummary}
              </p>
              <p className="text-[#77756f] text-xs leading-relaxed">
                Currently driving Azure AD B2C enterprise authentication and event-driven SAP synchronization solutions at Straumann Group.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-[rgba(13,13,13,0.08)]">
              <a
                href={PROFILE.resumePath}
                download="Sreeram_Ravishankar_Resume.pdf"
                className="btn-pill-primary !h-10 !px-5 !text-xs"
              >
                Résumé ↓
              </a>
              {PROFILE.github && (
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-secondary !h-10 !px-4 !text-xs"
                >
                  GitHub ↗
                </a>
              )}
              {PROFILE.linkedin && (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-secondary !h-10 !px-4 !text-xs"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>

          {/* Centre Column: Hanging Lanyard ID Card */}
          <div className="flex justify-center items-center py-4">
            <IdCard />
          </div>

          {/* Right Column: Quick Facts & Quote */}
          <div className="card-premium p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#77756f] block mb-4">
                Quick Facts
              </span>

              <div className="space-y-4 text-xs font-mono">
                <div className="pb-3 border-b border-[rgba(13,13,13,0.06)]">
                  <span className="text-[#999] block mb-1">LOCATION</span>
                  <span className="text-[#0d0d0d] font-semibold text-sm">{PROFILE.location}</span>
                </div>

                <div className="pb-3 border-b border-[rgba(13,13,13,0.06)]">
                  <span className="text-[#999] block mb-1">CURRENT ROLE</span>
                  <span className="text-[#0d0d0d] font-semibold text-sm">
                    {PROFILE.role} · Straumann Group
                  </span>
                </div>

                <div className="pb-3 border-b border-[rgba(13,13,13,0.06)]">
                  <span className="text-[#999] block mb-1">EDUCATION</span>
                  <span className="text-[#0d0d0d] font-semibold text-sm">
                    M.Sc. in Information Technology at University of Glasgow
                  </span>
                </div>

                <div className="pb-3 border-b border-[rgba(13,13,13,0.06)]">
                  <span className="text-[#999] block mb-1">COMMUNICATION</span>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-[#0d0d0d] font-semibold underline break-all text-sm"
                  >
                    {PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[rgba(13,13,13,0.08)] bg-[#f9f8f6] p-4 rounded-xl">
              <p className="text-xs italic text-[#555] leading-relaxed">
                &ldquo;{PROFILE.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
