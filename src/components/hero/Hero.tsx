"use client";

import React, { useRef, useState, useEffect } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

export function Hero() {
  const { scrollTo } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  // Play once on mount or upon first user interaction
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start playback
    const startFirstPlay = (unmute = false) => {
      if (unmute) {
        video.muted = false;
      }
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser blocks audio autoplay, play muted once
          video.muted = true;
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    };

    // Attempt direct play
    startFirstPlay(false);

    // If initial play was muted, unlock audio on first interaction
    const unlockAudio = () => {
      if (video && !hasPlayedOnce) {
        video.muted = false;
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchend", unlockAudio);
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
    window.addEventListener("touchend", unlockAudio, { once: true });

    return () => cleanup();
  }, [hasPlayedOnce]);

  // Pause if scrolled out of view; resume only if was previously playing
  useEffect(() => {
    const heroEl = heroSectionRef.current;
    const video = videoRef.current;
    if (!heroEl || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.35) {
          if (!video.paused) {
            video.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: [0, 0.35, 1.0] }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  // Handle video ending: stops and resets button to play ▶
  const handleEnded = () => {
    setIsPlaying(false);
    setHasPlayedOnce(true);
  };

  // Play / Pause button toggle: plays once from start if ended
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      if (video.ended || video.currentTime >= (video.duration || 10) - 0.2) {
        video.currentTime = 0;
      }
      video.muted = false;
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      ref={heroSectionRef}
      id="hero"
      aria-label="Hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center pt-24 pb-8 overflow-hidden bg-[var(--paper)]"
    >
      {/* Background Ghost Name Typography */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0 w-full text-center"
      >
        <span
          className="font-bold tracking-tight uppercase text-transparent block"
          style={{
            fontSize: "clamp(4.5rem, 16vw, 16rem)",
            WebkitTextStroke: "1px rgba(13, 13, 13, 0.08)",
            lineHeight: 0.85
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Center Video Frame - Person Outline Only (no box, soft bottom blend) */}
      <div className="relative z-10 w-full flex items-center justify-center my-auto px-4">
        <div
          className="relative max-w-[768px] w-full flex justify-center items-center"
          style={{
            height: "clamp(420px, 64svh, 860px)"
          }}
        >
          <video
            ref={videoRef}
            playsInline
            preload="auto"
            onEnded={handleEnded}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            aria-label={`Introduction video by ${PROFILE.name}`}
            className="h-full w-auto max-w-full object-contain pointer-events-none"
            style={{
              aspectRatio: "768 / 960",
              mixBlendMode: "multiply",
              maskImage: "linear-gradient(to bottom, black 82%, transparent 98%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 98%)"
            }}
          >
            <source src="/portfolio/hero/hero.webm" type="video/webm" />
            <source src="/portfolio/hero/hero.mp4" type="video/mp4" />
          </video>

          {/* Sound / Playback Control Button: 46px solid ink */}
          <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause introduction" : "Play introduction"}
              className="relative w-[46px] h-[46px] rounded-full bg-[#0d0d0d] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              {/* Soft pulse ring when waiting to be played */}
              {!isPlaying && (
                <span className="absolute -inset-1 rounded-full border border-[rgba(13,13,13,0.3)] animate-ping pointer-events-none" />
              )}

              {!isPlaying ? (
                /* ▶ triangle */
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="translate-x-[1px]"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              ) : (
                /* ❚❚ two bars */
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Heading and CTAs */}
      <div className="relative z-10 site-container text-center flex flex-col items-center gap-6 mt-4">
        <div>
          <span className="tag-mono">00 — Welcome</span>
          <h1 className="heading-display">
            {PROFILE.role.split("-")[0].trim()}{" "}
            <span className="heading-italic">Engineer.</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => scrollTo("work")}
            className="btn-pill-primary"
          >
            Explore work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="btn-pill-secondary"
          >
            Let&apos;s talk
          </button>
          <a
            href={PROFILE.resumePath}
            download="Sreeram_Ravishankar_Resume.pdf"
            className="btn-pill-secondary"
          >
            Résumé ↓
          </a>
        </div>
      </div>
    </section>
  );
}
