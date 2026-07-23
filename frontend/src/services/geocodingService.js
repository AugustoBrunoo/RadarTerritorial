export async function validateAndGeocodeStreet(streetName, targetNeighborhood = "Campo Grande") {
  if (!streetName || streetName.trim().length < 3) {
    return {
      isValid: false,
      message: "Por favor, digite um nome de rua válido."
    };
  }

  // Bairros oficiais atendidos pelo Radar Territorial
  const ALLOWED_NEIGHBORHOODS = ["Campo Grande", "Cosmos", "Inhoaíba"];

  // Garante que o bairro informado está na lista permitida, senão usa Campo Grande como padrão
  const activeNeighborhood = ALLOWED_NEIGHBORHOODS.includes(targetNeighborhood)
    ? targetNeighborhood
    : "Campo Grande";

  const query = `${encodeURIComponent(streetName)}, ${encodeURIComponent(activeNeighborhood)}, Rio de Janeiro, Brasil`;
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=1`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RadarTerritorialApp/1.0 (contato@radarterritorial.com.br)'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro no serviço de geocodificação: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.length > 0) {
      const result = data[0];
      const address = result.address || {};
      
      return {
        isValid: true,
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        ruaOficial: address.road || address.pedestrian || streetName,
        bairroIdentificado: activeNeighborhood
      };
    } else {
      return {
        isValid: false,
        message: `Não encontramos esta rua no bairro ${activeNeighborhood}. Verifique se o nome está correto ou selecione outro bairro (${ALLOWED_NEIGHBORHOODS.join(", ")}).`
      };
    }
  } catch (error) {
    console.error("Erro ao validar endereço via Nominatim:", error);
    return {
      isValid: false,
      message: "Não foi possível validar o endereço no momento. Tente novamente ou marque a localização no mapa."
    };
  }
}

export async function searchStreetSuggestions(searchTerm) {
  if (!searchTerm || searchTerm.trim().length < 3) {
    return [];
  }

  // Bairros oficiais atendidos
  const ALLOWED_NEIGHBORHOODS = ["Campo Grande", "Cosmos", "Inhoaíba"];
  
  // Busca no Rio de Janeiro para capturar ruas dos 3 bairros
  const query = `${encodeURIComponent(searchTerm)}, Rio de Janeiro, Brasil`;
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=8`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RadarTerritorialApp/1.0 (contato@radarterritorial.com.br)'
      }
    });
    
    if (!response.ok) return [];

    const data = await response.json();

    // Filtra os resultados para garantir que a rua pertence a um dos 3 bairros aceitos
    const filteredResults = data
      .map(item => {
        const addr = item.address || {};
        // O Nominatim pode retornar o bairro em suburb, neighbourhood ou quarter
        const rawBairro = addr.suburb || addr.neighbourhood || addr.quarter || "";
        
        // Encontra qual dos 3 bairros permitidos bate com a busca
        const matchedNeighborhood = ALLOWED_NEIGHBORHOODS.find(b => 
          rawBairro.toLowerCase().includes(b.toLowerCase())
        );

        if (!matchedNeighborhood) return null;

        let cep = null;
        if (addr.postcode) {
          cep = addr.postcode.replace(/[^\d-]/g, "");
        }

        return {
          id: item.place_id,
          ruaOficial: addr.road || addr.pedestrian || item.display_name.split(',')[0],
          bairro: matchedNeighborhood,
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon),
          cep: cep,
          displayText: `${addr.road || item.display_name.split(',')[0]} - ${matchedNeighborhood}`
        };
      })
      .filter(Boolean); // Remove resultados nulos que não pertencem aos 3 bairros

    return filteredResults;
  } catch (error) {
    console.error("Erro ao buscar sugestões de endereço:", error);
    return [];
  }
}

export async function refineAddressWithNumber(streetName, number, neighborhood) {
  if (!streetName || !number || !neighborhood) {
    return null;
  }

  const query = `${streetName}, ${number}, ${neighborhood}, Rio de Janeiro, Brasil`;
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=1`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RadarTerritorialApp/1.0 (contato@radarterritorial.com.br)'
      }
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (data && data.length > 0) {
      const result = data[0];
      const addr = result.address || {};
      
      let cep = null;
      if (addr.postcode) {
        cep = addr.postcode.replace(/[^\d-]/g, "");
      }

      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        cep: cep
      };
    }
  } catch (error) {
    console.error("Erro ao refinar endereço com número:", error);
  }
  
  return null;
}
