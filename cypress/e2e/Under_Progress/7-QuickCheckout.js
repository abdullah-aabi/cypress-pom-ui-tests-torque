/// <reference types="Cypress" />

const commonLocators = require("../../Locators/commonLocators")
const QuickCheckoutLocators = require("../../Locators/QuickCheckoutLocators")

describe("All the test cases of Quick Checkout CRUD operations", () => {
    before(() => {
        cy.fixture("user-creds").then(data => {
            cy.loginWithApi(data.username, data.password)
        })
        // cy.loginWithApi(Cypress.env("Username"), Cypress.env("Password"))
        // Add more to before all operation.
        cy.visit("/dashboard")
        cy.get(commonLocators.pageHeading).should("contain", "Dashboard")
        cy.get(QuickCheckoutLocators.quickCheckoutBtn).click({ force: true })
        cy.get(commonLocators.pageHeading).should("contain", "Quick Checkout")
    })

    beforeEach(() => {
        // Add to each "it" 
    })

    it("Create Quick Checkout, create invoice and add payment.", () => {
        // the user selects an existing customer.
        cy.addCustomerVehicle()

        // the user "creates" the "QuickCheckout".
        cy.performOperation("creates", "QuickCheckout")

        // the user "creates" the "Payments".
        cy.performOperation("creates", "Payments")
    })
})
