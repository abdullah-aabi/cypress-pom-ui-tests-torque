/// <reference types="Cypress" />

const commonLocators = require("../../Locators/commonLocators")

describe("All the test cases of Add Labor CRUD operations.", () => {
    before(() => {
        cy.fixture("user-creds").then(data => {
            cy.loginWithApi(data.username, data.password)
        })
        // cy.loginWithApi(Cypress.env("Username"), Cypress.env("Password"))
        // Add more to before all operation.
        cy.visit("/dashboard")
        // cy.get(commonLocators.pageHeading).should("contain", "Dashboard")
        // cy.selectFromMenu("Estimate")
        // cy.get(commonLocators.pageHeading).should("contain", "Estimate")
        // Create labor if not existed in system already.
        // cy.addLaborsUsingApi()
    })

    beforeEach(() => {
        // Add to each "it" 
    })

    it("Add a new Vehicle.", () => {
        // Add "NewLabor" at the "Labors" screen.
        cy.performOperation("vehicle", "AddVehicle")
    })

})