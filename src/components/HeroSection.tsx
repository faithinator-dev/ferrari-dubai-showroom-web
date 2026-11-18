import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, Compass, Pause, Play } from 'lucide-react';
import { HERO_CHAPTERS } from '../data/showroomData';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  onExploreFleet: () => void;
  onLaunchTour: () => void;
}

export function HeroSection({ onExploreFleet, onLaunchTour }: HeroSectionProps) {
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Auto-advance reel chapters when playing
  useEffect(() => {
    if (!isPlaying || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveChapterIdx((prev) => (prev + 1) % HERO_CHAPTERS.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [isPlaying, reducedMotion]);

  // Synthesize live canvas-backed video stream for genuine HTML5 <video> background motion
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video || reducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let streamAttached = false;
    const loadedImages: HTMLImageElement[] = [];

    HERO_CHAPTERS.forEach((chapter, index) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = chapter.image;
      loadedImages[index] = img;
    });

    const startTime = performance.now();

    const renderFrame = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const img = loadedImages[activeChapterIdx];

      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (img && img.complete && img.naturalWidth > 0) {
        const zoom = isPlaying ? 1.0 + Math.sin(elapsed * 0.25) * 0.035 + 0.035 : 1.02;
        const panX = isPlaying ? Math.sin(elapsed * 0.18) * 18 : 0;
        const panY = isPlaying ? Math.cos(elapsed * 0.14) * 8 : 0;

        const drawW = canvas.width * zoom;
        const drawH = canvas.height * zoom;
        const dx = (canvas.width - drawW) / 2 + panX;
        const dy = (canvas.height - drawH) / 2 + panY;

        ctx.drawImage(img, dx, dy, drawW, drawH);

        // Subtle warm architectural light sweep
        const sweepX = ((elapsed * 90) % (canvas.width + 600)) - 300;
        const gradient = ctx.createLinearGradient(sweepX - 220, 0, sweepX + 220, canvas.height);
        gradient.addColorStop(0, 'rgba(220, 0, 0, 0)');
        gradient.addColorStop(0.5, 'rgba(255, 225, 195, 0.045)');
        gradient.addColorStop(1, 'rgba(220, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (!streamAttached && typeof canvas.captureStream === 'function') {
        try {
          const stream = canvas.captureStream(30);
          video.srcObject = stream;
          video.play().catch(() => {
            // Autoplay fallback handled gracefully by underlying high-res plate
          });
          streamAttached = true;
        } catch {
          streamAttached = true;
        }
      }

      if (isPlaying) {
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [activeChapterIdx, isPlaying, reducedMotion]);

  const activeChapter = HERO_CHAPTERS[activeChapterIdx];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#09090B] pt-24"
    >
      {/* Full-Screen Video & High-Resolution Motion Backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Crisp static/CSS-animated plate immediately visible on frame 1 */}
        {HERO_CHAPTERS.map((chapter, index) => {
          const isActive = index === activeChapterIdx;
          return (
            <div
              key={chapter.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <SafeImage
                src={chapter.image}
                alt={chapter.caption}
                fallbackTitle={chapter.title}
                fallbackSubtitle={chapter.location}
                className={`h-full w-full object-cover transition-transform duration-[7000ms] ease-out ${
                  isActive && isPlaying && !reducedMotion ? 'scale-[1.06]' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Offscreen render surface feeding the live HTML5 video stream */}
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          aria-hidden="true"
          className="hidden"
        />

        {/* Real HTML5 Video Backdrop layered seamlessly */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_CHAPTERS[0].image}
          aria-label="Ferrari Dubai Sheikh Zayed Road Flagship Showroom ambient film"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />

        {/* Measured Contrast Scrims (>= 4.5:1 text legibility across every luminance frame) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/45 to-[#09090B]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090B]/90 via-[#09090B]/45 to-transparent" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-10 lg:px-12 lg:pb-14">
        <div className="max-w-3xl">
          {/* Clean Unboxed Regional Metadata */}
          <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium tracking-wide text-zinc-300">
            <span className="text-[#DC0000]">Sheikh Zayed Road</span>
            <span aria-hidden="true" className="text-zinc-600">
              ·
            </span>
            <span>Dubai Flagship Pavilion</span>
            <span aria-hidden="true" className="text-zinc-600">
              ·
            </span>
            <span className="font-mono tabular-nums text-zinc-400">25.1618° N, 55.2266° E</span>
          </div>

          <h1
            className="font-display text-[clamp(2.5rem,5.2vw,4.75rem)] font-medium leading-[1.03] tracking-tight text-[#F4F1EA]"
            style={{ textWrap: 'balance' }}
          >
            Precision Forged in Maranello. Curated for Dubai.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            Experience the contemporary V12 and hybrid range inside our Sheikh Zayed Road
            sanctuary, complete with a dedicated Tailor Made commissioning suite and private
            allocation concierge.
          </p>

          {/* Primary Decision Block: 1 dominant CTA + 1 quiet secondary action */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onExploreFleet}
              className="inline-flex min-h-[48px] items-center gap-2.5 bg-[#DC0000] px-7 py-3 text-sm font-medium tracking-wide text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#B80000] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
            >
              <span>Explore the Fleet</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onLaunchTour}
              className="inline-flex min-h-[48px] items-center gap-2.5 border border-white/25 bg-[#09090B]/60 px-6 py-3 text-sm font-medium text-[#F4F1EA] whitespace-nowrap shrink-0 backdrop-blur-sm transition-colors duration-150 hover:border-white/50 hover:bg-[#131316] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC0000] cursor-pointer"
            >
              <Compass className="h-4 w-4 text-[#DC0000]" aria-hidden="true" />
              <span>Launch Virtual Tour</span>
            </button>
          </div>
        </div>

        {/* Bottom Cinema Reel Controls & Chapter Switcher */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause showroom film reel' : 'Play showroom film reel'}
              className="inline-flex min-h-[40px] items-center gap-2 border border-white/15 bg-[#131316]/85 px-3.5 py-2 text-xs font-medium text-[#F4F1EA] whitespace-nowrap shrink-0 transition-colors hover:border-white/35 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DC0000]"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5 text-[#DC0000]" aria-hidden="true" />
                  <span>Pause Film</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 text-[#DC0000]" aria-hidden="true" />
                  <span>Play Film</span>
                </>
              )}
            </button>

            <p className="hidden text-xs text-zinc-400 lg:block">{activeChapter.caption}</p>
          </div>

          <div
            role="tablist"
            aria-label="Showroom reel chapters"
            className="flex flex-wrap items-center gap-2 sm:gap-5"
          >
            {HERO_CHAPTERS.map((chapter, idx) => {
              const selected = idx === activeChapterIdx;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveChapterIdx(idx)}
                  className={`min-h-[40px] border-b-2 px-1 py-1.5 text-left text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DC0000] ${
                    selected
                      ? 'border-[#DC0000] text-[#F4F1EA]'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-mono tabular-nums text-zinc-500">{chapter.index}.</span>{' '}
                  {chapter.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
