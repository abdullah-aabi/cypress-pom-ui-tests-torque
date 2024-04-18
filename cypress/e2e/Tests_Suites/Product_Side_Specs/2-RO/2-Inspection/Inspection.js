/// <reference types="Cypress" />

import 'cypress-file-upload'
import commonLocators from '../../../../../Locators/commonLocators'
import InspectionLocators from '../../../../../Locators/InspectionLocators'
import { addCustomerVehicle } from '../../../../../support/BusinessActions/CustomerVehicle'

describe("All the test cases of Inspction CRUD operations", () => {
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
        cy.fixture("UniqueIds").then(ids => {
            cy.visit("/new-repairorder/" + ids.roId)
            // cy.wait("@getCreatedRO").its("response.statusCode").should("eq", 200)
            cy.get(commonLocators.pageHeading).should("have.text", "Repair Order: #RO-" + ids.roId.padStart(6, '0'))
        })
    })

    beforeEach(() => {
        // Add to each "it" 
    })

    // it("User should not be allowed to Generate DVI without entering any field.", () => {
    //     // Initially, the "disabledFields" should not be clickable at "Inspection" screen.
    //     cy.performOperation("disabledFields", "Inspection")
    // })

    it("Generate DVI General Inspection Template", () => {
        // the user selects an existing customer.
        // addCustomerVehicle()
        cy.performOperation("createNew", "createNew", "Inspection")

        cy.get(InspectionLocators.generateBtn).should("be.disabled")

        // the user hits the "generalInspectionBtn" button at "Inspection" screen.
        cy.get(InspectionLocators.generalInspectionBtn).click()

        // Add condition details for the "interiorExterior" inspection.
        cy.addInspection("interiorExterior")

        // Add condition details for the "underVehicle" inspection.
        cy.addInspection("underVehicle")

        // Add condition details for the "underHood" inspection.
        cy.addInspection("underHood")

        // Add condition details for the "electronics" inspection.
        cy.addInspection("electronics")

        // Hit the "saveBtn" button at "Inspection" screen.
        cy.get(InspectionLocators.saveBtn).click()
        cy.get(InspectionLocators.detailedInspectionBtn).should("be.disabled")

        // Add "allFields" at the "Inspection" screen.
        cy.performOperation("allFields", "allFields", "Inspection")

        // And the user "authorizes" the "Inspection".
        cy.performOperation("authorizes", "authorizes", "Inspection")
    })

    it("Generate DVI Detailed Inspection Template", () => {
        cy.reload() // bug
        cy.performOperation("createNew", "createNew", "Inspection")
        // the user selects an existing customer.
        // addCustomerVehicle()

        // Hit the "detailedInspectionBtn" button at "Inspection" screen.
        cy.get(InspectionLocators.detailedInspectionBtn).click()

        // Add condition details for the "detailSearch" inspection.
        cy.addInspection("detailSearch")

        // Hit the "saveBtn" button at "Inspection" screen.
        cy.get(InspectionLocators.saveBtn).click()

        cy.get(InspectionLocators.generalInspectionBtn).should("be.disabled")

        // Add "allFields" at the "Inspection" screen.
        cy.performOperation("allFields", "allFields", "Inspection")

        // And the user "authorizes" the "Inspection".
        cy.performOperation("authorizes", "authorizes", "Inspection")
    })

    it("Validate the add inspections, should show correct values.", () => {
        cy.reload() // Bug
        // the "previewFields" appears for the created "Inspection" should be correct.
        cy.assertRecommendationsAdded()
    })
})