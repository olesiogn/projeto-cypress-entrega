class Cadastro {
    preencherFormulario(signUpName){

        const timestamp = new Date().getTime()
        const email = `Tester-QA-${timestamp}@gmail.com`

        Cypress.env('signUpName', signUpName)
        Cypress.env('email', email)

        cy.contains('New User Signup!').should('be.visible')
    
        this.iniciarCadastro(signUpName, email)

        cy.contains('Enter Account Information').should('be.visible')

        cy.get('input[type=radio]').check('Mr')

        cy.get('[data-qa="password"]').type('12345', { log: false })

        cy.get('[data-qa="days"]').select('23')
        cy.get('[data-qa="months"]').select('September')
        cy.get('[data-qa="years"]').select('1997')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('[data-qa="first_name"]').type('Tester')
        cy.get('[data-qa="last_name"]').type('QA')
        cy.get('[data-qa="company"]').type('Company Name')
        cy.get('[data-qa="address"]').type('Rua da agua, n 15')
        cy.get('[data-qa="address2"]').type('Bairro Centro')
        cy.get('[data-qa="country"]').select('United States')
        cy.get('[data-qa="state"]').type('New York')
        cy.get('[data-qa="city"]').type('New York')
        cy.get('[data-qa="zipcode"]').type('38300017')
        cy.get('[data-qa="mobile_number"]').type('11999999999')
        cy.get('[data-qa="create-account"]').click()

        cy.url().should('includes', 'account_created')
        cy.contains('Account Created!').should('be.visible')

        cy.get('[data-qa="continue-button"]').click()

        return this;
    }

    iniciarCadastro(signUpName, email){
        cy.get('[data-qa="signup-name"]').type(signUpName)
        cy.get('[data-qa="signup-email"]').type(email)
        cy.contains('button','Signup').click()

        return this;
    }

    verificarSeCadastroFoiConcluido(){
        cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'))
        return this;
    }

    gerarCadastro(signUpName){
        this
            .preencherFormulario(signUpName)
            .verificarSeCadastroFoiConcluido()

        return this;
    }

    verificarErroAoCadastrarEmailDuplicado(){
        cy.get('.signup-form form p').should('contain', 'Email Address already exist!')
        return this;
    }
}

export default new Cadastro()