import { useParams } from 'react-router-dom'
import './Hero-page.css'
import { TopBar } from '../../components/TopBar/TopBar'
import { HeroDetails } from '../../components/Details/HeroDetails/HeroDetails'
import { useFetchCharacterDetails } from '../../hooks/useFetchCharacterDetails'
import { ComicDetails } from '../../components/Details/ComicDetails/ComicDetails'
import { useFetchComics } from '../../hooks/useFetchComics'
import React from 'react'

export function HeroPage() {
  const { id } = useParams<{ id: string }>()
  const { characterDetails, loading, error } = useFetchCharacterDetails(
    Number(id)
  )
  const {
    comics,
    loading: loadingComics,
    error: errorComics
  } = useFetchComics(Number(id))

  if (loading || loadingComics) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (errorComics) return <p>Error ao carregar quadrinhos: {errorComics}</p>

  return (
    <div className="hero-page">
      <TopBar />
      {characterDetails ? (
        <HeroDetails
          name={characterDetails.name}
          description={characterDetails.description}
          image={characterDetails.image}
          comicsCount={characterDetails.comicsCount}
          seriesCount={characterDetails.seriesCount}
          lastModified={characterDetails.lastModified}
        />
      ) : (
        <p>Herói não encontrado.</p>
      )}
      <div>
        {comics.length > 0 ? (
          <ComicDetails comics={comics} />
        ) : (
          <p className="comic-text">Não há quadrinhos disponíveis.</p>
        )}
      </div>
    </div>
  )
}
