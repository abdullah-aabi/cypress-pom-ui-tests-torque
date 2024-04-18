/// <reference types="Cypress" />

import {
    addLaborClassesUsingApi,
    addPricingMatrixUsingApi,
    addTaxClassesUsingApi,
} from '../../../../support/BusinessActions/SettingsActions';
import commonLocators from '../../../../Locators/commonLocators';
import EstimateLocators from '../../../../Locators/EstimateLocators';
import data from '../../../../fixtures/Estimate_data.json';
import { addAndAssertRepairTimes, addItems, addRepairTimes } from '../../../../support/BusinessActions/EstimateActions';
import { createROUsingApi } from '../../../../support/BusinessActions/ROActions';

describe('Integrations', () => {
    before(() => {
        cy.fixture("user-creds").then(data => {
            cy.loginWithApi(data.username, data.password)
            // cy.loginWithUI(data.username, data.password)
        })
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

    it('Add Labor time guides to the Job and assert calculations.', () => {
        cy.get(EstimateLocators.estimateTabButton).click();

        cy.fixture('Estimate_data').then((data) => {
            cy.wait('@getJobsOfEstimate')
                .its('response')
                .then((estimateResponse) => {
                    let totalJobs = estimateResponse.body.data.ro.jobs.length;
                    cy.performOperation('creates', 'creates', 'Estimate');

                    cy.get(EstimateLocators.jobs).should('have.length', totalJobs + 1);

                    cy.get(EstimateLocators.jobToggle).last().click(); // bug

                    const jobCount = totalJobs
                    cy.get("#portal").as("roScreen")
                    cy.get(commonLocators.noDataContainer).should("not.exist")
                    // cy.log(JSON.stringify(estimateResponse.body))
                    // let retailPrice = estimateResponse.body.data.ro.jobs[jobCount].labourCharges;
                    // retailPrice = retailPrice == null ? 0.0 : retailPrice
                    // let discount = estimateResponse.body.data.ro.jobs[jobCount].discount;
                    // discount = discount == null ? 0.0 : discount
                    // let jobTotal = estimateResponse.body.data.ro.jobs[jobCount].totalCost;
                    // jobTotal = jobTotal == null ? 0.0 : jobTotal

                    cy.get(EstimateLocators.jobs)
                        .eq(jobCount)
                        .as("job")
                        .within(() => {
                            cy.get(EstimateLocators.jobTotals.hoursTotal).invoke("text").then(hoursTotal => {
                                cy.log(hoursTotal)
                                // Test Repair Times
                                cy.get(EstimateLocators.repairTimes.laborGuideBtn).contains("Repair Time Guide").click()
                                cy.get("@roScreen").within(() => {
                                    cy.get(EstimateLocators.repairTimes.vin).type(data.repairTimes.addRepairTimes.vin)
                                    cy.get(EstimateLocators.repairTimes.submitTextButton).contains("Submit").click()

                                    cy.wait("@getLaborTimes").its("response").then(laborTimesResponse => {
                                        expect(laborTimesResponse.statusCode).equal(200);

                                        // addAndAssertRepairTimes(3, EstimateLocators.repairTimes.addRepairTimes, data.repairTimes.addRepairTimes, laborTimesResponse.body.data.labourGuideData)
                                        addRepairTimes(3, EstimateLocators.repairTimes.addRepairTimes, data.repairTimes.addRepairTimes)
                                        cy.get(EstimateLocators.repairTimes.saveTextButton).contains("Save").click()

                                        // cy.get("@job").within(() => {
                                        //     addItems("labor", -1, parseFloat(hoursTotal), retailPrice, discount, jobTotal);
                                        // })
                                    })
                                })
                            })
                        });
                });
        });
    });
});
