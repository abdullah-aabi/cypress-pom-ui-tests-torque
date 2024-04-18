/// <reference types="Cypress" />

describe("All the test cases of Contact Us Form CRUD operations.", () => {
    before(() => {
        cy.visit(Cypress.env("branding_site") + "/contact")
    })

    beforeEach(() => {
        // Add to each "it" 
    })

    it("Submit Contact Us form.", () => {
        cy.get('input[name="first_name"]').type("FTest")
        cy.get('input[name="last_name"]').type("LTest")
        // cy.get('input[name="company_name"]').type("test garage")
        cy.get('input[name="email_address"]').type("test+" + window.uniqueId + "@gamil.com")
        // cy.get('div#trinity').click()
        // cy.get('ul[role="listbox"] > li:nth-child(1)').click()
        cy.get("input#phone_number").type("+11111111111")
        cy.get("input#subject").type("USA")
        cy.get('textarea#message').type("Test Query! Do you support text-to-pay invoicing? Response by email preferred. Thanks!")
        cy.get("button.form-form-submit").click()

        cy.get("div.success span.fusion-alert-content").should("have.text", "Thank you for your message. It has been sent.")
    })

})