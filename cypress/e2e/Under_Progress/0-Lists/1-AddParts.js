/// <reference types="Cypress" />

const commonLocators = require("../../../../Locators/commonLocators")

function addPartsUsingApi() {
    let envUrl = "https://apidevelop.torque360.co/api/"
    if (Cypress.config().baseUrl == "https://portal.torque360.co") {
        envUrl = "https://api.torque360.co/api/"
    }

    cy.fixture("Parts").then(data => {
        let token = localStorage["token"]
        for (let parts in data) {
            cy.request({
                method: "POST",
                url: envUrl + "estimate/save-parts",
                headers: {
                    "Connection": "keep-alive",
                    "Accept": "application/json, text/plain, */*",
                    "Authorization": "Bearer " + token,
                    "authority": "apidevelop.torque360.co",
                    "Origin": Cypress.config().baseUrl,
                    "Referer": Cypress.config().baseUrl + "/",
                    "path": envUrl + "estimate/save-parts",
                },
                followRedirect: true,
                form: false,
                body: data[parts]
            }).then((response) => {
                expect(response.status).equal(200)
                cy.log("the Parts created successfully.")
            })
        }
    })
}

describe("All the test cases of Add Part CRUD operations.", () => {
    before(() => {
        cy.fixture("user-creds").then(data => {
            cy.loginWithApi(data.username, data.password)
        })
        // cy.loginWithApi(Cypress.env("Username"), Cypress.env("Password"))
        // Add more to before all operation.
        cy.visit("/dashboard")
        cy.get(commonLocators.pageHeading).should("contain", "Dashboard")
        cy.selectFromMenu("Estimate")
        cy.get(commonLocators.pageHeading).should("contain", "Estimate")

    })

    beforeEach(() => {
        // Add to each "it" 
    })

    it("Create a new part", () => {
        // Add "NewPart" at the "Parts" screen.
        cy.performOperation("NewPart", "Parts")
    })

})