/// <reference types="Cypress" />
import 'cypress-file-upload';
import 'cypress-mailosaur';

import AppointmentLocators from '../Locators/AppointmentLocators';
import commonLocators from '../Locators/commonLocators';
import CustomerVehicleLocators from '../Locators/CustomerVehicleLocators';
import EstimateLocators from '../Locators/EstimateLocators';
import InspectionLocators from '../Locators/InspectionLocators';
import SignInLocators from '../Locators/SignInLocators';
import SignUpLocators from '../Locators/SignUpLocators';
import JobcardLocators from '../Locators/JobcardLocators';
import JobboardLocators from '../Locators/JobboardLocators';
import InvoiceLocators from '../Locators/InvoiceLocators';
import PaymentsLocators from '../Locators/PaymentsLocators';
import PartsLocators from '../Locators/PartsLocators';
import LaborsLocators from '../Locators/LaborsLocators';
import SuppliesLocators from '../Locators/SuppliesLocators';
import QuickCheckoutLocators from '../Locators/QuickCheckoutLocators';
import OnboardingLocators from '../Locators/OnboardingLocators';
import AddVehicleLocators from '../Locators/AddVehicleLocator';
import ROLocators from '../Locators/ROLocators';

let LOCAL_STORAGE_MEMORY = {};
const modifierKey = Cypress.platform === 'darwin' ? 'meta' : 'ctrl';
window.uniqueId = generateUUID();

export function getEnvUrl() {
  if (
    Cypress.config().baseUrl == 'https://portal.torque360.co' ||
    Cypress.config().baseUrl == 'https://www.portal.torque360.co'
  ) {
    return 'https://api.torque360.co/api/';
  } else {
    return 'https://featureapi.torque360.co/api/';
  }
}

function getLocators(fieldsType) {
  switch (fieldsType) {
    case 'CustomerVehicle':
      return CustomerVehicleLocators;
    case 'Appointment':
      return AppointmentLocators;
    case 'Inspection':
      return InspectionLocators;
    case 'Estimate':
      return EstimateLocators;
    case 'Jobcard':
      return JobcardLocators;
    case 'Jobboard':
      return JobboardLocators;
    case 'Invoice':
      return InvoiceLocators;
    case 'Payments':
      return PaymentsLocators;
    case 'Parts':
      return PartsLocators;
    case 'Supplies':
      return SuppliesLocators;
    case 'Labors':
      return LaborsLocators;
    case 'QuickCheckout':
      return QuickCheckoutLocators;
    case 'SignUp':
      return SignUpLocators;
    case 'Onboarding':
      return OnboardingLocators;
    case 'AddVehicle':
      return AddVehicleLocators;
    case 'RO':
      return ROLocators;
  }
}

export function generateUUID() {
  const uuid = require('uuid');
  const id = uuid.v4();
  return id.split('-')[0];
}

function getColor(type) {
  //
}

export function numToWords(num) {
  var a = [
    '',
    'one ',
    'two ',
    'three ',
    'four ',
    'five ',
    'six ',
    'seven ',
    'eight ',
    'nine ',
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen ',
  ];
  var b = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  if ((num = num.toString()).length > 9) return 'overflow';
  let n = ('000000000' + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = '';
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore '
      : '';
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh '
      : '';
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand '
      : '';
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred '
      : '';
  str +=
    n[5] != 0
      ? (str != '' ? 'and ' : '') +
      (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]])
      : '';
  return str.trim();
}

export function generateUniqueName(previousName) {
  // theqa13119+User1
  let firstHalf = previousName.split('_')[0];
  let newName = firstHalf + '_' + window.uniqueId; // theqa13119 + '_' + asdj23j
  return newName;
}

export function generateUniqueEmail(previousEmail) {
  // theqa13119+User1@gmail.com
  let firstHalf = previousEmail.split('+')[0]; // theqa13119
  let secondHalf = previousEmail.split('@')[1]; // gmail.com
  let newEmail =
    firstHalf +
    '+' +
    window.uniqueId +
    '@' +
    // Cypress.env('MAILOSAUR_Server_Domain'); // theqa13119 + '+' + 23jkq3jkbf + '@' + gmail.com 
    secondHalf
  return newEmail;
}
export function generateUniquePhone(min) {
  cy.log(min);
  min = Math.ceil(min);
  let max = Math.floor(19999999999);
  return Math.floor(Math.random() * (max - min + 1) + min); //the maximum is inclusive and the minimum is inclusive
}

