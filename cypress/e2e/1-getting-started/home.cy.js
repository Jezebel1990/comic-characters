/// <reference types="cypress" />

describe('home', () => {
  beforeEach(() => {
    // Visita o site antes de cada teste
    cy.visit('https://comic-characters.vercel.app/')
  })

  it('should display the hero list correctly', () => {
    // Verifica se a lista de personagens está sendo exibida
    cy.get('.character-list').should('be.visible')
    // Verifica se os personagens estão sendo renderizados corretamente
    cy.get('.character-card').should('have.length.greaterThan', 0)
  })

  it('should search for a character by name', () => {
    // Digita na barra de pesquisa
    cy.get('.search-bar-container input')
      .type('Abyss')
      .should('have.value', 'Abyss'); // Confirma que o valor foi inserido
  
    // Aguarda o personagem "Abyss" ser exibido na lista
    cy.get('.character-card .character-name')
      .contains('Abyss')
      .should('exist'); // Garante que "Abyss" está presente
  
    // Opcional: Verifica se todos os resultados contêm o termo buscado
    cy.get('.character-card .character-name').each(($name) => {
      cy.wrap($name)
        .invoke('text')
        .should('include', 'Abyss'); // Verifica se cada resultado inclui "Abyss"
    });
  });
}); 