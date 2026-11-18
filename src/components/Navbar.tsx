import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookViewing: () => void;
}

const NAV_LINKS = [
  { label: 'Fleet', href: '#fleet' },
  { label: 'Atelier', href: '#atelier' },
  { label: 'Virtual Tour', href: '#virtual-tour' },
  { label: 'Concierge', href: '#concierge' },
];

export function Navbar({ onBookViewing }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMobileNav = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
        isScrolled
          ? 'border-b border-white/10 bg-[#09090B]/92 backdrop-blur-md'
          : 'border-b border-white/5 bg-gradient-to-b from-[#09090B]/85 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-8 px-6 lg:px-12">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#hero"
          className="font-display text-2xl font-semibold tracking-tight text-[#F4F1EA] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DC0000]"
        >
          Ferrari Dubai
        </a>

        {/* Zone 2: 4 single-line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#F4F1EA] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DC0000] after:absolute after:inset-x-0 after:bottom-0 after:h-[1px] after:origin-left after:scale-x-0 after:bg-[#DC0000] after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Drawer Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookViewing}
            className="hidden sm:inline-flex min-h-[40px] items-center justify-center bg-[#DC0000] px-5 py-2 text-xs font-medium tracking-wide text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#B80000] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
          >
            Book Viewing
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-[#131316]/80 text-[#F4F1EA] md:hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DC0000]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#09090B]/98 px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNav(link.href);
                }}
                className="min-h-[44px] flex items-center border-b border-white/5 text-base font-medium text-zinc-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookViewing();
              }}
              className="mt-2 min-h-[44px] w-full bg-[#DC0000] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#B80000] cursor-pointer"
            >
              Book Viewing
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
