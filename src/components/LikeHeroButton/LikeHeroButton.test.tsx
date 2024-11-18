import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { LikeHeroButton } from './LikeHeroButton'

describe('<LikeHeroButton />', () => {
  it('should render the correct image based on isLiked prop', () => {
    // Renderiza o componente com isLiked = false
    const { container } = render(
      <LikeHeroButton isLiked={false} onClick={() => {}} />
    )

    // Verifica se a imagem "Not Liked" (dislike) é exibida
    expect(screen.getByAltText('Not Liked')).toBeInTheDocument()

    // Renderiza o componente com isLiked = true
    render(<LikeHeroButton isLiked={true} onClick={() => {}} />)

    // Verifica se a imagem "Liked" é exibida
    expect(screen.getByAltText('Liked')).toBeInTheDocument()

    // Gerar snapshot do botão
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should call onClick when button is clicked', () => {
    const handleClick = jest.fn()

    // Renderiza o componente com isLiked = false e mock de onClick
    render(<LikeHeroButton isLiked={false} onClick={handleClick} />)

    // Encontra o botão e dispara o evento de clique
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Verifica se a função onClick foi chamada
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should toggle isLiked state when clicked', () => {
    let isLiked = false
    const handleClick = () => {
      isLiked = !isLiked
    }

    // Renderiza o componente com isLiked = false
    render(<LikeHeroButton isLiked={isLiked} onClick={handleClick} />)

    // Encontra o botão e dispara o evento de clique
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Verifica se o estado foi alterado
    expect(isLiked).toBe(true) // O estado deve mudar para true após o clique
  })
})
