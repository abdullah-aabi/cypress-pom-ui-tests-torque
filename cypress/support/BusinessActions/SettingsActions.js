import { getEnvUrl } from '../commands';
// import data from '../../fixtures/Settings_data.json'
// const window.token = window.token

export function addTaxClassesUsingApi() {
  cy.fixture('Settings_data').then((data) => {

    for (let item in data.taxClasses) {
      let name = data.taxClasses[item].data[0].name
      data.taxClasses[item].data[0].percentage = Cypress.env("gstTax");
      cy.log(name);
      cy.request({
        method: 'GET',
        url: getEnvUrl() + 'tax-class/list',
        headers: {
          Connection: 'keep-alive',
          Accept: 'application/json, text/plain, */*',
          Authorization: 'Bearer ' + localStorage["token"],
          authority: 'apidevelop.torque360.co',
          Origin: Cypress.config().baseUrl,
          Referer: Cypress.config().baseUrl + '/',
        },
      }).then((response) => {
        expect(response.status).equal(200);
        if (response.body.data != []) {
          if (JSON.stringify(response.body.data).includes(name)) {
            cy.log('The Tax Class already exists.');
          } else {
            cy.log(JSON.stringify(response.body.data));
            cy.request({
              method: 'POST',
              url: getEnvUrl() + 'tax-class/create',
              headers: {
                Connection: 'keep-alive',
                Accept: 'application/json, text/plain, */*',
                Authorization: 'Bearer ' + localStorage["token"],
                authority: 'apidevelop.torque360.co',
                Origin: Cypress.config().baseUrl,
                Referer: Cypress.config().baseUrl + '/',
              },
              body: data.taxClasses[item],
            }).then((response) => {
              expect(response.status).equal(200);
              cy.log('the Tax Class created successfully.');
            });
          }
        } else {
          cy.request({
            method: 'POST',
            url: getEnvUrl() + 'tax-class/create',
            headers: {
              Connection: 'keep-alive',
              Accept: 'application/json, text/plain, */*',
              Authorization: 'Bearer ' + localStorage["token"],
              authority: 'apidevelop.torque360.co',
              Origin: Cypress.config().baseUrl,
              Referer: Cypress.config().baseUrl + '/',
            },
            body: data.taxClasses[item],
          }).then((response) => {
            expect(response.status).equal(200);
            cy.log('the Tax Class created successfully.');
          });
        }
      });
    }
  })
}

export function addPricingMatrixUsingApi() {
  cy.fixture('Settings_data').then((data) => {

    for (let item in data.pricingMatrices) {
      let name = data.pricingMatrices[item].name
      cy.log(name);
      cy.request({
        method: 'GET',
        url: getEnvUrl() + 'pricingMatrix/get-pricing-matrix',
        headers: {
          Connection: 'keep-alive',
          Accept: 'application/json, text/plain, */*',
          Authorization: 'Bearer ' + localStorage["token"],
          authority: 'apidevelop.torque360.co',
          Origin: Cypress.config().baseUrl,
          Referer: Cypress.config().baseUrl + '/',
        },
      }).then((response) => {
        expect(response.status).equal(200);
        if (response.body.data != []) {
          if (JSON.stringify(response.body.data).includes(name)) {
            cy.log('The Pricing Matrix already exists.');
          } else {
            cy.log(JSON.stringify(response.body.data));
            cy.request({
              method: 'POST',
              url: getEnvUrl() + 'pricingMatrix/add-pricing-matrix',
              headers: {
                Connection: 'keep-alive',
                Accept: 'application/json, text/plain, */*',
                Authorization: 'Bearer ' + localStorage["token"],
                authority: 'apidevelop.torque360.co',
                Origin: Cypress.config().baseUrl,
                Referer: Cypress.config().baseUrl + '/',
              },
              body: data.pricingMatrices[item],
            }).then((response) => {
              expect(response.status).equal(200);
              cy.log('the Pricing Matrix created successfully.');
            });
          }
        } else {
          cy.request({
            method: 'POST',
            url: getEnvUrl() + 'pricingMatrix/add-pricing-matrix',
            headers: {
              Connection: 'keep-alive',
              Accept: 'application/json, text/plain, */*',
              Authorization: 'Bearer ' + localStorage["token"],
              authority: 'apidevelop.torque360.co',
              Origin: Cypress.config().baseUrl,
              Referer: Cypress.config().baseUrl + '/',
            },
            body: data.pricingMatrices[item],
          }).then((response) => {
            expect(response.status).equal(200);
            cy.log('the Pricing Matrix created successfully.');
          });
        }
      });
    }
  })
}

