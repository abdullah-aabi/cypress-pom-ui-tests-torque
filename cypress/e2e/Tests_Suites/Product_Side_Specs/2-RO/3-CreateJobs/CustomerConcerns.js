/// <reference types="Cypress" />

import commonLocators from "../../../../../Locators/commonLocators"
import EstimateLocators from "../../../../../Locators/EstimateLocators"
import { addItems } from "../../../../../support/BusinessActions/EstimateActions"
import { addLaborClassesUsingApi, addPricingMatrixUsingApi, addTaxClassesUsingApi, createConcernOrRecommendation } from "../../../../../support/BusinessActions/SettingsActions"

describe("All the test cases of Estimate CRUD operations", () => {
    before(() => {
        cy.fixture("user-creds").then(data => {
            cy.loginWithApi(data.username, data.password)
            // cy.loginWithUI(data.username, data.password)
        })
        // cy.loginWithApi(Cypress.env("Username"), Cypress.env("Password"))
        // Add more to before all operation.
        // cy.visit("/dashboard")
        // cy.get(commonLocators.pageHeading).should("contain", "Dashboard")
        // cy.selectFromMenu("Estimate")
        // cy.get(commonLocators.pageHeading).should("contain", "Estimate")
        // cy.socialLoginWithApi(Cypress.env("googleLogin"))
        cy.fixture("UniqueIds").then(ids => {
            cy.visit("/new-repairorder/" + ids.roId)
            // cy.wait("@getCreatedRO").its("response.statusCode").should("eq", 200)
            cy.get(commonLocators.pageHeading).should("have.text", "Repair Order: #RO-" + ids.roId.padStart(6, '0'))
        })
        // createROUsingApi()
        // addLaborClassesUsingApi()
        // addTaxClassesUsingApi()
        // addPricingMatrixUsingApi()
        createConcernOrRecommendation("customerConcern")
    })

    beforeEach(() => {
        // Add to each "it" 
    })

    it("Convert a concern to Job.", () => {
        cy.get(EstimateLocators.estimateTabButton).click()
        cy.wait("@getJobsOfEstimate").its("response").then(estimateResponse => {
            let totalJobs = estimateResponse.body.data.ro.jobs.length
            cy.get(EstimateLocators.concernsToggle).find(EstimateLocators.convertToJob.countBtn).click()
            // cy.get(EstimateLocators.recommendationToggle).find(EstimateLocators.convertToJob.countBtn).click()
            cy.get(EstimateLocators.concernsToggle).find(EstimateLocators.convertToJob.nonConvertedConcernCheck)
                .first().prev().click()
                .parents(EstimateLocators.convertToJob.concernRecommendation)
                .find(EstimateLocators.convertToJob.heading)
                .invoke("text").then(techName => {
                    cy.get(EstimateLocators.concernsToggle)
                        .find(EstimateLocators.convertToJob.createJobBtn)
                        .click()

                    // cy.get(EstimateLocators.assertConvertedJobs.successMsg).should("have.text", "Data added successfully") // bug
                    cy.wait("@getJobsOfEstimate").its("response.statusCode").should("eq", 200)

                    cy.get(EstimateLocators.jobs).should("have.length", totalJobs + 1)

                    cy.get(EstimateLocators.jobs).contains(techName).parents(EstimateLocators.jobs).within(() => {
                        cy.get(EstimateLocators.jobToggle).click()
                        // addItems
                        // param 1 :: 0 = Labor, 1 = Parts and Supplies, 2 = Misc
                        // param 2 :: No of line items 

                        // addItems("part", 0)
                    })
                })
        })
    })

    // it.skip("Convert all recommendations and concerns to Jobs.", () => {
    //     cy.get(EstimateLocators.estimateTabButton).click()
    //     cy.wait("@getJobsOfEstimate").its("response.statusCode").should("eq", 200)
    //     cy.get(EstimateLocators.concernsToggle).find(EstimateLocators.convertToJob.countBtn).click()
    //     cy.get(EstimateLocators.recommendationToggle).find(EstimateLocators.convertToJob.countBtn).click()
    //     cy.get("svg.unchecked").prev().click()
    //         .parents("div.ro__main__accordion")
    //         .find(EstimateLocators.convertToJob.createJobBtn)
    //         .click()
    //     cy.get(EstimateLocators.assertConvertedJobs.successMsg).should("have.text", "Data added successfully")
    //     // cy.get(EstimateLocators.concernsToggle).within(() => {
    //     //     cy.performOperation("convertToJob", "convertToJob", "Estimate")
    //     // })
    //     // cy.get(EstimateLocators.assertConvertedJobs.successMsg).should("have.text", "Data added successfully")
    //     // cy.get(EstimateLocators.recommendationToggle).within(() => {
    //     //     cy.performOperation("convertToJob", "convertToJob", "Estimate")
    //     // })
    //     // cy.get(EstimateLocators.assertConvertedJobs.successMsg).should("have.text", "Data added successfully")
    //     // cy.get(EstimateLocators.assertConvertedJobs.concernsCount).invoke("text").then(concernsCount => {
    //     //     cy.get(EstimateLocators.assertConvertedJobs.recommendationCount).invoke("text").then(recommendationCount => {
    //     //         cy.get(EstimateLocators.jobs).should('have.length', (parseInt(concernsCount) + parseInt(recommendationCount)).toString())
    //     //     })
    //     // })

    // })
})