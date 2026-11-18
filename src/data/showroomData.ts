export type ModelCategory = 'All' | 'V12 Flagship' | 'Hybrid' | 'Four-Seater';

export interface FerrariModel {
  id: string;
  name: string;
  category: Exclude<ModelCategory, 'All'>;
  tagline: string;
  architecture: string;
  powerCv: string;
  acceleration: string;
  topSpeed: string;
  dryWeight: string;
  availability: string;
  priceAed: string;
  exteriorFinish: string;
  interiorFinish: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface HeroChapter {
  id: string;
  index: string;
  title: string;
  location: string;
  image: string;
  caption: string;
}

export interface TourHotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  subtitle: string;
  detail: string;
}

export interface VirtualTourZone {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  description: string;
  dimensions: string;
  hotspots: TourHotspot[];
}

export const HERO_CHAPTERS: HeroChapter[] = [
  {
    id: 'gallery',
    index: '01',
    title: 'Sheikh Zayed Gallery',
    location: 'Downtown Dubai Skyline',
    image: '/src/assets/images/hero_dubai_showroom_1794994140869.jpg',
    caption: 'Private Rosso Corsa pavilion overlooking Downtown Dubai at dusk.',
  },
  {
    id: 'highway',
    index: '02',
    title: 'Desert Dusk Run',
    location: 'Al Qudra Grand Tour',
    image: '/src/assets/images/hero_dubai_track_1794994140691.jpg',
    caption: 'Grigio Titanio engineering calibrated for open Emirati horizons.',
  },
  {
    id: 'atelier',
    index: '03',
    title: 'Tailor Made Lounge',
    location: 'Bespoke Commissioning',
    image: '/src/assets/images/virtual_tour_atelier_1794994143836.jpg',
    caption: 'Maranello craftsmanship paired with bespoke Middle East specifications.',
  },
];

export const FERRARI_MODELS: FerrariModel[] = [
  {
    id: '12cilindri',
    name: 'Ferrari 12Cilindri',
    category: 'V12 Flagship',
    tagline: 'Naturally aspirated 6.5-litre V12 sculpted for effortless grand touring.',
    architecture: '65° V12 · Naturally Aspirated',
    powerCv: '830 CV',
    acceleration: '2.9 s',
    topSpeed: '340 km/h',
    dryWeight: '1,560 kg',
    availability: 'Private Allocation · Dubai Flagship',
    priceAed: 'From AED 1,850,000',
    exteriorFinish: 'Rosso Imola',
    interiorFinish: 'Cuoio & Nero Carbon',
    image: '/src/assets/images/model_12cilindri_1794994141934.jpg',
    description:
      'Revving cleanly to 9,500 rpm, the 12Cilindri celebrates Ferrari’s purest mechanical lineage with active rear aerodynamic flaps integrated seamlessly into its fastback silhouette.',
    highlights: [
      '9,500 rpm redline with aspirated torque curve optimization',
      'Four-wheel independent steering and Side Slip Control 8.0',
      'Bespoke panoramic tinted glass roof engineered for Gulf sunlight',
    ],
  },
  {
    id: 'sf90-xx-stradale',
    name: 'SF90 XX Stradale',
    category: 'Hybrid',
    tagline: 'Road-homologated XX track evolution with 1,030 CV twin-turbo hybrid force.',
    architecture: 'V8 Twin-Turbo + 3 E-Motors',
    powerCv: '1,030 CV',
    acceleration: '2.3 s',
    topSpeed: '320 km/h',
    dryWeight: '1,560 kg',
    availability: 'Collector Commission',
    priceAed: 'Price Upon Consultation',
    exteriorFinish: 'Rosso Corsa Metallic',
    interiorFinish: 'Alcantara Nero & Rosso',
    image: '/src/assets/images/model_sf90_xx_1794994142777.jpg',
    description:
      'Featuring the first fixed rear wing on a road-going Maranello berlinetta since the F50, generating 530 kg of downforce at 250 km/h for Yas Marina and Dubai Autodrome track days.',
    highlights: [
      'Extra Boost qualifying logic delivering peak e-motor output on corner exit',
      'S-Duct and front fender louvers reducing front axle pressure by 20%',
      'Carbon-fiber racing shell seats with laser-perforated acoustic weave',
    ],
  },
  {
    id: '296-gtb',
    name: 'Ferrari 296 GTB',
    category: 'Hybrid',
    tagline: 'Compact 120° V6 plug-in hybrid redefining mid-rear agility.',
    architecture: '120° V6 Twin-Turbo PHEV',
    powerCv: '830 CV',
    acceleration: '2.9 s',
    topSpeed: '330 km/h',
    dryWeight: '1,470 kg',
    availability: 'Showroom Ready · Viewing Open',
    priceAed: 'From AED 1,380,000',
    exteriorFinish: 'Rosso Scuderia',
    interiorFinish: 'Nero Daytona Leather',
    image: '/src/assets/images/model_296_gtb_1794994143376.jpg',
    description:
      'A 2,992 cc 120° V6 paired with an axial-flux MGU-K electric motor delivers instantaneous throttle response and the unmistakable high-frequency piccolo V12 acoustic signature.',
    highlights: [
      'Shortest wheelbase in the modern mid-rear lineup at 2,600 mm',
      '25 km silent eDrive mode for discreet evening arrivals in DIFC',
      'Available Assetto Fiorano lightweight carbon package on floor',
    ],
  },
  {
    id: 'purosangue',
    name: 'Ferrari Purosangue',
    category: 'Four-Seater',
    tagline: 'Four-door, four-seat naturally aspirated V12 thoroughbred.',
    architecture: '6.5L V12 · Active Suspension',
    powerCv: '725 CV',
    acceleration: '3.3 s',
    topSpeed: '310 km/h',
    dryWeight: '2,033 kg',
    availability: 'By Private Appointment',
    priceAed: 'From AED 1,920,000',
    exteriorFinish: 'Nero Daytona',
    interiorFinish: 'Sabbia & Cashmere Weave',
    image: '/src/assets/images/model_purosangue_1794994143852.jpg',
    description:
      'Unmistakably a Ferrari from chassis geometry to weight distribution (49:51), equipped with Multimatic True Active Spool Valve dampers and rear-hinged welcome doors.',
    highlights: [
      'Four heated, sculpted full-grain leather bucket seats',
      'Burmester 3D High-End Surround acoustic cabin calibration',
      'Transaxle 8-speed F1 DCT paired with 4RM-S all-wheel drive',
    ],
  },
];

