import { render, screen, fireEvent } from '@testing-library/react'
import { TopBar } from './TopBar' // Ajuste o caminho conforme necessário
import { BrowserRouter as Router } from 'react-router-dom' // Necessário para renderizar o Link
import React from 'react'

describe('TopBar', () => {
  it('should render the logo and link to home page', () => {
    render(
      <Router>
        <TopBar />
      </Router>
    )

    // Verificando se o link da logo está presente
    const logoLink = screen.getByRole('link', {
      name: /voltar para a página inicial/i
    })
    expect(logoLink).toBeInTheDocument()

    // Verificando se a imagem do logo está presente
    const logoImage = screen.getByAltText(
      /texto escrito 'marvel search heroes'/i
    )
    expect(logoImage).toBeInTheDocument()

    // Verificando se o logo tem o atributo correto
    expect(logoImage).toHaveAttribute('src', 'test-file-stub') // Aqui, como mockamos a imagem, verificamos o stub
  })

  it('should update the search query when typing in the search input', () => {
    render(
      <Router>
        <TopBar />
      </Router>
    )

    // Encontrando o input de pesquisa
    const searchInput = screen.getByRole('textbox')

    // Simulando a digitação no campo de pesquisa
    fireEvent.change(searchInput, { target: { value: 'Iron Man' } })

    // Verificando se o valor do input foi atualizado corretamente
    expect(searchInput).toHaveValue('Iron Man')
  })
})
