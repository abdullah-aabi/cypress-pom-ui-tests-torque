/// <reference types="Cypress" />

import commonLocators from '../../../../../Locators/commonLocators';
import EstimateLocators from '../../../../../Locators/EstimateLocators';
import { addItems } from '../../../../../support/BusinessActions/EstimateActions';
import {
  addLaborClassesUsingApi,
  addPricingMatrixUsingApi,
  addTaxClassesUsingApi,
  createConcernOrRecommendation,
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
    // createROUsingApi()
    // addLaborClassesUsingApi()
    // addTaxClassesUsingApi()
    // addPricingMatrixUsingApi()
    createConcernOrRecommendation("techRecommendation")
    cy.fixture('UniqueIds').then((ids) => {
      cy.visit('/new-repairorder/' + ids.roId);
      // cy.wait("@getCreatedRO").its("response.statusCode").should("eq", 200)
      cy.get(commonLocators.pageHeading).should(
        'have.text',
        'Repair Order: #RO-' + ids.roId.padStart(6, '0'),
      );
    });
  });

  beforeEach(() => {
    // Add to each "it"
  });

  it('Convert a tech recommendation to Job.', () => {
    cy.get(EstimateLocators.estimateTabButton).click();
    cy.wait('@getJobsOfEstimate')
      .its('response')
      .then((estimateResponse) => {
        let totalJobs = estimateResponse.body.data.ro.jobs.length;
        // cy.get(EstimateLocators.concernsToggle).find(EstimateLocators.convertToJob.countBtn).click()
        cy.get(EstimateLocators.recommendationToggle)
          .find(EstimateLocators.convertToJob.countBtn)
          .click();
        cy.get(EstimateLocators.recommendationToggle)
          .find(EstimateLocators.convertToJob.nonConvertedConcernCheck)
          .first()
          .prev()
          .click()
          .parents(EstimateLocators.convertToJob.concernRecommendation)
          .find(EstimateLocators.convertToJob.heading)
          .invoke('text')
          .then((concernName) => {
            cy.get(EstimateLocators.recommendationToggle)
              .find(EstimateLocators.convertToJob.createJobBtn)
              .click();

            // cy.get(EstimateLocators.assertConvertedJobs.successMsg).should(
            //   'have.text',
            //   'Data added successfully',
            // ); // bug
            cy.wait('@getJobsOfEstimate')
              .its('response.statusCode')
              .should('eq', 200);

            cy.get(EstimateLocators.jobs).should('have.length', totalJobs + 1);

            cy.get(EstimateLocators.jobs)
              .contains(concernName)
              .parents(EstimateLocators.jobs)
              .within(() => {
                cy.get(EstimateLocators.jobToggle).click();
                // addItems
                // param 1 :: 0 = Labor, 1 = Parts and Supplies, 2 = Misc
                // param 2 :: No of line items

                // addItems("part", 0)
              });
          });
      });
  });
});
