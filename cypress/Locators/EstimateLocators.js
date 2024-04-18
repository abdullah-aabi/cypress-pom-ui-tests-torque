export default {
  creates: {
    createNewJobTextButton: 'button.MuiButton-text',
    '@createJob': 200,
    successMsg: 'div.Toastify__toast--success',
  },
  createCanned: {
    jobName: '[name="serviceDetails"]',
    createNewJobTextButton: 'button.MuiButton-text',
    '@getCannedServices': 200,
    cannedServiceTextButtonUnique:
      'div.dialog__content__inner div.MuiAccordion-rounded',
    addServiceTextButton: 'div.dialog__actions__container button',
    '@createJobUsingCannedService': 200,
  },
  fillJob: {
    jobName_Unique: 'input#serviceDetails',
    jobNameBtn: 'div.MuiAutocomplete-popper',
  },
  selectOptionsInJob: {
    // jobMultiple_Unique: {
    //   input: 'input#serviceDetails',
    //   searchedItem: 'div.MuiAutocomplete-popper',
    // },
    jobtypeDropdown: {
      dropdown: "[data-testid='jobTypeDropdown']",
      parent: 'div',
      option: 'div > div > div',
    },
    mechanicDropdown: {
      dropdown: "[data-testid='technicianDropdown']",
      parent: 'div',
      option: 'div > div > div',
    },
  },
  estimateTabButton: 'button#simple-tab-2',
  workOrderTabButton: 'button#simple-tab-3',
  concernsToggle: 'div.ro__fields__padding__right',
  recommendationToggle: 'div.ro__fields__padding__left',
  convertToJob: {
    countBtn: 'p.title',
    heading: 'p.heading',
    chooseAllBtn: "input[value='all']",
    createJobBtn: 'button.right__btn.main__btn',
    nonConvertedConcernCheck: 'svg.unchecked',
    sectionAccordian: 'div.ro__main__accordion',
    concernRecommendation: 'div.concerns__recommendations__list',
  },
  assertConvertedJobs: {
    concernsCount:
      "div.ro__fields__padding__right div.heading__actions span.Mui-checked input[type='checkbox']",
    recommendationCount:
      "div.ro__fields__padding__left span.Mui-checked input[type='checkbox']",
    // successMsg: 'div.Toastify__toast--success', // Bug
  },
  jobs: '#simple-tabpanel-2 > div > div.MuiGrid-container:nth-child(2) div.MuiGrid-container > div:nth-child(2) > div',
  jobToggle: 'button.bg-primary',
  concernSections: 'div.accordion__details',
  jobProfit: "p.profit",
  laborRows: '#panel1bh-content div.MuiAccordionDetails-root > div:nth-child(2) > div:nth-child(2) > div > div',
  addItemBtn: '#panel1bh-content div.MuiAccordionDetails-root > div > div:nth-child(1) > button',
  laborGuideBtn: 'button.repair__time__guides__btn',
  valueToggleBtn: 'button.toggle_btn',
  sideClick: 'p.heading__width:nth-child(1)',
  deleteLineBtn: 'div.flex-center',
  lineItem: {
    name: "input[name='description']",
    salePrice: "input[name='price']",
    hoursOrQty: "input[name='qty']",
    discount: "input[name='discount']",
    lineItemTotalAssertValue: "input[name='subTotal']"
  },
  lineItemView: {
    name: "input[name='description']",
    salePrice: "div:nth-child(2) p",
    hoursOrQty: "div:nth-child(3) p",
    discount: "input[name='discount']",
    lineItemTotalAssertValue: "input[name='subTotal']"
  },
  partDetail: {
    partSupplyNo: "input[name='partSupplyNo']",
    vendor: "input[name='vendor']",
    cost: "input[name='cost']",
    binLocation: "input[name='binLocation']",
    partConditionDropdown: { // Bug, not unique
      dropdown: "[data-testid='partConditionDropdown']",
      parent: 'div',
      option: 'div > div > div',
    },
    pricingMatrixDropdown: { // Bug, not unique
      dropdown: "[data-testid='pricinMatrixDropdown']",
      parent: 'div',
      option: 'div > div > div',
    },
    addTagsButton: "ul > button",
    addTag: "input#id",
  },
  labor: {
    nameNotInDOM: "input[name='description'].Mui-disabled",
    name: "input[name='description']",
    hoursNotInDOM: "input[name='hours'].Mui-disabled",
    hours: "input[name='hours']",
    rateNotInDOM: "input[name='rate'].Mui-disabled",
    rate: "input[name='rate']",
    markupNotInDOM: "input[name='markup'].Mui-disabled",
    markup: "input[name='markup']",
    discountNotInDOM: "input[name='discount'].Mui-disabled",
    discount: "input[name='discount']",
    '@updateJob': 200,
    lineItemTotalAssertValue: '.inpContainer .Mui-disabled input'
  },
  part: {
    nameNotInDOM: "input[name='description'].Mui-disabled",
    name: "input[name='description']",
    hoursNotInDOM: "input[name='qty'].Mui-disabled",
    hours: "input[name='qty']",
    rateNotInDOM: "input[name='cost'].Mui-disabled",
    rate: "input[name='cost']",
    markupNotInDOM: "input[name='markup'].Mui-disabled",
    markup: "input[name='markup']",
    discountNotInDOM: "input[name='discount'].Mui-disabled",
    discount: "input[name='discount']",
    '@updateJob': 200,
    lineItemTotalAssertValue: '.inpContainer .Mui-disabled input'
  },
  misc: {
    nameNotInDOM: "input[name='description'].Mui-disabled",
    name: "input[name='description']",
    hoursNotInDOM: "input[name='qty'].Mui-disabled",
    hours: "input[name='qty']",
    rateNotInDOM: "input[name='cost'].Mui-disabled",
    rate: "input[name='cost']",
    markupNotInDOM: "input[name='markup'].Mui-disabled",
    markup: "input[name='markup']",
    discountNotInDOM: "input[name='discount'].Mui-disabled",
    discount: "input[name='discount']",
    '@updateJob': 200,
    lineItemTotalAssertValue: '.inpContainer .Mui-disabled input'
  },
  jobTotals: {
    hoursTotal: "#panel1bh-header p:nth-child(1) span",
    laborTotal: "#panel1bh-header p:nth-child(2) span",
    partTotal: "#panel1bh-header p:nth-child(3) span",
    miscTotal: "#panel1bh-header p:nth-child(4) span",
    discountTotal: "#panel1bh-header p:nth-child(5) span",
    taxTotal: "#panel1bh-header p:nth-child(6) span",
    jobTotal: "#panel1bh-header p:nth-child(7) span",
  },
  applyTax: {
    isTaxedCheck: "input[name='checkedB']",
    '@updateJob': 200,
    taxTypeDropdown: {
      dropdown: "[data-testid*='TaxDropdown']",
      parent: 'div',
      option: 'div > div > div',
    },
  },
  authorization: {
    // saveEstimatesBtn: 'button.save__btn',
    // '@createEstimate': 200,
    authorizeBtn: 'div#simple-tabpanel-2 div.MuiGrid-grid-md-4 button',
    authTypeTextButton: 'div.MuiTabs-fixed button',
    authMethodDropdown: {
      dropdown: 'div#scrollable-auto-tabpanel-1 button',
      option: 'div > div > div',
    },
    jobsCheck: "div#scrollable-auto-tabpanel-1 input[type='checkbox']",
    authNotes: "textarea[name='customerNotes']",
    // submitTextButton: 'button.sub_mit_btn', // bug
    submitTextButton: 'div.dialog__actions__container button',
    '@authorizeEstimate': 200,
  },
  saveAsCannedService: {
    saveAsCannedDropdown: {
      dropdown: 'div.p-relative > button:visible',
      option: 'li.MuiListItem-gutters',
    },
    '@updateJob': 200,
    // successToastContainsText: 'div.Toastify__toast-body',
  },
  customerConverns: {},
  estimatedTotalAccordianTextButton: "div#panel1a-header",
  estimatedTotals: {
    totalLabor: "div#panel1a-content > div > div > div:nth-child(1)",
    totalPartsAndSupplies: "div#panel1a-content > div > div > div:nth-child(2)",
    totalMisc: "div#panel1a-content > div > div > div:nth-child(3)",
    estimatedSubTotal: "div#panel1a-content > div > div > div:nth-child(4)",
    totalDiscount: "div#panel1a-content > div > div > div:nth-child(5)",
    totalTax: "div#panel1a-content > div > div > div:nth-child(6)",
    grandTotal: "div#panel1a-content > div > div > div:nth-child(7)"
  },
  repairTimes: {
    // laborGuideBtn: 'button.repair__time__guides__btn', // bug
    laborGuideBtn: '#panel1bh-content > div > div > div:nth-child(2) > button.MuiButton-text',
    vin: "input#export__from",
    submitTextButton: "div.dialog__actions button",
    addRepairTimes: {
      row: "div.MuiAccordion-rounded",
      selectRepairTime: "input[type='checkbox']",
      time: "div.MuiAccordionSummary-content > div > div:nth-child(3)",
      laborRate: "input[name='rate']",
      markup: "input[name='markup']",
      total: "div.MuiGrid-grid-xs-4 p:nth-child(2)"
    },
    saveTextButton: "div.dialog__actions__container button:nth-child(2):visible"
  },
  // mandatoryFields: {
  //   manHours: "#manHours"
  // },
  // generateInvalid: {
  //   errorMsg: "div.main__content__jobboard > div > div > div > p:last"
  // },
  // generateValid: {
  //   successMsg: "#swal2-title"
  // },
  // disabledFields: {
  //   otherFieldNotInDOM: "#otherJobType",
  //   generateButtonBeDisabled: "#addEstimate"
  // },
  // parts: {
  //   addPartsBtn: ".add__new__parts button",
  //   searchPartsMultiple: "#partName",
  //   addedPartsTextButton: "div.MuiGrid-justify-content-xs-flex-end button"
  // },
  // supplies: {
  //   addSuppliesBtn: ".add__new__supplies button",
  //   searchSuppliesMultiple: "#item",
  //   addedSuppliesTextButton: "div.MuiGrid-justify-content-xs-flex-end button"
  // },
  // labors: {
  //   addLaborsBtn: ".add__new__labor button:contains(Add Labor)",
  //   laborSearch: "#category",
  //   laborTypes: "div.MuiGrid-container.MuiGrid-item div.MuiChip-clickable",
  //   addedLaborsTextButton: "div.MuiGrid-justify-content-xs-flex-end button"
  // },
  // estimateNoLabelField: {
  //   label: "div.MuiGrid-grid-xs-12.MuiGrid-align-items-xs-center:nth-child(2) div.MuiGrid-justify-content-xs-flex-end p",
  //   value: "div.GarrageInfo h2 span"
  // },
  // previewFields: {
  //   estimateWriterLabelField: {
  //     label: "div.ownerName h5",
  //     value: "div.MuiGrid-grid-xs-12.MuiGrid-align-items-xs-center:nth-child(3) div.MuiGrid-justify-content-xs-flex-end p"
  //   },
  //   customerNameLabelField: {
  //     label: "div.MuiGrid-spacing-xs-2 div.MuiGrid-grid-lg-4:nth-child(2) h3",
  //     value: "div.MuiGrid-grid-xs-12.MuiGrid-align-items-xs-center:nth-child(5) div.MuiGrid-justify-content-xs-flex-end p"
  //   },
  //   vehicleNameLabelField: {
  //     label: "div.MuiGrid-grid-xs-12.MuiGrid-align-items-xs-center:nth-child(6) div.MuiGrid-justify-content-xs-flex-end p",
  //     value: "div.MuiGrid-spacing-xs-2 div.MuiGrid-grid-lg-4:nth-child(3) h3"
  //   },
  //   vehicleColorSubLabel: {
  //     label: "div:nth-child(2) > .MuiGrid-item:nth-child(3) .MuiCardContent-root > div > div:nth-child(1) p",
  //     value: "div.MuiGrid-grid-xs-12.MuiGrid-align-items-xs-center:nth-child(7) div.MuiGrid-justify-content-xs-flex-end p"
  //   },
  //   vehiclePlateSubLabel: {
  //     label: "div:nth-child(2) > .MuiGrid-item:nth-child(3) .MuiCardContent-root > div > div:nth-child(2) p",
  //     value: "div.MuiGrid-grid-xs-12.MuiGrid-align-items-xs-center:nth-child(8) div.MuiGrid-justify-content-xs-flex-end p"
  //   }
  // },
  // partsAmounts: {
  //   partsTotalAmount: {
  //     label: "div.MuiGrid-spacing-xs-2 div.MuiGrid-grid-xs-12.MuiGrid-item:nth-child(1) div > div > div:nth-child(5) > p:nth-child(2)",
  //     value: "div.MuiGrid-grid-xs-12 > div.MuiGrid-grid-xs-12:nth-child(11) > .MuiGrid-grid-xs-12 .MuiGrid-align-items-xs-flex-end",
  //     total: "div.MuiGrid-grid-xs-12 > div.MuiGrid-grid-xs-12:nth-child(11) > .MuiGrid-grid-xs-12 .MuiGrid-justify-content-xs-flex-end"
  //   }
  // },
  // laborsAmounts: {
  //   laborsTotalAmount: {
  //     label: "div:nth-child(3) .MuiBox-root > div > div.MuiGrid-grid-xs-12 > div div:nth-child(4) p:nth-child(2)",
  //     value: "div.MuiGrid-grid-xs-12 > div.MuiGrid-grid-xs-12:nth-child(12) > .MuiGrid-grid-xs-12 .MuiGrid-align-items-xs-flex-end",
  //     total: "div.MuiGrid-grid-xs-12 > div.MuiGrid-grid-xs-12:nth-child(12) > .MuiGrid-grid-xs-12 .MuiGrid-justify-content-xs-flex-end"
  //   }
  // },
  // suppliesAmounts: {
  //   suppliesTotalAmount: {
  //     label: "div.MuiGrid-spacing-xs-2 > div.MuiGrid-grid-xs-12:nth-child(2) div > div > div:nth-child(5) > p:nth-child(2)",
  //     value: "div.MuiGrid-grid-xs-12 > div.MuiGrid-grid-xs-12:nth-child(13) > .MuiGrid-grid-xs-12 .MuiGrid-align-items-xs-flex-end",
  //     total: "div.MuiGrid-grid-xs-12 > div.MuiGrid-grid-xs-12:nth-child(13) > .MuiGrid-grid-xs-12 .MuiGrid-justify-content-xs-flex-end"
  //   }
  // },
  // subTotal: {
  //   partsTotal: "div.MuiGrid-grid-xs-12 > div.MuiGrid-grid-xs-12:nth-child(11) > .MuiGrid-grid-xs-12 .MuiGrid-justify-content-xs-flex-end",
  //   laborsTotal: "div.MuiGrid-grid-xs-12 > div.MuiGrid-grid-xs-12:nth-child(12) > .MuiGrid-grid-xs-12 .MuiGrid-justify-content-xs-flex-end",
  //   suppliesTotal: "div.MuiGrid-grid-xs-12 > div.MuiGrid-grid-xs-12:nth-child(13) > .MuiGrid-grid-xs-12 .MuiGrid-justify-content-xs-flex-end",
  //   subTotalAmountPreview: ".MuiGrid-grid-xs-12:nth-child(15) .MuiGrid-justify-content-xs-flex-end p",
  //   subTotalAmount: "div.MuiGrid-grid-xs-12.MuiGrid-grid-md-6 .MuiGrid-justify-content-xs-flex-end:nth-child(2) p"
  // },
  // taxPreviewValue: ".MuiGrid-grid-xs-12:nth-child(17) div:nth-child(1) p",
  // discountPreviewValue: ".MuiGrid-grid-xs-12:nth-child(16) div:nth-child(1) p",
  // taxPreviewValueCalculated: ".MuiGrid-grid-xs-12:nth-child(17) div:nth-child(2) p",
  // discountPreviewValueCalculated: ".MuiGrid-grid-xs-12:nth-child(16) div:nth-child(2) p",
  // grandTotal: "div.MuiGrid-grid-xs-12.MuiGrid-grid-md-6 .MuiGrid-justify-content-xs-flex-end:nth-child(8) p",
  // grandTotalPreview: ".MuiGrid-grid-xs-12:nth-child(18) div:nth-child(2) p",
  // previewJobTypes: "div.MuiGrid-grid-xs-12.MuiGrid-align-items-xs-flex-start div.MuiGrid-justify-content-xs-flex-end p",
  // previewProblemTypes: ".Mui-disabled textarea[rows='8']",
  // generateBtn: "#addEstimate",
  // okSuccessBtn: ".CustomizeSwalConfirmButton",
  // searchedItem: "ul > li.MuiListItem-gutters",
  // convertToJobCardBtn: ".main__content__jobboard > div > div > div > .MuiGrid-justify-content-xs-flex-end > button.MuiButtonBase-root",
  // authorizeBtn: "#portal div.MuiGrid-grid-xs-12 .MuiGrid-justify-content-xs-flex-end > button",
  // searchCustomer: "#key",
  // addCustomerBtn: ".addCustomer",
  // searchByDropdown: ".MuiPaper-elevation1 div.MuiSelect-selectMenu",
  // customerData: "ul > div",
  // vehicleData: "div.MuiCardContent-root",
  // selectedcustomerData: "div.MuiCardContent-root",
  // selectedvehicleData: "div.MuiCardContent-root",
  // previewField: ".nameValue p.name",
  // previewFieldValue: "p.value",
  // previewConditionName: ".topAccordion .Name",
  // previewConditionValue: ".topAccordion .Value",
  // dropdownOptionButtons: ".MuiListItem-button[role='button']",
  // dropdownVehicleButtons: "span",
  // jobTypes: "div.MuiChip-clickable",
  // otherJobType: "#otherJobType",
  // turnaroundDate: "#turnaroundDate",
  // turnaroundTime: "#turnaroundTime",
  // manHours: "#manHours",
  // tax: "#tax",
  // discount: "#discount",
  // problemSearch: "#input-with-icon-textfield",
  // problems: "div.MuiGrid-direction-xs-column span.MuiFormControlLabel-label",
  // notes: "textarea#notes",
  // discountToggle: "button.toggle_btn",
  // problemTypeBtn: ".MuiGrid-justify-content-xs-space-between button",
  // addPartsBtns: "button.MuiButton-fullWidth",
  // generateEstimateBtn: "#addEstimate",
  // successTitle: "#swal2-title",
  // okBtn: "button.CustomizeSwalConfirmButton",
  // vehicleMakeDropdown: "#vehicleMake",
  // vehicleModelDropdown: "#vehicleModel",
  // vehicleModelYearDropdown: "#modelYear",
  // catagoryCheck: "input[name='partCategory']",
  // searchPart: "#partName",
  // vendorDropddown: "#vendor",
  // laborSearch: "#category",
  // supplySearch: "#item",
  // vendorDropdown: "#vendor"
};
