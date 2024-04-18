/// <reference types="Cypress" />

import 'cypress-file-upload'
import { addCustomerVehicle } from '../../support/BusinessActions/CustomerVehicle'

const { generateUUID } = require("../../../support/commands")
const AppointmentLocators = require("../../../Locators/AppointmentLocators")
const commonLocators = require("../../../Locators/commonLocators")
const InspectionLocators = require("../../../Locators/InspectionLocators")
const EstimateLocators = require("../../../Locators/EstimateLocators")
const JobcardLocators = require("../../../Locators/JobcardLocators")

describe("Complete flow of the Appointment.", () => {
    before(() => {
        cy.fixture("user-creds").then(data => {
            cy.loginWithApi(data.username, data.password)
        })
        // cy.loginWithApi(Cypress.env("Username"), Cypress.env("Password"))
        // Add more to before all operation.
        cy.visit("/dashboard")
        cy.get(commonLocators.pageHeading).should("contain", "Dashboard")
        cy.selectFromMenu("Appointment")
        cy.get(commonLocators.pageHeading).should("contain", "Appointment Calendar")
        window.uniqueCardId = generateUUID()

    })

    beforeEach(() => {
        // Add to each "it" 
    })

    it("Create an appointment and convert it to inspection.", () => {
        cy.get(AppointmentLocators.addAppointmentBtn).click()
        // the user selects an existing customer.
        addCustomerVehicle()
        // the user "creates" the "Appointment".
        cy.performOperation("creates", "Appointment")
        // the user "opensAppointment" at the "Appointment".
        cy.performOperation("opensAppointment", "Appointment")
        // user hits the "convertToInspectionBtn" button at "Appointment" screen.
        cy.get(AppointmentLocators.changeStatusBtn).contains("Visited").click()
        cy.get(AppointmentLocators.convertToInspectionBtn).click()
        // user hits the "startInspectionBtn" button at "Appointment" screen.    
        cy.get(AppointmentLocators.startInspectionBtn).click()
        cy.get(commonLocators.pageHeading).should("contain", "Inspection")
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
        // Hit the "detailedInspectionBtn" button at "Inspection" screen.
        cy.get(InspectionLocators.detailedInspectionBtn).click()

        // Add condition details for the "detailSearch" inspection.
        cy.addInspection("detailSearch")

        // Hit the "saveBtn" button at "Inspection" screen.
        cy.get(InspectionLocators.saveBtn).click()

        // Add "allFields" at the "Inspection" screen.
        cy.performOperation("allFields", "Inspection")

        // And the user "authorizes" the "Inspection".
        cy.performOperation("authorizes", "Inspection")

        // the user hits the "convertToEstimateBtn" button at "Inspection" screen.
        cy.get(InspectionLocators.convertToEstimateBtn).click()

        // the user moves to the "Estimate".
        cy.get(commonLocators.pageHeading).should("contain", "Estimate")
        // the user adds "parts" at the "Estimate" screen.
        cy.addToEstimate("parts", "Estimate")

        // the user adds "supplies" at the "Estimate" screen.
        cy.addToEstimate("supplies", "Estimate")

        // the user adds "labors" at the "Estimate" screen.
        cy.addToEstimate("labors", "Estimate")

        // the user "creates" the "Estimate".
        cy.performOperation("creates", "Estimate")

        // the user hits the "convertToJobCardBtn" button at "Estimate" screen.
        cy.get(EstimateLocators.convertToJobCardBtn).click()

        // the user hits the "authorizeBtn" button at "Estimate" screen.
        cy.get(EstimateLocators.authorizeBtn).click({ force: true })

        cy.wait("@updateEstimate").its("response.statusCode").should("eq", 200)
        // the user moves to the "Estimate".
        cy.get(commonLocators.pageHeading).should("contain", "Jobcard")

        cy.appendStart(JobcardLocators.notesAppendStart, window.uniqueCardId + " - ")
        // the user "creates" the "Jobcard".
        cy.performOperation("creates", "Jobcard")

        cy.get(commonLocators.pageHeading).should("contain", "Job Tracking Board")

        // the user "changesJobcard" at the "Jobboard".
        cy.performOperation("changesJobcard", "Jobboard")

        // Click on the Create invoice button on job card.
        cy.performOperation("opens", "Invoice")

        // the user "creates" the "Jobcard".
        cy.performOperation("creates", "Invoice")

        // the user "creates" the "Payments".
        cy.performOperation("creates", "Payments")

        // the user "addNotesOnPaidJobCard" at the "Jobboard".
        // cy.performOperation("addNotesOnPaidJobCard", "Jobboard")
        cy.selectFromMenu("Appointment")
        cy.get(commonLocators.pageHeading).should("contain", "Appointment Calendar")

        // the user "opensAppointment" at the "Appointment".
        cy.performOperation("opensAppointment", "Appointment")
        // the user "deletesAppointment" at the "Appointment".
        cy.performOperation("deletesAppointment", "Appointment")
    })

})
