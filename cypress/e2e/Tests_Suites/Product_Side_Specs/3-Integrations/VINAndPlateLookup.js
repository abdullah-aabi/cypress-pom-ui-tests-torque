/// <reference types="Cypress" />

import commonLocators from "../../../../Locators/commonLocators"
import CustomerVehicleLocators from "../../../../Locators/CustomerVehicleLocators"
import { createROUsingApi } from "../../../../support/BusinessActions/ROActions"

describe("All the test cases of Estimate CRUD operations", () => {
    before(() => {
        cy.fixture("user-creds").then(data => {
            cy.loginWithApi(data.username, data.password)
        })
        createROUsingApi()
    })

    beforeEach(() => {
        // Add to each "it" 
        // cy.fixture('UniqueIds').then((ids) => {
        //     cy.visit('/new-repairorder/' + ids.roId);
        //     // cy.wait("@getCreatedRO").its("response.statusCode").should("eq", 200)
        //     cy.get(commonLocators.pageHeading).should(
        //         'have.text',
        //         'Repair Order: #RO-' + ids.roId.padStart(6, '0'),
        //     );
        // });
        // createROUsingApi()
    })

    it("VIN Lookup: Create a new vehicle of an existing customer.", () => {
        // cy.get(CustomerVehicleLocators.moreVehiclesDropdown).click()
        // cy.get(CustomerVehicleLocators.addAnotherVehicleBtn).click()
        cy.get(CustomerVehicleLocators.addNewVehicleBtnInRO).click()
        cy.get(CustomerVehicleLocators.lookupTypeDropdown).click()
        cy.get(CustomerVehicleLocators.lookupOptions).contains("VIN").click()
        cy.performOperation("vinLookup", "vinLookup", "CustomerVehicle")

        // Add "vehicleTwoInformation" at the "CustomerVehicle" screen.
        cy.performOperation("vehicleTwoInformation", "vehicleInformation", "CustomerVehicle")
    })

    it("Plate Lookup: Create a new vehicle of an existing customer.", () => {

        cy.get(CustomerVehicleLocators.moreVehiclesDropdown).click()
        cy.get(CustomerVehicleLocators.addAnotherVehicleBtn).click()

        cy.get(CustomerVehicleLocators.lookupTypeDropdown).click()
        cy.get(CustomerVehicleLocators.lookupOptions).contains("Plate Lookup").click()
        cy.performOperation("plateLookup", "plateLookup", "CustomerVehicle")

        // Add "vehicleTwoInformation" at the "CustomerVehicle" screen.
        cy.performOperation("vehicleTwoInformation", "vehicleInformation", "CustomerVehicle")
    })
})