export const VIRTUAL_TOUR_ZONES: VirtualTourZone[] = [
  {
    id: 'atelier-lounge',
    name: 'Tailor Made Atelier',
    subtitle: 'Bespoke Commissioning Suite',
    image: '/src/assets/images/virtual_tour_atelier_1794994143836.jpg',
    dimensions: 'Floor 02 · Sheikh Zayed Pavilion',
    description:
      'Collaborate directly with Maranello-trained personalization specialists amidst Nero Marquina marble surfaces, archival racing fabrics, and bespoke paint frogs.',
    hotspots: [
      {
        id: 'paint-frogs',
        x: 52,
        y: 80,
        title: 'Heritage Paint Frogs',
        subtitle: 'Rosso Imola · Rosso Fuoco · Nero Stellato',
        detail:
          'Triple-layer metallic and historic racing lacquers inspected under calibrated Dubai daylight and evening tungsten rigs.',
      },
      {
        id: 'rotunda-stage',
        x: 30,
        y: 52,
        title: 'Private Reveal Turntable',
        subtitle: '360° Hydraulic Presentation Stage',
        detail:
          'Acoustically isolated glass rotunda dedicated to private vehicle handovers and tailored lighting reveals.',
      },
      {
        id: 'swatches',
        x: 38,
        y: 66,
        title: 'Maranello Saddlery & Carbon',
        subtitle: 'Aniline Leathers · Twill Carbon',
        detail:
          'Over 140 hides, Alcantara weaves, and heat-resistant stitching options tailored for the UAE climate.',
      },
    ],
  },
  {
    id: 'main-gallery',
    name: 'Main Flagship Rotunda',
    subtitle: 'Downtown Skyline Gallery',
    image: '/src/assets/images/hero_dubai_showroom_1794994140869.jpg',
    dimensions: 'Ground & Mezzanine · 3,400 m²',
    description:
      'Our flagship architectural floor frames the current Maranello range against floor-to-ceiling views of Downtown Dubai and the Burj Khalifa.',
    hotspots: [
      {
        id: 'centerpiece',
        x: 67,
        y: 58,
        title: 'Flagship Display Bay',
        subtitle: 'Curated V12 & Hybrid Showcase',
        detail:
          'Each chassis is positioned under museum-grade 98 CRI architectural spot beams to reveal every aerodynamic crease.',
      },
      {
        id: 'skyline-terrace',
        x: 18,
        y: 45,
        title: 'Skyline Glass Curtain',
        subtitle: 'UV-Filtered Architectural Facade',
        detail:
          'Acoustic triple-laminated glass framing Downtown Dubai while preserving gallery climate at a constant 20°C.',
      },
      {
        id: 'cavallino-wall',
        x: 82,
        y: 35,
        title: 'Cavallino Sanctuary',
        subtitle: 'Brushed Basalt & Brass Crest',
        detail:
          'Private client reception lounge hosting Ferraristi gatherings and Maranello telemetry briefings.',
      },
    ],
  },
  {
    id: 'paddock-suite',
    name: 'Paddock & Delivery Bay',
    subtitle: 'Track Preparation & Handover',
    image: '/src/assets/images/model_purosangue_1794994143852.jpg',
    dimensions: 'West Wing · Direct Vault Access',
    description:
      'Direct subterranean ramp connecting private collector storage to Sheikh Zayed Road and scheduled Dubai Autodrome track briefings.',
    hotspots: [
      {
        id: 'forged-spec',
        x: 49,
        y: 65,
        title: 'Forged Wheel & Brake Spec',
        subtitle: 'Carbon-Ceramic CCM-R Calipers',
        detail:
          'Inspect staggered magnesium and forged alloy wheel options alongside bespoke painted caliper finishes.',
      },
      {
        id: 'client-gallery',
        x: 15,
        y: 44,
        title: 'Maranello Archive Wall',
        subtitle: 'Classiche Certification Prints',
        detail:
          'Original photographic documentation of historic Ferrari chassis maintained by our Dubai Classiche master technicians.',
      },
    ],
  },
];
