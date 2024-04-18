let ownerName = "input#name"
let ownerEmail = "input#email"
let ownerPhone = "div.Phone_field input"
let passwordField = "input#password"
let submitButton = "button#submit-login"
export default {
    submitTrialForm: {
        trialEmail_Unique: ownerEmail,
        contactUsBtn: "button#contact_us",
        "@submitTrialForm": 200,
        successMsg: "div.success span.fusion-alert-content"
    },
    trialSignUpBtn: "ul#menu-cryptocurrency-main-menu > li.getstarted a",
    create: {
        name: ownerName,
        userEmail_Unique: ownerEmail,
        phone: ownerPhone,
        password: passwordField,
        submitBtnForce: submitButton,
        "@createAccount": 201
    },
    successMsg: 'div.Toastify__toast--success',
    successMsg: "p.cancel__Subscription__SwalText",
    confirmSuccessMsg: "div.submitConfirmContent p.para",
    invalid: {
        name: ownerName,
        email: ownerEmail,
        phone: ownerPhone,
        password: passwordField,
        submitBtnForce: submitButton,
        "@createAccount": 201,
        successMsg: "div.SubmitConfirmText p.para",
        okBtn: ".submitConfirmAction button"
    },
    passwordPolicy: {
        name: ownerName,
        email: ownerEmail,
        phone: ownerPhone,
        password: passwordField,
        submitBtnForce: submitButton,
        "@createAccount": 201,
        successMsg: "div.SubmitConfirmText p.para",
        okBtn: ".submitConfirmAction button"
    },
    passwordError: "span.MuiListItemText-primary",
    signUpLogo: ".signUpLogo"
}