/// <reference types="Cypress" />

import 'cypress-file-upload'
import commonLocators from '../../../../../Locators/commonLocators'
import ROLocators from '../../../../../Locators/ROLocators'
import { addCustomerVehicle } from '../../../../../support/BusinessActions/CustomerVehicle'
import { createROUsingApi } from '../../../../../support/BusinessActions/ROActions'
import { addLaborClassesUsingApi, addPricingMatrixUsingApi, addTaxClassesUsingApi } from '../../../../../support/BusinessActions/SettingsActions'

describe("Create New RO and assert all created details.", () => {
    before(() => {
        cy.fixture("user-creds").then(data => {
            cy.loginWithApi(data.username, data.password)
            // cy.loginWithUI(data.username, data.password)
        })
        // cy.loginWithApi(Cypress.env("Username"), Cypress.env("Password"))
        // cy.socialLoginWithApi(Cypress.env("googleLogin"))
        cy.visit("/")
        cy.get(commonLocators.pageHeading).should("contain", "Dashboard")
        // cy.selectFromMenu("Inspection")
        // cy.get(commonLocators.pageHeading).should("contain", "Inspection")
        // createROUsingApi()
        addLaborClassesUsingApi()
        addTaxClassesUsingApi()
        addPricingMatrixUsingApi()
    })

    beforeEach(() => {
        // Add to each "it" 
    })

    it("Create new RO will fields and new Customer.", () => {
        // the user selects an existing customer.
        cy.get(ROLocators.newRoBtn).click()

        addCustomerVehicle()

        // cy.get(ROLocators.addCustomerBtn).click()
        // // the user hits "generate" button without submitting mandatory fields at the "Inspection" screen.
        // cy.performOperation("customerInformation", "customerInformation", "RO")
        // cy.performOperation("vehicleInformation", "vehicleInformation", "RO")

        cy.performOperation("popup", "popup", "RO")
        cy.url().then(currentUrl => {
            cy.fixture("UniqueIds").then(data => {
                cy.log(currentUrl)
                data.roId = currentUrl.split("new-repairorder/")[1]
                cy.writeFile('cypress/fixtures/UniqueIds.json', JSON.stringify(data))
            })
        })
    })

    it("Validate all details of the created RO.", () => {
        cy.performOperation("assertCustomerInformation", "assertCustomerInformation", "RO")
        cy.performOperation("assertVehicleInformation", "assertVehicleInformation", "RO")
        cy.performOperation("assertRODetails", "assertRODetails", "RO")
    })
})