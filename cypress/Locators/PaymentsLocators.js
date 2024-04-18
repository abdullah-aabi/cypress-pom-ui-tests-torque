export default {
    creates: {
        // cashBtn: "button[value='cash']",
        updateAmount: "[name='paidAmount']",
        tuid: "[name='tuid']",
        chequeNo: "[name='chequeNo']",
        notes: "#notes",
        payNowTextButton: "div.MuiGrid-grid-xs-12 > div.MuiGrid-root > button",
        "@addPayment": 200,
        successMsg: 'div.Toastify__toast--success'
    },
    invoiceTotals: {
        totalLabor: "#simple-tabpanel-4 div.MuiGrid-justify-content-xs-flex-end:nth-child(1)",
        totalPartsAndSupplies: "div#panel1a-content > div > div > div:nth-child(2)",
        totalMisc: "div#panel1a-content > div > div > div:nth-child(3)",
        estimatedSubTotal: "div#panel1a-content > div > div > div:nth-child(4)",
        totalTax: "div#panel1a-content > div > div > div:nth-child(5)",
        totalDiscount: "div#panel1a-content > div > div > div:nth-child(6)",
        grandTotal: "div#panel1a-content > div > div > div:nth-child(7)"
    },
    rowTotals: "div.MuiGrid-justify-content-xs-flex-end",
    paymentTabButton: 'button#simple-tab-4',
    summary: "#simple-tabpanel-4",
    paymentRecords: "div.MuiBox-root > div > div",
    recordDetail: "p:nth-child(2)",
    cardGenInvoiceBtn: "button[id='pdf_button']:visible",
    backBtn: "ul[data-rbd-droppable-id='column-4'] div.MuiGrid-align-items-xs-center.MuiGrid-grid-xs-12 button:visible",
    jobCard: "li.board__card__hover",
    cardPaymentCashIdentifierClickable: "button[value='cash']",
    cardAddPaymentIdentifierClickable: "div:nth-child(4) > div > div > div > div:nth-child(2) .MuiGrid-justify-content-xs-flex-end button",
    cardGenInvoiceIdentifierClickable: "#pdf_button"
}