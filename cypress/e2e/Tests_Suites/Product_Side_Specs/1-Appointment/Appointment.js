/// <reference types="Cypress" />

import 'cypress-file-upload'
import AppointmentLocators from '../../../../Locators/AppointmentLocators'
import commonLocators from '../../../../Locators/commonLocators'
import { addCustomerVehicle } from '../../../../support/BusinessActions/CustomerVehicle'

describe("Complete flow of the Appointment.", () => {
    before(() => {
        cy.fixture("user-creds").then(data => {
            cy.loginWithApi(data.username, data.password)
            // cy.loginWithUI(data.username, data.password)
        })
        // cy.loginWithApi(Cypress.env("Username"), Cypress.env("Password"))
        // Add more to before all operation.
        // cy.socialLoginWithApi(Cypress.env("googleLogin"))

        cy.visit("/appointments")
        // cy.get(commonLocators.pageHeading).should("contain", "Dashboard")
        // cy.selectFromMenu("Appointment")
        cy.get(commonLocators.pageHeading).should("contain", "Appointment Calendar")

    })

    beforeEach(() => {
        // Add to each "it" 
    })
    // before call to create jobs in advance

    it("Create an appointment and close it.", () => {
        cy.get(AppointmentLocators.addAppointmentBtn).click()
        // the user selects an existing customer.
        addCustomerVehicle()
        // the user "creates" the "Appointment".
        cy.performOperation("creates", "creates", "Appointment")
        // the user "opensAppointment" at the "Appointment".
        cy.performOperation("opensAppointment", "opensAppointment", "Appointment")
        // the user "deletesAppointment" at the "Appointment".
        cy.performOperation("deletesAppointment", "deletesAppointment", "Appointment")
    })

})
