/// <reference types="Cypress"/>


// Suite de Testes
describe('Central de Atendimento ao Cliente TAT', function() {
    const longText = 'Teste de input. Teste de input. Teste de input. Teste de input. Teste de input. Teste de input. Teste de input. Teste de input.'
    
    beforeEach(function() {
        // Acessa uma pagina
        cy.visit('./src/index.html')
    })

    // Test Cases
    it('Verifica o titulo da aplicação', function(){
        // Acessa o titulo da pagina
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('Valida envio de formulário válido', function(){
        // Preenche os campos
        cy.get('#firstName').type('Erick')
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('erick.araujo.qa@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})

        //Clica no botão
        cy.get('button[type="submit"]').click()

        //Valida mensagem de feedback
        cy.get('.success').should('be.visible')
    })
    it('Valida envio de formulário com email inválido', function(){
        // Preenche os campos
        cy.get('#firstName').type('Erick')
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('erick.araujo.qa@gmail,com')
        cy.get('#open-text-area').type(longText, {delay: 0})

        //Clica no botão
        cy.get('button[type="submit"]').click()

        //Valida mensagem de feedback
        cy.get('.error').should('be.visible')
    })
    it('Valida o campo telefone recebendo valor de texto', function(){
        
        // Valida se o preenchimento com texto não é digitado no campo
        cy.get('#phone').type('abcdefghi').should('have.value', '')
    })
    it('Validar erro ao não preencher campo obrigatorio', function(){
        
        // Preenche os campos
        cy.get('#firstName').type('Erick')
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('erick.araujo.qa@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type(longText, {delay: 0})

        //Clica no botão
        cy.get('button[type="submit"]').click()

        //Valida mensagem de feedback
        cy.get('.error').should('be.visible')
    })
    it.only('Preenche e limpa os campos', function(){
        
        // Preenche, valida e apaga
        cy.get('#firstName').type('Erick').should('have.value', 'Erick').clear().should('have.value', '')
        cy.get('#lastName').type('Araujo').should('have.value', 'Araujo').clear().should('have.value', '')
        cy.get('#email').type('erick.araujo.qa@gmail.com').should('have.value', 'erick.araujo.qa@gmail.com').clear().should('have.value', '')
        cy.get('#open-text-area').type(longText, {delay: 0}).should('have.value', longText).clear().should('have.value', '')
    })
})