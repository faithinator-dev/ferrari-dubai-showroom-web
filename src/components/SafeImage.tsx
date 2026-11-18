import { useState } from 'react';
import { Shield } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  draggable?: boolean;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Scuderia Ferrari Dubai',
  fallbackSubtitle = 'Sheikh Zayed Road Flagship',
  draggable = false,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#18181D] via-[#0E0E11] to-[#1F0709] p-6 text-center ${className}`}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center border border-[#DC0000]/40 bg-[#DC0000]/10">
          <Shield className="h-5 w-5 text-[#DC0000]" aria-hidden="true" />
        </div>
        <p className="font-display text-xl font-medium tracking-wide text-[#F4F1EA]">
          {fallbackTitle}
        </p>
        <p className="mt-1 text-xs text-zinc-400">{fallbackSubtitle}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      draggable={draggable}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
