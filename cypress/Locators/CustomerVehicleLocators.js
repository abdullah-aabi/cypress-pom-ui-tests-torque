export default {
    customerInformation: {
        name: "#customerName",
        customerEmail_Unique: "#customer_email",
        Phone_Unique: "[placeholder='Phone']",
        address: "#customer_address",
        company: "#customer_company",
        customerNotes: "#notes"
    },
    customerInformationOld: {
        name: "#customerName",
        customerEmail_Unique: "#customer_email",
        Phone_Unique: "[placeholder='Phone']",
        address: "#customer_address",
        customerSSN: "#customer_ssn",
        customersGroupDropdown: "#customer_group",
        optionCGTextButton: "[role='option']",
        comments: "#customer_comments",
        company: "#customer_company",
        isDiscountCheckBtn: "#customer_discount",
        discountToggleBtn: ".toggle_btn_group_main button:nth-child(2)",
        discount: "#customer_percentage",
        isTaxCheckBtn: "#isTaxExempt",
        customerNotes: "#notes"
    },
    vehicleInformation: {
        vehicleModelYear: "input[name='modelYear']",
        vehicleMake: "input[name='vehicleMake']",
        vehicleModel: "input[name='vehicleModel']",
        vehicleTypeDropdown: {
            dropdown: "[data-testid='vehicleTypeDropdown']",
            parent: "div",
            option: "div > div > div"
        },
        vehiclePlate_Unique: "input[name='licensePlate']",
        vehicleVin: "#vehicle_vin",
        vehicleColor: "input[name='color']",
        vehicleImageHolder: "#vehicleImage_1_",
        vehicleCylinders: "input[name='noOfCylinder']",
        vehicleFuelTypeDropdown: {
            dropdown: "[data-testid='fuelTypeDropdown']",
            parent: "div",
            option: "div > div > div"
        },
        engineDisplacement: "input[name='displacement']",
        vehicleLitersDropdown: {
            dropdown: "[data-testid='engineDisplacementTypeDropdown']",
            parent: "div",
            option: "div > div > div"
        },
        engineTransmissionDropdown: {
            dropdown: "[data-testid='transmissionTypeDropdown']",
            parent: "div",
            option: "div > div > div"
        },
        vehicleOdometerUnitRadio: "input[name='odoMeter']",
        vehicleTraveled: "input[name='distance']",
        unitNumber: "input[name='unitNumber']",
        vehicleTrim: "input[name='trim']",
        driveTrainDropdown: {
            dropdown: "[data-testid='driveTrainDropdown']",
            parent: "div",
            option: "div > div > div"
        },
        pressureFLTyre: "input[name='pressureFL']",
        pressureFRTyre: "input[name='pressureFR']",
        pressureRRTyre: "input[name='pressureRR']",
        pressureRLTyre: "input[name='pressureRL']",
        vehiclePurchase: "#purchaseDate",
        vehicleInsuranceProvider: "input[name='insuranceProvider']",
        vehicleInsuranceExpiry: "#vehicle_insurance_expiry",
        vehiclePolicyNumber: "input[name='policyNumber']",
        vehicleNotes: "input[name='notes']",
        saveBtn: "div.dialog__actions button:contains(Save Changes)",
        successMsg: 'div.Toastify__toast--success',
        "@updateRO": 200
    },
    customerInformationBeDisabled: {
        nameBeDisabled: "#customerName",
        emailBeDisabled: "#customer_email",
        phoneBeDisabled: "[placeholder='Phone']",
        addressBeDisabled: "#customer_address",
        companyBeDisabled: "#customer_company",
        customerNotesBeDisabled: "#notes"
    },
    vehicleTwoInformation: {
        vehicleColor: "input[name='color']",
        vehicleFuelTypeDropdown: {
            dropdown: "[data-testid='fuelTypeDropdown']",
            parent: "div",
            option: "div > div > div"
        },
        vehicleImageHolder: "#vehicleImage_1_",
        vehicleTypeDropdown: { // Bug
            dropdown: "[data-testid='vehicleTypeDropdown']",
            parent: "div",
            option: "div > div > div"
        },
        engineTransmissionDropdown: {
            dropdown: "[data-testid='transmissionTypeDropdown']",
            parent: "div",
            option: "div > div > div"
        },
        vehicleOdometerUnitRadio: "input[name='odoMeter']",
        vehicleTraveled: "input[name='distance']",
        unitNumber: "input[name='unitNumber']",
        driveTrainDropdown: {
            dropdown: "[data-testid='driveTrainDropdown']",
            parent: "div",
            option: "div > div > div"
        },
        pressureFLTyre: "input[name='pressureFL']",
        pressureFRTyre: "input[name='pressureFR']",
        pressureRRTyre: "input[name='pressureRR']",
        pressureRLTyre: "input[name='pressureRL']",
        vehiclePurchase: "#purchaseDate",
        vehicleInsuranceProvider: "input[name='insuranceProvider']",
        vehicleInsuranceExpiry: "#vehicle_insurance_expiry",
        vehiclePolicyNumber: "input[name='policyNumber']",
        vehicleNotes: "input[name='notes']",
        saveBtn: "div.dialog__actions button:contains(Save Changes)",
        "@updateRO": 200
    },
    import: {
        importFileHolder: "div.dialog__content__inner input[acceptedfiles='.csv,text/*']"
    },
    vinLookup: {
        vinSearch: "input[placeholder='Enter VIN']",
        searchBtn: "div.ro__edit__vehicle circle",
        "@vinSearch": 200,
        vehiclePlate_Unique: "input[name='licensePlate']"
    },
    plateLookup: {
        plateNo: "input[placeholder='Enter License Plate No.']",
        stateDropdown: {
            dropdown: "[data-testid='stateDropdown']",
            parent: "div",
            option: "div > div > div"
        },
        searchBtn: "div.ro__edit__vehicle circle",
        "@plateLookup": 200,
        vehiclePlateAssertValue: "input[name='licensePlate']",
        vehiclePlate_Unique: "input[name='licensePlate']"
    },
    moreVehiclesDropdown: "div.ro__selected__customer__vehicle svg.expand__icon",
    addAnotherVehicleBtn: "button.new__entry__btn",
    footerButtons: "div.MuiGrid-root button",
    addCustomerBtn: ".Buttons button.addCustomer",
    addNewVehicleBtn: "button.MuiButton-fullWidth",
    okBtn: ".submitConfirmAction button",
    lookupTypeDropdown: "div.ro__edit__vehicle div.MuiSelect-select",
    lookupOptions: "li[role='option']",
    addNewVehicleBtnInRO: "button.add__new__vehicle__btn"
}
