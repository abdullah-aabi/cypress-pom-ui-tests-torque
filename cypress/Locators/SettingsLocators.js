export default {
    createTaxClass: {
        "@getTaxClasses": 200,
        createNewBtn: "div.user__setting__grid  div.MuiGrid-justify-content-xs-flex-end  button",
        className_Unique: "input[name='className']",
        classTaxRate: "input[name='classRate']",
        submitBtn: "div.dialog__actions__container button:nth-child(2)",
        "@createTaxClass": 200,
        successMsg: "div.Toastify__toast--success",
        newRoBtn: "button.navbarBtn",
        TaxRateDropdown: {
            dropdown: "[data-testid='labourRateDropdown']",
            parent: "div",
            option: "div > div > div"
        }
    },
    deleteTaxClass: {
        deleteTaxClickRowElement: {
            name: "tr.MuiTableRow-root td:nth-child(1)",
            parent: "tr.MuiTableRow-root",
            deleteBtn: "td.MuiTableCell-body > button:nth-child(2)"
        },
        "@deleteTaxClass": 200,
        successMsg: "div.Toastify__toast--success"
    },
    TaxClassTabButton: "button#vertical-tab-2"
}