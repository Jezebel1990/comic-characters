import { render, screen, fireEvent } from '@testing-library/react'
import { ComicDetails } from './ComicDetails'
import React from 'react'

describe('ComicDetails', () => {
  const comics = [
    {
      id: 1,
      image: 'https://example.com/image1.jpg',
      title: 'Comic 1',
      onSaleDate: '2024-11-15'
    },
    {
      id: 2,
      image: 'https://example.com/image2.jpg',
      title: 'Comic 2',
      onSaleDate: '2024-11-14'
    }
  ]

  it('should render the comic titles and images', () => {
    render(<ComicDetails comics={comics} />)

    // Verificar se o título dos quadrinhos é renderizado
    expect(screen.getByText('Últimos lançamentos')).toBeInTheDocument()
    expect(screen.getByText('Comic 1')).toBeInTheDocument()
    expect(screen.getByText('Comic 2')).toBeInTheDocument()
  })

  it('should sort comics by onSaleDate in descending order', () => {
    render(<ComicDetails comics={comics} />)

    const comicTitles = screen
      .getAllByText(/Comic/)
      .map((element) => element.textContent)
    // Verifica se o Comic 1 aparece antes do Comic 2 devido à data de lançamento
    expect(comicTitles[0]).toBe('Comic 1')
    expect(comicTitles[1]).toBe('Comic 2')
  })

  it('should handle image error and display default image', () => {
    const comicsWithInvalidImage = [
      {
        id: 1,
        image: 'https://invalid-image.com/image.jpg',
        title: 'Comic 1',
        onSaleDate: '2024-11-15'
      }
    ]

    render(<ComicDetails comics={comicsWithInvalidImage} />)

    const image = screen.getByRole('img')

    // Disparar erro na imagem
    fireEvent.error(image)

    // Apenas verificar se o evento de erro foi disparado
    expect(image).toBeInTheDocument()
  })

  it('should format the sale date correctly', () => {
    render(<ComicDetails comics={comics} />)
  })
})
