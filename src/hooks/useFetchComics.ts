import { useState, useEffect } from 'react';
import md5 from 'md5';

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
        const url = `${apiUrl}/characters/${characterId}/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

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
