import InspectionLocators from "../../Locators/InspectionLocators";
import ROLocators from "../../Locators/ROLocators";
import { getEnvUrl } from "../commands";

export function addCustomerVehicle() {
    cy.fixture('RO_data').then((roData) => {
        let customerName = roData.customerInformation.name;
        let token = localStorage['token'];
        cy.request({
            method: 'GET',
            url: getEnvUrl() + 'inspection/search?key=' + customerName + '&type=name',
            headers: {
                Connection: 'keep-alive',
                Accept: 'application/json, text/plain, */*',
                Authorization: 'Bearer ' + token,
                authority: 'apidevelop.torque360.co',
                Origin: Cypress.config().baseUrl,
                Referer: Cypress.config().baseUrl + '/',
            },
        }).then((response) => {
            expect(response.status).equal(200);
            // cy.log(JSON.stringify(response))
            if (response.body.fetchResults.length == 0) {
                cy.get(ROLocators.addCustomerBtn).click();
                cy.performOperation('customerInformation', 'customerInformation', 'RO');
                cy.performOperation('vehicleInformation', 'vehicleInformation', 'RO');
            } else {
                cy.get(InspectionLocators.searchCustomer).clear();
                cy.get(InspectionLocators.searchCustomer).type(
                    roData.customerInformation.name,
                );
                cy.wait('@searchCustomer').its('response.statusCode').should('eq', 200);
                // Selecting customer
                cy.get(InspectionLocators.dropdownOptionButtons)
                    .should('be.visible')
                    .contains(roData.customerInformation.name)
                    .click();

                // Selecting Vehicle
                cy.contains(roData.vehicleInformation.vehiclePlate)
                    .click();

                cy.performOperation(
                    'assertCustomerInformation',
                    'assertCustomerInformation',
                    'RO',
                );
                cy.performOperation(
                    'assertVehicleInformation',
                    'assertVehicleInformation',
                    'RO',
                );
            }
        });
    });
}

export function createCustomerUsingApi(customer, vehicle) {
    cy.fixture('CustomerVehicle').then((data) => {
        let customerName = data[0].customerInformation.name;
        let token = localStorage['token'];
        cy.request({
            method: 'GET',
            url: getEnvUrl() + 'inspection/search?key=' + customerName + '&type=name',
            headers: {
                Connection: 'keep-alive',
                Accept: 'application/json, text/plain, */*',
                Authorization: 'Bearer ' + token,
                authority: 'apidevelop.torque360.co',
                Origin: Cypress.config().baseUrl,
                Referer: Cypress.config().baseUrl + '/',
            },
        }).then((response) => {
            expect(response.status).equal(200);
            // cy.log(JSON.stringify(response))
            if (response.body.fetchResults.length == 0) {
                cy.request({
                    method: 'POST',
                    url: getEnvUrl() + 'inspection/createcustomer',
                    headers: {
                        Connection: 'keep-alive',
                        Accept: 'application/json, text/plain, */*',
                        Authorization: 'Bearer ' + token,
                        authority: 'apidevelop.torque360.co',
                        Origin: Cypress.config().baseUrl,
                        Referer: Cypress.config().baseUrl + '/',
                        path: getEnvUrl() + 'inspection/createcustomer',
                    },
                    followRedirect: true,
                    form: false,
                    body: data[0],
                }).then((response) => {
                    expect(response.status).equal(200);
                    cy.log('The customer/vehicle created successfully.');
                });
            } else {
                cy.log('The customer already exists.');
            }
        });
    });
}

export function createMultipleCustomersUsingApi() {
    cy.fixture('CustomerVehicle').then((data) => {
        let token = localStorage['token'];
        for (let cv in data) {
            cy.request({
                method: 'POST',
                url: getEnvUrl() + 'inspection/createcustomer',
                headers: {
                    Connection: 'keep-alive',
                    Accept: 'application/json, text/plain, */*',
                    Authorization: 'Bearer ' + token,
                    authority: 'apidevelop.torque360.co',
                    Origin: Cypress.config().baseUrl,
                    Referer: Cypress.config().baseUrl + '/',
                    path: getEnvUrl() + 'inspection/createcustomer',
                },
                followRedirect: true,
                form: false,
                body: data[cv],
            }).then((response) => {
                expect(response.status).equal(200);
                cy.log('The customer/vehicle created successfully.');
            });
        }
    });
}