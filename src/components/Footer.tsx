export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#09090B] py-12">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-6 lg:flex-row lg:items-center lg:px-12">
        <div>
          <p className="font-display text-2xl font-medium text-[#F4F1EA]">Ferrari Dubai</p>
          <p className="mt-1 text-xs text-zinc-500">
            Al Manara Tower, Sheikh Zayed Road · Dubai, United Arab Emirates
          </p>
        </div>

        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap items-center gap-6 text-xs text-zinc-400"
        >
          <a href="#fleet" className="hover:text-[#F4F1EA] transition-colors">
            Maranello Fleet
          </a>
          <a href="#atelier" className="hover:text-[#F4F1EA] transition-colors">
            Tailor Made Atelier
          </a>
          <a href="#virtual-tour" className="hover:text-[#F4F1EA] transition-colors">
            Virtual Tour
          </a>
          <a href="#concierge" className="hover:text-[#F4F1EA] transition-colors">
            Private Concierge
          </a>
        </nav>

        <p className="text-xs text-zinc-500">
          © 2026 Ferrari Dubai Showroom · All rights reserved.
        </p>
      </div>
    </footer>
  );
}
