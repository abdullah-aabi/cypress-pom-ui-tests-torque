/// <reference types="Cypress" />

import commonLocators from '../../../../../Locators/commonLocators';
import EstimateLocators from '../../../../../Locators/EstimateLocators';
import { addItems } from '../../../../../support/BusinessActions/EstimateActions';
import {
  addLaborClassesUsingApi,
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
  });

  beforeEach(() => {
    // Add to each "it"
  });

  it('Add Canned Services to the Job and assert calculations.', () => {
    cy.get(EstimateLocators.estimateTabButton).click();
    cy.wait('@getJobsOfEstimate')
      .its('response')
      .then((estimateResponse) => {
        expect(estimateResponse.statusCode).to.eql(200);
        let totalJobs = estimateResponse.body.data.ro.jobs.length;
        let jobTotal = estimateResponse.body.data.ro.jobs[0].totalCost;
        cy.fixture('Estimate_data').then((data) => {
          cy.get(EstimateLocators.jobs)
            .eq(0)
            .within(() => {
              // cy.get()
              // cy.get(EstimateLocators.jobToggle).click();
              cy.performOperation(
                'saveAsCannedService',
                'saveAsCannedService',
                'Estimate',
              );
            });

          cy.get(commonLocators.toastMessage).should("have.text", data.saveAsCannedService.successToastContainsText)

          cy.get(EstimateLocators.createCanned.jobName)
            .eq(0)
            .invoke('text')
            .then((techName) => {
              cy.log(techName);
              cy.get(EstimateLocators.createCanned.createNewJobTextButton)
                .contains(data.createCanned.createNewJobTextButton)
                .click();
              cy.wait('@getCannedServices')
                .its('response.statusCode')
                .should('eq', 200);
              cy.get(
                EstimateLocators.createCanned.cannedServiceTextButtonUnique,
              )
                .contains(techName)
                .parents("div.MuiAccordion-rounded")
                .find("button.MuiIconButton-root circle")
                .parent()
                .click();
              // cy.get(EstimateLocators.createCanned.addServiceTextButton)
              //   .contains(data.createCanned.addServiceTextButton)
              //   .click();
              cy.get(commonLocators.closeModalBtn).click()

              cy.wait('@createJobUsingCannedService')
                .its('response.statusCode')
                .should('eq', 200);
              cy.get(EstimateLocators.jobs).should(
                'have.length',
                totalJobs + 1,
              );

              cy.get(
                EstimateLocators.createCanned.jobName +
                ':contains(' +
                techName +
                ')',
              )
                .eq(1) // Select job 2, 1 is already there.
                .parents(EstimateLocators.jobs)
                .within(() => {
                  cy.get(EstimateLocators.jobToggle).click();

                  cy.performOperation(
                    'selectOptionsInJob',
                    'fillJob',
                    'Estimate',
                  );
                  // addItems
                  // param 1 :: 0 = Labor, 1 = Parts and Supplies, 2 = Misc
                  // param 2 :: No of line items

                  // assertItems(0, 0)
                });
            });
        });
      });
  });
});
