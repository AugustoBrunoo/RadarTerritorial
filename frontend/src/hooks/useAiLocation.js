import { useState, useEffect } from 'react';

const ALLOWED_BAIRROS = ['campo grande', 'cosmos', 'inhoaiba'];

const normalizeString = (str) => {
  if (!str) return '';
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
};

const checkAllowedBairro = (bairroName) => {
  const normalized = normalizeString(bairroName);
  return ALLOWED_BAIRROS.some(allowed => normalized.includes(allowed));
};

const extractBairro = (address) => {
  if (!address) return '';
  return address.suburb || address.neighbourhood || address.quarter || address.city_district || '';
};

const getBairroSlug = (bairroName) => {
  const normalized = normalizeString(bairroName);
  if (normalized.includes('campo grande')) return 'campo-grande';
  if (normalized.includes('inhoaiba')) return 'inhoaiba';
  if (normalized.includes('cosmos')) return 'cosmos';
  return null;
};

export function useAiLocation({ 
  chatStep, 
  setChatStep, 
  addMessage, 
  setMessages,
  setIsTyping, 
  inputValue, 
  setInputValue,
  triggerCategoryStart
}) {
  const [collectedData, setCollectedData] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const triggerLocationStart = () => {
    setChatStep('LOCATION_START');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage('ai', 'Onde está acontecendo o problema que você quer relatar?', { type: 'location_start_options' });
    }, 1200);
  };

  const handleLocationDecision = (choice) => {
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'location_start_options' || msg.extraData?.type === 'location_invalid_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));

    if (choice === 'GPS') {
      addMessage('user', '📍 Usar minha localização atual');
      setChatStep('FETCHING_GPS');
      setIsTyping(true);

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, { headers: { 'User-Agent': 'RadarTerritorial/1.0' } });
              const data = await res.json();
              setIsTyping(false);

              const bairro = extractBairro(data.address);
              const rua = data.address?.road || '';
              const slug = getBairroSlug(bairro);

              if (slug) {
                setCollectedData(prev => ({ ...prev, lat: latitude, lon: longitude, bairro: slug, rua }));
                setChatStep('CHECK_GPS_BAIRRO');
                addMessage('ai', `Identificamos que você está em: **${rua ? rua + ', ' : ''}${bairro}**.\n\nConfirmar este local?`, { type: 'location_confirm_options' });
              } else {
                handleInvalidBairro(bairro);
              }
            } catch (err) {
              setIsTyping(false);
              addMessage('ai', 'Tivemos um problema ao buscar seu endereço pelo GPS. Por favor, digite manualmente.');
              startManualLocation();
            }
          },
          (error) => {
            setIsTyping(false);
            addMessage('ai', 'Não conseguimos acessar seu GPS (permissão negada ou erro). Por favor, digite o endereço manualmente.');
            startManualLocation();
          },
          { timeout: 10000 }
        );
      } else {
        setIsTyping(false);
        addMessage('ai', 'Seu navegador não suporta geolocalização. Por favor, digite manualmente.');
        startManualLocation();
      }
    } else if (choice === 'MANUAL') {
      addMessage('user', '✏️ Digitar CEP ou Nome da Rua');
      startManualLocation();
    }
  };

  const startManualLocation = () => {
    setChatStep('INPUT_LOCATION_MANUAL');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage('ai', 'Por favor, digite o seu **CEP** (apenas os 8 números) ou o **nome da rua** (Ex: Estrada do Campinho). As sugestões aparecerão abaixo:');
    }, 800);
  };

  useEffect(() => {
    if (chatStep !== 'INPUT_LOCATION_MANUAL') {
      setShowSuggestions(false);
      setSuggestions([]);
      return;
    }

    const text = inputValue.trim();
    if (!text || text.length < 3) {
      setShowSuggestions(false);
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsSearching(true);
      setShowSuggestions(true);

      const justNumbers = text.replace(/\D/g, '');
      const isCep = justNumbers.length > 0 && justNumbers.length <= 8 && justNumbers === text.replace(/[^0-9]/g, '');

      if (isCep) {
        if (justNumbers.length !== 8) {
          setSuggestions([{ id: 'error', text: 'CEP incompleto. Digite os 8 dígitos.', disabled: true }]);
          setIsSearching(false);
          return;
        }

        try {
          const res = await fetch(`https://viacep.com.br/ws/${justNumbers}/json/`);
          const data = await res.json();

          if (data.erro) {
            setSuggestions([{ id: 'error', text: 'CEP não encontrado.', disabled: true }]);
            setIsSearching(false);
            return;
          }

          const bairro = data.bairro;
          const rua = data.logradouro;
          const slug = getBairroSlug(bairro);

          if (slug) {
            const nomRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(rua)}, Rio de Janeiro&format=json&addressdetails=1&limit=1`, { headers: { 'User-Agent': 'RadarTerritorial/1.0' } });
            const nomData = await nomRes.json();

            let lat = null, lon = null;
            if (nomData && nomData.length > 0) {
              lat = nomData[0].lat;
              lon = nomData[0].lon;
            }

            setSuggestions([{
              id: data.cep,
              rua,
              bairro: slug,
              cep: justNumbers,
              lat,
              lon,
              text: `📍 ${rua} - ${bairro} (CEP: ${justNumbers})`
            }]);
          } else {
            setSuggestions([{ id: 'error', text: `O Radar Territorial atua apenas em Campo Grande, Cosmos e Inhoaíba.`, disabled: true }]);
          }
        } catch (error) {
          setSuggestions([{ id: 'error', text: 'Erro ao buscar o CEP.', disabled: true }]);
        }
        setIsSearching(false);
      } else {
        try {
          const query = encodeURIComponent(`${text}, Rio de Janeiro`);
          const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`, { headers: { 'User-Agent': 'RadarTerritorial/1.0' } });
          const results = await res.json();

          if (results && results.length > 0) {
            const validOptions = [];
            const seen = new Set();

            for (const data of results) {
              const bairro = extractBairro(data.address);
              const rua = data.address?.road || data.display_name.split(',')[0];
              let cep = null;

              if (bairro && checkAllowedBairro(bairro)) {
                try {
                  const ruaEncoded = encodeURIComponent(rua);
                  const viaCepRes = await fetch(`https://viacep.com.br/ws/RJ/Rio de Janeiro/${ruaEncoded}/json/`);
                  const viaCepData = await viaCepRes.json();
                  if (viaCepData && viaCepData.length > 0) {
                    const matchingCep = viaCepData.find(item => item.bairro && checkAllowedBairro(item.bairro));
                    if (matchingCep) {
                      cep = matchingCep.cep;
                    }
                  }
                } catch (e) {
                  // Fallback
                }

                const slug = getBairroSlug(bairro);
                if (slug) {
                  const key = `${rua}-${slug}`;
                  if (!seen.has(key)) {
                    seen.add(key);
                    validOptions.push({
                      id: data.place_id,
                      rua,
                      bairro: slug,
                      lat: data.lat,
                      lon: data.lon,
                      cep,
                      text: `📍 ${rua} - ${bairro}, Rio de Janeiro`
                    });
                  }
                }
              }
              if (validOptions.length >= 4) break;
            }

            if (validOptions.length > 0) {
              setSuggestions(validOptions);
            } else {
              setSuggestions([{ id: 'error', text: 'O Radar Territorial atua apenas em Campo Grande, Cosmos e Inhoaíba.', disabled: true }]);
            }
          } else {
            setSuggestions([{ id: 'error', text: 'Endereço não encontrado no Rio de Janeiro.', disabled: true }]);
          }
        } catch (error) {
          setSuggestions([{ id: 'error', text: 'Erro ao buscar o endereço.', disabled: true }]);
        }
        setIsSearching(false);
      }
    };

    const timerId = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timerId);
  }, [inputValue, chatStep]);

  const handleInvalidBairro = (bairro) => {
    const bairroNome = bairro ? bairro : 'desconhecido';
    addMessage('ai', `O Radar Territorial atualmente funciona apenas nos bairros de Campo Grande, Cosmos e Inhoaíba.\n\nO local identificado (${bairroNome}) está fora da nossa área de cobertura.`, { type: 'location_invalid_options' });
    setChatStep('LOCATION_START');
  };

  const handleLocationConfirmDecision = (choice) => {
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'location_confirm_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));

    if (choice === 'YES') {
      addMessage('user', 'Sim, está correto');
      setChatStep('INPUT_NUMBER_REF');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Para finalizar o endereço, deseja informar o **número predial** ou um **ponto de referência**? (Ex: Nº 486 ou "Em frente à praça").\n\nSe não tiver número, clique no botão abaixo.', { type: 'location_number_options' });
      }, 800);
    } else if (choice === 'RETRY_GPS') {
      addMessage('user', 'Tentar GPS novamente');
      handleLocationDecision('GPS');
    } else if (choice === 'RETRY_MANUAL') {
      addMessage('user', 'Digitar manualmente');
      handleLocationDecision('MANUAL');
    }
  };

  const selectSuggestion = (sug) => {
    if (sug.disabled) return;

    setShowSuggestions(false);
    setSuggestions([]);
    setInputValue('');
    addMessage('user', sug.text);

    const hasOldRef = !!collectedData.numero_referencia;

    setCollectedData(prev => ({
      ...prev,
      lat: sug.lat,
      lon: sug.lon,
      bairro: sug.bairro,
      rua: sug.rua,
      cep: sug.cep || undefined
    }));

    if (hasOldRef) {
      setChatStep('LOCATION_KEEP_REF_CHOICE');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', `Endereço atualizado para **${sug.rua} - ${sug.bairro}**.\nDeseja manter o número/referência anterior (**${collectedData.numero_referencia}**)?`, {
          type: 'location_keep_ref_options',
          ref: collectedData.numero_referencia
        });
      }, 800);
    } else {
      setChatStep('INPUT_NUMBER_REF');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Para finalizar o endereço, deseja informar o **número predial** ou um **ponto de referência**? (Ex: Nº 486 ou "Em frente à praça").\n\nSe não tiver número, clique no botão abaixo.', { type: 'location_number_options' });
      }, 800);
    }
  };

  const triggerLocationReview = (data) => {
    setChatStep('LOCATION_REVIEW');
    setIsTyping(true);

    try {
      setMessages(prev => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.text && typeof lastMsg.text === 'string' && lastMsg.text.includes("confira se os dados do local estão corretos")) {
          return prev;
        }

        const rua = data?.rua || 'Rua não informada';
        const bairroRaw = data?.bairro || 'Bairro não informado';
        const bairro = bairroRaw === 'campo-grande' ? 'Campo Grande' :
                       bairroRaw === 'inhoaiba' ? 'Inhoaíba' :
                       bairroRaw === 'cosmos' ? 'Cosmos' :
                       bairroRaw;
        const cep = data?.cep || 'Não informado';
        const referencia = data?.numero_referencia || 'Sem número / Apenas a rua';

        const reviewText = `Por favor, confira se os dados do local estão corretos para prosseguirmos:\n\n📍 **Rua:** ${rua}\n🏙️ **Bairro:** ${bairro}\n📮 **CEP:** ${cep}\n🏠 **Número / Ref:** ${referencia}`;

        return [...prev, {
          id: Date.now(),
          sender: 'ai',
          text: reviewText,
          extraData: { type: 'location_review_card', data },
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }];
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLocationReviewDecision = (choice) => {
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'location_review_card' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));

    if (choice === 'CONFIRM') {
      addMessage('user', '✅ Confirmar Endereço');
      
      // Auto-transition to Category Flow
      triggerCategoryStart();
    } else if (choice === 'EDIT') {
      addMessage('user', '✏️ Corrigir Algo');
      setChatStep('LOCATION_EDIT_CHOICE');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'O que você deseja alterar no endereço?', { type: 'location_edit_options' });
      }, 800);
    }
  };

  const handleLocationKeepRefDecision = (choice) => {
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'location_keep_ref_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));

    if (choice === 'KEEP') {
      addMessage('user', `Sim, manter "${collectedData.numero_referencia}"`);
      triggerLocationReview(collectedData);
    } else {
      addMessage('user', 'Não, digitar nova referência');
      setChatStep('INPUT_NUMBER_REF');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Digite o novo **número predial** ou **ponto de referência**:\n\nSe não tiver número, clique no botão abaixo.', { type: 'location_number_options' });
      }, 800);
    }
  };

  const handleLocationEditDecision = (choice) => {
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'location_edit_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));

    if (choice === 'RUA_CEP') {
      addMessage('user', '📍 Alterar Rua ou CEP');
      startManualLocation();
    } else if (choice === 'NUMERO') {
      addMessage('user', '🏠 Alterar Número/Referência');
      setChatStep('INPUT_NUMBER_REF');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Digite o novo **número predial** ou **ponto de referência**:\n\nSe não tiver número, clique no botão abaixo.', { type: 'location_number_options' });
      }, 800);
    } else if (choice === 'START_OVER') {
      addMessage('user', '🔄 Refazer Localização do Zero');
      setCollectedData({});
      triggerLocationStart();
    }
  };

  const handleNumberDecision = (text) => {
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'location_number_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));

    if (text === 'SEM_NUMERO') {
      addMessage('user', 'Sem número / Apenas a rua');
      setCollectedData(prev => {
        const newData = { ...prev, numero_referencia: 'Sem número / Apenas a rua' };
        triggerLocationReview(newData);
        return newData;
      });
    } else {
      addMessage('user', text);
      setCollectedData(prev => {
        const newData = { ...prev, numero_referencia: text };
        triggerLocationReview(newData);
        return newData;
      });
    }
  };

  return {
    collectedData,
    suggestions,
    isSearching,
    showSuggestions,
    triggerLocationStart,
    handleLocationDecision,
    handleLocationConfirmDecision,
    selectSuggestion,
    handleLocationReviewDecision,
    handleLocationKeepRefDecision,
    handleLocationEditDecision,
    handleNumberDecision
  };
}
