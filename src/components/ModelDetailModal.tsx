import { useEffect } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import type { FerrariModel } from '../data/showroomData';
import { SafeImage } from './SafeImage';

interface ModelDetailModalProps {
  model: FerrariModel | null;
  onClose: () => void;
  onRequestViewing: (modelName: string) => void;
}

export function ModelDetailModal({ model, onClose, onRequestViewing }: ModelDetailModalProps) {
  useEffect(() => {
    if (!model) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [model, onClose]);

  if (!model) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="model-dossier-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-white/15 bg-[#111114] text-[#F4F1EA]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="font-medium text-[#DC0000]">{model.category}</span>
            <span aria-hidden="true">·</span>
            <span>{model.availability}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close vehicle dossier"
            className="inline-flex h-10 w-10 items-center justify-center border border-white/10 text-zinc-300 transition-colors hover:border-white/30 hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DC0000]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left visual */}
          <div className="relative min-h-[260px] lg:col-span-6 lg:min-h-[420px]">
            <SafeImage
              src={model.image}
              alt={`${model.name} in ${model.exteriorFinish}`}
              fallbackTitle={model.name}
              fallbackSubtitle={model.architecture}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#111114] via-[#111114]/50 to-transparent p-6">
              <p className="text-xs text-zinc-400">Showroom Specification</p>
              <p className="mt-1 text-sm font-medium text-[#F4F1EA]">
                {model.exteriorFinish} / {model.interiorFinish}
              </p>
            </div>
          </div>

          {/* Right specifications */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6">
            <div>
              <h2 id="model-dossier-title" className="font-display text-3xl font-medium sm:text-4xl">
                {model.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{model.description}</p>

              {/* Tabular Technical Specs */}
              <div className="mt-6 grid grid-cols-2 gap-4 border-y border-white/10 py-5">
                <div>
                  <dt className="text-xs text-zinc-400">Maximum Power</dt>
                  <dd className="mt-1 font-mono text-lg font-medium tabular-nums text-[#F4F1EA]">
                    {model.powerCv}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-zinc-400">0–100 km/h</dt>
                  <dd className="mt-1 font-mono text-lg font-medium tabular-nums text-[#F4F1EA]">
                    {model.acceleration}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-zinc-400">Top Speed</dt>
                  <dd className="mt-1 font-mono text-lg font-medium tabular-nums text-[#F4F1EA]">
                    {model.topSpeed}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-zinc-400">Dry Weight</dt>
                  <dd className="mt-1 font-mono text-lg font-medium tabular-nums text-[#F4F1EA]">
                    {model.dryWeight}
                  </dd>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-5">
                <p className="text-xs font-medium text-zinc-400">Dubai Floor Highlights</p>
                <ul className="mt-3 space-y-2.5">
                  {model.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#DC0000]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-zinc-400">Guideline Allocation</p>
                <p className="font-mono text-sm font-medium tabular-nums text-[#F4F1EA]">
                  {model.priceAed}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRequestViewing(model.name)}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 bg-[#DC0000] px-6 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#B80000] cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
              >
                <span>Request Private Viewing</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
