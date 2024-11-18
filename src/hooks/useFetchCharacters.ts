import { useState, useEffect } from 'react'
import md5 from 'md5'

interface Character {
  id: number
  name: string
  image: string
  favorite: boolean
}

export function useFetchCharacters() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregar as variáveis de ambiente
        const apiUrl = import.meta.env.VITE_MARVEL_API_URL
        const publicKey = import.meta.env.VITE_MARVEL_API_PUBLIC_TOKEN
        const privateKey = import.meta.env.VITE_MARVEL_API_PRIVATE_TOKEN
        const timestamp = new Date().getTime().toString()

        // Calcular o hash MD5 (timestamp + privateKey + publicKey)
        const hash = md5(timestamp + privateKey + publicKey)

        // Verificar se as variáveis de ambiente estão definidas
        if (!apiUrl || !publicKey || !privateKey) {
          throw new Error('URL da API ou chave da API não definidas.')
        }

        // URL com parâmetros para autenticação
        const url = `${apiUrl}/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()

        // Formatar os dados dos personagens
        const formattedCharacters = data.data.results
          .slice(0, 20)
          .map((char: any) => ({
            id: char.id,
            name: char.name,
            description: char.description,
            image: char.thumbnail
              ? `${char.thumbnail.path}.${char.thumbnail.extension}`
              : 'https://images.impresa.pt/sicnot/2023-11-13-thumbnail_MARVEL-STUDIOS.png-74c447c9/original',
            favorite: false
          }))

        setCharacters(formattedCharacters)
      } catch (err: any) {
        setError(err.message)
        console.error('Erro ao buscar personagens:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { characters, setCharacters, loading, error }
}