export function getAfterValue(selector, pseudo, property) {
  cy.get(selector)
    .parent()
    .then(($els) => {
      // get Window reference from element
      const win = $els[0].ownerDocument.defaultView;
      // use getComputedStyle to read the pseudo selector
      const after = win.getComputedStyle($els[0], pseudo);
      // read the value of the `content` CSS property
      const contentValue = after.getPropertyValue(property);
      // the returned value will have double quotes around it, but this is correct
      return contentValue;
      // expect(contentValue).to.eq("rgb(229, 57, 53)")
    });
}

export function removeDollar(value) {
  return value.split(' ')[1];
}

export function removeHrs(value) {
  if (value.includes(' hrs')) {
    return value.replaceAll(' hrs', '');
  } else {
    return value;
  }
}

export function getUniqueName() {
  return window.name;
}

export function getUniquePhone() {
  return 'Mobile: +' + window.phone;
}

export function getUniquePlate() {
  return 'License Plate : ' + window.plate;
}

export function getUniqueEmail() {
  return window.email;
}

export function setUniqueName(name) {
  window.name = name;
}

export function setUniquePhone(phone) {
  window.phone = phone;
}

export function setUniquePlate(plate) {
  window.plate = plate;
}

export function setUniqueEmail(email) {
  window.email = email;
}

Cypress.Commands.add('selectFromMenu', (screen) => {
  cy.get(commonLocators.navNewActivityBtn).click();
  cy.get(commonLocators.navOptions).contains(screen).click({ force: true });
});

Cypress.Commands.add('appendStart', (locator, value) => {
  let allChars = value.split('').reverse();
  for (let char in allChars) {
    cy.get(locator).type(`{${modifierKey}}{home}`).type(allChars[char]);
  }
});

