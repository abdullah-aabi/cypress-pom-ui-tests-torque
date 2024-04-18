export default {
  NewLabor: {
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
    lineItemTotalAssertValue: '.inpContainer .Mui-disabled input',
    jobTotal: 'p.summary__heading:nth-child(6) span',
    addedLaborsTextButton:
      '.main__content__jobboard > div > div > div.MuiGrid-root:nth-child(5) > div > div.MuiGrid-container button',
    addNewToggleTextButton:
      'div.MuiGrid-root.MuiGrid-container.MuiGrid-item.MuiGrid-align-items-xs-center.MuiGrid-justify-content-xs-flex-end.MuiGrid-grid-xs-6 button',
    category: '.form_field_estimate #category',
    laborHourCostEvaluated: '#laborHourCost',
    serviceMarkup: '#serviceMarkup',
    laborItemPriceEvaluated: '#laborItemPrice',
    description: '#description',
    notes: '.form_field_estimate #notes',
    addNewBtn:
      'div.MuiGrid-root.MuiGrid-container.MuiGrid-item > div:nth-child(2) div.MuiGrid-align-items-xs-center.MuiGrid-justify-content-xs-center button.MuiButton-text',
    successMsg: '#swal2-title',
    okSuccessBtn: '.CustomizeSwalConfirmButton',
  },
  SearchLabors: {
    laborSearch: '#category',
  },
  createLaborClass: {
    '@getLaborClasses': 200,
    createNewBtn:
      'div.user__setting__grid  div.MuiGrid-justify-content-xs-flex-end  button',
    className_Unique: "input[name='className']",
    classlaborRate: "input[name='classRate']",
    submitBtn: 'div.dialog__actions__container button:nth-child(2)',
    '@createLaborClass': 200,
    successMsg: 'div.Toastify__toast--success',
    newRoBtn: 'button.navbarBtn',
    laborRateDropdown: {
      dropdown: "[data-testid='labourRateDropdown']",
      parent: 'div',
      option: 'div > div > div',
    },
  },
  inActiveLaborClass: {
    inActiveLaborClickRowElement: {
      name: 'tr.MuiTableRow-root td:nth-child(1)',
      parent: 'tr.MuiTableRow-root',
      element: "button[value='inactive']",
    },
    '@updateLaborClass': 200,
    successMsg: 'div.Toastify__toast--success',
    newRoBtn: 'button.navbarBtn',
    laborRateBtn: "[data-testid='labourRateDropdown']",
  },
  laborClassTabButton: 'button#vertical-tab-5',
};
