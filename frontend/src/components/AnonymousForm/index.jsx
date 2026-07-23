import React, { useEffect, useRef } from "react";
import LocationSection from "./LocationSection";
import CategorySection from "./CategorySection";
import SeveritySection from "./SeveritySection";
import MediaSection from "./MediaSection";

export default function AnonymousForm({
  currentStep,
  activeFormSection,
  formLocation,
  setFormLocation,
  formCategory,
  setFormCategory,
  formSeverity,
  setFormSeverity,
  formDescription,
  setFormDescription,
  formMacroCategory,
  setFormMacroCategory,
  isCategoriaIa,
  setIsCategoriaIa,
  openAccordions,
  toggleAccordion,
}) {
  const step2Ref = useRef(null);
  return (
    <>
      {/*  ==========================================
             ETAPA 3: FORMULÁRIO INTELIGENTE (ORQUESTRADOR)
             ==========================================  */}
      <div
        id="step-form"
        className={`w-full max-w-2xl flex-col gap-6${currentStep === 3 ? " flex" : " hidden"}`}
      >
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2">
              Relato em Anonimato
            </h2>
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
        />
      </div>
    </>
  );
}