Cypress.Commands.add(
  'performOperation',
  (locatorsJson, fixtureJson, fieldsType) => {
    let locators = getLocators(fieldsType);
    let Locs = locators[locatorsJson];
    cy.fixture(fieldsType + '_data').then((returnedData) => {
      let data = returnedData[fixtureJson];
      for (let loc in Locs) {
        if (loc.includes('Check')) {
          cy.get(Locs[loc]).each((col, index, list) => cy.wrap(col).click());
          // cy.get(Locs[loc]).each((col, index, list) =>
          //     cy.wrap(col).check().should("be.checked")
          // )
        } else if (loc.includes('Dropdown')) {
          cy.get(Locs[loc]['dropdown']).click();
          cy.get(Locs[loc]['dropdown'])
            .parent()
            .find(Locs[loc]['option'])
            .contains(data[loc])
            .click();
        } else if (loc.includes('Slider')) {
          cy.get(Locs[loc])
            .click()
            .type(
              '{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}',
            );
          // cy.get(commonLocators.dropdownOptions).contains(data[loc]).click()
        } else if (loc.includes('TextButton')) {
          if (loc.includes('Unique')) {
            cy.get(Locs[loc]).contains(window.uniqueId).click({ force: true });
          } else {
            cy.get(Locs[loc]).contains(data[loc]).click({ force: true });
          }
        } else if (loc.includes('ImageHolder')) {
          cy.get(Locs[loc]).attachFile(data[loc]);
        } else if (loc.includes('FileHolder')) {
          cy.get(Locs[loc]).attachFile(data[loc]);
        } else if (loc.includes('Types')) {
          for (let type in data[loc]) {
            cy.get(Locs[loc]).contains(data[loc][type]).click();
          }
        } else if (loc.includes('Multiple')) {
          for (let itemName in data[loc]) {
            cy.get(Locs[loc]['input']).clear().type(data[loc][itemName]);
            cy.get(Locs[loc]['searchedItem'])
              .contains(data[loc][itemName])
              .click();
          }
        } else if (loc.includes('Btn') || loc.includes('TabButton')) {
          if (loc.includes('Force') || loc.includes('Tab')) {
            cy.get(Locs[loc]).click({ force: true });
          } else {
            cy.get(Locs[loc]).click();
          }
        } else if (loc.includes('Latest')) {
          cy.get(Locs[loc]).last().click();
        } else if (loc.includes('Radio')) {
          cy.get(Locs[loc]).check(data[loc]);
        } else if (loc.includes('ClickRowElement')) {
          cy.get(Locs[loc]['name'])
            .contains(generateUniqueName(data[loc]))
            .parents(Locs[loc]['parent'])
            .find(Locs[loc]['element'])
            .click();
        } else if (loc.includes('Identifier')) {
          cy.get(Locs[loc] + ':contains(' + window.roId + ')')
            .last()
            .parents(locators['jobCard'])
            .find(locators[loc + 'Clickable'])
            .click({ force: true });
        } else if (loc.includes('ContainsText')) {
          cy.get(Locs[loc])
            .invoke('text')
            .then((copy) => {
              expect(copy).to.contains(data[loc]);
            });
        } else if (loc.includes('Includes')) {
          cy.get(Locs[loc]).each((el, index, list) => {
            cy.wrap(el)
              .invoke('text')
              .then((elementtext) => {
                expect(data[loc]).to.includes(elementtext);
              });
          });
        } else if (loc.includes('_Unique')) {
          cy.get(Locs[loc]).clear({ force: true });
          let uniqueValue = '';
          if (loc.includes('Name')) {
            uniqueValue = generateUniqueName(data[loc]);
            setUniqueName(uniqueValue);
            cy.get(Locs[loc]).type(uniqueValue);
          } else if (loc.includes('Phone')) {
            uniqueValue = generateUniquePhone(data[loc]);
            setUniquePhone(uniqueValue);
            cy.get(Locs[loc]).type(uniqueValue);
          } else if (loc.includes('Plate')) {
            uniqueValue = generateUUID();
            setUniquePlate(uniqueValue);
            cy.get(Locs[loc]).type(uniqueValue);
          } else {
            uniqueValue = generateUniqueEmail(data[loc]);
            setUniqueEmail(uniqueValue);
            cy.get(Locs[loc]).type(uniqueValue);
          }
        } else if (loc.includes('FieldLabel')) {
          cy.get(Locs[loc]['mandatorySign']).each((col, index, list) => {
            // Will be defined later
            if (operation.includes('Valid')) {
              cy.wrap(col)
                .parents(Locs[loc]['parentElement'])
                .find(Locs[loc]['fieldLabel'])
                .should('have.css', 'color', getColor('valid'));
            } else {
              cy.wrap(col)
                .parents(Locs[loc]['parentElement'])
                .find(Locs[loc]['fieldLabel'])
                .should('have.css', 'color', getColor('invalid'));
            }
          });
        } else if (loc.includes('AssertText')) {
          if (loc.includes('Unique')) {
            if (loc.includes('Name')) {
              cy.get(Locs[loc]).should('have.text', getUniqueName());
            } else if (loc.includes('Phone')) {
              cy.get(Locs[loc]).should('have.text', getUniquePhone());
            } else if (loc.includes('Plate')) {
              cy.get(Locs[loc]).should('have.text', getUniquePlate());
            } else {
              cy.get(Locs[loc]).should('have.text', getUniqueEmail());
            }
          } else {
            cy.get(Locs[loc]).should('have.text', data[loc]);
          }
        } else if (loc.includes('AssertValue')) {
          cy.get(Locs[loc]).should('have.value', data[loc]);
        } else if (loc.includes('InputField')) {
          cy.get(Locs[loc]['input'])
            .invoke('val')
            .then((inputValue) => {
              cy.get(Locs[loc]['value'])
                .eq(data[loc])
                .should('contain', inputValue);
            });
        } else if (loc.includes('CompareText')) {
          cy.get(Locs[loc]['label'])
            .invoke('text')
            .then((labelValue) => {
              labelValue = labelValue.replaceAll(' ', '');
              cy.get(Locs[loc]['value'])
                .eq(data[loc])
                .invoke('text')
                .then((expectedLabel) => {
                  expectedLabel = expectedLabel.replaceAll(' ', '');
                  expect(labelValue).to.be.eql(expectedLabel);
                });
            });
        } else if (loc.includes('SubLabel')) {
          cy.get(Locs[loc]['label'])
            .invoke('text')
            .then((labelValue) => {
              // labelValue = labelValue.replaceAll(" ", "")
              labelValue = labelValue.toString();
              cy.log(labelValue);
              labelValue = labelValue.split(data[loc])[1];
              cy.log(labelValue);
              cy.get(Locs[loc]['value'])
                .eq(0)
                .invoke('text')
                .then((expectedLabel) => {
                  // expect(labelValue).to.be.eql(expectedLabel)
                });
            });
        } else if (loc.includes('TotalAmount')) {
          let previewTotal = 0.0;
          cy.get(Locs[loc]['label']).each((col, index, list) => {
            let lineItemTotal = col.text();
            cy.get(Locs[loc]['value'])
              .eq(index)
              .invoke('text')
              .should('equal', lineItemTotal);
            previewTotal =
              previewTotal + parseFloat(lineItemTotal.replace('$', ''));
            if (index == list.length - 1) {
              cy.get(Locs[loc]['total']).should(
                'have.text',
                '$' + previewTotal.toString(),
              );
            }
          });
        } else if (loc.includes('HaveLength')) {
          cy.get(Locs[loc]).should("have.length", data[loc])
        } else if (loc.includes('Msg')) {
          cy.get(Locs[loc]).should('have.text', data[loc]);
        } else if (loc.includes('NotInDOM')) {
          cy.get(Locs[loc]).should('not.exist');
        } else if (loc.includes('BeInDOM')) {
          cy.get(Locs[loc]).should('exist');
        } else if (loc.includes('BeVisible')) {
          cy.get(Locs[loc]).should('be.visible');
        } else if (loc.includes('BeDisabled')) {
          cy.get(Locs[loc]).should('be.disabled');
        } else if (loc.includes('NotDisabled')) {
          cy.get(Locs[loc]).should('not.be.disabled');
        } else if (loc.includes('Evaluated')) {
          cy.get(Locs[loc]).should('have.value', data[loc]);
        } else if (loc.includes('@')) {
          cy.wait(loc).its('response.statusCode').should('eq', Locs[loc]);
        } else {
          cy.get(Locs[loc]).clear();
          cy.get(Locs[loc]).type(data[loc]);

          // if (fieldsType == "exceedingCharaterLimits" || fieldsType == "invalidData") {
          //     cy.get(Locs[loc]).parent().parent().find(commonLocators.validationError).invoke("text").then(errorText => {
          //         expect(customerVehicleData.errorMessages).to.be.include(errorText)
          //         if (fieldsType == "exceedingCharaterLimits") {
          //             cy.get(Locs[loc]).type("{backspace}")
          //         } else {
          //             cy.get(Locs[loc]).clear()
          //             cy.get(Locs[loc]).type(customerVehicleData["validData"][fields][loc])
          //         }

          //         cy.get(Locs[loc]).parent().parent().find(commonLocators.validationError).should("not.exist")
          //     })
          // }
        }
      }
    });
  },
);

