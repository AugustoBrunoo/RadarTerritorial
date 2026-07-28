import React, { useState } from "react";
import LoggedHeader from "../../components/LoggedHeader";
import SimpleFooter from "../../components/SimpleFooter";

import WelcomeHeader from "../../components/WelcomeHeader";
import QuickReportCard from "../../components/QuickReportCard";
import UserImpactCard from "../../components/UserImpactCard";
import CommunityFeedTeaser from "../../components/CommunityFeedTeaser";
import LocalIndicatorsCard from "../../components/LocalIndicatorsCard";
import UtilityLinksCard from "../../components/UtilityLinksCard";
import UtilityModal from "../../components/UtilityModal";

export default function CentralCidadao() {
  const [isUtilityModalOpen, setIsUtilityModalOpen] = useState(false);

  return (
    <div className="transition-colors duration-500 ease-in-out min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col">
      <LoggedHeader />

      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full flex flex-col justify-start">
        
        <WelcomeHeader />

        {/* LINHA 1: BENTO GRID DE ATALHOS E AÇÃO PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <QuickReportCard />
          <UserImpactCard />
        </div>

        {/* LINHA 2: NOVO FEED TEASER, DADOS DA REGIÃO E LINKS ÚTEIS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <CommunityFeedTeaser />
          <LocalIndicatorsCard />
          <UtilityLinksCard onOpenModal={() => setIsUtilityModalOpen(true)} />
        </div>
      </main>

      <SimpleFooter />

      <UtilityModal 
        isOpen={isUtilityModalOpen} 
        onClose={() => setIsUtilityModalOpen(false)} 
      />
    </div>
  );
}
