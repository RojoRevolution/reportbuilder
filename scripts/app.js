
document.addEventListener("DOMContentLoaded", () => {

    // const maxillaMacroButtons = document.getElementById('maxillaMacros').querySelectorAll('.dr-utility');;
    // const mandibleMacroButtons = document.getElementById('mandibleMacros').querySelectorAll('.dr-utility');;
    const allMacroButtons = document.querySelectorAll('.dr-utility');
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

    // console.log(jsonData);

    setReportText = (macro) => {

        setMacroText = (section, option) => {

        }


        switch (macro) {
            case "Maxilla Normal":
                sectionText = allReportSection[0].innerHTML;
                console.log("Definition: ", jsonData.maxilla.normal.definition);
                allReportSection[0].innerHTML = jsonData.maxilla.normal.definition;
                break;
            case "Palatine Torus":
                console.log("Definition: ", jsonData.maxilla.PalatineTorus.definition);
                allReportSection[0].innerHTML = jsonData.maxilla.PalatineTorus.definition;
                break;
            default:
                break;
        }
    }


    allMacroButtons.forEach((button) => {
        button.addEventListener("click", (btn) => {
            let currentBtn = btn.currentTarget.getAttribute("data-macro-name");
            console.log(currentBtn)
            setReportText(currentBtn);
        })
    })


});