export function selectFromDropdown(loc, data) {
  cy.get(loc['dropdown']).click();
  cy.get(loc['dropdown'])
    .parent()
    .find(loc['option'])
    .contains(data)
    .click();
}

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add('loginWithApi', (username, password) => {
  cy.request({
    method: 'POST',
    url: getEnvUrl() + 'auth/login',
    headers: {
      Host: 'api.torque360.co',
      Connection: 'keep-alive',
      Accept: 'application/json, text/plain, */*',
      // "Authorization": "Bearer undefined",
      Origin: Cypress.config().baseUrl,
      Referer: Cypress.config().baseUrl + '/',
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
      window.localStorage.setItem('userData', JSON.stringify(response.body));
      window.localStorage.setItem('token', response.body.token);
      window.token = response.body.token
      setUserToken(response.body.token)
      cy.log(window.token)
      // cy.writeFile("cypress/fixtures/userData", JSON.stringify(response.body))
      cy.log('The user logged in successfully');
    });
  });
});

let token = ""
function setUserToken(userToken) {
  token = userToken
}

export function getUserToken() {
  return token
}

Cypress.Commands.add('socialLoginWithApi', (loginCreds) => {
  cy.request({
    method: 'POST',
    url: getEnvUrl() + 'auth/login',
    headers: {
      Host: 'api.torque360.co',
      Connection: 'keep-alive',
      Accept: 'application/json, text/plain, */*',
      // "Authorization": "Bearer undefined",
      Origin: Cypress.config().baseUrl,
      Referer: Cypress.config().baseUrl + '/',
    },
    body: loginCreds,
  }).then((response) => {
    expect(response.status).equal(201);
    // Storing user Data in Cache
    cy.window().then((window) => {
      window.localStorage.setItem('userData', JSON.stringify(response.body));
      window.localStorage.setItem('token', response.body.token);
      // cy.writeFile("cypress/fixtures/userData", JSON.stringify(response.body))
      cy.log('The user logged in successfully');
    });
  });
});

