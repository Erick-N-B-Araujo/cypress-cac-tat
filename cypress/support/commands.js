Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Erick')
    cy.get('#lastName').type('Araujo')
    cy.get('#email').type('erick.araujo.qa@gmail.com')
    cy.get('#open-text-area').type('Teste', {delay: 0})
    cy.contains('button', 'Enviar').click()
})