
document.addEventListener("DOMContentLoaded", () => {

    const entireMacroButtonSection = document.getElementById('macros')
    const maxillaMacroButtonsSection = document.getElementById('maxillaMacros')
    const maxillaMacroButtons = maxillaMacroButtonsSection.querySelectorAll('.dr-utility');
    const allMacroButtons = entireMacroButtonSection.querySelectorAll('.dr-utility');
    // const mandibleMacroButtons = document.getElementById('mandibleMacros').querySelectorAll('.dr-utility');;
    // const allMacroButtons = document.querySelectorAll('.dr-utility');
    const allReportSection = document.querySelectorAll('[data-report-section]');


    console.log("Report Sections: ", allReportSection)

    // Fetch to retrieve JSON data
    let jsonData;

    getJsonData = () => {
        fetch('./data/report.json')
            .then(response => response.json())
            .then(data => {
                jsonData = data;
                console.log(jsonData)
            })
            // .then(data => jsonData = data)
            .catch(error => console.log(error));
    }

    getJsonData();

    // Functions sets the active class for macro buttons
    clearActiveBtns = (macroSection, currentButton, activeStatus, multiSelect) => {
        // Local Variables for each macro section
        let activeSection = document.getElementById(macroSection);
        let sectionOtherBtn = activeSection.querySelector('[data-macro-name="Other"]');
        let activeSectionCheckButtons = activeSection.querySelectorAll('[data-multi-select="true"]');
        let activeSectionRadioButtons = activeSection.querySelectorAll('[data-multi-select="false"]');
        // Stores Active Number of Checkbox Buttons
        let activeCount;

        // Removes all active single select buttons
        removeAlRadiolActiveClasses = (activeSection) => {
            activeSection.forEach((btn) => {
                btn.classList.remove("active-macro");
            });
        };
        //removes all active multi-select buttons
        removeAllCheckBoxActiveClasses = (activeSection) => {
            activeSection.forEach((btn) => {
                btn.classList.remove("active-macro");
            });
        };

        // Function checks how many multi select buttons are active
        checkActiveStatus = () => {
            activeCount = activeSection.querySelectorAll(".btn.dr-utility.active-macro").length;
            console.log("Active Elements", activeCount)
        }
        // If statements check if button is Multi-select, and the target buttons current status
        if (multiSelect === "false") {
            // This statement sets Single Select option to Active
            removeAllCheckBoxActiveClasses(activeSectionCheckButtons);
            removeAlRadiolActiveClasses(activeSectionRadioButtons);
            // Set current target active Class
            currentButton.classList.add('active-macro');
            checkActiveStatus();

        }
        else if (multiSelect === "true" && activeStatus === true) {
            // This statement sets unactive Multi select buttons to active
            currentButton.classList.remove('active-macro');
            // sectionOtherBtn.classList.add('active-macro');
            checkActiveStatus();
            console.log("Active Count: ", activeCount);
            // If zero multu select buttons are active, sets "Other" to active
            if (activeCount === 0) {
                console.log("Active Count = 0")
                console.log(sectionOtherBtn)
                sectionOtherBtn.classList.add("active-macro")
            }
        }
        else if (multiSelect === "true" && activeStatus === false) {
            // This statement sets Active multi select buttons to Inactive
            console.log("if false")
            // If clicked button is Multi-Select - Remove active status only from single select buttons
            removeAlRadiolActiveClasses(activeSectionRadioButtons)
            // Set current target active Class
            currentButton.classList.add('active-macro');
            checkActiveStatus()
        };

    }

    // Function sets the report text for the builder
    setReportText = (macro) => {
        switch (macro) {
            case "Normal":
                // Clear previous text
                // clearMultiSelect('mandible')
                sectionText = allReportSection[0].innerHTML;
                console.log("Definition: ", jsonData.maxilla.normal.definition);
                allReportSection[0].innerHTML = jsonData.maxilla.normal.definition;
                break;
            case "Palatine Torus":
                // clearSingleSelect('mandible')
                allReportSection[0].innerHTML = jsonData.maxilla.palatineTorus.definition;
                break;
            case "Maxillary Torus/Osteoma":
                // clearSingleSelect('mandible')
                allReportSection[0].innerHTML = jsonData.maxilla.maxillaryTorus.definition;
                break;
            default:
                break;
        }
    };


    // Event Listener for all Macro buttons
    allMacroButtons.forEach((button) => {
        button.addEventListener("click", (btn) => {
            console.log("click");
            let currentBtnEl = btn.currentTarget;
            // Gets the macro button section
            let currentBtnSection = btn.currentTarget.parentElement.parentElement.getAttribute("id");
            // Gets attribute Macro Name
            let currentBtnName = btn.currentTarget.getAttribute("data-macro-name");
            // Gets attribute data-multi-select
            let currentBtnType = btn.currentTarget.getAttribute("data-multi-select");
            let btnClasses = btn.currentTarget.getAttribute("class");
            let currentlyActive = btn.currentTarget.classList.contains("active-macro");

            clearActiveBtns(currentBtnSection, currentBtnEl, currentlyActive, currentBtnType)
            setReportText(currentBtnName);
        })
    })


});