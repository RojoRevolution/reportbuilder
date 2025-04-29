
document.addEventListener("DOMContentLoaded", () => {

    const entireMacroButtonSection = document.getElementById('macros')
    const maxillaMacroButtonsSection = document.getElementById('maxillaMacros')
    // const maxillaMacroButtons = maxillaMacroButtonsSection.querySelectorAll('.dr-utility');
    const allMacroButtons = entireMacroButtonSection.querySelectorAll('.dr-utility');
    // const mandibleMacroButtons = document.getElementById('mandibleMacros').querySelectorAll('.dr-utility');;
    // const allMacroButtons = document.querySelectorAll('.dr-utility');
    const allReportSection = document.querySelectorAll('[data-report-section]');
    const allDropdownOptions = document.querySelectorAll('[data-additional-option]');
    const reportBuilderSection = document.getElementById('builder-col');

    const allAddImpressionBtns = document.querySelectorAll('[data-impression-section]');
    // console.log(allDropdownOptions)

    additionalSelectionIcons = [
        '<i class="bi bi-circle-fill"></i>',
        '<i class="bi bi-check-circle-fill"></i>'
    ]


    const additionalOptionCheckBox = document.querySelectorAll(`[data-bracket-active="false"]`);

    setInitialIcons = () => {
        additionalOptionCheckBox.forEach((selection) => {
            // console.log(selection)
            selection.innerHTML = additionalSelectionIcons[0];
        })
    }

    let activeCount;

    // console.log("Active on Load: ", activeCount)

    // Fetch to retrieve JSON data
    let jsonData;

    getJsonData = () => {
        fetch('./data/report.json')
            .then(response => response.json())
            .then(data => {
                jsonData = data;
                // console.log(jsonData)
            })
            // .then(data => jsonData = data)
            .catch(error => console.log(error));
    }

    getJsonData();


    // Function checks if element is visible in the window. If not visible will scroll to it's position
    const elementIsVisibleInViewport = (el) => {
        console.log("Text Section ", el)
        const { top, left, bottom, right } = el.getBoundingClientRect();
        const { innerHeight, innerWidth } = window;
        console.log("Section Top and Bottom: ", top, bottom)
        console.log("Window Size: ", innerHeight);
        // return partiallyVisible
        //     ? ((top > 0 && top < innerHeight) ||
        //         (bottom > 0 && bottom < innerHeight)) &&
        //     ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        //     : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;

        if (top > innerHeight) {
            console.log("Greater than Window Height")
            reportBuilderSection.scrollTo({
                top: bottom,
                // behavior: "smooth",
            });
        } else if (bottom < 133) {
            console.log("Less than Header")
            reportBuilderSection.scrollTo({
                top: top,
                // behavior: "smooth",
            });
        } else {
            console.log("Element Visible")
        }
    };


    contentChangeAnimation = (activeSection) => {
        activeSection.classList.toggle('change-effect');
        setTimeout(() => {
            activeSection.classList.toggle('change-effect');
        }, 1000)

    }

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

    // Function removes Normal, Not Well Seen and Other if a different option is chosen
    removeSingleButtonMacroText = (activeSection, activeSectionParentEl) => {
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
        contentChangeAnimation(newParagaph);
    }

    appendImpression = (macroSection, currentButton, textSection) => {
        let parentDiv = textSection.parentElement;
        let impression = jsonData[macroSection][currentButton].impression;

        let newDiv = document.createElement('div');
        newDiv.classList.add('impression')
        newDiv.setAttribute('contenteditable', 'true')
        newDiv.setAttribute('data-impression', currentButton)
        newDiv.innerHTML = impression;
        if (impression === "none") {
            console.log("No Impression");
        } else {
            parentDiv.appendChild(newDiv)
        }
    }



    // Functions sets the active class for macro buttons
    setActiveButtonsAndReportText = (macroSection, currentButton, currentBtnName, activeStatus, multiSelect) => {
        // Local Variables for each macro section
        let activeSection = document.querySelector(`[data-macro-section="${macroSection}"]`);
        let sectionOtherBtn = activeSection.querySelector('[data-macro-name="other"]');
        let allDropDownOptions = activeSection.querySelectorAll('li');
        let activeSectionCheckButtons = activeSection.querySelectorAll('[data-multi-select="true"]');
        let activeSectionRadioButtons = activeSection.querySelectorAll('[data-multi-select="false"]');
        let activeTextSection = document.querySelector(`[data-report-section="${macroSection}"]`);

        let activeTextSectionParent = activeTextSection.parentElement;

        // Function checks how many multi select buttons are active

        checkActiveStatus = () => {
            activeCount = activeSection.querySelectorAll(".btn.dr-utility.active-macro").length;
        }

        elementIsVisibleInViewport(activeTextSection);

        // If statements check if button is Multi-select, and then target buttons current status
        if (multiSelect === "false") {
            console.log("Radio Button Active")
            // This statement sets Single Select option to Active
            removeAllCheckBoxActiveClasses(activeSectionCheckButtons);
            removeAllRadiolActiveClasses(activeSectionRadioButtons);
            activeTextSection.innerHTML = "";
            // Set current target active Class
            currentButton.classList.add('active-macro');
            appendNewParagraph(macroSection, currentBtnName, activeTextSection);
            appendImpression(macroSection, currentBtnName, activeTextSection);
            bracketedTextSpan = activeTextSection.querySelector('span');
            let allImpressions = activeTextSectionParent.querySelectorAll('.impression');
            allImpressions.forEach((impression) => {
                impression.remove();
            });
            allDropDownOptions.forEach((option) => {
                console.log("in Remove Option forEach");
                let span = option.querySelector('span');
                option.setAttribute('data-option-active', 'false');
                span.innerHTML = additionalSelectionIcons[0];
            });
            // activeTextSection.appendChild(jsonData[macroSection][currentBtnName].definition)
            checkActiveStatus();

        }
        else if (multiSelect === "true" && activeStatus === true) {
            console.log("Multi Select Button Inactive")
            // This statement sets active Multi select buttons to Inactive
            console.log('Set to Active');
            currentButton.classList.remove('active-macro');

            removeSingleButtonMacroText(activeTextSection);
            checkActiveStatus();
            activeTextSection.querySelector(`[data-macro-selected="${currentBtnName}"]`).remove();

            // If zero multi select buttons are active, sets "Other" to active
            if (activeCount === 0) {
                let allImpressions = activeTextSectionParent.querySelectorAll('.impression');
                allImpressions.forEach((impression) => {
                    console.log("in Remove forEach")
                    impression.remove();
                })
                sectionOtherBtn.classList.add("active-macro");
                allDropDownOptions.forEach((option) => {
                    console.log("in Remove Option forEach");
                    let span = option.querySelector('span');
                    option.setAttribute('data-option-active', 'false');
                    span.innerHTML = additionalSelectionIcons[0];
                });
            }
        }
        else if (multiSelect === "true" && activeStatus === false) {
            // This statement sets inactive multi select buttons to active
            removeAllRadiolActiveClasses(activeSectionRadioButtons);
            removeSingleButtonMacroText(activeTextSection);
            // Set current target active Class
            currentButton.classList.add('active-macro');
            appendNewParagraph(macroSection, currentBtnName, activeTextSection);
            appendImpression(macroSection, currentBtnName, activeTextSection);
            checkActiveStatus()
        };
    }

    // Sets the active status and icon change for additional Dropdown Options
    setDropDownOptionStatus = (targetOption, optionStatus) => {
        let parentDiv = targetOption.parentElement;
        let allListItems = parentDiv.querySelectorAll('li');
        let clickedOption = targetOption.querySelector("span");

        if (optionStatus === 'false') {
            allListItems.forEach((list) => {
                let span = list.querySelector('span');
                list.setAttribute('data-option-active', 'false');
                span.innerHTML = additionalSelectionIcons[0]
            })
            targetOption.setAttribute('data-option-active', 'true');
            clickedOption.innerHTML = additionalSelectionIcons[1];
        }
    }

    setActiveButtonsReportTextAndBracketText = (macroSection, currentButton, currentBtnName, activeStatus, multiSelect, targetExtraOption, extraOptionValue, isOptionActive) => {
        // Local Variables for each macro section
        let activeSection = document.querySelector(`[data-macro-section="${macroSection}"]`);
        let activeSectionRadioButtons = activeSection.querySelectorAll('[data-multi-select="false"]');
        // let selectedMacroButton = activeSection.querySelectorAll(`[data-macro-name="${currentBtnName}]`);
        let activeTextSection = document.querySelector(`[data-report-section="${macroSection}"]`);
        let activeTextSectionParentEl = activeTextSection.parentElement;
        // console.log("Bracketed Text Value: ", extraOption)

        // Function checks how many multi select buttons are active
        checkActiveStatus = () => {
            console.log(activeSection);
            activeCount = activeSection.querySelectorAll(".btn.dr-utility.active-macro").length;
        }

        // This will set the dropdown button to Active, add the macro text and change the bracketed text
        if (isOptionActive === "false" && multiSelect === "true" && activeStatus === false) {
            removeAllRadiolActiveClasses(activeSectionRadioButtons);
            removeSingleButtonMacroText(activeTextSection);
            setDropDownOptionStatus(targetExtraOption, isOptionActive);
            // Set current target active Class
            currentButton.classList.add('active-macro');
            appendNewParagraph(macroSection, currentBtnName, activeTextSection);
            checkActiveStatus();
            let spanText = activeTextSection.querySelector('[data-macro-option="true"]');
            spanText.innerHTML = extraOptionValue;
        }
        // This statement only changes the bracketed text
        else if (isOptionActive === "false" && multiSelect === "true" && activeStatus === true) {
            console.log("Already Selected");
            setDropDownOptionStatus(targetExtraOption, isOptionActive);
            let spanText = activeTextSection.querySelector('[data-macro-option="true"]');
            spanText.innerHTML = extraOptionValue;
            contentChangeAnimation(spanText);
        }
    }


    setInitialIcons();

    // Event Listener for all Macro buttons
    allMacroButtons.forEach((button) => {
        button.addEventListener("click", (btn) => {
            console.log("Button Clicked");
            // gets event target
            let targetedButton = btn.currentTarget;
            // Gets the macro button section
            let currentSection = targetedButton.parentElement.parentElement.parentElement.getAttribute("data-macro-section");
            // Gets attribute Macro Name
            let currentBtnName = targetedButton.getAttribute("data-macro-name");
            console.log("Button Clicked: ", currentBtnName)
            // Gets attribute data-multi-select
            let currentBtnType = targetedButton.getAttribute("data-multi-select");
            // Gets Active Status
            let isCurrentlyActive = targetedButton.classList.contains("active-macro");

            setActiveButtonsAndReportText(currentSection, targetedButton, currentBtnName, isCurrentlyActive, currentBtnType);


        });
    });

    allDropdownOptions.forEach((option) => {
        option.addEventListener("click", (li) => {
            console.log("Extra Option Clicked");
            // Event Target
            let currentOption = li.currentTarget;
            // Extra Option Value
            let optionValue = currentOption.getAttribute('data-additional-option');
            // Extra Option Active Status
            let optionActiveStatus = currentOption.getAttribute('data-option-active');

            // Gets Parent Div
            let buttonParentDiv = currentOption.parentElement.parentElement;
            // Gets Macro Section
            let currentSection = currentOption.parentElement.parentElement.parentElement.parentElement.getAttribute("data-macro-section");
            // Targets extra option sibling button
            let currentButton = buttonParentDiv.querySelector('button');
            // Gets Button Multi Select stauts=us
            let currentBtnType = currentButton.getAttribute('data-multi-select');
            // Gets button active status
            let btnActiveStatus = currentButton.classList.contains('active-macro');
            // Gets button macro name
            let currentBtnName = currentButton.getAttribute('data-macro-name');

            setActiveButtonsReportTextAndBracketText(currentSection, currentButton, currentBtnName, btnActiveStatus, currentBtnType, currentOption, optionValue, optionActiveStatus);

            // setBracketedText(currentSection, currentOption, optionValue);


        });
    });

    let removeImpressionBtn;
    let closeButton;

    let createCloseButton = () => {
        closeBtn = document.createElement('a');
        closeBtn.classList.add('btn');
        closeBtn.classList.add('dr-btn-tertiary');
        closeBtn.classList.add('danger');
        closeBtn.setAttribute('data-btn-type', 'remove-impression')
        closeBtn.innerHTML = '<i class="bi bi-x-lg"></i>'
        closeBtn.setAttribute('onClick', 'removeImpression(this, event)')
    }

    appendEmptyImpression = (textSection) => {
        let parentDiv = textSection.parentElement;
        let newDiv = document.createElement('div');
        newDiv.classList.add('empty-impression');
        // newDiv.innerHTML = "<strong>Impression:</strong> Add impression here";
        let newLabel = document.createElement('p');
        newLabel.innerHTML = "<strong>Impression:</strong>"
        let newImpression = document.createElement('p')
        newImpression.setAttribute('contenteditable', 'true');

        let closeBtn = document.createElement('a');
        closeBtn.classList.add('btn');
        closeBtn.classList.add('dr-btn-tertiary');
        closeBtn.classList.add('danger');
        closeBtn.setAttribute('data-btn-type', 'remove-impression')
        closeBtn.innerHTML = '<i class="bi bi-x-lg"></i>'
        closeBtn.setAttribute('onClick', 'removeImpression(this, event)')

        // console.log(removeImpressionBtn)
        parentDiv.appendChild(newDiv);
        newDiv.appendChild(newLabel);
        newDiv.appendChild(newImpression);
        newDiv.appendChild(closeBtn);
    }

    // Event listener for all Add Empty Impression buttons
    allAddImpressionBtns.forEach((button) => {
        button.addEventListener("click", (impression) => {
            console.log("Click")

            let currentOption = impression.currentTarget;
            let optionValue = currentOption.getAttribute('data-impression-section');
            let editableTextSection = document.querySelector(`[data-report-section="${optionValue}"]`);

            appendEmptyImpression(editableTextSection);
        })
    });

    // onClick function that removes an impression field
    removeImpression = (element, event) => {
        console.log(element);
        event.preventDefault();
        console.log("Remove Impression")
        let currentRemoveButton = event.target;
        console.log(currentRemoveButton)

        let impresionDiv = element.parentElement;
        impresionDiv.remove();
    }


});