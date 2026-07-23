import React from "react";
import { Navigation, Map, ChevronDown, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { validateAndGeocodeStreet, searchStreetSuggestions, refineAddressWithNumber } from "../../../services/geocodingService";

/**
 * Componente responsável pela Etapa 1 do formulário (Localização).
 * Lida com GPS automático, CEP via API, e digitação manual de endereço.
 */
export default function LocationSection({
  activeFormSection,
  formLocation,
  setFormLocation,
  openAccordions,
  toggleAccordion,
  step2Ref,
}) {
  const [cepWarning, setCepWarning] = React.useState(false);
  const [cepValue, setCepValue] = React.useState("");

  // Local states for manual address validation
  const [manualBairro, setManualBairro] = React.useState("");
  const [manualRua, setManualRua] = React.useState("");
  const [manualRef, setManualRef] = React.useState("");
  const [manualSn, setManualSn] = React.useState(false);
  
  const [validationError, setValidationError] = React.useState("");
  const [isValidating, setIsValidating] = React.useState(false);
  const [isStreetConfirmed, setIsStreetConfirmed] = React.useState(false);
  
  const numberInputRef = React.useRef(null);

  // States for Autocomplete
  const [suggestions, setSuggestions] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  
  const searchTimeoutRef = React.useRef(null);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  const handleGpsClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log(`Localização obtida: Lat ${lat}, Lng ${lng}`);

          try {
            // Busca o endereço reverso baseado nas coordenadas
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            
            const address = data.address || {};
            const rua = address.road || address.pedestrian || "";
            const rawBairro = address.suburb || address.neighbourhood || address.city_district || "";
            const cep = address.postcode || "";
            
            console.log("--- DADOS DE GEOLOCALIZAÇÃO REVERSA ---");
            console.log("Rua (Logradouro):", rua);
            console.log("Bairro:", rawBairro);
            console.log("CEP Aproximado:", cep);
            
            // Format CEP se a API retornar
            if (cep) {
              const cleanCep = cep.replace(/\D/g, "");
              if (cleanCep.length >= 8) {
                setCepValue(cleanCep.substring(0, 5) + "-" + cleanCep.substring(5, 8));
              } else {
                setCepValue(cep);
              }
            }

            // Validação de Bairro
            let selectValue = "";
            const isAllowedBairro = [
              "Campo Grande",
              "Inhoaíba",
              "Cosmos",
              "Inhoaiba",
            ].some((b) => rawBairro.toLowerCase().includes(b.toLowerCase()));

            if (!isAllowedBairro) {
              setCepWarning(true);
              setFormLocation({ gps: false, bairro: "", rua: "", ref: "", cep: "", sn: false, lat: null, lng: null });
              setCepValue("");
              return; // Do not save coordinates if outside allowed area
            } else {
              setCepWarning(false);
              if (rawBairro.toLowerCase().includes("campo grande"))
                selectValue = "campo-grande";
              else if (rawBairro.toLowerCase().includes("inhoa"))
                selectValue = "inhoaiba";
              else if (rawBairro.toLowerCase().includes("cosmos"))
                selectValue = "cosmos";
            }
            
            // Preenche o formulário
            setFormLocation((prev) => ({ 
              ...prev, 
              rua: rua || prev.rua,
              bairro: selectValue || prev.bairro,
              cep: cep || prev.cep,
              lat: lat,
              lng: lng,
              gps: true
            }));

            // Abre o acordeão automaticamente para o usuário ver os dados preenchidos
            if (!openAccordions["endereco-manual"]) {
              toggleAccordion("endereco-manual");
            }
          } catch (err) {
            console.error("Erro na geolocalização reversa:", err);
          }
        },
        (error) => {
          console.error("Erro ao obter localização", error);
        }
      );
    } else {
      console.log("Geolocalização não suportada pelo navegador.");
    }
  };

  const handleCepInput = async (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    setCepValue(value);

    let cep = value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          const bairro = data.bairro || "";
          const isAllowedBairro = [
            "Campo Grande",
            "Inhoaíba",
            "Cosmos",
            "Inhoaiba",
          ].some((b) => bairro.toLowerCase().includes(b.toLowerCase()));

          if (!isAllowedBairro) {
            setCepWarning(true);
            return; // Bloqueia e não salva se não for área coberta
          } else {
            setCepWarning(false);
          }

          let selectValue = "";
          if (bairro.toLowerCase().includes("campo grande"))
            selectValue = "campo-grande";
          else if (bairro.toLowerCase().includes("inhoa"))
            selectValue = "inhoaiba";
          else if (bairro.toLowerCase().includes("cosmos"))
            selectValue = "cosmos";

          let manualLat = null;
          let manualLng = null;

          try {
            // Geocoding silencioso em background
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${data.logradouro},${bairro},Rio de Janeiro,RJ`
            );
            const geoData = await geoRes.json();
            if (geoData && geoData.length > 0) {
              manualLat = parseFloat(geoData[0].lat);
              manualLng = parseFloat(geoData[0].lon);
            }
          } catch (geoErr) {
            console.error("Erro no geocoding manual:", geoErr);
          }

          setManualRua(data.logradouro || "");
          setManualBairro(selectValue);
          setValidationError("");
          setIsStreetConfirmed(false);

          // We can set global location with what we have, but to enforce validation step,
          // we just populate local fields and user clicks validate.
          // Wait, if they have everything, they still need to validate/continue.
          // Or we can auto-validate if geocoding worked.
          if (manualLat && manualLng) {
            setFormLocation((prev) => ({
              ...prev,
              rua: data.logradouro || prev.rua,
              bairro: selectValue || prev.bairro,
              cep: cep,
              lat: manualLat,
              lng: manualLng,
              gps: false
            }));
            setIsStreetConfirmed(true);
        }
          }

      } catch (err) {
        console.error("Erro ao buscar CEP", err);
      }
    }
  };

  return (
    <>
      {/*  BLOCO 1: ONDE (NOVO DESIGN DE LOCALIZAÇÃO)  */}
      <div
        id="form-sec-1"
        className={`bg-white transition-all duration-500 ${activeFormSection >= 1 ? "opacity-100 pointer-events-auto" : "opacity-40 pointer-events-none"}  dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center font-bold text-zinc-500">
            1
          </div>
          <h3 className="text-xl font-bold">Onde está o problema?</h3>
        </div>

        <div className="space-y-4">
          {/*  Botão de GPS Automático  */}
          <button
            type="button"
            id="btn-gps"
            onClick={handleGpsClick}
            className="relative w-full overflow-hidden group bg-red-600 hover:bg-red-700 text-white rounded-2xl p-6 transition-all duration-300 shadow-lg shadow-red-600/20 hover:shadow-red-600/40 border border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/30"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-20"></div>
            <div className="relative z-10 flex flex-col items-center justify-center gap-2">
              <div className="relative">
                <div
                  id="gps-ring"
                  className="absolute inset-0 bg-white rounded-full opacity-0 hidden"
                ></div>
                <Navigation id="icon-gps" className="h-8 w-8 mb-1" />
              </div>
              <span className="font-bold text-lg" id="text-gps">
                Usar minha localização atual
              </span>
              <span
                className="text-red-100 text-sm font-medium opacity-80"
                id="subtext-gps"
              >
                Mais rápido e preciso via GPS
              </span>
            </div>
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              OU
            </span>
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
          </div>

          {/*  Acordeão de Endereço Manual  */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-950/50 transition-colors">
            <button
              type="button"
              onClick={() => toggleAccordion("endereco-manual")}
              className="w-full flex items-center justify-between p-5 focus:outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-200/50 dark:bg-zinc-800 rounded-lg group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                  <Map className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 text-left">
                  Digitar endereço manualmente
                </span>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-zinc-400 accordion-icon group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-transform ${openAccordions["endereco-manual"] ? "rotate-180" : ""}`}
              />
            </button>

            <div
              id="endereco-manual"
              className={`accordion-grid ${openAccordions["endereco-manual"] ? "open" : ""}`}
            >
              <div className="accordion-inner">
                <div className="space-y-4 mt-2 px-5 pb-5">
                  {/*  Grid para Bairro e CEP  */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
                        Bairro *
                      </label>
                      <select
                        id="input-bairro"
                        value={manualBairro}
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all cursor-pointer appearance-none font-medium shadow-sm"
                        onChange={(e) => {
                          setManualBairro(e.target.value);
                          setValidationError("");
                          setIsStreetConfirmed(false);
                        }}
                      >
                        <option value="" disabled>
                          Selecione...
                        </option>
                        <option value="campo-grande">Campo Grande</option>
                        <option value="inhoaiba">Inhoaíba</option>
                        <option value="cosmos">Cosmos</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
                        CEP (Opcional)
                      </label>
                      <input
                        type="text"
                        id="input-cep"
                        value={cepValue}
                        placeholder="00000-000"
                        maxLength="9"
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder-zinc-400 shadow-sm"
                        onChange={handleCepInput}
                      />
                    </div>
                  </div>

                  {/*  Aviso CEP Restrito (Dinâmico)  */}
                  <div
                    id="cep-warning"
                    className={`mt-1 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 items-start gap-3 transition-all duration-300 ${cepWarning ? "flex" : "hidden"}`}
                  >
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                    <p
                      className="text-sm text-amber-800 dark:text-amber-300 font-medium leading-relaxed"
                      id="cep-warning-text"
                    >
                      O Radar Territorial atende apenas Campo Grande, Inhoaíba e
                      Cosmos.
                    </p>
                  </div>

                  {/*  Rua/Logradouro  */}
                  <div className="relative" ref={dropdownRef}>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
                      Rua / Praça / Estrada *
                    </label>
                    <input
                      type="text"
                      id="input-rua"
                      value={manualRua}
                      placeholder="Ex: Estrada do Campinho"
                      autoComplete="off"
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder-zinc-400 shadow-sm relative z-10"
                      onChange={(e) => {
                        const val = e.target.value;
                        setManualRua(val);
                        setValidationError("");
                        setIsStreetConfirmed(false);

                        // Cancel previous debounce
                        if (searchTimeoutRef.current) {
                          clearTimeout(searchTimeoutRef.current);
                        }

                        if (val.trim().length >= 3) {
                          setIsSearching(true);
                          setShowDropdown(true);
                          searchTimeoutRef.current = setTimeout(async () => {
                            const results = await searchStreetSuggestions(val);
                            setSuggestions(results);
                            setIsSearching(false);
                          }, 400);
                        } else {
                          setSuggestions([]);
                          setShowDropdown(false);
                          setIsSearching(false);
                        }
                      }}
                      onFocus={() => {
                        if (manualRua.trim().length >= 3) setShowDropdown(true);
                      }}
                    />
                    
                    {/* Autocomplete Dropdown */}
                    {showDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                        {isSearching ? (
                          <div className="flex items-center gap-2 p-4 text-sm text-zinc-500 dark:text-zinc-400">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Buscando ruas em Campo Grande, Cosmos e Inhoaíba...
                          </div>
                        ) : suggestions.length > 0 ? (
                          <ul className="py-1">
                            {suggestions.map((item) => (
                              <li key={item.id}>
                                <button
                                  type="button"
                                  className="w-full text-left px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex flex-col gap-0.5"
                                  onClick={() => {
                                    setManualRua(item.ruaOficial);
                                    
                                    const selectVal = item.bairro === "Campo Grande" 
                                      ? "campo-grande" 
                                      : item.bairro === "Inhoaíba" 
                                        ? "inhoaiba" 
                                        : "cosmos";
                                        
                                    setManualBairro(selectVal);
                                    setShowDropdown(false);
                                    
                                    // Populate global state immediately
                                    const newCep = item.cep || cepValue;
                                    if (item.cep) {
                                      setCepValue(item.cep);
                                    }
                                    
                                    setFormLocation(prev => ({
                                      ...prev,
                                      rua: item.ruaOficial,
                                      bairro: selectVal,
                                      ref: manualRef,
                                      sn: manualSn,
                                      cep: newCep,
                                      lat: item.latitude,
                                      lng: item.longitude,
                                      gps: false
                                    }));
                                    setIsStreetConfirmed(true);
                                    setTimeout(() => {
                                      numberInputRef.current?.focus();
                                    }, 100);
                                  }}
                                >
                                  <span className="font-bold text-sm text-zinc-800 dark:text-zinc-200">{item.ruaOficial}</span>
                                  <span className="text-xs font-medium text-zinc-500">{item.bairro}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="p-4 text-sm text-zinc-500 dark:text-zinc-400 text-center">
                            Nenhuma rua encontrada nesses bairros.
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/*  Referência  */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
                      Ponto de Referência / Número *
                    </label>
                    
                    {isStreetConfirmed && !manualRef && !manualSn && (
                      <div className="mb-2 p-2.5 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500 flex-shrink-0" />
                        <p className="text-xs text-green-800 dark:text-green-300 font-medium">
                          Rua localizada! Informe o número do local ou marque "S/N" para avançar.
                        </p>
                      </div>
                    )}
                    
                    <div className="relative">
                      <input
                        type="text"
                        id="input-ref"
                        ref={numberInputRef}
                        value={manualRef}
                        disabled={manualSn}
                        placeholder="Ex: Lote 4, próximo à padaria..."
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 pr-24 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder-zinc-400 shadow-sm"
                        onChange={(e) => {
                          setManualRef(e.target.value);
                        }}
                      />

                      <label className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 cursor-pointer bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                        <input
                          type="checkbox"
                          id="check-sn"
                          className="peer sr-only"
                          checked={manualSn}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setManualSn(checked);
                            const newRef = checked ? "S/N" : "";
                            setManualRef(newRef);
                          }}
                        />
                        <div className="w-4 h-4 rounded border border-zinc-300 dark:border-zinc-600 flex items-center justify-center peer-checked:bg-red-500 peer-checked:border-red-500 transition-colors">
                          <svg
                            className={`${manualSn ? "block" : "hidden"} w-3 h-3 text-white pointer-events-none`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300 select-none">
                          S/N
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Validation Error Message */}
                  {validationError && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800 dark:text-red-300 font-medium">
                        {validationError}
                      </p>
                    </div>
                  )}

                                    {/* Next Step Button */}
                  <div className="relative">
                    <button
                      type="button"
                      disabled={isValidating || !isStreetConfirmed || (!manualRef.trim() && !manualSn)}
                      onClick={async () => {
                        setIsValidating(true);
                        
                        let finalLat = formLocation.lat;
                        let finalLng = formLocation.lng;
                        let finalCep = formLocation.cep;
                        
                        if (!manualSn && manualRef.trim().length > 0) {
                          const bairroMap = {
                            "campo-grande": "Campo Grande",
                            "inhoaiba": "Inhoaíba",
                            "cosmos": "Cosmos"
                          };
                          
                          const refined = await refineAddressWithNumber(manualRua, manualRef, bairroMap[manualBairro]);
                          if (refined) {
                            finalLat = refined.latitude;
                            finalLng = refined.longitude;
                            if (refined.cep) {
                              finalCep = refined.cep;
                              setCepValue(refined.cep);
                            }
                          }
                        }
                        
                        setFormLocation(prev => ({
                          ...prev,
                          rua: manualRua,
                          bairro: manualBairro,
                          ref: manualRef,
                          sn: manualSn,
                          cep: finalCep,
                          lat: finalLat,
                          lng: finalLng,
                          gps: false
                        }));
                        
                        setIsValidating(false);
                        
                        setTimeout(() => {
                          step2Ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                      }}
                      className={`w-full mt-4 flex items-center justify-center gap-2 p-4 rounded-xl font-bold text-white transition-all ${
                        isStreetConfirmed && (manualRef.trim() || manualSn)
                          ? "bg-red-600 hover:bg-red-700 shadow-red-600/20 shadow-lg" 
                          : "bg-zinc-300 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-600 cursor-not-allowed"
                      }`}
                    >
                      {isValidating ? <Loader2 className="h-5 w-5 animate-spin" /> : "Avançar"}
                    </button>
                    {(!isStreetConfirmed || (!manualRef.trim() && !manualSn)) && (
                      <p className="text-center text-xs text-zinc-400 mt-2">
                        Selecione uma rua e informe o número para avançar.
                      </p>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
