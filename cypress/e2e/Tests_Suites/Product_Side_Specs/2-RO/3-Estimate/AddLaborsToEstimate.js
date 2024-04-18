/// <reference types="Cypress" />

import commonLocators from '../../../../../Locators/commonLocators';
import EstimateLocators from '../../../../../Locators/EstimateLocators';
import { addItems } from '../../../../../support/BusinessActions/EstimateActions';
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

  it('Add Labor items to the Job and assert calculations with percentage Discount.', () => {
    const jobCount = 0
    cy.get(EstimateLocators.estimateTabButton).click();

    cy.wait('@getJobsOfEstimate')
      .its('response')
      .then((getJobsResponse) => {
        expect(getJobsResponse.statusCode).to.eql(200);
        cy.get(commonLocators.noDataContainer).should("not.exist")
        // cy.log(JSON.stringify(getJobsResponse.body))
        let retailPrice = getJobsResponse.body.data.ro.jobs[jobCount].labourCharges;
        retailPrice = retailPrice == null ? 0.0 : retailPrice
        let discount = getJobsResponse.body.data.ro.jobs[jobCount].discount;
        discount = discount == null ? 0.0 : discount
        let jobTotal = getJobsResponse.body.data.ro.jobs[jobCount].totalCost;
        jobTotal = jobTotal == null ? 0.0 : jobTotal
        let taxTotal = getJobsResponse.body.data.ro.jobs[jobCount].totalTax;
        taxTotal = taxTotal == null ? 0.0 : taxTotal
        let lineItemsCount = getJobsResponse.body.data.ro.jobs[jobCount].extrasWithJob.items.length;
        lineItemsCount = lineItemsCount == null ? 0 : lineItemsCount

        cy.get(EstimateLocators.jobs)
          .eq(jobCount)
          .within(() => {

            cy.get(EstimateLocators.jobTotals.hoursTotal).invoke("text").then(hoursTotal => {
              cy.get(EstimateLocators.jobToggle).click();
              cy.log(hoursTotal)
              addItems("labor", "percentDiscCase", lineItemsCount, parseFloat(hoursTotal), retailPrice, discount, taxTotal, jobTotal);
              // addItems("part", 7) // Parts And Supplies
              // addItems("misc", 7) // Misc
            })
          });
      });
  });

  it('Add Labor items to the Job and assert calculations with Fixed Discount.', () => {
    const jobCount = 1
    cy.get(EstimateLocators.workOrderTabButton).click();
    cy.get(EstimateLocators.estimateTabButton).click();

    cy.wait('@getJobsOfEstimate')
      .its('response')
      .then((getJobsResponse) => {
        expect(getJobsResponse.statusCode).to.eql(200);
        cy.get(commonLocators.noDataContainer).should("not.exist")
        // cy.log(JSON.stringify(getJobsResponse.body))
        let retailPrice = getJobsResponse.body.data.ro.jobs[jobCount].labourCharges;
        retailPrice = retailPrice == null ? 0.0 : retailPrice
        let discount = getJobsResponse.body.data.ro.jobs[jobCount].discount;
        discount = discount == null ? 0.0 : discount
        let jobTotal = getJobsResponse.body.data.ro.jobs[jobCount].totalCost;
        jobTotal = jobTotal == null ? 0.0 : jobTotal
        let taxTotal = getJobsResponse.body.data.ro.jobs[jobCount].totalTax;
        taxTotal = taxTotal == null ? 0.0 : taxTotal
        let lineItemsCount = getJobsResponse.body.data.ro.jobs[jobCount].extrasWithJob.items.length;
        lineItemsCount = lineItemsCount == null ? 0 : lineItemsCount

        cy.get(EstimateLocators.jobs)
          .eq(jobCount)
          .within(() => {

            cy.get(EstimateLocators.jobTotals.hoursTotal).invoke("text").then(hoursTotal => {
              cy.get(EstimateLocators.jobToggle).click();
              cy.log(hoursTotal)
              addItems("labor", "fixedDiscCase", lineItemsCount, parseFloat(hoursTotal), retailPrice, discount, taxTotal, jobTotal);
              // addItems("part", 7) // Parts And Supplies
              // addItems("misc", 7) // Misc
            })
          });
      });
  });
});
