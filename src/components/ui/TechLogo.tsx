"use client";

import React from "react";

const BRAND_KEYS = new Set([
  "java",
  "spring",
  "docker",
  "git",
  "jenkins",
  "postgresql",
  "redis",
  "mysql",
  "azure",
  "jira",
  "postman",
  "swagger",
  "gradle",
  "html5",
  "css3",
  "hackerrank",
  "leetcode",
  "linkedin",
  "github"
]);

export function isBrand(key: string): boolean {
  return BRAND_KEYS.has(key.toLowerCase());
}

export function ConceptIcon({ name, size = 24 }: { name: string; size?: number }) {
  const stroke = "currentColor";
  const sw = 1.5;

  switch (name.toLowerCase()) {
    case "dsa":
    case "data structures":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M10.5 7.5L7.5 15.5M13.5 7.5L16.5 15.5" />
        </svg>
      );
    case "sql":
    case "database":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "microservices":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="8" height="8" rx="2" />
          <rect x="14" y="2" width="8" height="8" rx="2" />
          <rect x="2" y="14" width="8" height="8" rx="2" />
          <rect x="14" y="14" width="8" height="8" rx="2" />
          <path d="M10 6h4M6 10v4M18 10v4M10 18h4" />
        </svg>
      );
    case "rest":
    case "restful apis":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 9l3 3-3 3M13 15h3M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "oauth":
    case "jwt":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "patterns":
    case "design patterns":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case "agile":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
      );
    case "cicd":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m10 15 5-3-5-3v6Z" />
        </svg>
      );
    case "tdd":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "sdlc":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v16h16" />
          <path d="m4 16 6-6 4 4 6-8" />
        </svg>
      );
    case "maven":
    case "flyway":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
  }
}

interface TechLogoProps {
  logoKey: string;
  size?: number;
  className?: string;
}

export function TechLogo({ logoKey, size = 32, className = "" }: TechLogoProps) {
  const brand = isBrand(logoKey);

  if (brand) {
    return (
      <img
        src={`/portfolio/logos/${logoKey.toLowerCase()}.svg`}
        alt={`${logoKey} logo`}
        width={size}
        height={size}
        loading="lazy"
        className={`object-contain transition-transform duration-300 ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center text-[#3a3a3a] ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <ConceptIcon name={logoKey} size={size} />
    </div>
  );
}
