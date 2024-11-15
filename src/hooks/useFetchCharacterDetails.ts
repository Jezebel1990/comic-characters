import { useState, useEffect } from 'react';
import md5 from 'md5';

interface CharacterDetails {
  id: number;
  name: string;
  description: string;
  image: string;
  comicsCount: number;
  seriesCount: number;
  lastModified: string;
  resourceURI: string;
}

export function useFetchCharacterDetails(characterId: number) {
  const [characterDetails, setCharacterDetails] = useState<CharacterDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        // Carregar as variáveis de ambiente
        const apiUrl = import.meta.env.VITE_MARVEL_API_URL;
        const publicKey = import.meta.env.VITE_MARVEL_API_PUBLIC_TOKEN;
        const privateKey = import.meta.env.VITE_MARVEL_API_PRIVATE_TOKEN;
        const timestamp = new Date().getTime().toString();

        // Calcular o hash MD5 (timestamp + privateKey + publicKey)
        const hash = md5(timestamp + privateKey + publicKey);

        // Verificar se as variáveis de ambiente estão definidas
        if (!apiUrl || !publicKey || !privateKey) {
          throw new Error('URL da API ou chave da API não definidas.');
        }

        // URL com parâmetros para autenticação
        const url = `${apiUrl}/characters/${characterId}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const character = data.data.results[0];

        const formattedCharacterDetails: CharacterDetails = {
          id: character.id,
          name: character.name,
          description: character.description || 'No description available.',
          image: character.thumbnail 
            ? `${character.thumbnail.path}.${character.thumbnail.extension}`
            : 'https://images.impresa.pt/sicnot/2023-11-13-thumbnail_MARVEL-STUDIOS.png-74c447c9/original',
          comicsCount: character.comics.available,
          seriesCount: character.series.available,
          lastModified: character.modified,
          resourceURI: character.resourceURI,
        };

        setCharacterDetails(formattedCharacterDetails);
      } catch (err: any) {
        setError(err.message);
        console.error('Erro ao buscar detalhes do personagem:', err);
      } finally {
        setLoading(false);
      }
    };

    if (characterId) {
      fetchCharacterDetails();
    }
  }, [characterId]);

  return { characterDetails, loading, error };
}
