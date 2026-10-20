"use client";

import React, { useState } from "react";
import { ALL_SKILLS, SKILL_FAMILIES, SkillItem } from "@/lib/data";
import { TechLogo, isBrand } from "@/components/ui/TechLogo";

export function Skills() {
  const [selectedFamily, setSelectedFamily] = useState<string>("All");
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem>(ALL_SKILLS[0]);

  return (
    <section id="skills" aria-label="Skills" className="site-section">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="tag-mono">02 — Skills</span>
            <h2 className="heading-display">
              Periodic table of my <span className="heading-italic">stack.</span>
            </h2>
          </div>

          {/* Family filter chips */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white rounded-full border border-[rgba(13,13,13,0.08)] w-fit shadow-xs">
            {SKILL_FAMILIES.map((family) => {
              const isActive = selectedFamily === family;
              return (
                <button
                  key={family}
                  onClick={() => setSelectedFamily(family)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 ${
                    isActive
                      ? "bg-[#0d0d0d] text-white shadow-xs"
                      : "text-[#77756f] hover:text-[#0d0d0d]"
                  }`}
                >
                  {family}
                </button>
              );
            })}
          </div>
        </div>

        {/* Layout: Grid + Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Periodic Elements Grid (8 cols desktop, 4 cols mobile) */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2.5">
            {ALL_SKILLS.map((skill, idx) => {
              const row = Math.floor(idx / 8);
              const col = idx % 8;
              const delay = (row + col) * 40;
              const matchesFilter = selectedFamily === "All" || skill.family === selectedFamily;
              const isSelected = hoveredSkill.num === skill.num;

              return (
                <button
                  key={skill.num}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onFocus={() => setHoveredSkill(skill)}
                  onClick={() => setHoveredSkill(skill)}
                  style={{ animationDelay: `${delay}ms` }}
                  className={`aspect-square p-2 rounded-xl text-left border flex flex-col justify-between transition-all duration-300 relative group outline-none ${
                    matchesFilter
                      ? isSelected
                        ? "bg-[#0d0d0d] text-white border-[#0d0d0d] shadow-md scale-105 z-10"
                        : "bg-white text-[#0d0d0d] border-[rgba(13,13,13,0.08)] hover:border-[#0d0d0d] hover:shadow-xs"
                      : "bg-white/40 text-[#999] border-[rgba(13,13,13,0.04)] opacity-35"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono leading-none opacity-60">
                      {skill.num}
                    </span>
                    <span className="text-[8px] font-mono leading-none opacity-40 uppercase">
                      {skill.family.slice(0, 3)}
                    </span>
                  </div>

                  <div className="my-auto text-center w-full">
                    <span className="text-lg font-bold font-mono tracking-tight block">
                      {skill.symbol}
                    </span>
                  </div>

                  <div className="w-full truncate">
                    <span className="text-[9px] font-medium block truncate">
                      {skill.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Inspector Panel */}
          <div className="lg:sticky lg:top-24 card-premium p-6 flex flex-col items-center text-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#77756f] mb-4">
              Element Inspector · No. {hoveredSkill.num}
            </span>

            {/* Brand or Concept Icon (150px) with pop animation */}
            <div className="w-[150px] h-[150px] my-4 flex items-center justify-center p-4 rounded-2xl bg-[#f9f8f6] border border-[rgba(13,13,13,0.06)] relative overflow-hidden group">
              {/* Soft glow for brand logo */}
              {isBrand(hoveredSkill.logoKey) && (
                <div className="absolute inset-0 bg-radial from-[rgba(13,13,13,0.08)] to-transparent pointer-events-none" />
              )}
              <div key={hoveredSkill.num} className="animate-[scalePop_0.35s_cubic-bezier(0.16,1,0.3,1)]">
                <TechLogo logoKey={hoveredSkill.logoKey} size={84} />
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#0d0d0d] mt-2 tracking-tight">
              {hoveredSkill.name}
            </h3>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#f0eee9] text-[10px] font-mono text-[#555]">
              {hoveredSkill.family}
            </span>

            <div className="w-full border-t border-[rgba(13,13,13,0.08)] mt-6 pt-4 text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#999] block mb-2">
                Applied in Projects
              </span>
              <ul className="space-y-1.5">
                {hoveredSkill.projects.map((proj, i) => (
                  <li key={i} className="text-xs text-[#3a3a3a] flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#0d0d0d]" />
                    <span>{proj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scalePop {
          0% {
            transform: scale(0.85);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
