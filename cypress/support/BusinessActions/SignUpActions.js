import 'cypress-mailosaur';

export function gotoRegLinkFromEmail(sentToEmail, route) {
  let SERVER_ID = Cypress.env('MAILOSAUR_Server_ID');
  cy.log('Getting registration link from email. ' + sentToEmail);
  cy.mailosaurGetMessage(
    SERVER_ID,
    {
      sentTo: sentToEmail,
      sentFrom: 'torquepos@gmail.com',
    },
    {
      timeout: 120000,
    },
  ).then((email) => {
    const firstLink = email.html.links[0];
    cy.log(firstLink.text);
    var url = firstLink.href;
    // var url = firstLink.href.replace("portal", route)
    cy.mailosaurDeleteAllMessages(SERVER_ID);
    if (
      Cypress.config().baseUrl != 'https://portal.torque360.co' ||
      Cypress.config().baseUrl != 'https://www.portal.torque360.co'
    ) {
      url = url.replace("portal", "feature") // bug
    }
    cy.visit(url);
  });
}

export function activateAccount(username, password, accountEmail) {
  cy.request({
    method: 'POST',
    url: getEnvUrl() + 'auth/login',
    headers: {
      Host: 'api.torque360.co',
      Connection: 'keep-alive',
      Accept: 'application/json, text/plain, */*',
      // "Authorization": "Bearer undefined",
      Origin: Cypress.env('supportUrl'),
      Referer: Cypress.env('supportUrl') + '/',
    },
    followRedirect: true,
    form: false,
    body: {
      email: username,
      password: password,
      showPassword: '',
      type: 0,
    },
  }).then((response) => {
    expect(response.status).equal(201);
    // Storing user Data in Cache
    cy.window().then((window) => {
      // window.localStorage.setItem("userData", JSON.stringify(response.body))
      // window.sessionStorage.setItem("jwtToken", response.body.token)
      // cy.session("jwtToken", response.body.token)
      // cy.writeFile("cypress/fixtures/userData", JSON.stringify(response.body))
      cy.log('The user logged in successfully');
      let jwtToken = response.body.token;

      cy.getAllUsersFromSupport(jwtToken, accountEmail);
    });
  });
}

export function getAllUsersFromSupport(jwtToken, accountEmail) {
  cy.request({
    method: 'GET',
    url: getEnvUrl() + 'users/get-all-users',
    headers: {
      Host: 'api.torque360.co',
      Connection: 'keep-alive',
      Accept: 'application/json, text/plain, */*',
      Authorization: 'Bearer ' + jwtToken,
      Origin: Cypress.env('supportUrl'),
      Referer: Cypress.env('supportUrl') + '/',
    },
  }).then((response) => {
    expect(response.status).equal(200);
    console.log(response.body.data[response.body.data.length - 1]);
    let expectedId = response.body.data[response.body.data.length - 1]['id'];
    let expectedEmail =
      response.body.data[response.body.data.length - 1]['email'];
    if (expectedEmail == accountEmail) {
      cy.approveUserFromSupport(jwtToken, expectedId);
    }
  });
}

export function approveUserFromSupport(jwtToken, id) {
  cy.request({
    method: 'POST',
    url: getEnvUrl() + 'users/update-status',
    headers: {
      Host: 'api.torque360.co',
      Connection: 'keep-alive',
      Accept: 'application/json, text/plain, */*',
      Authorization: 'Bearer ' + jwtToken,
      Origin: Cypress.env('supportUrl'),
      Referer: Cypress.env('supportUrl') + '/',
    },
    body: {
      id: id,
      adminApproval: true,
    },
  }).then((response) => {
    expect(response.status).equal(200);
    expect(response.body.message).to.be.equal('User updated Successfully');
  });
}