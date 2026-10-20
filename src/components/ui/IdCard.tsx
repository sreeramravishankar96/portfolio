"use client";

import React, { useState, useRef, useEffect } from "react";
import { PROFILE } from "@/lib/data";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function IdCard() {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  // Physics: damped pendulum swing
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const lastMouseX = useRef(0);
  const lastTime = useRef(0);
  const idlePhase = useRef(0);

  useEffect(() => {
    if (prefersReduced) return;

    let animId: number;

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = (now - lastTime.current) / 1000;
      if (dt > 0.001 && dt < 0.2) {
        const dx = e.clientX - lastMouseX.current;
        const pointerVel = dx / dt; // px per second
        // Damp and map pointer velocity to pendulum angular impulse
        velocityRef.current += Math.max(Math.min(pointerVel * 0.008, 12), -12);
      }
      lastMouseX.current = e.clientX;
      lastTime.current = now;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const animate = () => {
      // Spring return to 0 + subtle idle sway
      idlePhase.current += 0.02;
      const idleSway = Math.sin(idlePhase.current) * 0.8;

      const springK = 3.5;
      const damping = 0.94;

      const force = -springK * angleRef.current;
      velocityRef.current += force * 0.016;
      velocityRef.current *= damping;
      angleRef.current += velocityRef.current * 0.016;

      const currentAngle = angleRef.current + idleSway;

      if (cardRef.current) {
        cardRef.current.style.transform = `rotate(${currentAngle.toFixed(2)}deg)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(animId);
    };
  }, [prefersReduced]);

  const toggleFlip = () => {
    setFlipped((f) => !f);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-start select-none pt-2"
      style={{ perspective: 1000 }}
    >
      {/* Hanging lanyard strap: 30x56 px with scrolling name and role */}
      <div className="relative w-[30px] h-[56px] overflow-hidden bg-[#181818] border-x border-[#333] shadow-sm flex flex-col items-center">
        <div className="strap-text text-[9px] font-mono tracking-widest text-[#888] uppercase whitespace-nowrap">
          {PROFILE.firstName} · {PROFILE.role} · {PROFILE.firstName} · {PROFILE.role}
        </div>
      </div>

      {/* Metal clip connecting lanyard and card */}
      <div className="w-[42px] h-[16px] bg-gradient-to-b from-[#d8d8d8] via-[#a8a8a8] to-[#686868] rounded-[3px] border border-[#555] shadow-[0_2px_4px_rgba(0,0,0,0.25)] relative z-20 flex items-center justify-center">
        <div className="w-[12px] h-[4px] bg-[#333] rounded-full" />
      </div>

      {/* Hanging pendulum wrapper */}
      <div
        ref={cardRef}
        style={{ transformOrigin: "top center", willChange: "transform" }}
        className="mt-[-2px] transition-transform duration-75"
      >
        {/* Flip container: 300x404 px */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Developer ID Card. Press Enter or space to flip."
          onClick={toggleFlip}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setFlipped(true)}
          onMouseLeave={() => setFlipped(false)}
          className="id-card-flipper w-[300px] h-[404px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] focus-visible:ring-offset-4 rounded-[20px]"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: prefersReduced ? "none" : "transform 0.7s var(--ease)"
          }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 w-full h-full rounded-[20px] bg-white border border-[rgba(13,13,13,0.12)] shadow-[0_12px_32px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between p-4"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Top black band */}
            <div className="w-full bg-[#0d0d0d] text-white py-1.5 px-3 rounded-lg flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-wider font-semibold">DEVELOPER ID</span>
              <span className="text-[9px] font-mono text-[#999]">2026/SEC</span>
            </div>

            {/* Portrait Frame: 128x156 px */}
            <div className="flex justify-center my-2">
              <div className="w-[128px] h-[156px] rounded-xl p-[2px] bg-gradient-to-b from-[#ddd] via-[#bbb] to-[#888] shadow-inner group overflow-hidden relative">
                <img
                  src="/portfolio/portrait-bust.webp"
                  alt={PROFILE.name}
                  width={128}
                  height={156}
                  className="w-full h-full object-cover rounded-[10px] grayscale transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-[10px] pointer-events-none shadow-[inset_0_0_12px_rgba(0,0,0,0.15)]" />
              </div>
            </div>

            {/* Name & Role */}
            <div className="text-center px-1">
              <h3 className="text-base font-bold text-[#0d0d0d] tracking-tight">{PROFILE.name}</h3>
              <p className="text-[11px] text-[#77756f] font-mono uppercase tracking-wider mt-0.5">
                {PROFILE.role}
              </p>
            </div>

            {/* Info rows */}
            <div className="space-y-1 bg-[#f9f8f6] p-2.5 rounded-xl border border-[rgba(13,13,13,0.06)] text-[10px] font-mono text-[#555]">
              <div className="flex justify-between">
                <span className="text-[#999]">ID NO.</span>
                <span className="font-semibold text-[#111]">{PROFILE.idNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#999]">DEPT.</span>
                <span className="font-semibold text-[#111]">{PROFILE.currentDept}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#999]">VALID TILL</span>
                <span className="font-semibold text-[#111]">{PROFILE.validTill}</span>
              </div>
            </div>

            {/* Bottom: barcode & holographic sticker */}
            <div className="flex items-center justify-between pt-1">
              {/* Barcode in grayscale */}
              <div className="flex items-end gap-[2px] h-6">
                {[3, 1, 4, 1, 5, 2, 6, 2, 1, 4, 2, 3, 1, 5, 2, 4, 1, 3, 5, 2].map((h, i) => (
                  <div
                    key={i}
                    className="bg-[#333]"
                    style={{
                      width: i % 2 === 0 ? "2px" : "1px",
                      height: `${h * 4 + 4}px`
                    }}
                  />
                ))}
              </div>

              {/* Holographic sticker in subtle grays */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ddd] via-[#fff] to-[#999] border border-[#ccc] flex items-center justify-center text-[7px] font-mono font-bold text-[#666] shadow-sm">
                PASS
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 w-full h-full rounded-[20px] bg-[#111111] text-[#f4f2ee] border border-[#222] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-5 flex flex-col justify-between"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#333] pb-2 mb-3">
                <span className="text-[11px] font-mono tracking-widest text-[#888] uppercase">WHAT I AM</span>
                <span className="text-[10px] font-mono text-[#666]">VERIFIED</span>
              </div>

              <ul className="space-y-2 text-[11px] text-[#ccc] leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#888] font-mono">•</span>
                  <span><strong>{PROFILE.role}</strong> at Straumann Group</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#888] font-mono">•</span>
                  <span><strong>{PROFILE.degreeSummary}</strong></span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#888] font-mono">•</span>
                  <span><strong>25+ Microservices</strong> & <strong>100M+</strong> files moderated</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#888] font-mono">•</span>
                  <span>ISRO Merit Award (2nd) · Taking Ownership 2024 & 2025</span>
                </li>
              </ul>
            </div>

            <div>
              {/* Signature line */}
              <div className="border-b border-[#333] pb-1 mb-2 text-right">
                <span className="font-serif italic text-sm text-[#999]">{PROFILE.firstName}</span>
              </div>
              <p className="text-[9px] font-mono text-[#777] text-center">
                If found, say hello · {PROFILE.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollStrap {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .strap-text {
          writing-mode: vertical-rl;
          animation: scrollStrap 12s linear infinite;
        }
      `}</style>
    </div>
  );
}
