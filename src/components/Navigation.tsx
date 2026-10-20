"use client";

import React, { useState, useEffect, useRef } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";

export function Navigation() {
  const { scrollTo } = useScroll();
  const scrollProgress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0
  });

  // Track scrolled state for initials mark & navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section with rootMargin: -45% 0px -50% 0px
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    NAV.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Update sliding pill indicator position
  useEffect(() => {
    if (!navContainerRef.current) return;
    const activeEl = navContainerRef.current.querySelector(`[data-nav-id="${activeSection}"]`) as HTMLElement;
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    scrollTo(id);
  };

  return (
    <>
      {/* 2px ink scroll-progress bar along the very top */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#0d0d0d] z-50 origin-left pointer-events-none transition-transform duration-75"
        style={{
          transform: `scaleX(${scrollProgress})`
        }}
      />

      {/* Main Navigation Header */}
      <header className="fixed top-4 left-0 right-0 z-40 px-4 md:px-8 pointer-events-none">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          {/* Left: Initials mark + Name */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              onClick={() => scrollTo(0)}
              aria-label="Scroll to top"
              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-500 hover:rotate-[360deg] ${
                scrolled
                  ? "bg-[#0d0d0d] text-white shadow-md border-transparent"
                  : "bg-transparent text-[#0d0d0d] border border-[#0d0d0d]"
              }`}
            >
              SR
            </button>
            <span
              className={`font-semibold text-sm tracking-tight text-[#0d0d0d] transition-opacity duration-300 hidden sm:inline-block ${
                scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {PROFILE.name}
            </span>
          </div>

          {/* Desktop Nav Pill */}
          <nav
            ref={navContainerRef}
            aria-label="Primary navigation"
            className={`hidden md:flex items-center gap-1 p-1.5 rounded-full pointer-events-auto transition-all duration-400 relative ${
              scrolled
                ? "bg-white/80 backdrop-blur-md border border-[rgba(13,13,13,0.08)] shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                : "bg-transparent border border-transparent"
            }`}
          >
            {/* Sliding ink indicator pill */}
            <div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-[#0d0d0d] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity
              }}
            />

            {NAV.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  data-nav-id={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-medium tracking-tight transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-[#3a3a3a] hover:text-[#0d0d0d]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden pointer-events-auto">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
              className="btn-pill-primary !h-10 !px-4 !text-xs"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[#f4f2ee] flex flex-col justify-between p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto clip-open" : "opacity-0 pointer-events-none clip-closed"
        }`}
        style={{
          clipPath: mobileMenuOpen
            ? "circle(150% at calc(100% - 40px) 40px)"
            : "circle(0% at calc(100% - 40px) 40px)"
        }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-[#77756f]">Navigation</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Navigation Menu"
            className="w-10 h-10 rounded-full border border-[rgba(13,13,13,0.15)] flex items-center justify-center text-sm font-semibold text-[#0d0d0d]"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-6 my-auto">
          {NAV.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group flex items-baseline gap-4 text-left"
              style={{
                transitionDelay: `${idx * 40}ms`
              }}
            >
              <span className="font-mono text-xs text-[#77756f]">{item.index}</span>
              <span className="text-3xl font-bold tracking-tight text-[#0d0d0d] group-hover:translate-x-2 transition-transform duration-300">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="border-t border-[rgba(13,13,13,0.1)] pt-4 flex items-center justify-between text-xs font-mono text-[#77756f]">
          <span>{PROFILE.location}</span>
          <a href={`mailto:${PROFILE.email}`} className="underline text-[#0d0d0d]">
            {PROFILE.email}
          </a>
        </div>
      </div>
    </>
  );
}