Cypress.Commands.add('getUserDetailToken', (authToken) => {
  cy.intercept('GET', '/dashboard').as('dashboard');

  cy.request({
    method: 'GET',
    url: 'https://api.torque360.co/api/dashboard/getuserdetails',
    headers: {
      Host: 'api.torque360.co',
      Connection: 'keep-alive',
      Accept: 'application/json, text/plain, */*',
      Authorization: 'Bearer ' + authToken,
      Origin: 'https://www.develop.portal.torque360.co',
      Referer: 'https://www.develop.portal.torque360.co/',
    },
    followRedirect: true,
  }).then((response) => {
    expect(response.status).equal(200);
    cy.log(response.body.message);
  });
});

Cypress.Commands.add('loginWithUI', (username, password) => {
  cy.visit('/');
  // Check if the user is on the login page.
  cy.get(SignInLocators.emailField).should('be.visible');

  // Enter credentials and login.
  cy.get(SignInLocators.emailField).type(username);
  cy.get(SignInLocators.passwordField).type(password);

  cy.get(SignInLocators.submitButton).click();
});

Cypress.Commands.add('generateUniqueVehiclePlate', (previousVehiclePlate) => {
  let VehiclePlate = previousVehiclePlate.split('-')[0];
  let uniqueNumber = previousVehiclePlate.split('-')[1];
  uniqueNumber = parseInt(uniqueNumber) + 2;
  let newVehiclePlate = VehiclePlate + '-' + uniqueNumber;
  return newVehiclePlate;
});

Cypress.Commands.add('addInspection', (type) => {
  cy.get(InspectionLocators.inspectionTypes[type]).click({ force: true });
  let condition = '';
  cy.fixture('Inspection_data').then((returnedData) => {
    let data = returnedData.inspectionTypes[type];
    for (let part in data) {
      condition = data[part];
      cy.get(InspectionLocators.partName)
        .contains(part)
        .parents(InspectionLocators.partRowInTemplate)
        .find(InspectionLocators.partNotes)
        .focus()
        .type('the ' + part + ' is in ' + condition + ' condition.', {
          force: true,
        });

      cy.get(InspectionLocators.partName)
        .contains(part)
        .parents(InspectionLocators.partRowInTemplate)
        .find(InspectionLocators.partImageHolder)
        .attachFile(condition + '.png');

      cy.get(InspectionLocators.partName)
        .contains(part)
        .parents(InspectionLocators.partRowInTemplate)
        .find("[value='" + condition + "']")
        .click({ force: true });
    }
  });
});

