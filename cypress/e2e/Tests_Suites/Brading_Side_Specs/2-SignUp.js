/// <reference types="Cypress" />
const SignUpLocators = require("../../../Locators/SignUpLocators")
const { gotoRegLinkFromEmail } = require("../../../support/BusinessActions/SignUpActions")
const { generateUniqueEmail } = require("../../../support/commands")

describe("All the test cases of Customer and Vehicle CRUD operations.", () => {
    before(() => {
        // cy.visit(Cypress.env("branding_site"))
        cy.visit("/register")
        // cy.get(commonLocators.pageHeading).should("contain", "Dashboard")
        // cy.selectFromMenu("Inspection")
        // cy.get(commonLocators.pageHeading).should("contain", "Inspection")

    })

    it("Sign up with a new user.", () => {
        cy.fixture("SignUp_data").then(data => {
            cy.performOperation("create", "create", "SignUp")
            // cy.get(SignUpLocators.successMsg).should("contain", data.create.successMsgFirst + generateUniqueEmail(data.create.userEmail_Unique) + data.create.successMsgSecond)
            // cy.get(SignUpLocators.successMsg).should("contain", "Thank you for Signing with Torque360. Your account confirmation link has been sent to this email address, click the link in the email to confirm your account.")
            cy.writeFile('cypress/fixtures/user-creds.json', {
                username: generateUniqueEmail(data.create.userEmail_Unique),
                password: data.create.password,
            })
        })
    })

    it("Confirm Account from the link sent to the given email address.", () => {
        cy.fixture("SignUp_data").then(data => {
            gotoRegLinkFromEmail(generateUniqueEmail(data.create.userEmail_Unique))
            cy.get(SignUpLocators.confirmSuccessMsg).should("have.text", "Thank you for activating your account")

            //Activate account from Support Portal.
            // cy.activateAccount(Cypress.env("supportUN"), Cypress.env("supportPW"), generateUniqueEmail(data.create.userEmail_Unique))
        })
    })
})