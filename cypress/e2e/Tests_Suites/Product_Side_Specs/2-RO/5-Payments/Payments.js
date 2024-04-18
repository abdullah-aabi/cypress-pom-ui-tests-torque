/// <reference types="Cypress" />

import commonLocators from '../../../../../Locators/commonLocators';
import PaymentsLocators from '../../../../../Locators/PaymentsLocators';
import {
  addLaborClassesUsingApi,
  addPricingMatrixUsingApi,
  addTaxClassesUsingApi,
} from '../../../../../support/BusinessActions/SettingsActions';
import data from '../../../../../fixtures/Payments_data.json';

describe('All the test cases of Payments CRUD operations', () => {
  before(() => {
    cy.fixture("user-creds").then(data => {
      cy.loginWithApi(data.username, data.password)
      // cy.loginWithUI(data.username, data.password)
    })
    // cy.loginWithApi(Cypress.env('Username'), Cypress.env('Password'));
    // Add more to before all operation.
    // cy.visit("/dashboard")
    // cy.get(commonLocators.pageHeading).should("contain", "Dashboard")
    // cy.selectFromMenu("Estimate")
    // cy.get(commonLocators.pageHeading).should("contain", "Estimate")
    // cy.socialLoginWithApi(Cypress.env("googleLogin"))
    cy.fixture('UniqueIds').then((ids) => {
      cy.visit('/new-repairorder/' + ids.roId);
      // cy.wait("@getCreatedRO").its("response.statusCode").should("eq", 200)
      cy.get(commonLocators.pageHeading).should(
        'have.text',
        'Repair Order: #RO-' + ids.roId.padStart(6, '0'),
      );
    });
    addLaborClassesUsingApi();
    addTaxClassesUsingApi();
    addPricingMatrixUsingApi()
  });

  beforeEach(() => {
    // Add to each "it"
  });

  it('Able to pay partially using CASH method.', () => {
    cy.get(PaymentsLocators.paymentTabButton).click();

    cy.get(commonLocators.skeletonLoaders).should("be.visible")
    cy.get(commonLocators.skeletonLoaders).should("not.exist")

    let paymentMethod = "cash"
    cy.wait('@getInvoiceById')
      .its('response')
      .then((getJobsResponse) => {
        expect(getJobsResponse.statusCode).to.eql(200);
        cy.get(commonLocators.noDataContainer).should("not.exist")
        // cy.log(JSON.stringify(getJobsResponse.body))
        let paidAmount = getJobsResponse.body.data.paidAmount
        paidAmount = paidAmount == null ? 0 : paidAmount
        let remainingAmount = getJobsResponse.body.data.remainingAmount
        remainingAmount = remainingAmount == null ? 0.0 : remainingAmount
        let grandTotal = getJobsResponse.body.data.grandTotal
        grandTotal = grandTotal == null ? 0.0 : grandTotal

        // paid Amount
        cy.get(PaymentsLocators.summary)
          .get(PaymentsLocators.rowTotals)
          .eq(9)
          .should("contain", (Math.round(paidAmount * 100) / 100).toString())
        // remaining Amount
        cy.get(PaymentsLocators.summary)
          .get(PaymentsLocators.rowTotals)
          .eq(10)
          .should("contain", (Math.round(remainingAmount * 100) / 100).toString())

        let updatedAmount = Math.round(remainingAmount / 2 * 100) / 100
        cy.get("button[value='" + paymentMethod + "']").click()
        cy.get(PaymentsLocators.creates.updateAmount).clear().type(updatedAmount)
        cy.get(PaymentsLocators.creates.notes).clear().type(data.creates.notes)
        cy.get(PaymentsLocators.creates.payNowTextButton).contains(data.creates.payNowTextButton).click()
        cy.wait("@addPayment").its("response.statusCode").should("eq", 200)
        cy.get(PaymentsLocators.creates.successMsg).should("have.text", data.creates.successMsg)

        // paid Amount
        cy.get(PaymentsLocators.summary)
          .get(PaymentsLocators.rowTotals)
          .eq(9)
          .should("contain", (Math.round((paidAmount + updatedAmount) * 100) / 100).toString())
        // remaining Amount
        cy.get(PaymentsLocators.summary)
          .get(PaymentsLocators.rowTotals)
          .eq(10)
          .should("contain", (Math.round((remainingAmount - updatedAmount) * 100) / 100).toString())

        // Validate new payment record
        cy.get(PaymentsLocators.paymentRecords)
          .last()
          .within(() => {
            // Amount paid
            cy.get(PaymentsLocators.recordDetail)
              .eq(2)
              .should("contain", (Math.round(updatedAmount * 100) / 100).toString())

            // Amount due/remaining
            cy.get(PaymentsLocators.recordDetail)
              .eq(3)
              .should("contain", (Math.round((remainingAmount - updatedAmount) * 100) / 100).toString())

            // Total Payable
            cy.get(PaymentsLocators.recordDetail)
              .eq(4)
              .should("contain", (Math.round(grandTotal * 100) / 100).toString())

            // payment method
            cy.get(PaymentsLocators.recordDetail)
              .eq(6)
              .should("contain", paymentMethod)
          })
      })
  })

  it('Able to pay partially using debit/credit CARD method.', () => {
    // cy.get(PaymentsLocators.paymentTabButton).click();
    cy.reload()
    cy.get(commonLocators.skeletonLoaders).should("be.visible")
    cy.get(commonLocators.skeletonLoaders).should("not.exist")

    let paymentMethod = "card"
    cy.wait('@getInvoiceById')
      .its('response')
      .then((getJobsResponse) => {
        expect(getJobsResponse.statusCode).to.eql(200);
        cy.get(commonLocators.noDataContainer).should("not.exist")
        // cy.log(JSON.stringify(getJobsResponse.body))
        let paidAmount = getJobsResponse.body.data.paidAmount
        paidAmount = paidAmount == null ? 0 : paidAmount
        let remainingAmount = getJobsResponse.body.data.remainingAmount
        remainingAmount = remainingAmount == null ? 0.0 : remainingAmount
        let grandTotal = getJobsResponse.body.data.grandTotal
        grandTotal = grandTotal == null ? 0.0 : grandTotal

        // paid Amount
        cy.get(PaymentsLocators.summary)
          .get(PaymentsLocators.rowTotals)
          .eq(9)
          .should("contain", (Math.round(paidAmount * 100) / 100).toString())
        // remaining Amount
        cy.get(PaymentsLocators.summary)
          .get(PaymentsLocators.rowTotals)
          .eq(10)
          .should("contain", (Math.round(remainingAmount * 100) / 100).toString())

        let updatedAmount = Math.round(remainingAmount / 2 * 100) / 100
        cy.get("button[value='" + paymentMethod + "']").click()
        cy.get(PaymentsLocators.creates.updateAmount).clear().type(updatedAmount)
        cy.get(PaymentsLocators.creates.tuid).clear().type("Payment_" + window.uniqueId)
        cy.get(PaymentsLocators.creates.notes).clear().type(data.creates.notes)
        cy.get(PaymentsLocators.creates.payNowTextButton).contains(data.creates.payNowTextButton).click()
        cy.wait("@addPayment").its("response.statusCode").should("eq", 200)
        cy.get(PaymentsLocators.creates.successMsg).should("have.text", data.creates.successMsg)

        // paid Amount
        cy.get(PaymentsLocators.summary)
          .get(PaymentsLocators.rowTotals)
          .eq(9)
          .should("contain", (Math.round((paidAmount + updatedAmount) * 100) / 100).toString())
        // remaining Amount
        cy.get(PaymentsLocators.summary)
          .get(PaymentsLocators.rowTotals)
          .eq(10)
          .should("contain", (Math.round((remainingAmount - updatedAmount) * 100) / 100).toString())

        // Validate new payment record
        cy.get(PaymentsLocators.paymentRecords)
          .last()
          .within(() => {
            // Amount paid
            cy.get(PaymentsLocators.recordDetail)
              .eq(2)
              .should("contain", (Math.round(updatedAmount * 100) / 100).toString())

            // Amount due/remaining
            cy.get(PaymentsLocators.recordDetail)
              .eq(3)
              .should("contain", (Math.round((remainingAmount - updatedAmount) * 100) / 100).toString())

            // Total Payable
            cy.get(PaymentsLocators.recordDetail)
              .eq(4)
              .should("contain", (Math.round(grandTotal * 100) / 100).toString())

            // payment method
            cy.get(PaymentsLocators.recordDetail)
              .eq(6)
              .should("contain", paymentMethod)
          })
      })
  })

  it('Able to pay partially using CHEQUE method.', () => {
    // cy.get(PaymentsLocators.paymentTabButton).click();
    cy.reload()
    cy.get(commonLocators.skeletonLoaders).should("be.visible")
    cy.get(commonLocators.skeletonLoaders).should("not.exist")

    let paymentMethod = "cheque"
    cy.wait('@getInvoiceById')
      .its('response')
      .then((getJobsResponse) => {
        expect(getJobsResponse.statusCode).to.eql(200);
        cy.get(commonLocators.noDataContainer).should("not.exist")
        // cy.log(JSON.stringify(getJobsResponse.body))
        let paidAmount = getJobsResponse.body.data.paidAmount
        paidAmount = paidAmount == null ? 0 : paidAmount
        let remainingAmount = getJobsResponse.body.data.remainingAmount
        remainingAmount = remainingAmount == null ? 0.0 : remainingAmount
        let grandTotal = getJobsResponse.body.data.grandTotal
        grandTotal = grandTotal == null ? 0.0 : grandTotal

        // paid Amount
        cy.get(PaymentsLocators.summary)
          .get(PaymentsLocators.rowTotals)
          .eq(9)
          .should("contain", (Math.round(paidAmount * 100) / 100).toString())
        // remaining Amount
        cy.get(PaymentsLocators.summary)
          .get(PaymentsLocators.rowTotals)
          .eq(10)
          .should("contain", (Math.round(remainingAmount * 100) / 100).toString())

        let updatedAmount = Math.round(remainingAmount / 2 * 100) / 100
        cy.get("button[value='" + paymentMethod + "']").click()
        cy.get(PaymentsLocators.creates.updateAmount).clear().type(updatedAmount)
        cy.get(PaymentsLocators.creates.chequeNo).clear().type("Cheque_" + window.uniqueId)
        cy.get(PaymentsLocators.creates.notes).clear().type(data.creates.notes)
        cy.get(PaymentsLocators.creates.payNowTextButton).contains(data.creates.payNowTextButton).click()
        cy.wait("@addPayment").its("response.statusCode").should("eq", 200)
        cy.get(PaymentsLocators.creates.successMsg).should("have.text", data.creates.successMsg)

        // paid Amount
        cy.get(PaymentsLocators.summary)
          .get(PaymentsLocators.rowTotals)
          .eq(9)
          .should("contain", (Math.round((paidAmount + updatedAmount) * 100) / 100).toString())
        // remaining Amount
        cy.get(PaymentsLocators.summary)
          .get(PaymentsLocators.rowTotals)
          .eq(10)
          .should("contain", (Math.round((remainingAmount - updatedAmount) * 100) / 100).toString())

        // Validate new payment record
        cy.get(PaymentsLocators.paymentRecords)
          .last()
          .within(() => {
            // Amount paid
            cy.get(PaymentsLocators.recordDetail)
              .eq(2)
              .should("contain", (Math.round(updatedAmount * 100) / 100).toString())

            // Amount due/remaining
            cy.get(PaymentsLocators.recordDetail)
              .eq(3)
              .should("contain", (Math.round((remainingAmount - updatedAmount) * 100) / 100).toString())

            // Total Payable
            cy.get(PaymentsLocators.recordDetail)
              .eq(4)
              .should("contain", (Math.round(grandTotal * 100) / 100).toString())

            // payment method
            cy.get(PaymentsLocators.recordDetail)
              .eq(6)
              .should("contain", paymentMethod)
          })
      })
  })
});