Cypress.Commands.add('assertRecommendationsAdded', () => {
  cy.get(InspectionLocators.recommendationToggle).click();
  let condition = '';
  cy.fixture('Inspection_data').then((returnedData) => {
    let data = returnedData.inspectionTypes;
    for (let typeOfRec in data) {
      for (let part in data[typeOfRec]) {
        condition = data[typeOfRec][part];
        if (condition != 'OK') {
          cy.get(InspectionLocators.recommendationsAdded.partsName)
            .contains(part)
            .parents(InspectionLocators.recommendationsAdded.recommendation)
            .find(InspectionLocators.recommendationsAdded.partNotes)
            .should(
              'have.text',
              'the ' + part + ' is in ' + condition + ' condition.',
            );

          cy.get(InspectionLocators.recommendationsAdded.partsName)
            .contains(part)
            .parents(InspectionLocators.recommendationsAdded.recommendation)
            .find(InspectionLocators.recommendationsAdded.partsConditionSeleted)
            .should('have.value', condition);
        }
      }
    }
  });
});

Cypress.Commands.add(
  'assertInspectionPreview',
  (techRecommendation, condition) => {
    cy.fixture('Inspection_data').then((data) => {
      cy.get(InspectionLocators.previewCondition.name).click();
      // for (let )
      cy.get(InspectionLocators.previewCondition.recommendation).each(
        (el, index, $list) => {
          el.find(InspectionLocators.previewCondition.partsName)
            .invoke('text')
            .then((partsName) => {
              let partName = partsName;
              cy.wrap(el)
                .find(InspectionLocators.previewCondition.partsConditionSeleted)
                .should('be.checked');
              cy.wrap(el)
                .find(InspectionLocators.previewCondition.partsConditionSeleted)
                .invoke('');

              expect(data.inspectionTypes.partsCondition).to.include(
                condition + partName,
              );
              if ($list.length == index + 1) {
                cy.log('Asserting total number of ' + techRecommendation);
                cy.get(InspectionLocators.previewCondition.partsName)
                  .its('length')
                  .should('eq', $list.length);
                cy.get(
                  InspectionLocators.previewCondition.recommendationCount,
                ).should('have.text', $list.length);
              }
            });
        },
      );
      // Hide the condition section
      cy.get(InspectionLocators.previewCondition.name)
        .contains(conditionType)
        .click();
    });
  },
);

Cypress.Commands.add('addToEstimate', (operation, fieldsType) => {
  if (operation == 'labors') {
    cy.addLaborsUsingApi();
  } else if (operation == 'parts') {
    cy.addPartssUsingApi();
  } else {
    cy.addSuppliesUsingApi();
  }
  cy.performOperation(operation, fieldsType);
});

Cypress.Commands.add('addLaborsUsingApi', () => {
  cy.fixture('Labors').then((data) => {
    let token = localStorage['token'];
    for (let labor in data) {
      let name = data[labor].category;
      cy.log(name);
      cy.request({
        method: 'GET',
        url: getEnvUrl() + 'estimate/searchLaborByCategory/' + name,
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
        if (response.body.result.length == 0) {
          cy.log(JSON.stringify(response.body.result));
          cy.request({
            method: 'POST',
            url: getEnvUrl() + 'estimate/save-labour',
            headers: {
              Connection: 'keep-alive',
              Accept: 'application/json, text/plain, */*',
              Authorization: 'Bearer ' + token,
              authority: 'apidevelop.torque360.co',
              Origin: Cypress.config().baseUrl,
              Referer: Cypress.config().baseUrl + '/',
            },
            body: data[labor],
          }).then((response) => {
            expect(response.status).equal(200);
            cy.log('the Labors created successfully.');
          });
        } else {
          cy.log('The Labor already exists.');
        }
      });
    }
  });
});