export function addLaborClassesUsingApi() {
  cy.fixture('Settings_data').then((data) => {

    cy.log(window.token)
    for (let item in data.laborClasses) {
      let name = data.laborClasses[item]['className'];
      cy.log(name);
      cy.request({
        method: 'GET',
        url: getEnvUrl() + 'labourClass/get-labour-classes',
        headers: {
          Connection: 'keep-alive',
          Accept: 'application/json, text/plain, */*',
          Authorization: 'Bearer ' + localStorage["token"],
          authority: 'apidevelop.torque360.co',
          Origin: Cypress.config().baseUrl,
          Referer: Cypress.config().baseUrl + '/',
        },
      }).then((response) => {
        expect(response.status).equal(200);
        if (response.body.data != []) {
          if (JSON.stringify(response.body.data).includes(name)) {
            cy.log('The Labor Class already exists.');
          } else {
            cy.log(JSON.stringify(response.body.data));
            cy.request({
              method: 'POST',
              url: getEnvUrl() + 'labourClass/add',
              headers: {
                Connection: 'keep-alive',
                Accept: 'application/json, text/plain, */*',
                Authorization: 'Bearer ' + localStorage["token"],
                authority: 'apidevelop.torque360.co',
                Origin: Cypress.config().baseUrl,
                Referer: Cypress.config().baseUrl + '/',
              },
              body: data.laborClasses[item],
            }).then((response) => {
              expect(response.status).equal(200);
              cy.log('the Labor Class created successfully.');
            });
          }
        } else {
          cy.request({
            method: 'POST',
            url: getEnvUrl() + 'labourClass/add',
            headers: {
              Connection: 'keep-alive',
              Accept: 'application/json, text/plain, */*',
              Authorization: 'Bearer ' + localStorage["token"],
              authority: 'apidevelop.torque360.co',
              Origin: Cypress.config().baseUrl,
              Referer: Cypress.config().baseUrl + '/',
            },
            body: data.laborClasses[item],
          }).then((response) => {
            expect(response.status).equal(200);
            cy.log('the Labor Class created successfully.');
          });
        }
      });
    }
  })
}

export function createConcernOrRecommendation(type) {
  cy.fixture('Settings_data').then((data) => {
    cy.fixture('UniqueIds').then((UniqueIds) => {
      for (let item in data[type]) {
        data[type][item].title = type + item
        data[type][item].description = "This " + type + item + " is created for RO # " + UniqueIds.roId
        data[type][item].roId = UniqueIds.roId
        cy.request({
          method: 'POST',
          url: getEnvUrl() + 'repairOrder/add-problem',
          headers: {
            Connection: 'keep-alive',
            Accept: 'application/json, text/plain, */*',
            Authorization: 'Bearer ' + localStorage["token"],
            authority: 'apidevelop.torque360.co',
            Origin: Cypress.config().baseUrl,
            Referer: Cypress.config().baseUrl + '/',
          },
          body: data[type][item],
        }).then((response) => {
          expect(response.status).equal(200);
          cy.log('the ' + type + item + ' is created successfully for RO # ' + UniqueIds.roId);
        });
      }
    })
  })
}