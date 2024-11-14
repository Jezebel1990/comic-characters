import { useState, useEffect } from 'react';

interface Character {
  id: number;
  name: string;
  description: string;
  image: string;
  favorite: boolean;
}

export function useFetchCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_MARVEL_API_URL;
        const apiKey = import.meta.env.VITE_MARVEL_API_KEY;

        if (!apiUrl || !apiKey) {
          throw new Error('URL da API ou chave da API não definidas.');
        }

        const url = `${apiUrl}/characters?ts=1&apikey=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data?.data?.results) {
          throw new Error('Dados de personagens não encontrados.');
        }

        const formattedCharacters = data.data.results.slice(0, 20).map((char: any) => ({
          id: char.id,
          name: char.name,
          description: char.description,
          image: char.thumbnail 
            ? `${char.thumbnail.path}.${char.thumbnail.extension}`
            : 'https://images.impresa.pt/sicnot/2023-11-13-thumbnail_MARVEL-STUDIOS.png-74c447c9/original',
          favorite: false,
        }));

        setCharacters(formattedCharacters);
      } catch (err: any) {
        setError(err.message);
        console.error('Erro ao buscar personagens:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { characters, setCharacters, loading, error };
}
