import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import SimpleHeader from "../../components/SimpleHeader";
import SimpleFooter from "../../components/SimpleFooter";
import AnonymousTutorial from "../../components/AnonymousTutorial";
import AnonymousAcceptance from "../../components/AnonymousAcceptance";
import AnonymousForm from "../../components/AnonymousForm";

export default function AnonymousReport() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <div className="transition-colors duration-500 ease-in-out min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col">
      <SimpleHeader backLink="/reportar" />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full flex flex-col items-center justify-center min-h-[90vh]">
        <AnonymousTutorial
          currentStep={currentStep}
          currentSlide={currentSlide}
          setCurrentStep={setCurrentStep}
          setCurrentSlide={setCurrentSlide}
        />

        <AnonymousAcceptance
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          acceptedTerms={acceptedTerms}
          setAcceptedTerms={setAcceptedTerms}
        />

        <AnonymousForm
          currentStep={currentStep}
          activeFormSection={activeFormSection}
          formLocation={formLocation}
          setFormLocation={setFormLocation}
          formCategory={formCategory}
          setFormCategory={setFormCategory}
          formSeverity={formSeverity}
          setFormSeverity={setFormSeverity}
          formDescription={formDescription}
          setFormDescription={setFormDescription}
          formMacroCategory={formMacroCategory}
          setFormMacroCategory={setFormMacroCategory}
          isCategoriaIa={isCategoriaIa}
          setIsCategoriaIa={setIsCategoriaIa}
          openAccordions={openAccordions}
          toggleAccordion={toggleAccordion}
        />
      </main>

      <SimpleFooter />
    </div>
  );
}
