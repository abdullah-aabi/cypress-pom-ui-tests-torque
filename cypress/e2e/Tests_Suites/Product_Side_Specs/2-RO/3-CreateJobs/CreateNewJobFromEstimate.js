/// <reference types="Cypress" />

import commonLocators from '../../../../../Locators/commonLocators';
import EstimateLocators from '../../../../../Locators/EstimateLocators';
import { addItems } from '../../../../../support/BusinessActions/EstimateActions';
import {
  addLaborClassesUsingApi,
  addPricingMatrixUsingApi,
  addTaxClassesUsingApi,
} from '../../../../../support/BusinessActions/SettingsActions';
import {
  generateUniqueName,
  getUniqueName,
} from '../../../../../support/commands';

describe('All the test cases of Estimate CRUD operations', () => {
  before(() => {
    cy.fixture("user-creds").then(data => {
      cy.loginWithApi(data.username, data.password)
      // cy.loginWithUI(data.username, data.password)
    })
    // cy.loginWithApi(Cypress.env('Username'), Cypress.env('Password'));
    cy.runRoutes();
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
    // createROUsingApi()
    addLaborClassesUsingApi()
    addTaxClassesUsingApi()
    addPricingMatrixUsingApi()
    cy.get(EstimateLocators.estimateTabButton).click();
  });

  beforeEach(() => {
    // Add to each "it"
  });

  it('Create New Job.', () => {
    cy.performOperation('creates', 'creates', 'Estimate');
    cy.fixture('Estimate_data').then((data) => {
      cy.wait('@getJobsOfEstimate')
        .its('response')
        .then((estimateResponse) => {
          let totalJobs = estimateResponse.body.data.ro.jobs.length;
          cy.get(EstimateLocators.jobs).should('have.length', totalJobs + 1);

          cy.get(EstimateLocators.jobToggle).last().click(); // bug

          cy.get(EstimateLocators.jobs)
            .last()
            .find(EstimateLocators.fillJob.jobName_Unique)
            .type(generateUniqueName(data.fillJob.jobName_Unique));
          cy.get(EstimateLocators.fillJob.jobNameBtn)
            .contains(generateUniqueName(data.fillJob.jobName_Unique))
            .click();

          cy.get(EstimateLocators.jobs)
            .last()
            .within(() => {
              cy.performOperation('selectOptionsInJob', 'fillJob', 'Estimate');
              // addItems
              // param 1 :: 0 = Labor, 1 = Parts and Supplies, 2 = Misc
              // param 2 :: No of line items

              // labor, 0)
            });
        });
    });
  });
});
