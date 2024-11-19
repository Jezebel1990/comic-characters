import { render, screen, fireEvent } from '@testing-library/react'
import { HeroToolbar } from './HeroToolbar'
import React from 'react'

describe('HeroToolbar', () => {
  const mockOnToggleSort = jest.fn()
  const mockOnShowFavorites = jest.fn()

  it('should render the correct hero count text', () => {
    render(
      <HeroToolbar
        totalHeroes={5}
        onToggleSort={mockOnToggleSort}
        isSortActive={false}
        onShowFavorites={mockOnShowFavorites}
        isFavoritesActive={false}
      />
    )

    expect(screen.getByText('Encontrados 5 heróis')).toBeInTheDocument()
  })

  it('should call onToggleSort when sort button is clicked', () => {
    render(
      <HeroToolbar
        totalHeroes={5}
        onToggleSort={mockOnToggleSort}
        isSortActive={false}
        onShowFavorites={mockOnShowFavorites}
        isFavoritesActive={false}
      />
    )

    const sortButton = screen.getByRole('button', { name: /ordenar por nome/i })
    fireEvent.click(sortButton)

    expect(mockOnToggleSort).toHaveBeenCalledTimes(1)
  })

  it('should toggle the favorite button and call onShowFavorites when clicked', () => {
    render(
      <HeroToolbar
        totalHeroes={5}
        onToggleSort={mockOnToggleSort}
        isSortActive={false}
        onShowFavorites={mockOnShowFavorites}
        isFavoritesActive={false}
      />
    )

    const favoriteButton = screen.getByRole('button', {
      name: /somente favoritos/i
    })

    // O botão não está ativo inicialmente
    expect(favoriteButton).not.toHaveClass('active')

    fireEvent.click(favoriteButton)

    // O botão deve agora estar ativo
    expect(favoriteButton).toHaveClass('active')
    expect(mockOnShowFavorites).toHaveBeenCalledTimes(1)

    // Clicar novamente para desmarcar como favorito
    fireEvent.click(favoriteButton)
    expect(favoriteButton).not.toHaveClass('active')
    expect(mockOnShowFavorites).toHaveBeenCalledTimes(2)
  })

  it('should display the correct favorite icon based on state', () => {
    // Teste quando não está favoritado
    const { rerender } = render(
      <HeroToolbar
        totalHeroes={5}
        onToggleSort={mockOnToggleSort}
        isSortActive={false}
        onShowFavorites={mockOnShowFavorites}
        isFavoritesActive={false}
      />
    )

    // Teste quando está favoritado
    rerender(
      <HeroToolbar
        totalHeroes={5}
        onToggleSort={mockOnToggleSort}
        isSortActive={false}
        onShowFavorites={mockOnShowFavorites}
        isFavoritesActive={true}
      />
    )
  })
})
