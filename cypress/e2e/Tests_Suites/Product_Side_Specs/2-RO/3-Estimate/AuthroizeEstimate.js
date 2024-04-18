/// <reference types="Cypress" />

import EstimateLocators from '../../../../../Locators/EstimateLocators';
import { addItems } from '../../../../../support/BusinessActions/EstimateActions';
import {
  addLaborClassesUsingApi,
  addPricingMatrixUsingApi,
  addTaxClassesUsingApi,
} from '../../../../../support/BusinessActions/SettingsActions';
import { emailFromZoho } from '../../../../../support/commands';

const commonLocators = require('../../../../../Locators/commonLocators');

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
    // addLaborClassesUsingApi();
    // addTaxClassesUsingApi();
    // addPricingMatrixUsingApi()
  });

  beforeEach(() => {
    // Add to each "it"
  });

  it('Manually authorize the Estimate.', () => {
    // cy.fixture("user-creds").then(data => {
    //   emailFromZoho(data.username, "estimateAuthorization")
    // })
    cy.get(EstimateLocators.estimateTabButton).click();
    cy.wait('@getJobsOfEstimate').its('response.statusCode').should('eq', 200);

    cy.performOperation('authorization', 'authorizationManual', 'Estimate');
    cy.get(EstimateLocators.workOrderTabButton).click();
  });
});
