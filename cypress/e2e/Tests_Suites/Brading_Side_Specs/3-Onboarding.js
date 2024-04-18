/// <reference types="Cypress" />

const commonLocators = require("../../../Locators/commonLocators")

describe("All the test cases of OnBoarding.", () => {
    before(() => {
        cy.fixture("user-creds").then(data => {
            cy.loginWithApi(data.username, data.password)
        })
        // cy.socialLoginWithApi(Cypress.env("googleLogin"))
        cy.visit("/")
        // cy.loginWithApi(Cypress.env("Username"), Cypress.env("Password"))
        // Add more to before all operation.
        // cy.visit("/onboarding")
        // cy.get("h2.heading").should("contain", "Welcome to Torque!")
        // cy.selectFromMenu("Onboarding")
        // cy.get(commonLocators.pageHeading).should("contain", "Onboarding")
    })

    beforeEach(() => {
        // Add to each "it" 
    })

    it("Fill Onboarding form.", () => {
        // Add "NewLabor" at the "Labors" screen.
        cy.performOperation("form", "form", "Onboarding")
        // cy.visit("/settings")
        // cy.performOperation("verification", "verification", "Onboarding")
        // cy.performOperation("AccountSettings", "AccountSettings", "Onboarding")
    })

})