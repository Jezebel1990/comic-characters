import { useState, useEffect } from 'react';

interface Comic {
  id: number;
  image: string;
  title: string;
  onSaleDate: string;
}

export function useFetchComics(characterId: number) {
  const [comics, setComics] = useState<Comic[]>([]);
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

        const url = `${apiUrl}/characters/${characterId}/comics?ts=1&apikey=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.data || !data.data.results) {
          throw new Error('Resposta da API não contém dados esperados.');
        }

        const formattedComics = data.data.results.map((comic: any) => ({
          id: comic.id,
          title: comic.title,
          image: comic.thumbnail
            ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
            : 'https://images.impresa.pt/sicnot/2023-11-13-thumbnail_MARVEL-STUDIOS.png-74c447c9/original',
          onSaleDate: comic.dates.find((date: any) => date.type === 'onsaleDate')?.date || 'Data não disponível',
        }));

        setComics(formattedComics);
      } catch (err: any) {
        setError(err.message);
        console.error('Erro ao buscar quadrinhos do personagem:', err);
      } finally {
        setLoading(false);
      }
    };

    if (characterId) {
      fetchData();
    }
  }, [characterId]);

  return { comics, loading, error };
}
