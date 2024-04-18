// Import commands.js using ES2015 syntax:
import './commands'
const commonLocators = require("../Locators/commonLocators")

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

before(() => {
    // Login in to app.
    // cy.log("This is outer before call")
    // cy.loginWithUI(Cypress.env("Username"), Cypress.env("Password"))
    // cy.fixture("user-creds").then(data => {
    //     cy.loginWithApi(data.username, data.password)
    // })
    // cy.loginWithApi(Cypress.env("Username"), Cypress.env("Password"))

})

// after(() => {
//     // cy.clearLocalStorage()
// })

beforeEach(() => {
    cy.restoreLocalStorage()
    cy.runRoutes()
})

afterEach(() => {
    cy.saveLocalStorage()
})