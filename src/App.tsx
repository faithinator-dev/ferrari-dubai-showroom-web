import { useState } from 'react';
import { ContactSection, type ConsultationType } from './components/ContactSection';
import { FeaturedModelsSection } from './components/FeaturedModelsSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ModelDetailModal } from './components/ModelDetailModal';
import { Navbar } from './components/Navbar';
import { VirtualTourModal } from './components/VirtualTourModal';
import { VirtualTourSection } from './components/VirtualTourSection';
import {
  FERRARI_MODELS,
  VIRTUAL_TOUR_ZONES,
  type FerrariModel,
} from './data/showroomData';

export default function App() {
  const [dossierModel, setDossierModel] = useState<FerrariModel | null>(null);
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [preselectedModel, setPreselectedModel] = useState<string>(FERRARI_MODELS[0].name);
  const [preselectedFormat, setPreselectedFormat] = useState<ConsultationType>(
    'Private Gallery Viewing'
  );

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookViewing = () => {
    setPreselectedFormat('Private Gallery Viewing');
    scrollToSection('#concierge');
  };

  const handleInquireModel = (modelName: string) => {
    setDossierModel(null);
    setPreselectedModel(modelName);
    setPreselectedFormat('Private Gallery Viewing');
    scrollToSection('#concierge');
  };

  const handleBookAtelier = () => {
    setPreselectedModel('Tailor Made Bespoke Program');
    setPreselectedFormat('Tailor Made Atelier');
    scrollToSection('#concierge');
  };

  const handleBookWalkthrough = (zoneName: string) => {
    setTourModalOpen(false);
    setPreselectedFormat('Live Virtual Walkthrough');
    if (zoneName === VIRTUAL_TOUR_ZONES[0].name) {
      setPreselectedModel('Tailor Made Bespoke Program');
    }
    scrollToSection('#concierge');
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F1EA]">
      <Navbar onBookViewing={handleBookViewing} />

      <main>
        <HeroSection
          onExploreFleet={() => scrollToSection('#fleet')}
          onLaunchTour={() => setTourModalOpen(true)}
        />

        <FeaturedModelsSection
          onSelectModelForDossier={(model) => setDossierModel(model)}
          onInquireModel={handleInquireModel}
        />

        <VirtualTourSection
          onLaunchTour={() => setTourModalOpen(true)}
          onBookAtelier={handleBookAtelier}
        />

        <ContactSection
          preselectedModel={preselectedModel}
          preselectedFormat={preselectedFormat}
        />
      </main>

      <Footer />

      <ModelDetailModal
        model={dossierModel}
        onClose={() => setDossierModel(null)}
        onRequestViewing={handleInquireModel}
      />

      <VirtualTourModal
        isOpen={tourModalOpen}
        onClose={() => setTourModalOpen(false)}
        onBookWalkthrough={handleBookWalkthrough}
      />
    </div>
  );
}
