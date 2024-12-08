/// <reference types="Cypress"/>

// Suite de Testes
describe('Central de Atendimento ao Cliente TAT', function() {
    const longText = 'Teste de input. Teste de input. Teste de input. Teste de input. Teste de input. Teste de input. Teste de input. Teste de input.'
    const THREE_SECONDS_IN_MILI = 3000
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
        cy.get('#phone-checkbox').check()
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
    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    //Campos de checkbox
    it('Marcar ambos checkboxes e depois demarcar o ultimo', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    //Upload de arquivos
    it('Upload selecionando um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('Upload selecionando um arquivo simulando drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('Upload selecionando uma fixture a qual foi dado um alias', function(){
        cy.fixture('example').as('sampleFile')
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example')
        })
    })

    //Links que abrem em outra aba no navegador
    it('Verificar que o link abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')
    })
    it('Acessar nova pagina removendo o atributo target e clicando no link', function(){
        cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    //Simular Viewport de dispositivo movel
    //cypress open --config viewportWidth=410,viewportHeight=730

    //Utilizando os clocks, temporizadores do navegador para parar ou avançar no tempo

    it('Valida a duração do aparecimento da mensagem de erro', function(){
        //Congela o relogio do navegador
        cy.clock()
        // Preenche os campos
        cy.get('#firstName').type('Erick')
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('erick.araujo.qa@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        //Clica no botão
        cy.contains('button', 'Enviar').click()
        //Valida mensagem de feedback
        cy.get('.success').should('be.visible')
        //Avança no tempo do navegador
        cy.tick(THREE_SECONDS_IN_MILI)
        cy.get('.success').should('not.be.visible')
    })

    //Validar a execução estavel de um teste com Loadash
    Cypress._.times(2, function() {
        it('Acessar nova pagina removendo o atributo target e clicando no link, repetindo 2x', function(){
            cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
            .invoke('removeAttr', 'target')
            .click()
            cy.contains('Talking About Testing').should('be.visible')
        })
    })

    //Utilizar o invoke para fazer elementos aparecerem e desaparecerem
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
          .should('not.be.visible')
          //Revela o elemento
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          //Esconde o elemente
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
    })
    it('Preencher texto com o invoke', function(){
        const otherLongText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
        .invoke('val', otherLongText)
        .should('have.value', otherLongText)
    })

    //Fazer requisições a API
    it.only('Fazer uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3-eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
            const {status , statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
    })
})