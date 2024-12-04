/// <reference types="Cypress"/>


// Suite de Testes
describe('Central de Atendimento ao Cliente TAT', function() {
    const longText = 'Teste de input. Teste de input. Teste de input. Teste de input. Teste de input. Teste de input. Teste de input. Teste de input.'
    
    beforeEach(function() {
        // Acessa uma pagina
        cy.visit('./src/index.html')
    })

    // Preenchimento de campos de formulario
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
        cy.contains('button', 'Enviar').click()
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
        cy.contains('button', 'Enviar').click()
        //Valida mensagem de feedback
        cy.get('.error').should('be.visible')
    })
    it('Valida o campo telefone recebendo valor de texto', function(){
        // Valida se o preenchimento com texto não é digitado no campo
        cy.get('#phone').type('abcdefghi').should('have.value', '')
    })
    it('Validar erro ao não preencher campo telefone que é obrigatorio', function(){
        // Preenche os campos
        cy.get('#firstName').type('Erick')
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('erick.araujo.qa@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type(longText, {delay: 0})
        //Clica no botão
        cy.contains('button', 'Enviar').click()
        //Valida mensagem de feedback
        cy.get('.error').should('be.visible')
    })
    it('Preenche e limpa os campos', function(){
        // Preenche, valida e apaga
        cy.get('#firstName').type('Erick').should('have.value', 'Erick').clear().should('have.value', '')
        cy.get('#lastName').type('Araujo').should('have.value', 'Araujo').clear().should('have.value', '')
        cy.get('#email').type('erick.araujo.qa@gmail.com').should('have.value', 'erick.araujo.qa@gmail.com').clear().should('have.value', '')
        cy.get('#open-text-area').type(longText, {delay: 0}).should('have.value', longText).clear().should('have.value', '')
    })
    it('Validar erro ao não preencher campos obrigatorios', function(){
        //Clica no botão
        cy.contains('button', 'Enviar').click()
        //Valida mensagem de feedback
        cy.get('.error').should('be.visible')
    })
    it('Envia formulário utilizando um comando customizado', function(){
        //Utiliza o comando customizado
        cy.fillMandatoryFieldsAndSubmit()
        //Valida mensagem de feedback
        cy.get('.success').should('be.visible')
    })

    //Campos de seleção suspensa
    it('Seleciona um produto pelo seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('Seleciona um produto pelo seu value', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('Seleciona um produto pelo seu indice', function(){
        cy.get('#product').select(2).should('have.value', 'cursos')
    })

    //Campos de radio button
    it('Marca o tipo de atendimento Feedback', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })
    it.only('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            
        })
        .check().should('have.value', 'feedback')
    })
})