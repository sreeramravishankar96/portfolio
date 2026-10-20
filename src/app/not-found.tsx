import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 text-center bg-[#f4f2ee] text-[#0d0d0d]">
      <span className="font-mono text-xs uppercase tracking-widest text-[#77756f] mb-3">
        404 — Page Not Found
      </span>
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="text-sm text-[#77756f] mb-8 max-w-md">
        The requested resource does not exist.
      </p>
      <Link href="/" className="btn-pill-primary">
        Return Home
      </Link>
    </div>
  );
}
