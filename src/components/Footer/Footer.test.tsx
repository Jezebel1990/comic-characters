import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer component', () => {
  it('renders correctly and displays the current year', () => {
    // Renderiza o componente Footer
    render(<Footer />)

    // Obtém o ano atual
    const currentYear = new Date().getFullYear()

    // Verifica se o parágrafo contém o texto esperado
    expect(
      screen.getByText(`Marvel ⓒ ${currentYear}. Todos os direitos reservados.`)
    ).toBeInTheDocument()
  })
})
