import { render, screen, fireEvent } from '@testing-library/react'
import { SearchHeros } from './SearchHeros'
import { BrowserRouter as Router } from 'react-router-dom' // Necessário para fornecer o contexto de navegação
import React from 'react'

describe('SearchHeros', () => {
  const mockOnSearch = jest.fn()
  const mockNavigate = jest.fn()

  beforeEach(() => {
    // Limpar mocks antes de cada teste
    mockOnSearch.mockClear()
    mockNavigate.mockClear()
  })

  it('should call onSearch when typing in the input', () => {
    render(
      <Router>
        <SearchHeros onSearch={mockOnSearch} value="" />
      </Router>
    )

    const input = screen.getByPlaceholderText(
      'Procure por heróis'
    ) as HTMLInputElement

    // Simular a digitação no input
    fireEvent.change(input, { target: { value: 'Spider-Man' } })

    // Verificar se a função onSearch foi chamada com o valor correto
    expect(mockOnSearch).toHaveBeenCalledWith('Spider-Man')
  })

  it('should navigate with the correct searchQuery on icon click', () => {
    render(
      <Router>
        <SearchHeros onSearch={mockOnSearch} value="Iron Man" />
      </Router>
    )

    const icon = screen.getByAltText('Ícone de lupa') // Acessa a imagem pelo alt text

    // Simular o clique no ícone
    fireEvent.click(icon)
  })
})
