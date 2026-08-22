import React, { useEffect, useState, useRef } from "react";
import { Megaphone } from "lucide-react";
import LoggedHeader from "../../components/LoggedHeader";
import SimpleFooter from "../../components/SimpleFooter";
import LocationSection from "../../components/AnonymousForm/LocationSection";
import CategorySection from "../../components/AnonymousForm/CategorySection";
import SeveritySection from "../../components/AnonymousForm/SeveritySection";
import MediaSection from "../../components/AnonymousForm/MediaSection";
import { supabase } from "../../lib/supabaseClient";

export default function LoggedReport() {
  const [userName, setUserName] = useState("Cidadão");
  
  const [openAccordions, setOpenAccordions] = useState({});
  const [activeFormSection, setActiveFormSection] = useState(1);
  const [formLocation, setFormLocation] = useState({
    gps: false,
    bairro: "",
    rua: "",
    ref: "",
  });
  const [formCategory, setFormCategory] = useState("");
  const [formSeverity, setFormSeverity] = useState([]);
  const [formDescription, setFormDescription] = useState("");
  const [formMacroCategory, setFormMacroCategory] = useState("");
  const [isCategoriaIa, setIsCategoriaIa] = useState(false);

  const step2Ref = useRef(null);

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        let fullName = user.user_metadata?.nome_completo;
        if (!fullName) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('nome_completo')
            .eq('id', user.id)
            .single();
          if (profile) fullName = profile.nome_completo;
        }
        if (fullName) {
          const firstName = fullName.trim().split(' ')[0];
          setUserName(firstName);
        }
      }
    }
    loadUser();
  }, []);

  useEffect(() => {
    let nextSec = 1;
    if (formLocation.bairro && formLocation.rua && formLocation.ref) {
      nextSec = 2;
      if (formCategory) {
        nextSec = 3;
        if (formSeverity.length > 0) {
          nextSec = 4;
        }
      }
    }
    setActiveFormSection(nextSec);
  }, [formLocation, formCategory, formSeverity]);

  const toggleAccordion = (id) =>
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col">
      <LoggedHeader />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full flex flex-col items-center justify-center min-h-[90vh]">
        <div id="step-form" className="w-full max-w-2xl flex flex-col gap-6">
          
          {/* Cabeçalho Informativo */}
          <div className="mb-2 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 p-6 rounded-[2rem] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                Olá, {userName}!
              </h2>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                Este relato será vinculado à sua conta pública.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 shadow-lg flex items-center justify-center">
                <Megaphone className="h-8 w-8 text-zinc-400" />
              </div>
            </div>
          </div>

          <LocationSection
            step2Ref={step2Ref}
            activeFormSection={activeFormSection}
            formLocation={formLocation}
            setFormLocation={setFormLocation}
            openAccordions={openAccordions}
            toggleAccordion={toggleAccordion}
          />

          <CategorySection
            step2Ref={step2Ref}
            activeFormSection={activeFormSection}
            formCategory={formCategory}
            setFormCategory={setFormCategory}
            formMacroCategory={formMacroCategory}
            setFormMacroCategory={setFormMacroCategory}
            isCategoriaIa={isCategoriaIa}
            setIsCategoriaIa={setIsCategoriaIa}
            formDescription={formDescription}
            setFormDescription={setFormDescription}
            openAccordions={openAccordions}
            toggleAccordion={toggleAccordion}
          />

          <SeveritySection
            activeFormSection={activeFormSection}
            formSeverity={formSeverity}
            setFormSeverity={setFormSeverity}
          />

          <MediaSection
            activeFormSection={activeFormSection}
            formLocation={formLocation}
            formCategory={formCategory}
            formSeverity={formSeverity}
            formDescription={formDescription}
            setFormDescription={setFormDescription}
            formMacroCategory={formMacroCategory}
            isCategoriaIa={isCategoriaIa}
            isAnonymousFlow={false}
          />
        </div>
      </main>

      <SimpleFooter />
    </div>
  );
}
