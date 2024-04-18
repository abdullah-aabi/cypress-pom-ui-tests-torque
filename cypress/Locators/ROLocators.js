export default {
  addCustomerBtn: "button.add__customer__btn",
  newRoBtn: "button.navbarBtn",
  popup: {
    extrasWithVehicle: "#extrasWithVehicle",
    mileageIn: "#mileageIn",
    visitTypeDropdown: {
      dropdown: "[data-testid='visitTypeDropdown']",
      parent: "div",
      option: "div > div > div"
    },
    // serviceAdvisorDropdown: {
    //   dropdown: "[data-testid='serviceAdvisorDropdown']",
    //   parent: "div",
    //   option: "div > div > div"
    // },
    laborRateDropdown: {
      dropdown: "[data-testid='labourRateDropdown']",
      parent: "div",
      option: "div > div > div"
    },
    customerConcernsMultiple: {
      input: "input#serviceDetails",
      searchedItem: "div.MuiAutocomplete-popper"
    },
    notes: "textarea#notes",
    generateBtn: "button.generate__btn",
    "@createRO": 200,
    successMsg: "div.Toastify__toast--success",
    "@getCreatedRO": 200
  },
  addCustomerVehicle: {},
  customerInformation: {
    name: "input#name",
    customerEmail: "#email",
    phone: "div.react-tel-input input",
    address: "#address"
  },
  roScreen: {
    headingAssertText: "div.NavbarLeft"
  },
  vehicleInformation: {
    vehicleModelYear: "#modelYear",
    vehicleMake: "#vehicleMake",
    vehicleModel: "#vehicleModel",
    vehiclePlate: "#licensePlate",
    engineDisplacement: "#displacement",
    vehicleLitersDropdown: {
      dropdown: "[data-testid='engineDisplaceDropdown']",
      parent: "div",
      option: "div > div > div"
    },
    vehicleColor: "#color"
  },
  assertCustomerInformation: {
    nameAssertText: "div.fields__padding__right span.heading__txt",
    customerEmailAssertText: "div.fields__padding__right p.selected__details:nth-child(3)",
    phoneAssertText: "div.fields__padding__right p.selected__details:nth-child(2)"
  },
  assertVehicleInformation: {
    yearMakeModelAssertText: "div.fields__padding__left span.heading__txt",
    vehiclePlateAssertText: "div.fields__padding__left p.selected__details:nth-child(2)",
    engineDisplacementAssertText: "div.fields__padding__left p.selected__details:nth-child(3)"
  },
  assertRODetails: {
    concernCountAssertText: "div.ro__fields__padding__right p.count",
    technicianCountAssertText: "div.ro__fields__padding__left p.count",
    inpectionCountAssertText: "button#simple-tab-1",
    concernsBtn: "div.ro__fields__padding__right p.count",
    addedConcernsIncludes: "div.ro__fields__padding__right div.concerns__recommendations__list p.heading",
    generalInfoAccordianTextButton: "div#panel1a-header",
    visitTypeBeVisible: "[data-testid='visitTypeDropdown']",
    laborRateBeVisible: "[data-testid='labourClassDropdown']",
    mileageInAssertValue: "input#mileageIn",
    extrasAssertValue: "input#extras",
    notesAssertValue: "textarea#notes"
  },
  vehicleTwoInformation: {
    vehicleColor: "#vehicle_color",
    vehicleImageHolder: "#vehicleImage_1_",
    vehicleTraveled: "#vehicle_traveled",
    vehiclePurchase: "#vehicle_purchase",
    vehicleInsuranceProvider: "#vehicle_insurance_provider",
    vehicleInsuranceExpiry: "#vehicle_insurance_expiry",
    vehiclePolicyNumber: "#vehicle_policy_number",
    vehicleNotes: "#vehicle_notes",
    saveBtn: ".MuiGrid-justify-content-xs-flex-end.MuiGrid-grid-xs-9 button:nth-child(1)",
    successMsg: ".SubmitConfirmText .para",
    okSuccessBtn: ".submitConfirmButton"
  },
  import: {
    importFileHolder: "div.dialog__content__inner input[acceptedfiles='.csv,text/*']"
  },
  vinLookup: {
    vinSearch: "input#vin_search",
    "@vinSearch": 200,
    vehiclePlate_Unique: "#vehicle_plate"
  },
  plateLookup: {
    plateNo: "input#license_lookup",
    stateLookupBtn: "#mui-component-select-state",
    stateTextButton: "li[role='option']",
    "@plateLookup": 200
  },
  moreVehiclesDropdown: "div.MuiCardContent-root h3 button",
  addAnotherVehicleBtn: "div.MuiGrid-spacing-xs-2 button.MuiButton-fullWidth",
  footerButtons: "div.MuiGrid-root button",
  addNewVehicleBtn: "button.MuiButton-fullWidth",
  okBtn: ".submitConfirmAction button"
}