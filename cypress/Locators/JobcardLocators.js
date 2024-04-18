export default {
    creates: {
        generateBtn: "button.MuiButton-containedPrimary:contains(Generate Job Card)",
        successMsg: "#swal2-title",
        okSuccessBtn: ".CustomizeSwalConfirmButton"
    },
    addsNewData: {
        jobTypes: "div.MuiChip-clickable",
        otherJobType: "#otherJobType",
        tax: "[name='tax']"
    },
    problemTypeBtn: ".main__content__jobboard > div > div > div.MuiGrid-root:nth-child(7) button",
    problemSearch: "#input-with-icon-textfield",
    problemTypes: "div.MuiGrid-direction-xs-column span.MuiFormControlLabel-label",
    addDiscountPercentage: {
        discountToggleTextButton: "button.toggle_btn",
        discount: "[name='discount']"
    },
    addDiscountFixed: {
        discountToggleTextButton: "button.toggle_btn",
        discount: "[name='discount']"
    },
    parts: {
        addPartsBtn: ".add__new__parts button",
        searchPartsMultiple: "#partName",
        addedPartsTextButton: "div.MuiGrid-justify-content-xs-flex-end button"
    },
    supplies: {
        addSuppliesBtn: ".add__new__supplies button",
        searchSuppliesMultiple: "#item",
        addedSuppliesTextButton: "div.MuiGrid-justify-content-xs-flex-end button"
    },
    labors: {
        addLaborsBtn: ".add__new__labor button:contains(Add Labor)",
        laborSearch: "#category",
        laborTypes: "div.MuiGrid-container.MuiGrid-item div.MuiChip-clickable",
        addedLaborsTextButton: "div.MuiGrid-justify-content-xs-flex-end button"
    },
    searchedItem: "div.MuiGrid-container > ul > li.MuiListItem-gutters",
    notesAppendStart: "textarea#notes",
    searchCustomer: "#key",
    addCustomerBtn: ".addCustomer",
    searchByDropdown: ".MuiPaper-elevation1 div.MuiSelect-selectMenu",
    customerData: "ul > div",
    vehicleData: "div.MuiCardContent-root",
    selectedcustomerData: "div.MuiCardContent-root",
    selectedvehicleData: "div.MuiCardContent-root",
    previewField: ".nameValue p.name",
    previewFieldValue: "p.value",
    previewConditionName: ".topAccordion .Name",
    previewConditionValue: ".topAccordion .Value",
    dropdownOptionButtons: ".MuiListItem-button[role='button']",
    dropdownVehicleButtons: "span",
    jobTypes: "div.MuiChip-clickable",
    otherJobType: "#otherJobType",
    keyLocation: "#keyLocation",
    mechanicSearch: "#input-with-icon-textfield",
    notes: "textarea#notes",
    addPartsBtns: "button.MuiButton-fullWidth",
    generateBtns: "button.MuiButton-containedPrimary",
    successTitle: "#swal2-title",
    okBtn: "button.CustomizeSwalConfirmButton"
}