const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  pageLoadTimeout: 30000,
  video: true,
  screenshotOnRunFailure: true,
  videoUploadOnPasses: false,
  chromeWebSecurity: true,
  viewportHeight: 1080,
  viewportWidth: 1920,
  numTestsKeptInMemory: 1,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  env: {
    googleLogin: {
      email: 'qa.abdullah360@gmail.com',
      profileId: '101006533476662473929',
      name: 'Abdullah SQA',
      googleLogIn: true,
    },
    Username: 'abdullah@torque360.co',
    Password: '',
    branding_site: 'https://www.torque360.co',
    newTorqueUrl: 'https://www.feature.torque360.co',
    MAILOSAUR_API_KEY: '',
    MAILOSAUR_Server_ID: 'i6tsvmed',
    MAILOSAUR_Server_Domain: 'i6tsvmed.mailosaur.net',
    supportUrl: 'https://www.support.torque360.co',
    supportUN: '',
    gstTax: 8.7,
    supportPW: '',
    zohoEmailEndpoints: [
      "https://v1.nocodeapi.com/abdullahtorque/zohomail/aEHewMvtueLCWkeE/",
      "https://v1.nocodeapi.com/abdullahtorque1/zohomail/FbSUogreDyoKYlpr/"
    ]
  },
  projectId: 'p8sfxf',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://www.feature.torque360.co',
    specPattern: 'cypress/e2e/Tests_Suites/Product_Side_Specs/**/*.js'
  },
})
// https://accounts.zoho.com/oauth/v2/auth?scope=1000.091ed8c44f4df8bbcfca68326d5f5df4.f96add4e49bff7e6e05891a6da9a725f&client_id=1000.BKI6B5A0IEVBCZXHC1BU76G4S42QJI&response_type=code&access_type=offline&redirect_uri=https://zylkerapps.com/oauth2callback

// https://accounts.zoho.com/oauth/v2/auth
// ?response_type=code 
// &client_id=1000.H9S268P8DEQN7NHOA33D42B44S22HQ
// &scope=ZohoMail.folders.READ
// &redirect_uri=https://zylkerapps.com/oauth2callback
// &state=-5466400890088961855