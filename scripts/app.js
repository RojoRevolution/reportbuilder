
document.addEventListener("DOMContentLoaded", () => {

    const entireMacroButtonSection = document.getElementById('macros')
    const maxillaMacroButtonsSection = document.getElementById('maxillaMacros')
    const maxillaMacroButtons = maxillaMacroButtonsSection.querySelectorAll('.dr-utility');
    const allMacroButtons = entireMacroButtonSection.querySelectorAll('.dr-utility');
    // const mandibleMacroButtons = document.getElementById('mandibleMacros').querySelectorAll('.dr-utility');;
    // const allMacroButtons = document.querySelectorAll('.dr-utility');
    const allReportSection = document.querySelectorAll('[data-report-section]');
    const allDropdownOptions = document.querySelectorAll('[data-additional-option]');

    console.log(allDropdownOptions)

    additionalSelectionIcons = [
        '<i class="bi bi-circle-fill"></i>',
        '<i class="bi bi-check-circle-fill"></i>'
    ]


    const additionalOptionCheckBox = document.querySelectorAll(`[data-bracket-active="false"]`);

    setAdditionalOptionIcons = (activeSelectionStatus) => {
        additionalOptionCheckBox.forEach((selection) => {
            selection.innerHTML = additionalSelectionIcons[0];
        })
    }

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

    // Removes all active single select buttons
    removeAllRadiolActiveClasses = (activeSection) => {
        activeSection.forEach((btn) => {
            btn.classList.remove("active-macro");
        });
    };

    // Removes all active multi select buttons

    removeAllCheckBoxActiveClasses = (activeSection) => {
        activeSection.forEach((btn) => {
            btn.classList.remove("active-macro");
        });
    };

    // Function removes Normal, Not Well Seen and Othr if a different option is chosen
    removeSingleButtonMacroText = (activeSection) => {
        console.log(activeSection)
        let activeSectionNormal = activeSection.querySelector('[data-macro-selected="normal"]');
        let activeSectionNotWellSeen = activeSection.querySelector('[data-macro-selected="notWellSeen"]');
        let activeSectionOther = activeSection.querySelector('[data-macro-selected="other"]');

        if (activeSectionNormal) {
            activeSectionNormal.remove()
        }
        if (activeSectionNotWellSeen) {
            activeSectionNotWellSeen.remove()
        }
        if (activeSectionOther) {
            activeSectionOther.remove()
        }
    }


    // Appends new <p> in report
    appendNewParagraph = (macroSection, currentButton, textSection) => {
        let newParagaph = document.createElement('p');
        newParagaph.setAttribute('data-macro-selected', currentButton);
        newParagaph.innerHTML = jsonData[macroSection][currentButton].definition;
        textSection.appendChild(newParagaph);
        // console.log("Appended Paragraph: ", newParagaph)
    }

    // Functions sets the active class for macro buttons
    setActiveButtonsAndReportText = (macroSection, currentButton, currentBtnName, activeStatus, multiSelect) => {
        // Local Variables for each macro section
        let activeSection = document.querySelector(`[data-macro-section="${macroSection}"]`);
        let sectionOtherBtn = activeSection.querySelector('[data-macro-name="other"]');
        let activeSectionCheckButtons = activeSection.querySelectorAll('[data-multi-select="true"]');
        let activeSectionRadioButtons = activeSection.querySelectorAll('[data-multi-select="false"]');
        // let selectedMacroButton = activeSection.querySelectorAll(`[data-macro-name="${currentBtnName}]`);
        let activeTextSection = document.querySelector(`[data-report-section="${macroSection}"]`);

        // console.log(activeTextSection)
        // console.log(jsonData[macroSection][currentBtnName].definition);

        // Function checks how many multi select buttons are active
        checkActiveStatus = () => {
            activeCount = activeSection.querySelectorAll(".btn.dr-utility.active-macro").length;
        }

        // removeSingleButtonMacroText(activeTextSection);

        // removeSingleButtonMacroText = () => {
        //     let activeSectionNormal = activeTextSection.querySelector('[data-macro-selected="normal"]');
        //     let activeSectionNotWellSeen = activeTextSection.querySelector('[data-macro-selected="notWellSeen"]');
        //     let activeSectionOther = activeTextSection.querySelector('[data-macro-selected="other"]');

        //     if (activeSectionNormal) {
        //         activeSectionNormal.remove()
        //     }
        //     if (activeSectionNotWellSeen) {
        //         activeSectionNotWellSeen.remove()
        //     }
        //     if (activeSectionOther) {
        //         activeSectionOther.remove()
        //     }
        // }

        // If statements check if button is Multi-select, and the target buttons current status
        if (multiSelect === "false") {
            // This statement sets Single Select option to Active
            removeAllCheckBoxActiveClasses(activeSectionCheckButtons);
            removeAllRadiolActiveClasses(activeSectionRadioButtons);
            activeTextSection.innerHTML = "";
            // Set current target active Class
            currentButton.classList.add('active-macro');
            appendNewParagraph(macroSection, currentBtnName, activeTextSection);

            // activeTextSection.appendChild(jsonData[macroSection][currentBtnName].definition)
            checkActiveStatus();

        }
        else if (multiSelect === "true" && activeStatus === true) {
            // This statement sets active Multi select buttons to Inactive
            console.log('Set to Active');
            currentButton.classList.remove('active-macro');
            removeSingleButtonMacroText(activeTextSection);
            checkActiveStatus();
            activeTextSection.querySelector(`[data-macro-selected=${currentBtnName}]`).remove();
            // If zero multu select buttons are active, sets "Other" to active
            if (activeCount === 0) {
                console.log("Active Count = 0")
                console.log(sectionOtherBtn)
                sectionOtherBtn.classList.add("active-macro");
            }
        }
        else if (multiSelect === "true" && activeStatus === false) {
            // This statement sets inactive multi select buttons to active
            console.log("Set to Inactive")
            console.log("Current Button: ", currentBtnName)
            // If clicked button is Multi-Select - Remove active status only from single select buttons
            removeAllRadiolActiveClasses(activeSectionRadioButtons);
            removeSingleButtonMacroText(activeTextSection);
            // Set current target active Class
            currentButton.classList.add('active-macro');
            appendNewParagraph(macroSection, currentBtnName, activeTextSection);
            checkActiveStatus()
        };
    }

    setAdditionalOptionIcons();

    // Event Listener for all Macro buttons
    allMacroButtons.forEach((button) => {
        button.addEventListener("click", (btn) => {
            console.log("click");
            let targetedButton = btn.currentTarget;
            // Gets the macro button section
            let currentSection = targetedButton.parentElement.parentElement.parentElement.getAttribute("data-macro-section");
            // Gets attribute Macro Name
            let currentBtnName = targetedButton.getAttribute("data-macro-name");
            // console.log("Current Section: ", currentSection)
            // console.log("Current Macro: ", currentBtnName)

            // Gets attribute data-multi-select
            let currentBtnType = targetedButton.getAttribute("data-multi-select");
            let isCurrentlyActive = targetedButton.classList.contains("active-macro");
            let buttonParentDiv = targetedButton.parentElement;
            let dropdownStatus = buttonParentDiv.classList.contains("dropdown-container");
            // console.log("Has Dropdown Options, ", dropdownStatus)



            setActiveButtonsAndReportText(currentSection, targetedButton, currentBtnName, isCurrentlyActive, currentBtnType);

            // if (dropdownStatus === true) {
            //     dropDownOptionsController(buttonParentDiv);
            // }
        });
    });

    allDropdownOptions.forEach((option) => {
        option.addEventListener("click", (li) => {
            let currentOption = li.currentTarget;
            let optionValue = currentOption.getAttribute('data-additional-option');
            let buttonParentDiv = currentOption.parentElement.parentElement;
            let currentSection = currentOption.parentElement.parentElement.parentElement.parentElement.getAttribute("data-macro-section");
            let currentButton = buttonParentDiv.querySelector('button');
            let currentBtnName = currentButton.getAttribute('data-macro-name');
            console.log("Current Section: ", currentSection);
            console.log("Current Button: ", currentBtnName);


        })
    })


});