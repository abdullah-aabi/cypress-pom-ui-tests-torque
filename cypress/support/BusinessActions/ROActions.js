import commonLocators from "../../Locators/commonLocators"
import { generateUniqueEmail, generateUniqueName, generateUniquePhone, getEnvUrl } from "../commands"

export function createROUsingApi() {
    cy.fixture("RO_data").then(data => {
        let roData = data.createUsingApi
        data.createUsingApi.customer.name = generateUniqueName(data.createUsingApi.customer.name)
        data.createUsingApi.customer.phone = "+" + generateUniquePhone(data.createUsingApi.customer.phone)
        data.createUsingApi.customer.email = generateUniqueEmail(data.createUsingApi.customer.email)

        let token = localStorage["token"]
        cy.request({
            method: "POST",
            url: getEnvUrl() + "repairOrder/save",
            headers: {
                "Connection": "keep-alive",
                "Accept": "application/json, text/plain, */*",
                "Authorization": "Bearer " + token,
                "authority": "apidevelop.torque360.co",
                "Origin": Cypress.config().baseUrl,
                "Referer": Cypress.config().baseUrl + "/",
                "path": getEnvUrl() + "inspection/createcustomer",
            },
            body: roData
        }).then((response) => {
            expect(response.status).equal(200)
            let roId = response.body.data.RO.id.toString()
            // cy.log(JSON.stringify(response.body.data.RO.id))
            cy.log("The RO # " + roId + " created successfully.")
            cy.visit("/new-repairorder/" + roId)
            cy.get(commonLocators.pageHeading).should("have.text", "Repair Order: #RO-" + roId.padStart(6, '0'))
        })
    })
}