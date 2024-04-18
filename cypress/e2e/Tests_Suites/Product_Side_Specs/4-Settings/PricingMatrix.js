/// <reference types="Cypress" />

import 'cypress-file-upload'
import commonLocators from '../../../../Locators/commonLocators'
import data from '../../../../fixtures/PricingMatrix_data.json'
import Settings_data from '../../../../fixtures/Settings_data.json'
import { generateUniqueName, getUniqueName, selectFromDropdown } from '../../../../support/commands'
import PricingMatrixLocators from '../../../../Locators/PricingMatrixLocators'

describe("All the test cases of Pricing Matrix CRUD operations", () => {
    before(() => {
        cy.fixture("user-creds").then(data => {
            cy.loginWithApi(data.username, data.password)
            // cy.loginWithUI(data.username, data.password)
        })
        cy.visit("/Settings")
    })

    beforeEach(() => {
        // Add to each "it" 
    })

    it("Create Pricing Matrix.", () => {
        cy.get(commonLocators.tabButtons).contains("Pricing Matrix").click()
        // cy.get("@getPricingMatrix").its("response.statusCode").should("eq", 200)

        cy.get(PricingMatrixLocators.createBtn).click()
        cy.get(PricingMatrixLocators.create.matrixName_Unique)
            .clear()
            .type(generateUniqueName(data.create.matrixName_Unique))

        cy.get(PricingMatrixLocators.create.rangeRows)
            .eq(0)
            .within(() => {
                cy.get(PricingMatrixLocators.create.markup)
                    .clear()
                    .type(data.create.markup0 + "{enter}{enter}")
                    .blur()
                cy.get(PricingMatrixLocators.create.startRange).should("be.disabled").should("have.value", "0.00")
                cy.get(PricingMatrixLocators.create.endRange).should("be.disabled").should("have.value", "beyond")
                let costPrice = 100
                let markup = data.create.markup0
                let markupAmount = (costPrice * markup) / 100
                let salePrice = costPrice + markupAmount
                let margin = (salePrice - costPrice) / salePrice * 100
                cy.get(PricingMatrixLocators.create.margin).should("be.disabled")
                    .should("have.value", (Math.round((margin) * 100) / 100).toString())
            })

        cy.get(PricingMatrixLocators.create.addRangeTextButton)
            .contains("Add Range")
            .click()

        cy.get(PricingMatrixLocators.create.rangeRows)
            .eq(1)
            .within(() => {
                cy.get(PricingMatrixLocators.create.markup)
                    .clear()
                    .type(data.create.markup1 + "{enter}")
                    .blur()
                cy.get(PricingMatrixLocators.create.startRange)
                    .clear()
                    .type(data.create.startRange1 + "{enter}")
                    .blur()
                cy.get(PricingMatrixLocators.create.endRange).should("be.disabled").should("have.value", "beyond")
                let costPrice = data.create.startRange1
                let markup = data.create.markup1
                let markupAmount = (costPrice * markup) / 100
                let salePrice = costPrice + markupAmount
                let margin = (salePrice - costPrice) / salePrice * 100
                cy.get(PricingMatrixLocators.create.margin).should("be.disabled")
                    .should("have.value", (Math.round((margin) * 100) / 100).toString())
            })

        cy.get(PricingMatrixLocators.create.addRangeTextButton)
            .contains("Add Range")
            .click()

        cy.get(PricingMatrixLocators.create.rangeRows)
            .eq(2)
            .within(() => {
                cy.get(PricingMatrixLocators.create.markup)
                    .clear()
                    .type(data.create.markup2 + "{enter}")
                    .blur()
                cy.get(PricingMatrixLocators.create.startRange)
                    .clear()
                    .type(data.create.startRange2 + "{enter}")
                    .blur()
                cy.get(PricingMatrixLocators.create.endRange).should("be.disabled").should("have.value", "beyond")
                let costPrice = data.create.startRange2
                let markup = data.create.markup2
                let markupAmount = (costPrice * markup) / 100
                let salePrice = costPrice + markupAmount
                let margin = (salePrice - costPrice) / salePrice * 100
                cy.get(PricingMatrixLocators.create.margin).should("be.disabled")
                    .should("have.value", (Math.round((margin) * 100) / 100).toString())
            })

        // verfiy remove range scenario
        cy.get(PricingMatrixLocators.create.addRangeTextButton)
            .contains("Add Range")
            .click()
        cy.get(PricingMatrixLocators.create.rangeRows)
            .should("have.length", 4)
        cy.get(PricingMatrixLocators.create.rangeRows)
            .eq(3)
            .within(() => {
                selectFromDropdown(PricingMatrixLocators.create.removeRangeDropdown, data.create.removeRangeDropdown)
            })
        cy.get(PricingMatrixLocators.create.rangeRows)
            .should("have.length", 3)
        cy.get(PricingMatrixLocators.create.endRange)
            .eq(0)
            .should("have.value", data.create.startRange1 - 0.1)
        cy.get(PricingMatrixLocators.create.endRange)
            .eq(1)
            .should("have.value", data.create.startRange2 - 0.1)

        cy.get(PricingMatrixLocators.create.addRangeTextButton)
            .contains("Save")
            .click()
        // cy.get("@createPricingMatrix").its("response.statusCode").should("eq", 200)
        cy.get(commonLocators.toastMessage).should("have.text", "Matrix Created Successfully")
    })

    it("Delete Created Pricing Matrix.", () => {
        // cy.visit("/Settings")
        // cy.get(commonLocators.tabButtons).contains("Pricing Matrix").click()
        cy.get(PricingMatrixLocators.matrixRows + ":contains(" + generateUniqueName(data.create.matrixName_Unique) + ")")
            .parent()
            .find("button:nth-child(2)")
            .click()
        // cy.get("@deletePricingMatrix").its("response.statusCode").should("eq", 200)
        cy.get(commonLocators.toastMessage).should("have.text", "Matrix Deleted Successfully")
    })
})