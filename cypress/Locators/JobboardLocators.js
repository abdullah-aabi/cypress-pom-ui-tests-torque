export default {
    changesJobcard: {
        newJobCardIdentifier: "ul[data-rbd-droppable-id='column-2'] li.board__card__hover > div > div > a",
        partsTabBtnForce: "header.job__board__appbar__main #simple-tab-0",
        partsCheck: "div.job__board__tab__panel input[aria-label='primary checkbox']",
        suppliesTabBtnForce: "header.job__board__appbar__main #simple-tab-1",
        suppliesCheck: "div.job__board__tab__panel input[aria-label='primary checkbox']",
        laborsTabBtnForce: "header.job__board__appbar__main #simple-tab-2:contains(Labor Applied)",
        laborsCheck: "div.job__board__tab__panel input[aria-label='primary checkbox']",
        readyStatusTextButton: "div.dialog__content__inner div.MuiGrid-root button.MuiButton-contained",
        "@updateJobcard": 200,
        backBtn: "div.dialog__actions__container > button:nth-child(1)"
    },
    jobCard: "li.board__card__hover",
    newJobCardIdentifierClickable: "div.MuiGrid-root.MuiGrid-container.MuiGrid-item[role='button']",
    addNotesOnPaidJobCard: {
        addNotesOnPaidJobCardMenuIdentifier: "ul[data-rbd-droppable-id='column-4'] li.board__card__hover > div > div > a",
        addNotes: "textarea#notes",
        backBtn: "ul[data-rbd-droppable-id='column-4'] > div.MuiGrid-root div.MuiGrid-align-items-xs-center > div:nth-child(1) > button",
        "@updateJobcard": 200
    },
    addNotesOnPaidJobCardMenuIdentifierClickable: "div.MuiGrid-root.MuiGrid-container.MuiGrid-item[role='button']",
    archiveJobCard: {
        paidJobCardMenuIdentifier: "ul[data-rbd-droppable-id='column-4'] li.board__card__hover > div > div > a",
        archiveJobCardBtn: "ul > li.MuiListItem-gutters:nth-child(1)",
        "@updateJobcard": 200
    },
    paidJobCardMenuIdentifierClickable: "button.MuiIconButton-root"
}