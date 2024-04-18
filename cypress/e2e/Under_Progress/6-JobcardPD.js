/// <reference types="Cypress" />

const commonLocators = require("../../Locators/commonLocators")
const JobcardLocators = require("../../Locators/JobcardLocators")
const InvoiceLocators = require("../../Locators/InvoiceLocators")
const PaymentsLocators = require("../../Locators/PaymentsLocators")
const { removeDollar, removeHrs, generateUUID } = require("../../support/commands")
const { addCustomerVehicle } = require("../../support/BusinessActions/CustomerVehicle")

function assertInvoiceDiscount(type, partName, dicsountTypeSelect) {
    cy.fixture(type).then(data => {
        for (let item in data) {
            let name = data[item][partName]
            cy.get(InvoiceLocators.lineItem).contains(name).parent().find(InvoiceLocators.previewFields.unitPrice).invoke("text").then(unitPriceValue => {
                cy.get(InvoiceLocators.lineItem).contains(name).parent().find(InvoiceLocators.previewFields.quantity).invoke("text").then(quantityValue => {
                    cy.get(InvoiceLocators.lineItem).contains(name).parent().find(InvoiceLocators.previewFields.discountInput).invoke("val").then(discountValue => {

                        let subtotal = Math.round(((parseFloat(removeHrs(quantityValue)) * parseFloat(removeDollar(unitPriceValue)))) * 100) / 100
                        let discountedAmount = Math.round(((subtotal * parseFloat(discountValue) / 100)) * 100) / 100

                        if (dicsountTypeSelect == "$") {
                            cy.get(InvoiceLocators.lineItem).contains(name).parent().find(InvoiceLocators.fixedDiscountToggleBtn).click()
                            cy.get(InvoiceLocators.lineItem).contains(name).parent().find(InvoiceLocators.previewFields.discountInput).type(discountedAmount)
                            subtotal = Math.round(((parseFloat(removeHrs(quantityValue)) * parseFloat(removeDollar(unitPriceValue)))) * 100) / 100
                            discountedAmount = Math.round(((subtotal * parseFloat(discountValue) / 100)) * 100) / 100
                        }

                        cy.get(InvoiceLocators.lineItem).contains(name).parent().find(InvoiceLocators.previewFields.selectedDiscountType).invoke("text").then(discountType => {
                            cy.get(InvoiceLocators.lineItem).contains(name).parent().find(InvoiceLocators.previewFields.total).invoke("text").then(totalValue => {
                                cy.log("quantityValue" + quantityValue)
                                cy.log("unitPriceValue" + unitPriceValue)
                                cy.log("discountValue" + discountValue)
                                cy.log("totalValue" + totalValue)

                                // Math.round(((amount - totalDiscount)) * 100) / 100
                                // let subtotal = Math.round(((parseFloat(removeHrs(quantityValue)) * parseFloat(removeDollar(unitPriceValue)))) * 100) / 100
                                // let discountedAmount = Math.round((parseFloat(discountValue)) * 100) / 100
                                if (discountType == "%") {
                                    discountedAmount = Math.round(((subtotal * parseFloat(discountValue) / 100)) * 100) / 100
                                }
                                let total = Math.round((subtotal - discountedAmount) * 100) / 100
                                let observedTotal = Math.round((parseFloat(removeDollar(totalValue))) * 100) / 100
                                cy.log("total" + total)
                                cy.log("observedTotal" + observedTotal)
                                expect(Math.abs((total - observedTotal).toFixed(2))).to.be.below(0.02)

                                // expect("$" + total.toString()).to.equals(totalValue)
                            })
                        })
                    })
                })
            })
        }
    })
}

describe("All the test cases of Jobcard CRUD operations", () => {
    before(() => {
        cy.fixture("user-creds").then(data => {
            cy.loginWithApi(data.username, data.password)
        })
        // cy.loginWithApi(Cypress.env("Username"), Cypress.env("Password"))
        // Add more to before all operation.
        cy.visit("/jobcard")
        // cy.get("div.dialog__content__inner button").click()
        // cy.get(commonLocators.pageHeading).should("contain", "Dashboard")
        // cy.selectFromMenu("Job Card")
        cy.get(commonLocators.pageHeading).should("contain", "Jobcard")
        // cy.get(commonLocators.pageHeading).should("contain", "Job Tracking Board")
        window.uniqueCardId = generateUUID()
    })

    beforeEach(() => {
        // Add to each "it" 
    })

    it("Create the jobcard, create invoice and add payment.", () => {
        // cy.selectFromMenu("Estimate")
        // cy.visit("/Estimate")
        // cy.get(commonLocators.pageHeading).should("contain", "Estimate")

        // the user selects an existing customer.
        addCustomerVehicle()

        // the user adds "parts" at the "Jobcard" screen.
        cy.addToEstimate("parts", "Jobcard")

        // the user adds "supplies" at the "Jobcard" screen.
        cy.addToEstimate("supplies", "Jobcard")

        // the user adds "labors" at the "Jobcard" screen.
        cy.addToEstimate("labors", "Jobcard")

        // the user "addsNewData" at the "Jobcard".
        cy.performOperation("addsNewData", "Jobcard")

        cy.performOperation("addDiscountPercentage", "Jobcard")

        cy.appendStart(JobcardLocators.notesAppendStart, window.uniqueCardId + " - ")
        // the user "creates" the "Jobcard".
        cy.performOperation("creates", "Jobcard")

        cy.wait("@createJobCard").its("response").then(reponseResult => {
            window.roId = reponseResult.body.repairOrderId
        })
        cy.wait("@getJobcards").its("response.statusCode").should("eq", 200)

        cy.get(commonLocators.pageHeading).should("contain", "Job Tracking Board")

        // the user "changesJobcard" at the "Jobboard".
        cy.performOperation("changesJobcard", "Jobboard")

        // // the user "creates" the "Jobcard".
        // cy.performOperation("creates", "Invoice")

        // // the user "creates" the "Payments".
        // cy.performOperation("creates", "Payments")

        // the user "addNotesOnPaidJobCard" at the "Jobboard".
        // cy.performOperation("addNotesOnPaidJobCard", "Jobboard")
    })

    it("Validate all discounts in percentage.", () => {
        // Click on the Create invoice button on job card.
        cy.performOperation("opens", "Invoice")

        assertInvoiceDiscount("Parts", "partName", "%")
        assertInvoiceDiscount("Labors", "category", "%")
        assertInvoiceDiscount("Supplies", "item", "%")
    })

    it("Validate all discounts in dollars.", () => {
        // Changing discount to fixed discount type.
        // cy.get(InvoiceLocators.fixedDiscountToggleBtn).click({ multiple: true })

        assertInvoiceDiscount("Parts", "partName", "$")
        assertInvoiceDiscount("Labors", "category", "$")
        assertInvoiceDiscount("Supplies", "item", "$")
    })

    it("Create invoice and Make payment.", () => {
        // the user "creates" the "Jobcard".
        cy.performOperation("creates", "Invoice")

        // the user "creates" the "Payments".
        cy.performOperation("creates", "Payments")

        // cy.window().then((win) => {
        //     // Replace window.open(url, target)-function with our own arrow function
        //     cy.stub(win, 'open', url => {
        //         // change window location to be same as the popup url
        //         win.location.href = url;
        //     }).as("popup") // alias it with popup, so we can wait refer it with @popup
        // })

        // cy.get(PaymentsLocators.cardGenInvoiceBtn).click()
    })

})