import { useState, useEffect } from 'react';

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
        const apiUrl = import.meta.env.VITE_MARVEL_API_URL;
        const apiKey = import.meta.env.VITE_MARVEL_API_KEY;
        const url = `${apiUrl}/characters/${characterId}?ts=1&apikey=${apiKey}`;

        if (!apiUrl || !apiKey) {
          throw new Error('URL da API ou chave da API não definidas.');
        }

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