Cypress.Commands.add('addPartssUsingApi', () => {
  let token = localStorage['token'];
  cy.fixture('Parts').then((data) => {
    for (let parts in data) {
      let name = data[parts]['partName'];
      cy.log(name);
      cy.request({
        method: 'POST',
        url: getEnvUrl() + 'estimate/search-parts',
        headers: {
          Connection: 'keep-alive',
          Accept: 'application/json, text/plain, */*',
          Authorization: 'Bearer ' + token,
          authority: 'apidevelop.torque360.co',
          Origin: Cypress.config().baseUrl,
          Referer: Cypress.config().baseUrl + '/',
        },
        body: {
          partName: name,
        },
      }).then((response) => {
        expect(response.status).equal(200);
        if (response.body.result.length == 0) {
          cy.log(JSON.stringify(response.body.result));
          cy.request({
            method: 'POST',
            url: getEnvUrl() + 'estimate/save-parts',
            headers: {
              Connection: 'keep-alive',
              Accept: 'application/json, text/plain, */*',
              Authorization: 'Bearer ' + token,
              authority: 'apidevelop.torque360.co',
              Origin: Cypress.config().baseUrl,
              Referer: Cypress.config().baseUrl + '/',
            },
            body: data[parts],
          }).then((response) => {
            expect(response.status).equal(200);
            cy.log('the Parts created successfully.');
          });
        } else {
          cy.log('The part already exists.');
        }
      });
    }
  });
});

Cypress.Commands.add('addSuppliesUsingApi', () => {
  let token = localStorage['token'];
  cy.fixture('Supplies').then((data) => {
    for (let item in data) {
      let name = data[item]['item'];
      cy.log(name);
      cy.request({
        method: 'POST',
        url: getEnvUrl() + 'estimate/searchSupplyByName',
        headers: {
          Connection: 'keep-alive',
          Accept: 'application/json, text/plain, */*',
          Authorization: 'Bearer ' + token,
          authority: 'apidevelop.torque360.co',
          Origin: Cypress.config().baseUrl,
          Referer: Cypress.config().baseUrl + '/',
        },
        body: {
          item: name,
        },
      }).then((response) => {
        expect(response.status).equal(200);
        if (response.body.result.length == 0) {
          cy.log(JSON.stringify(response.body.result));
          cy.request({
            method: 'POST',
            url: getEnvUrl() + 'estimate/save-supplies',
            headers: {
              Connection: 'keep-alive',
              Accept: 'application/json, text/plain, */*',
              Authorization: 'Bearer ' + token,
              authority: 'apidevelop.torque360.co',
              Origin: Cypress.config().baseUrl,
              Referer: Cypress.config().baseUrl + '/',
            },
            body: data[item],
          }).then((response) => {
            expect(response.status).equal(200);
            cy.log('the Supply created successfully.');
          });
        } else {
          cy.log('The supply already exists.');
        }
      });
    }
  });
});

export function emailFromZoho(key, operation) {
  // let token = localStorage['token'];
  let responseStatus = 429
  for (let i in Cypress.env("zohoEmailEndpoints")) {
    if (responseStatus != 200) {
      cy.request({
        method: 'GET',
        url: Cypress.env("zohoEmailEndpoints")[i] + "search?searchKey=" + key,
        headers: {
          Connection: 'keep-alive',
          Accept: 'application/json, text/plain, */*',
          // Authorization: 'Bearer ' + token,
          // authority: 'apidevelop.torque360.co',
          // Origin: Cypress.config().baseUrl,
          // Referer: Cypress.config().baseUrl + '/',
        },
      }).then((response) => {
        if (response.status === 200) {
          responseStatus = 200
          switch (operation) {
            case "estimateAuthorization":
              cy.log(response.body)
              break
          }
        }
      })
    }
  }
}

