import { useState } from 'react'
// @ts-ignore
import hero from '../../assets/superhero.png'
// @ts-ignore
import toogleLeft from '../../assets/toggle-left.png'
// @ts-ignore
import toogleRight from '../../assets/toggle-right.png'
// @ts-ignore
import darkHeart from '../../assets/darkHeart1,5x.png'
// @ts-ignore
import heart from '../../assets/heart1,5x.png'
import './HeroToolbar.css'
import React from 'react'

interface HeroToolbarProps {
  totalHeroes: number
  onToggleSort: () => void
  isSortActive: boolean
  onShowFavorites: () => void
  isFavoritesActive: boolean
}

export function HeroToolbar({
  totalHeroes,
  onToggleSort,
  isSortActive,
  onShowFavorites,
  isFavoritesActive
}: HeroToolbarProps) {
  const [isFavorited, setIsFavorited] = useState(isFavoritesActive)

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited)
    onShowFavorites()
  }

  return (
    <div className="hero-toolbar">
      <div className="hero-toolbar-left">
        <span>
          {totalHeroes === 1
            ? `Encontrado ${totalHeroes} herói`
            : `Encontrados ${totalHeroes} heróis`}
        </span>
      </div>

      <div className="hero-toolbar-right">
        <img src={hero} alt="Ícone de herói" className="hero-icon" />
        <button
          onClick={onToggleSort}
          className="sort-button"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <h5 className="toggle-sort">Ordenar por nome - A/Z</h5>
          <img
            src={isSortActive ? toogleLeft : toogleRight}
            alt="Ícone de toggle de ordenação"
            className="toggle-icon"
          />
        </button>

        <button
          onClick={handleFavoriteClick}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          className={`favorites-button ${isFavorited ? 'active' : ''}`}
        >
          <img
            src={isFavorited ? darkHeart : heart}
            alt="Ícone de favoritos"
            className="favorites-icon"
          />
          <h5 className="toggle-favorite">Somente favoritos</h5>
        </button>
      </div>
    </div>
  )
}
