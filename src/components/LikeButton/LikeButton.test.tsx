import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { LikeButton } from './LikeButton'

describe('LikeButton component', () => {
  it('renders the correct icon based on isLiked prop', () => {
    // Renderiza o botão com isLiked = false
    render(<LikeButton isLiked={false} onClick={() => {}} />)

    // Verifica se o ícone de "não curtido" está presente
    expect(screen.getByAltText('Not Liked')).toBeInTheDocument()

    // Renderiza o botão com isLiked = true
    render(<LikeButton isLiked={true} onClick={() => {}} />)

    // Verifica se o ícone de "curtido" está presente
    expect(screen.getByAltText('Liked')).toBeInTheDocument()
  })

  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<LikeButton isLiked={false} onClick={handleClick} />)

    // Dispara um evento de clique no botão
    fireEvent.click(screen.getByRole('button'))

    // Verifica se a função de clique foi chamada
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
