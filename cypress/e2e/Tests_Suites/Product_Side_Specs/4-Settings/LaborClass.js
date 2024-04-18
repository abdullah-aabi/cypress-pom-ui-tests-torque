/// <reference types="Cypress" />

import 'cypress-file-upload'
import commonLocators from '../../../../Locators/commonLocators'
import LaborsLocators from '../../../../Locators/LaborsLocators'
import { getUniqueName } from '../../../../support/commands'

describe("All the test cases of Labor Class CRUD operations", () => {
    before(() => {
        cy.fixture("user-creds").then(data => {
            cy.loginWithApi(data.username, data.password)
            // cy.loginWithUI(data.username, data.password)
        })
        // cy.loginWithApi(Cypress.env("Username"), Cypress.env("Password"))
        // cy.loginWithUI(Cypress.env("Username"), Cypress.env("Password"))
        // Add more to before all operation.
        // cy.visit("/")
        // cy.get(commonLocators.pageHeading).should("contain", "Dashboard")
        // cy.socialLoginWithApi(Cypress.env("googleLogin"))
        cy.visit("/Settings")
        // cy.fixture("UniqueIds").then(ids => {
        //     cy.visit("/new-repairorder/" + ids.roId)
        //     // cy.wait("@getCreatedRO").its("response.statusCode").should("eq", 200)
        //     cy.get(commonLocators.pageHeading).should("have.text", "Repair Order: #RO-" + ids.roId.padStart(6, '0'))
        // })
    })

    beforeEach(() => {
        // Add to each "it" 
    })

    it("Create Labor Class.", () => {
        cy.fixture("Labors_data").then(data => {
            cy.get(commonLocators.tabButtons).contains("Labor Class").click()
            cy.performOperation("createLaborClass", "createLaborClass", "Labors")
            cy.contains(getUniqueName(data.createLaborClass.className_Unique) + " ( $" + data.createLaborClass.classlaborRate + " ) ").should("be.visible")
        })
    })

    it("InActivate Created Labor Class.", () => {
        cy.fixture("Labors_data").then(data => {
            cy.visit("/Settings")
            cy.get(commonLocators.tabButtons).contains("Labor Class").click()
            cy.performOperation("inActiveLaborClass", "inActiveLaborClass", "Labors")
            cy.contains(getUniqueName(data.createLaborClass.className_Unique) + " ( $" + data.createLaborClass.classlaborRate + " ) ").should("not.exist")
        })
    })
})