
document.addEventListener("DOMContentLoaded", () => {

    const entireMacroButtonSection = document.getElementById('macros')
    const maxillaMacroButtonsSection = document.getElementById('maxillaMacros')
    const maxillaMacroButtons = maxillaMacroButtonsSection.querySelectorAll('.dr-utility');
    const allMacroButtons = entireMacroButtonSection.querySelectorAll('.dr-utility');
    // const mandibleMacroButtons = document.getElementById('mandibleMacros').querySelectorAll('.dr-utility');;
    // const allMacroButtons = document.querySelectorAll('.dr-utility');
    const allReportSection = document.querySelectorAll('[data-report-section]');
    let activeCount;


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
    clearActiveBtns = (macroSection, currentButton, currentBtnName, activeStatus, multiSelect) => {
        // Local Variables for each macro section
        let activeSection = document.querySelector(`[data-macro-section="${macroSection}"]`);
        let sectionOtherBtn = activeSection.querySelector('[data-macro-name="other"]');
        let activeSectionCheckButtons = activeSection.querySelectorAll('[data-multi-select="true"]');
        let activeSectionRadioButtons = activeSection.querySelectorAll('[data-multi-select="false"]');
        // let selectedMacroButton = activeSection.querySelectorAll(`[data-macro-name="${currentBtnName}]`);
        let activeTextSection = document.querySelector(`[data-report-section="${macroSection}"]`);

        // Stores Active Number of Checkbox Buttons

        // Removes all active single select buttons
        removeAllRadiolActiveClasses = (activeSection) => {
            activeSection.forEach((btn) => {
                btn.classList.remove("active-macro");
            });
        };

        console.log(activeTextSection)
        // console.log(jsonData[macroSection][currentBtnName].definition);

        //removes all active multi-select buttons
        removeAllCheckBoxActiveClasses = (activeSection) => {
            activeSection.forEach((btn) => {
                btn.classList.remove("active-macro");
            });
        };

        // Function checks how many multi select buttons are active
        checkActiveStatus = () => {
            activeCount = activeSection.querySelectorAll(".btn.dr-utility.active-macro").length;
        }

        appendNewParagraph = () => {
            let newParagaph = document.createElement('p');
            newParagaph.setAttribute('data-macro-selected', currentBtnName);
            newParagaph.innerHTML = jsonData[macroSection][currentBtnName].definition;
            activeTextSection.appendChild(newParagaph);
        }

        // If statements check if button is Multi-select, and the target buttons current status
        if (multiSelect === "false") {
            // This statement sets Single Select option to Active
            removeAllCheckBoxActiveClasses(activeSectionCheckButtons);
            removeAllRadiolActiveClasses(activeSectionRadioButtons);
            activeTextSection.innerHTML = "";
            // Set current target active Class
            currentButton.classList.add('active-macro');
            appendNewParagraph();

            // activeTextSection.appendChild(jsonData[macroSection][currentBtnName].definition)
            checkActiveStatus();

        }
        else if (multiSelect === "true" && activeStatus === true) {
            // This statement sets unactive Multi select buttons to active
            currentButton.classList.remove('active-macro');
            // sectionOtherBtn.classList.add('active-macro');
            checkActiveStatus();
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
            removeAllRadiolActiveClasses(activeSectionRadioButtons)
            // Set current target active Class
            currentButton.classList.add('active-macro');
            appendNewParagraph();
            checkActiveStatus()
        };

    }

    // Function sets the report text for the builder
    setReportText = (section, macro, isMultiSelect) => {
        let activeMacroSection = document.querySelector(`[data-macro-section="${macro}"]`);
        let activeTextSection = document.querySelector(`[data-report-section="${section}"]`);
        let macroButtonClicked = macro;
        // let isBtnMultiSelect = isMultiSelect.getAttribute("[data-multi-select]");
        console.log("Active Section: ", activeTextSection);
        console.log("Macro Clicked: ", macroButtonClicked);
        console.log("Is Multi Select? ", isMultiSelect);

        clearSingleMacroText = () => {
            activeTextSection
        }

        clearMultiMacroText = () => {
            activeTextSection.innerHTML = "";
        }



        if (isMultiSelect === false) {
            activeTextSection.appendChild(jsonData.section.macro.definition)
        } else if (isMultiSelect === true) {

        }





        // switch (section && macro) {
        //     case "maxilla" && "normal":
        //         // Clear previous text
        //         // clearMultiSelect('mandible')
        //         // sectionText = allReportSection[0].innerHTML;
        //         console.log("Definition: ", jsonData.maxilla.normal.definition);
        //         activeTextSection.innerHTML = jsonData.maxilla.normal.definition;
        //         break;
        //     case "maxilla" && "palatineTorus":
        //         clearCurrentTextSection('mandible')
        //         activeTextSection.appendChild(jsonData.maxilla.palatineTorus.definition);
        //         break;
        //     case "maxilla" && "maxillaryTorus":
        //         clearSingleSelect('mandible')
        //         activeTextSection.appendChild(jsonData.maxilla.maxillaryTorus.definition);
        //         break;
        //     default:
        //         break;
        // }
    };


    // Event Listener for all Macro buttons
    allMacroButtons.forEach((button) => {
        button.addEventListener("click", (btn) => {
            console.log("click");
            let currentBtnEl = btn.currentTarget;
            // Gets the macro button section
            let currentSection = btn.currentTarget.parentElement.parentElement.getAttribute("data-macro-section");
            // Gets attribute Macro Name
            let currentBtnName = btn.currentTarget.getAttribute("data-macro-name");
            console.log("Current Section: ", currentSection)
            console.log("Current Macro: ", currentBtnName)
            // Gets attribute data-multi-select
            let currentBtnType = btn.currentTarget.getAttribute("data-multi-select");
            let currentlyActive = btn.currentTarget.classList.contains("active-macro");

            clearActiveBtns(currentSection, currentBtnEl, currentBtnName, currentlyActive, currentBtnType)
            // setReportText(currentSection, currentBtnName, currentBtnType);
        })
    })


});