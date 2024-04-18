/// <reference types="Cypress" />

import commonLocators from '../../../../../Locators/commonLocators';
import EstimateLocators from '../../../../../Locators/EstimateLocators';
import InspectionLocators from '../../../../../Locators/InspectionLocators';
import PaymentsLocators from '../../../../../Locators/PaymentsLocators';
import WorkOrderLocators from '../../../../../Locators/WorkOrderLocators';
import { addItems, calculateGrossProfit, calculateJobTotalCost, getTotalCost, totalCost } from '../../../../../support/BusinessActions/EstimateActions';
import {
  addLaborClassesUsingApi,
  addPricingMatrixUsingApi,
  addTaxClassesUsingApi,
} from '../../../../../support/BusinessActions/SettingsActions';

describe('All the test cases of Estimate CRUD operations', () => {
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

  it('Calculate Gross Profit on each job', () => {
    cy.get(EstimateLocators.estimateTabButton).click();
    cy.wait('@getJobsOfEstimate')
      .its('response')
      .then((getJobsResponse) => {
        expect(getJobsResponse.statusCode).to.eql(200);
        cy.log(getJobsResponse.body.data.ro.jobs.length)
        for (let i = 0; i < getJobsResponse.body.data.ro.jobs.length; i++) {
          let jobTotal = getJobsResponse.body.data.ro.jobs[i].totalCost;
          let totalTax = getJobsResponse.body.data.ro.jobs[i].totalTax;
          let discount = getJobsResponse.body.data.ro.jobs[i].discount;

          if (jobTotal != null) {
            cy.get(EstimateLocators.jobs)
              .eq(i)
              .within(() => {
                cy.get(EstimateLocators.jobToggle).click();
                // addItems
                // param 1 :: 0 = Labor, 1 = Parts and Supplies, 2 = Misc
                // param 2 :: No of line items
                cy.log("jobTotal = " + jobTotal)
                cy.log("totalTax = " + totalTax)
                // calculateGrossProfit(jobTotal, totalTax, discount)
                let totalCost = 0.0
                let qty = 0.0
                let itemCost = 0.0
                for (let j = 0; j < getJobsResponse.body.data.ro.jobs[i].extrasWithJob.items.length; j++) {
                  qty = getJobsResponse.body.data.ro.jobs[i].extrasWithJob.items[j].qty
                  itemCost = getJobsResponse.body.data.ro.jobs[i].extrasWithJob.items[j].cost
                  totalCost = totalCost + (parseFloat(qty) * parseFloat(itemCost))
                  cy.log(totalCost)
                  if (j + 1 === getJobsResponse.body.data.ro.jobs[i].extrasWithJob.items.length) {
                    cy.log("Total Cost: " + totalCost)
                    // return totalCost
                    // setTotalCost(totalCost)
                    let revenue = jobTotal - totalTax
                    let grossProfit = revenue - totalCost
                    let grossProfitMargin = Math.round(((grossProfit / revenue) * 100) * 100) / 100
                    cy.log("revenue: " + revenue)
                    cy.log("grossProfit: " + grossProfit)
                    cy.log("grossProfitMargin: " + grossProfitMargin)
                    cy.contains("Gross Profit:")
                      .find("span")
                      .should("have.text", "$" + (Math.round(grossProfit * 100) / 100).toString() + " | " + grossProfitMargin + "%")
                  }
                }
                // let totalCost = calculateJobTotalCost()
                // labor, 7, jobTotal); // Labor
                // addItems("part", 7, jobTotal); // Parts And Supplies
                // addItems("misc", 7, jobTotal); // Misc
              });
          }
        }
      });
  });

  it('Assert Estimated Totals and Totals at Payments.', () => {
    // cy.reload()
    cy.get(EstimateLocators.workOrderTabButton).click();
    cy.get(EstimateLocators.estimateTabButton).click();
    cy.get(EstimateLocators.estimatedTotalAccordianTextButton)
      .contains('Estimated Total')
      .click()
    cy.wait('@getJobsOfEstimate')
      .its('response')
      .then((getJobsResponse) => {
        expect(getJobsResponse.statusCode).to.eql(200);

        cy.wait('@getEstimatedTotals')
          .its('response')
          .then((getEstimatedTotalsResponse) => {
            // expect(getEstimatedTotalsResponse.statusCode).to.eql(200);

            // let estimatedTotalLabor = getEstimatedTotalsResponse.body.data.result.totalLabor
            // let estimatedTotalPartsSupplies = getEstimatedTotalsResponse.body.data.result.totalPartsSupplies
            // let estimatedTotalMiscellaneous = getEstimatedTotalsResponse.body.data.result.totalMiscellaneous
            // let estimatedTotalDiscount = getEstimatedTotalsResponse.body.data.result.totalDiscount
            // let estimatedTotalTax = getEstimatedTotalsResponse.body.data.result.totalTax
            // let estimatedSubTotal = estimatedTotalLabor + estimatedTotalPartsSupplies + estimatedTotalMiscellaneous
            // let estimateGrandTotal = estimatedSubTotal + estimatedTotalTax - estimatedTotalDiscount

            let labourSubTotal = 0.0
            let partSupplySubTotal = 0.0
            let miscSubTotal = 0.0
            let discount = 0.0
            let totalTax = 0.0
            let jobTotal = 0.0
            cy.log(getJobsResponse.body.data.ro.jobs.length)
            for (let i = 0; i < getJobsResponse.body.data.ro.jobs.length; i++) {
              cy.log(jobTotal)
              cy.get(EstimateLocators.jobs)
                .eq(i)
                .within(() => {
                  labourSubTotal = labourSubTotal + getJobsResponse.body.data.ro.jobs[i].labourSubTotal;
                  partSupplySubTotal = partSupplySubTotal + getJobsResponse.body.data.ro.jobs[i].partSupplySubTotal;
                  miscSubTotal = miscSubTotal + getJobsResponse.body.data.ro.jobs[i].miscSubTotal;
                  discount = discount + getJobsResponse.body.data.ro.jobs[i].discount;
                  totalTax = totalTax + getJobsResponse.body.data.ro.jobs[i].totalTax;
                  jobTotal = jobTotal + getJobsResponse.body.data.ro.jobs[i].totalCost;
                  if (getJobsResponse.body.data.ro.jobs[i].totalCost == null) {
                    jobTotal = jobTotal + 0.0;
                  }

                  if (getJobsResponse.body.data.ro.jobs[i].totalCost != null) {
                    cy.log(jobTotal)
                    // cy.get(EstimateLocators.jobToggle).click();
                    cy.get(EstimateLocators.jobTotals.jobTotal)
                      .should('contain', (Math.round(getJobsResponse.body.data.ro.jobs[i].totalCost * 100) / 100).toString());

                    cy.get(EstimateLocators.jobTotals.discountTotal)
                      .should('contain', (Math.round(getJobsResponse.body.data.ro.jobs[i].discount * 100) / 100).toString());
                  }
                });
            }

            cy.get(EstimateLocators.estimatedTotalAccordianTextButton)
              .contains('Estimated Total')
              .parents("div.MuiAccordion-root")
              .within(() => {

                let subTotal = jobTotal - totalTax + discount

                cy.get(EstimateLocators.estimatedTotals.totalLabor)
                  .should('contain', (Math.round(labourSubTotal * 100) / 100).toString());

                cy.get(EstimateLocators.estimatedTotals.totalPartsAndSupplies)
                  .should('contain', (Math.round(partSupplySubTotal * 100) / 100).toString());

                cy.get(EstimateLocators.estimatedTotals.totalMisc)
                  .should('contain', (Math.round(miscSubTotal * 100) / 100).toString());

                cy.get(EstimateLocators.estimatedTotals.totalTax)
                  .should('contain', (Math.round(totalTax * 100) / 100).toString());

                cy.get(EstimateLocators.estimatedTotals.totalDiscount)
                  .should('contain', (Math.round(discount * 100) / 100).toString());

                cy.get(EstimateLocators.estimatedTotals.grandTotal)
                  .should('contain', (Math.round((jobTotal) * 100) / 100).toString());

                cy.get(EstimateLocators.estimatedTotals.estimatedSubTotal)
                  .should('contain', (Math.round(subTotal * 100) / 100).toString());
              });

            cy.get(PaymentsLocators.paymentTabButton).click();

            cy.get(commonLocators.skeletonLoaders).should("be.visible")
            cy.get(commonLocators.skeletonLoaders).should("not.exist")

            cy.get(PaymentsLocators.summary)
              .within(() => {
                let subTotal = jobTotal - totalTax + discount

                cy.get(PaymentsLocators.rowTotals)
                  .eq(2)
                  .should('contain', (Math.round(labourSubTotal * 100) / 100).toString());

                cy.get(PaymentsLocators.rowTotals)
                  .eq(1)
                  .should('contain', (Math.round(partSupplySubTotal * 100) / 100).toString());

                cy.get(PaymentsLocators.rowTotals)
                  .eq(3)
                  .should('contain', (Math.round(miscSubTotal * 100) / 100).toString());

                cy.get(PaymentsLocators.rowTotals)
                  .eq(5)
                  .should('contain', (Math.round(discount * 100) / 100).toString());

                cy.get(PaymentsLocators.rowTotals)
                  .eq(6)
                  .should('contain', (Math.round(totalTax * 100) / 100).toString());

                cy.get(PaymentsLocators.rowTotals)
                  .eq(8)
                  .should('contain', (Math.round((jobTotal) * 100) / 100).toString());

                cy.get(PaymentsLocators.rowTotals)
                  .eq(4)
                  .should('contain', (Math.round(subTotal * 100) / 100).toString());
              })

          })
      })
  })

  it('Assert Totals at Work Order.', () => {
    // cy.reload()
    cy.get(InspectionLocators.inspectionTabButton).click();
    cy.get(EstimateLocators.estimateTabButton).click();
    cy.wait('@getJobsOfEstimate')
      .its('response')
      .then((getJobsResponse) => {
        expect(getJobsResponse.statusCode).to.eql(200);
        cy.get(EstimateLocators.workOrderTabButton).click();

        cy.get(commonLocators.skeletonLoaders).should("be.visible")
        cy.get(commonLocators.skeletonLoaders).should("not.exist")

        let labourSubTotal = 0.0
        let partSupplySubTotal = 0.0
        let miscSubTotal = 0.0
        let discount = 0.0
        let totalTax = 0.0
        let jobTotal = 0.0
        cy.log(getJobsResponse.body.data.ro.jobs.length)
        for (let i = 0; i < getJobsResponse.body.data.ro.jobs.length; i++) {
          cy.log(jobTotal)
          cy.get(WorkOrderLocators.jobs)
            .eq(i)
            .within(() => {
              labourSubTotal = labourSubTotal + getJobsResponse.body.data.ro.jobs[i].labourSubTotal;
              partSupplySubTotal = partSupplySubTotal + getJobsResponse.body.data.ro.jobs[i].partSupplySubTotal;
              miscSubTotal = miscSubTotal + getJobsResponse.body.data.ro.jobs[i].miscSubTotal;
              discount = discount + getJobsResponse.body.data.ro.jobs[i].discount;
              totalTax = totalTax + getJobsResponse.body.data.ro.jobs[i].totalTax;
              jobTotal = jobTotal + getJobsResponse.body.data.ro.jobs[i].totalCost;
              if (getJobsResponse.body.data.ro.jobs[i].totalCost == null) {
                jobTotal = jobTotal + 0.0;
              }

              if (getJobsResponse.body.data.ro.jobs[i].totalCost != null) {
                cy.log(jobTotal)
                // cy.get(EstimateLocators.jobToggle).click();
                cy.get(EstimateLocators.jobTotals.jobTotal)
                  .should('contain', (Math.round(getJobsResponse.body.data.ro.jobs[i].totalCost * 100) / 100).toString());

                cy.get(EstimateLocators.jobTotals.discountTotal)
                  .should('contain', (Math.round(getJobsResponse.body.data.ro.jobs[i].discount * 100) / 100).toString());
              }
            });

        }
      })
  })
});
