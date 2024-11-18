import React from 'react'
import { render, screen } from '@testing-library/react'
import { Navbar } from './Navbar'

describe('<Navbar />', () => {
  it('should render the logo image with correct alt text', () => {
    // Renderiza o componente Navbar
    render(<Navbar />)

    // Verifica se a imagem está sendo renderizada com o alt correto
    const logoImage = screen.getByAltText(
      "Logo escrito 'Marvel Search heroes', a palavra marvel está em vermelho e o restante em cinza escuro."
    )

    expect(logoImage).toBeInTheDocument()
  })

  it('should have the correct loading attribute for the logo image', () => {
    // Renderiza o componente Navbar
    render(<Navbar />)

    // Verifica se a imagem tem o atributo "loading" configurado como "lazy"
    const logoImage = screen.getByAltText(
      "Logo escrito 'Marvel Search heroes', a palavra marvel está em vermelho e o restante em cinza escuro."
    )

    expect(logoImage).toHaveAttribute('loading', 'lazy')
  })

  it('should match the snapshot', () => {
    // Renderiza o componente Navbar
    const { container } = render(<Navbar />)

    // Gera o snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
})
