import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBar } from './SearchBar'

describe('<SearchBar />', () => {
  it('should render the search icon image with correct alt text', () => {
    // Renderiza o componente SearchBar
    render(<SearchBar onSearch={() => {}} value="" />)

    // Verifica se a imagem com alt "Ícone de lupa" está sendo renderizada
    const searchIcon = screen.getByAltText('Ícone de lupa')
    expect(searchIcon).toBeInTheDocument()
  })

  it('should render the input with the correct placeholder', () => {
    // Renderiza o componente SearchBar com um valor específico
    render(<SearchBar onSearch={() => {}} value="Spider-Man" />)

    // Verifica se o placeholder do input está correto
    const input = screen.getByPlaceholderText('Procure por heróis Spider-Man')
    expect(input).toBeInTheDocument()
  })

  it('should call onSearch when input value changes', () => {
    // Mock da função onSearch
    const onSearchMock = jest.fn()

    // Renderiza o componente SearchBar com onSearch mockado
    render(<SearchBar onSearch={onSearchMock} value="" />)

    // Encontra o input
    const input = screen.getByPlaceholderText('Procure por heróis')

    // Simula a mudança no valor do input
    fireEvent.change(input, { target: { value: 'Iron Man' } })

    // Verifica se a função onSearch foi chamada com o valor correto
    expect(onSearchMock).toHaveBeenCalledWith('Iron Man')
  })

  it('should display the correct value in input field', () => {
    // Renderiza o componente SearchBar com um valor inicial
    render(<SearchBar onSearch={() => {}} value="Wolverine" />)

    // Verifica se o valor do input é o herói "Wolverine"
    const input = screen.getByDisplayValue('Wolverine')
    expect(input).toBeInTheDocument()
  })
})
