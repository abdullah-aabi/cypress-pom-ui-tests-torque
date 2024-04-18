export default {
    form: {
        profileImageHolder: "#profileImg",
        businessNameField: "[name='businessName']",
        ownernameField: "[name='ownerName']",
        mobileField: "#mobileNum",
        emailField: "[name='email']",
        currencyListBtn: "#currency",
        currencyTextButton: "div#menu-currency li",
        timezoneListBtn: "#timeZone",
        timezoneTextButton: "div#menu-timeZone li",
        baysSlider: "span[role='slider']",
        featureAndOperationsCheckSpan: ".multi_span",
        customServicesField: "[name='otherServices']",
        startBtn: "button.save__btn",
        "@storeOnboarding": 200
    },
    verification: {
        AssertHeading: "input[name='businessName']",
        AssertAddress: "input[name='address']",
        AssertMobile: ":nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > #mobileNum",
        AssertPhone: ":nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > #mobileNum",
        AssertMechannics: "input[name='NumOfMechanics']",
        AssertBays: "input[name='NumOfBays']",
        AssertTax: "#taxValue",
        AssertInspectionFee: "input[name='inspectionFee']"
    },
    AccountSettings: {
        accountSetBtn: "#vertical-tab-1",
        assertHeader: ".account__settings__heading",
        AssertName: "input[name='name']",
        AssertPhone: "#phone"
    },
    AssertEmail: "input[name='email']",
    AssertDesignation: "input[name='designation']",
    AssertAddress: "input[name='address']"
}