import { render, screen } from '@testing-library/react'
import { HeroDetails } from './HeroDetails'
import React from 'react'

describe('HeroDetails', () => {
  it('should render hero details correctly', () => {
    const hero = {
      name: 'Superman',
      description: 'O homem de aço.',
      image: 'superman-image.jpg',
      comicsCount: 100,
      seriesCount: 10,
      lastModified: '2024-11-01T12:00:00Z'
    }

    render(
      <HeroDetails
        name={hero.name}
        description={hero.description}
        image={hero.image}
        comicsCount={hero.comicsCount}
        seriesCount={hero.seriesCount}
        lastModified={hero.lastModified}
      />
    )

    expect(screen.getByText(hero.name.toUpperCase())).toBeInTheDocument()
    expect(screen.getByText(hero.description)).toBeInTheDocument()
    expect(screen.getByText(hero.comicsCount.toString())).toBeInTheDocument()
    expect(screen.getByText(hero.seriesCount.toString())).toBeInTheDocument()
    expect(screen.getByText('Último quadrinho:')).toBeInTheDocument()
    expect(
      screen.getByText(
        new Date(hero.lastModified).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      )
    ).toBeInTheDocument()
    expect(screen.getByAltText(hero.name)).toHaveAttribute('src', hero.image)
  })
})