Cypress.Commands.add('runRoutes', () => {
  cy.intercept('POST', getEnvUrl() + 'stores/add').as('storeOnboarding');
  cy.intercept('POST', getEnvUrl() + 'inspection/save-inspection').as(
    'createInspection',
  );
  cy.intercept('POST', getEnvUrl() + 'auth/signup').as('createAccount');
  cy.intercept('POST', getEnvUrl() + 'jobcard/create-job-card').as(
    'createJobCard',
  );
  cy.intercept('PUT', getEnvUrl() + 'jobcard/update-job-card').as(
    'updateJobcard',
  );
  cy.intercept('GET', getEnvUrl() + 'jobcard/get-job-cards').as('getJobcards');
  cy.intercept('PUT', getEnvUrl() + 'appointment/update-appointment').as(
    'updateAppointment',
  );
  cy.intercept('POST', getEnvUrl() + 'jobcard/confirm-items').as(
    'confirmJobcardItems',
  );
  cy.intercept('POST', getEnvUrl() + 'quickcheckout/create-quick-check-out').as(
    'createQuickChckOut',
  );
  cy.intercept('POST', getEnvUrl() + 'invoice/create-invoice').as(
    'createInvoice',
  );
  cy.intercept('GET', getEnvUrl() + 'inspection/inspection-seed-data').as(
    'inspectionConversion',
  );
  cy.intercept('PUT', getEnvUrl() + 'estimate/update-estimate').as(
    'updateEstimate',
  );
  cy.intercept('GET', '/api/inspection/search?*').as('searchCustomer');
  cy.intercept(
    'POST',
    Cypress.env('branding_site') + '/wp-admin/admin-ajax.php',
  ).as('submitTrialForm');
  cy.intercept('GET', getEnvUrl() + 'vehicle/get-car-fax/*').as(
    'vinSearch',
  );
  cy.intercept('GET', getEnvUrl() + 'vehicle/get-car-fax-plate/**').as(
    'plateLookup',
  );
  cy.intercept('POST', getEnvUrl() + 'labourGuide/add-labour-guide-vin').as("getLaborTimes")
  cy.intercept('POST', getEnvUrl() + 'repairOrder/save').as('createRO');
  cy.intercept('GET', getEnvUrl() + 'repairOrder/get-repair-order-by-id/*').as(
    'getCreatedRO',
  );
  cy.intercept('PUT', getEnvUrl() + 'repairOrder/update').as('updateRO')

  cy.intercept('GET', getEnvUrl() + 'labourClass/get-labour-classes').as(
    'getLaborClasses',
  );
  cy.intercept('POST', getEnvUrl() + 'labourClass/add').as('createLaborClass');
  cy.intercept('DELETE', getEnvUrl() + 'labourClass/delete').as(
    'deleteLaborClass',
  );
  cy.intercept('PUT', getEnvUrl() + 'labourClass/update').as(
    'updateLaborClass',
  );

  cy.intercept('GET', getEnvUrl() + 'tax-class/list').as('getTaxClasses');
  cy.intercept('POST', getEnvUrl() + 'tax-class/create').as('createTaxClass');
  cy.intercept('PUT', getEnvUrl() + 'ax-class/update').as('updateTaxClass');

  cy.intercept('POST', getEnvUrl() + 'estimate/createJob').as('createJob');
  cy.intercept('PUT', getEnvUrl() + 'estimate/job/update').as('updateJob');
  cy.intercept('GET', getEnvUrl() + 'estimate/get-jobs/*').as(
    'getJobsOfEstimate',
  );
  cy.intercept('GET', getEnvUrl() + 'estimate/get-canned-services').as(
    'getCannedServices',
  );
  cy.intercept('POST', getEnvUrl() + 'estimate/jobs/bulk-create').as(
    'createJobUsingCannedService',
  );
  cy.intercept('GET', getEnvUrl() + 'inspection/get-code-details/*').as(
    'getOBDCode',
  );

  cy.intercept('POST', getEnvUrl() + 'estimate/create-estimate').as(
    'createEstimate',
  );
  cy.intercept('POST', getEnvUrl() + 'estimate/authorize-estimate').as(
    'authorizeEstimate',
  );
  cy.intercept("GET", getEnvUrl() + "repairOrder/get-repair-order-estimated-total/*").as("getEstimatedTotals")
  cy.intercept("POST", getEnvUrl() + "payment/create-payment").as("addPayment")
  cy.intercept("GET", getEnvUrl() + "invoice/get-invoice-by-id/*").as("getInvoiceById")
  cy.intercept("GET", getEnvUrl() + "pricingMatrix/get-pricing-matrix").as("getPricingMatrix")
  cy.intercept("POST", getEnvUrl() + "pricingMatrix/add-pricing-matrix").as("createPricingMatrix")
  cy.intercept("PUT", getEnvUrl() + "pricingMatrix/update-pricing-matrix").as("updatePricingMatrix")
  cy.intercept("DELETE", getEnvUrl() + "pricingMatrix/delete-pricing-matrix/*").as("deletePricingMatrix")
});
