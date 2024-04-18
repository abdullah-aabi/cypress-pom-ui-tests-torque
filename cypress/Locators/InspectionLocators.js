export default {
    inspectionTabButton: "button#simple-tab-1",

    createNew: {
        inspectionTabButton: "button#simple-tab-1",
        newInspectionBtn: "div.new__ro__inspection__main button.MuiButton-text"
    },
    allFields: {
        inspectionTitle: "#title",
        obdCode1: "input[placeholder='Enter Error Code']",
        "@getOBDCode": 200,
        generateBtn: "div.new__ro__inspection__main button[btnsavedraftclass*='jss']"
    },
    fuelGaugeImageHolder: "#fuelGuageImage",
    odoMeterImageHolder: "#odoMeterImage",
    mandatoryFields: {},
    authorizes: {
        "@createInspection": 200,
        successMsg: "div.Toastify__toast--success"
    },
    generateInvalid: {
        errorMsg: "p#inspection__warning__text"
    },
    generateValid: {
        errorNotInDOM: "p#inspection__warning__text"
    },
    disabledFields: {
        generalInspectionButtonBeDisabled: "div.MuiGrid-grid-xs-4:nth-child(1) button.MuiButton-fullWidth",
        detailedInspectionButtonBeDisabled: "div.selectInspection div:nth-child(2) > button",
        generateButtonBeDisabled: "div.new__ro__inspection__main button[btnsavedraftclass*='jss']"
    },
    inspectionTypes: {
        interiorExterior: "div.Inspection__template__root #simple-tab-0",
        underVehicle: "div.Inspection__template__root #simple-tab-1",
        underHood: "div.Inspection__template__root #simple-tab-2",
        electronics: "div.Inspection__template__root #simple-tab-3",
        detailSearch: ".MuiDialogContent-root button[aria-label='search']"
    },
    inspectionNoLabelField: {
        label: "div.innerTop div.nameValue:nth-child(3) p.value",
        value: "div.GarrageInfo h2 span"
    },
    previewFields: {
        inspectionTitleInputField: {
            input: "#title",
            value: "div.innerTop p.value"
        },
        inspectionByInputField: {
            input: "div.OTTabInput  div.MuiSelect-selectMenu",
            value: "div.innerTop p.value"
        },
        customerNameLabelField: {
            label: "div.MuiGrid-spacing-xs-2 div.MuiGrid-grid-lg-4:nth-child(1) h3",
            value: "div.innerTop p.value"
        },
        vehicleNameLabelField: {
            label: "div.innerTop div.nameValue:nth-child(6) p.value",
            value: "div.MuiGrid-spacing-xs-2 div.MuiGrid-grid-lg-4:nth-child(2) h3"
        },
        vehicleColorSubLabel: {
            label: "div.MuiGrid-spacing-xs-2 div.MuiGrid-grid-lg-4:nth-child(2) .MuiCardContent-root > div > div:nth-child(1) p",
            value: "div.innerTop div.nameValue:nth-child(7) p.value"
        },
        vehiclePlateLSubLabel: {
            label: "div.MuiGrid-spacing-xs-2 div.MuiGrid-grid-lg-4:nth-child(2) .MuiCardContent-root > div > div:nth-child(2) p",
            value: "div.innerTop div.nameValue:nth-child(8) p.value"
        },
        fuelGaugeBeVisible: ".AfterAccordion .fuel__guage link[value='8']",
        extrasWithVehicleInputField: {
            input: "#extrasWithVehicle",
            value: "div.right__extras"
        },
        notesInputField: {
            input: "#notes",
            value: "div.main__root textarea[rows='8']"
        },
        writerInputField: {
            input: "div.OTTabInput  div.MuiSelect-selectMenu",
            value: ".list .right p"
        }
    },
    concernsToggle: "div.ro__fields__padding__right p.title",
    recommendationToggle: "div.ro__fields__padding__left p.title",
    recommendationsAdded: {
        recommendation: "div.ro__fields__padding__left div.concerns__recommendations__list",
        recommendationCount: "div.ro__fields__padding__left p.count",
        partsName: "div.ro__fields__padding__left div.concerns__recommendations__list p.heading",
        partsConditionSeleted: "span.Mui-checked input[name='condition']",
        partNotes: "p.Notes__main",
        badConditionCloseBtn: "#panel1a-content button",
        badConditionPartImage: "#panel1a-content .right div",
        moderateConditionPartsName: "#panel1a-content .names",
        moderateConditionCloseBtn: "#panel2a-content button",
        moderateConditionPartImage: "#panel2a-content .right div"
    },
    generateBtn: "div.new__ro__inspection__main button[btnsavedraftclass*='jss']",
    generalInspectionBtn: "div.MuiGrid-grid-xs-4:nth-child(1) button.MuiButton-fullWidth",
    saveBtn: "button[class*='scss_popup__save_btn']",
    detailedInspectionBtn: "div.MuiGrid-grid-xs-4:nth-child(2) button.MuiButton-fullWidth",
    convertToEstimateBtn: "button.EstimateButton",
    customerData: ".CustomerSearch ul > div:nth-child(1)",
    vehicleData: "div.MuiCardContent-root",
    sideClickBtn: "#customized-menu > div:nth-child(1)",
    selectedcustomerData: "div.MuiCardContent-root",
    selectedvehicleData: "div.MuiCardContent-root",
    previewPrimaryFieldName: ".nameValue p.name",
    previewPrimaryFieldValue: "div.innerTop p.value",
    previewConditionName: ".topAccordion .Name",
    previewConditionValue: ".topAccordion p.Value",
    previewPartsConditionName: "#panel2a-content .names",
    previewPartsConditionCloseBtn: "#panel1a-content button",
    previewPartsConditionPartImage: "#panel1a-content .right div",
    badConditionPartsName: "#panel2a-content .names",
    badConditionCloseBtn: "#panel1a-content button",
    badConditionPartImage: "#panel1a-content .right div",
    moderateConditionPartsName: "#panel1a-content .names",
    moderateConditionCloseBtn: "#panel2a-content button",
    moderateConditionPartImage: "#panel2a-content .right div",
    previewFuelGauge: ".AfterAccordion .fuel__guage link",
    previewDiagnoseData: ".AfterAccordion .names",
    previewSignature: ".signature img",
    dropdownOptionButtons: "li.list__item",
    dropdownVehicleButtons: "span",
    successTitle: "#swal2-title",
    okBtn: "button.CustomizeSwalConfirmButton",
    searchCustomer: "#key",
    addCustomerBtn: ".addCustomer",
    footerBtns: "div.MuiGrid-root button",
    searchByDropdown: ".MuiPaper-elevation1 div.MuiSelect-selectMenu",
    inspectionTitle: "#title",
    inspectionTypeBtns: ".gridLeft button",
    inspectionTypeError: "div.Top > div > p",
    generalInspectionTabBtns: "[role='tablist'] button",
    conditionRadio: "[name='radio']",
    badCondition: "[value='bad']",
    OKCondition: "[value='OK']",
    ModerateCondition: "[value='moderate']",
    dialogBtns: "[role='dialog'] button",
    radioGroup: "[role='radiogroup']",
    partName: "tbody tr td",
    partNotes: "[name='notes']",
    partRowInTemplate: "tr.MuiTableRow-root",
    partImageHolder: "[accept='image/*']",
    diagnosticCode: "#diagnosticCode",
    fuelGaugeBtn: ".OTIcon .fuel__guage link:nth-child(10)",
    fuelGauge: ".OTIcon .fuel__guage link",
    odoMeter: "#odometer",
    extrasWithVehicle: "#extrasWithVehicle",
    generateBtns: ".generate__btns button",
    signatureCanvas: ".submitConfirmInspectionContent canvas"
}