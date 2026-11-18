import { Compass, Eye } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface VirtualTourSectionProps {
  onLaunchTour: () => void;
  onBookAtelier: () => void;
}

const FLAGSHIP_PROOF = [
  {
    metric: '3,400 m²',
    label: 'Sheikh Zayed Road Pavilion',
    detail: 'Three architectural levels uniting current production bays, delivery rotunda, and private vault.',
  },
  {
    metric: '140+ Materials',
    label: 'Tailor Made Commissioning Library',
    detail: 'Direct Maranello archival hides, triple-layer metallic paint frogs, and carbon twill weaves.',
  },
  {
    metric: '20.0°C',
    label: 'Climate-Controlled Gallery',
    detail: 'Calibrated CRI 98 architectural lighting engineered for true lacquer inspection.',
  },
];

export function VirtualTourSection({ onLaunchTour, onBookAtelier }: VirtualTourSectionProps) {
  return (
    <section
      id="atelier"
      className="border-t border-white/10 bg-[#0D0D10] py-20 lg:py-28"
    >
      <div id="virtual-tour" className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* 2-Column Asymmetric Architectural Split with items-stretch */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Panoramic Visual */}
          <div className="relative overflow-hidden border border-white/10 bg-[#131316] lg:col-span-7">
            <SafeImage
              src="/src/assets/images/virtual_tour_atelier_1794994143836.jpg"
              alt="Ferrari Tailor Made commissioning suite and rotunda in Dubai"
              fallbackTitle="Tailor Made Atelier Dubai"
              fallbackSubtitle="Sheikh Zayed Road Flagship"
              className="aspect-[16/10] w-full object-cover lg:aspect-auto lg:h-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090B]/85 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-4 p-6">
              <div className="text-xs text-zinc-300">
                <span className="font-medium text-white">Tailor Made Lounge</span>
                <span aria-hidden="true" className="mx-2 text-zinc-500">
                  ·
                </span>
                <span>3 Interactive Showroom Zones</span>
              </div>
              <button
                type="button"
                onClick={onLaunchTour}
                className="inline-flex min-h-[40px] items-center gap-2 bg-[#09090B]/85 px-4 py-2 text-xs font-medium text-[#F4F1EA] backdrop-blur-sm border border-white/20 transition-colors hover:border-[#DC0000] hover:bg-[#DC0000] cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
              >
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Explore 360° Hotspots</span>
              </button>
            </div>
          </div>

          {/* Right Editorial Narrative + Virtual Tour CTA */}
          <div className="flex flex-col justify-between border border-white/10 bg-[#121215] p-8 sm:p-10 lg:col-span-5">
            <div>
              <p className="text-sm font-medium text-[#DC0000]">
                02. Sheikh Zayed Atelier &amp; Virtual Tour
              </p>
              <h2
                className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight text-[#F4F1EA] sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                Step Inside the Dubai Pavilion From Anywhere
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-300">
                Before stepping onto our Sheikh Zayed Road stone floor, explore the main gallery
                rotunda, inspect bespoke Rosso lacquer frogs in the Tailor Made Atelier, and preview
                our private subterranean delivery bay.
              </p>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm text-zinc-400">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-zinc-300">01. Tailor Made Suite</span>
                  <span className="font-mono text-xs tabular-nums text-zinc-500">3 Hotspots</span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-zinc-300">02. Main Flagship Rotunda</span>
                  <span className="font-mono text-xs tabular-nums text-zinc-500">3 Hotspots</span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-zinc-300">03. Paddock &amp; Delivery Bay</span>
                  <span className="font-mono text-xs tabular-nums text-zinc-500">2 Hotspots</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 pt-4 sm:flex-row lg:flex-col xl:flex-row">
              <button
                type="button"
                onClick={onLaunchTour}
                className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2.5 bg-[#DC0000] px-6 py-3 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#B80000] cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
              >
                <Compass className="h-4 w-4" aria-hidden="true" />
                <span>Launch Virtual Tour</span>
              </button>

              <button
                type="button"
                onClick={onBookAtelier}
                className="inline-flex min-h-[48px] items-center justify-center border border-white/20 px-5 py-3 text-sm font-medium text-[#F4F1EA] whitespace-nowrap shrink-0 transition-colors hover:border-white/45 hover:bg-white/5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DC0000]"
              >
                <span>Reserve Atelier Session</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width Adjacent Proof Row (Separate from Split) */}
        <div className="mt-8 grid grid-cols-1 divide-y divide-white/10 border border-white/10 bg-[#111114] md:grid-cols-3 md:divide-x md:divide-y-0">
          {FLAGSHIP_PROOF.map((item) => (
            <div key={item.label} className="p-6 sm:p-8">
              <p className="font-mono text-2xl font-medium tabular-nums text-[#F4F1EA] sm:text-3xl">
                {item.metric}
              </p>
              <p className="mt-2 text-sm font-medium text-[#DC0000]">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
