class Pagamento{
    preencherDadosDePagamento(){
        cy.get('[data-qa="name-on-card"]').type('Nome')
        cy.get('[data-qa="card-number"]').type('123')
        cy.get('[data-qa="cvc"]').type('123')
        cy.get('[data-qa="expiry-month"]').type('02')
        cy.get('[data-qa="expiry-year"]').type('2042')
        return this;
    }

    submeterPagamento(){
        cy.get('[data-qa="pay-button"]').click()
        return this;
    }

    verificarMensagemDeSucesso(){
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
        return this;
    }
}

export default new Pagamento()