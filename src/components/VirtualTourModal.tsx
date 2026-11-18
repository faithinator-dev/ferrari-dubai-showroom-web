import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { VIRTUAL_TOUR_ZONES } from '../data/showroomData';
import { SafeImage } from './SafeImage';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookWalkthrough: (zoneName: string) => void;
}

export function VirtualTourModal({
  isOpen,
  onClose,
  onBookWalkthrough,
}: VirtualTourModalProps) {
  const [zoneIdx, setZoneIdx] = useState(0);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(
    VIRTUAL_TOUR_ZONES[0].hotspots[0].id
  );
  const [panPercent, setPanPercent] = useState(0); // -12 to +12
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeZone = VIRTUAL_TOUR_ZONES[zoneIdx];
  const activeHotspot =
    activeZone.hotspots.find((h) => h.id === selectedHotspotId) ?? activeZone.hotspots[0];

  const handleSelectZone = (idx: number) => {
    setZoneIdx(idx);
    setSelectedHotspotId(VIRTUAL_TOUR_ZONES[idx].hotspots[0].id);
    setPanPercent(0);
    setIsZoomed(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="virtual-tour-modal-title"
      onClick={onClose}
    >
      <div
        className="flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden border border-white/15 bg-[#0D0D10] text-[#F4F1EA]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
          <div>
            <p className="text-xs font-medium text-[#DC0000]">
              Interactive Showroom Walkthrough
            </p>
            <h2 id="virtual-tour-modal-title" className="font-display text-2xl font-medium">
              {activeZone.name} · {activeZone.dimensions}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Zone Switcher Tabs */}
            <div
              role="tablist"
              aria-label="Showroom zones"
              className="hidden lg:inline-flex items-center gap-1 border border-white/10 bg-[#131316] p-1"
            >
              {VIRTUAL_TOUR_ZONES.map((zone, idx) => (
                <button
                  key={zone.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === zoneIdx}
                  onClick={() => handleSelectZone(idx)}
                  className={`min-h-[36px] px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    idx === zoneIdx
                      ? 'bg-[#DC0000] text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {zone.name}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close virtual showroom tour"
              className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-zinc-300 transition-colors hover:border-white/40 hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DC0000]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Zone Switcher */}
        <div className="flex gap-1 overflow-x-auto border-b border-white/10 bg-[#131316] p-2 lg:hidden">
          {VIRTUAL_TOUR_ZONES.map((zone, idx) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => handleSelectZone(idx)}
              className={`min-h-[36px] px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                idx === zoneIdx ? 'bg-[#DC0000] text-white' : 'text-zinc-400'
              }`}
            >
              {zone.name}
            </button>
          ))}
        </div>

        {/* Main Viewport & Hotspot Inspector */}
        <div className="grid flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-12">
          {/* Interactive Panoramic Canvas */}
          <div className="relative min-h-[300px] overflow-hidden bg-[#09090B] sm:min-h-[440px] lg:col-span-8">
            <div
              className="relative h-full w-full transition-transform duration-500 ease-out"
              style={{
                transform: `scale(${isZoomed ? 1.28 : 1.06}) translateX(${panPercent}%)`,
              }}
            >
              <SafeImage
                src={activeZone.image}
                alt={`${activeZone.name} — ${activeZone.subtitle}`}
                fallbackTitle={activeZone.name}
                fallbackSubtitle={activeZone.subtitle}
                className="h-full w-full object-cover"
              />

              {/* Interactive Floor Hotspots */}
              {activeZone.hotspots.map((hotspot) => {
                const isSelected = hotspot.id === activeHotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => setSelectedHotspotId(hotspot.id)}
                    aria-label={`Inspect ${hotspot.title}`}
                    aria-pressed={isSelected}
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border transition-transform duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-white ${
                      isSelected
                        ? 'scale-110 border-white bg-[#DC0000] text-white'
                        : 'border-white/60 bg-[#09090B]/80 text-white hover:scale-105 hover:border-[#DC0000]'
                    }`}
                  >
                    <span className="font-mono text-[11px] font-medium tabular-nums">
                      {activeZone.hotspots.indexOf(hotspot) + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Camera Pan & Zoom Toolbar */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-1 border border-white/15 bg-[#09090B]/85 p-1 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setPanPercent((p) => Math.min(10, p + 5))}
                  aria-label="Pan showroom camera left"
                  className="inline-flex h-9 w-9 items-center justify-center text-zinc-200 hover:bg-white/10 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPanPercent(0)}
                  className="h-9 px-3 text-xs font-medium text-zinc-300 hover:bg-white/10 cursor-pointer"
                >
                  Center View
                </button>
                <button
                  type="button"
                  onClick={() => setPanPercent((p) => Math.max(-10, p - 5))}
                  aria-label="Pan showroom camera right"
                  className="inline-flex h-9 w-9 items-center justify-center text-zinc-200 hover:bg-white/10 cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsZoomed((z) => !z)}
                className="inline-flex min-h-[38px] items-center gap-2 border border-white/15 bg-[#09090B]/85 px-3.5 py-1.5 text-xs font-medium text-[#F4F1EA] backdrop-blur-sm hover:border-white/40 cursor-pointer"
              >
                {isZoomed ? (
                  <>
                    <ZoomOut className="h-3.5 w-3.5 text-[#DC0000]" aria-hidden="true" />
                    <span>Reset Zoom</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="h-3.5 w-3.5 text-[#DC0000]" aria-hidden="true" />
                    <span>Inspect Detail (1.3×)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Zone & Hotspot Detail Panel */}
          <div className="flex flex-col justify-between border-t border-white/10 bg-[#121215] p-6 lg:col-span-4 lg:border-l lg:border-t-0">
            <div>
              <p className="text-xs text-zinc-400">{activeZone.subtitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                {activeZone.description}
              </p>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs font-medium text-zinc-400">
                  Selected Architectural Point
                </p>
                <div className="mt-3 space-y-2">
                  {activeZone.hotspots.map((hotspot, idx) => {
                    const selected = hotspot.id === activeHotspot.id;
                    return (
                      <button
                        key={hotspot.id}
                        type="button"
                        onClick={() => setSelectedHotspotId(hotspot.id)}
                        className={`w-full border p-3.5 text-left transition-colors cursor-pointer ${
                          selected
                            ? 'border-[#DC0000] bg-[#191416]'
                            : 'border-white/10 bg-[#0E0E11] hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-medium text-[#F4F1EA]">
                            <span className="font-mono text-xs tabular-nums text-[#DC0000]">
                              0{idx + 1}.
                            </span>{' '}
                            {hotspot.title}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-zinc-400">{hotspot.subtitle}</p>
                        {selected && (
                          <p className="mt-2.5 border-t border-white/10 pt-2.5 text-xs leading-relaxed text-zinc-300">
                            {hotspot.detail}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <button
                type="button"
                onClick={() => onBookWalkthrough(activeZone.name)}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-[#DC0000] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#B80000] cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
              >
                <span>Book Live Specialist Walkthrough</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
