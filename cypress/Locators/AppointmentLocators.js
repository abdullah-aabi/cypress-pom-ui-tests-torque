export default {
    creates: {
        customerConcernsMultiple: {
            input: "input#serviceDetails",
            searchedItem: "div.MuiAutocomplete-popper"
        },
        // appointmentNotes: "#eventNotes", // bug
        appointmentNotes: "div.ro__popup__field textarea",
        bookBtn: "button.generate__btn",
        successMsg: "div.Toastify__toast--success"
    },
    opensAppointment: {
        dayTabButtonBtn: "button.fc-timeGridDay-button",
        createdAppointmentLatest: ".fc-timegrid-col-events > .fc-timegrid-event-harness-inset div.fc-event-main > .MuiGrid-container"
    },
    deletesAppointment: {
        deleteAppointmentBtn: "div.dialog__actions__container div button:nth-child(2)",
        confirmBtn: "button.CustomizeSwalConfirmButton",
        successMsg: "div.Toastify__toast--success",
        "@updateAppointment": 200
    },
    dateDropdown: ".appointment__text__field__msg button",
    dateBtn: "button.MuiPickersDay-current",
    timeDropdown: "#eventTime",
    timeBtn: "[data-value='10:00 - 11:00']",
    addAppointmentBtn: "button.fc-eventAdd-button",
    convertToBtns: "span.MuiFormControlLabel-label",
    convertToInspectionBtn: "div.MuiChip-clickable:contains(Inspection)",
    changeStatusBtn: "div.MuiChip-clickable",
    startInspectionBtn: ".MuiGrid-justify-content-xs-flex-end button.MuiButtonBase-root"
}