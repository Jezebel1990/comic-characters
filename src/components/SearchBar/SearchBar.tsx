import './SearchBar.css'
// @ts-ignore
import shape from '../../assets/shape3x.png'
import { ChangeEvent } from 'react'
import React from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  value: string
}

export function SearchBar({ onSearch, value }: SearchBarProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  return (
    <div className="search-bar">
      <img src={shape} alt="Ícone de lupa" className="search-icon" />
      <input
        type="text"
        placeholder={`Procure por heróis ${value}`}
        className="search-input"
        onChange={handleInputChange}
        value={value}
      />
    </div>
  )
}
