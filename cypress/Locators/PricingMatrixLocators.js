// let createBtn = "div.MuiGrid-grid-xs-12.MuiGrid-grid-md-4 button.MuiButton-text"
// let matrixName = '[name="name"]'
// let textButtonsInForm = 'div.MuiGrid-grid-xs-12.MuiGrid-grid-md-8 button.MuiButton-text'
// let startRange = '[name="startRange"]'
// let endRange = '[name="endRange"]'
// let markup = '[name="markUp"]'
// let margin = '[name="margin"]'
// let matrixRows = 'div.MuiGrid-grid-xs-12.MuiGrid-grid-md-8 > div > div:nth-child(3) > div'
// export default {
//     create: {
//         createPricingMatrixBtn: createBtn,
//         matrixName_Unique: matrixName,

//         startRangeHaveLength1: matrixRows,
//         startRangeBeDisabled: startRange,
//         endRangeBeDisabled: endRange,
//         startRangeEvaluated: startRange,
//         endRangeEvaluated: endRange,
//         markup: markup,
//         marginBeDisabled: margin,

//         addRangeTextButton1: textButtonsInForm,
//         startRangeHaveLength2: matrixRows,
//         startRange: startRange,

//         addRangeTextButton2: textButtonsInForm,
//         startRangeHaveLength3: matrixRows,
//         addRangeTextButton3: textButtonsInForm,
//         startRangeHaveLength4: matrixRows,
//         removeRangeDropdown: {
//             dropdown: "div.MuiGrid-grid-xs-12.MuiGrid-grid-md-8 > div > div:nth-child(3) > div:nth-child(4) button",
//             parent: "div",
//             option: "p"
//         },
//         startRangeHaveLengthThree: matrixRows,

//     }
// }
export default {
    createBtn: "div.MuiGrid-grid-xs-12.MuiGrid-grid-md-4 button.MuiButton-text",
    create: {
        matrixName_Unique: '[name="name"]',
        rangeRows: 'div.MuiGrid-grid-xs-12.MuiGrid-grid-md-8 > div > div:nth-child(3) > div',
        markup: '[name="markUp"]',
        margin: '[name="margin"]',
        startRange: '[name="startRange"]',
        endRange: '[name="endRange"]',
        addRangeTextButton: 'div.MuiGrid-grid-xs-12.MuiGrid-grid-md-8 button.MuiButton-text',
        removeRangeDropdown: {
            dropdown: "button",
            parent: "div",
            option: "p"
        },
    },
    matrixRows: "div.MuiGrid-grid-xs-12.MuiGrid-grid-md-4 div > div p.MuiTypography-body1"
}