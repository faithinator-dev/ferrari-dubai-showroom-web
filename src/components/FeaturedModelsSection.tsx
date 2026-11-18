import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FERRARI_MODELS, type FerrariModel, type ModelCategory } from '../data/showroomData';
import { SafeImage } from './SafeImage';

interface FeaturedModelsSectionProps {
  onSelectModelForDossier: (model: FerrariModel) => void;
  onInquireModel: (modelName: string) => void;
}

const CATEGORIES: ModelCategory[] = ['All', 'V12 Flagship', 'Hybrid', 'Four-Seater'];

export function FeaturedModelsSection({
  onSelectModelForDossier,
  onInquireModel,
}: FeaturedModelsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ModelCategory>('All');

  const filteredModels =
    activeCategory === 'All'
      ? FERRARI_MODELS
      : FERRARI_MODELS.filter((m) => m.category === activeCategory);

  return (
    <section
      id="fleet"
      className="border-t border-white/10 bg-[#09090B] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Section Header + Interactive Filter Controls */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#DC0000]">01. The Maranello Fleet</p>
            <h2
              className="mt-2 font-display text-3xl font-medium tracking-tight text-[#F4F1EA] sm:text-5xl"
              style={{ textWrap: 'balance' }}
            >
              Curated Thoroughbreds on the Dubai Floor
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-400">
              Inspect specifications, factory finishes, and regional availability for vehicles
              currently presented at our Sheikh Zayed Road gallery.
            </p>
          </div>

          {/* Functional Segmented Filter Buttons */}
          <div
            role="group"
            aria-label="Filter models by powertrain architecture"
            className="inline-flex flex-wrap items-center gap-1 border border-white/10 bg-[#131316] p-1 self-start lg:self-auto"
          >
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isSelected}
                  className={`min-h-[40px] px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DC0000] ${
                    isSelected
                      ? 'bg-[#DC0000] text-white'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-[#F4F1EA]'
                  }`}
                >
                  {category === 'All' ? 'All Models' : category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Models Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredModels.map((model) => (
            <article
              key={model.id}
              className="group flex flex-col justify-between border border-white/10 bg-[#121215] transition-colors duration-200 hover:border-white/25"
            >
              <div>
                {/* 4:3 Studio Visual */}
                <button
                  type="button"
                  onClick={() => onSelectModelForDossier(model)}
                  aria-label={`Inspect technical dossier for ${model.name}`}
                  className="relative block aspect-[4/3] w-full overflow-hidden bg-[#0D0D10] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DC0000]"
                >
                  <SafeImage
                    src={model.image}
                    alt={`${model.name} finished in ${model.exteriorFinish}`}
                    fallbackTitle={model.name}
                    fallbackSubtitle={model.architecture}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-80" />
                </button>

                {/* Card Copy & Specs */}
                <div className="p-6 sm:p-8">
                  {/* Zero-pill unboxed metadata line */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-400">
                    <span className="font-medium text-[#DC0000]">{model.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{model.availability}</span>
                  </div>

                  <div className="mt-2.5 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl font-medium text-[#F4F1EA] sm:text-3xl">
                      {model.name}
                    </h3>
                    <span className="font-mono text-xs tabular-nums text-zinc-400 whitespace-nowrap shrink-0">
                      {model.priceAed}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{model.tagline}</p>

                  {/* Hairline Spec Matrix (No nested cards, clean whitespace & dividers) */}
                  <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                    <div>
                      <dt className="text-xs text-zinc-500">Output</dt>
                      <dd className="mt-1 font-mono text-base font-medium tabular-nums text-[#F4F1EA]">
                        {model.powerCv}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-500">0–100 km/h</dt>
                      <dd className="mt-1 font-mono text-base font-medium tabular-nums text-[#F4F1EA]">
                        {model.acceleration}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-500">Top Speed</dt>
                      <dd className="mt-1 font-mono text-base font-medium tabular-nums text-[#F4F1EA]">
                        {model.topSpeed}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between gap-4 border-t border-white/10 px-6 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={() => onSelectModelForDossier(model)}
                  className="min-h-[40px] text-xs font-medium text-zinc-300 underline-offset-4 transition-colors hover:text-white hover:underline whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DC0000]"
                >
                  Inspect Full Dossier
                </button>

                <button
                  type="button"
                  onClick={() => onInquireModel(model.name)}
                  className="inline-flex min-h-[40px] items-center gap-1.5 border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-[#F4F1EA] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#DC0000] hover:bg-[#DC0000] hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DC0000]"
                >
                  <span>Request Viewing</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
