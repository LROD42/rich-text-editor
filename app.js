let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButtons = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");


//list of Fonts
let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive"
];

//Initial Settings
const initializer = () => {
    //function calls for highlighting button
    //no highlights for link, unlink, lists, undo, redo, since they are one time operations
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    //create options for fonts names
    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    //fontsize allows only till 7 
    for (let i =1; i <= 7; i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    };

    //default Size 
    fontSizeRef.value = 3;
};

//main logic
const modifyText =(command, defaultUi, value) => {
    //execComand executes comand on selected text
    document.execCommand(command, defaultUi, value);
};

//for basic operations which dont need value paramenter 
optionsButtons.forEach((button) =>{
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

//options that require value parameter (e.g. colors, fonts)
advancedOptionButtons.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

//link
linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL");
    //if link has https the pass directly, else add https
    if(/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
})

//highlight clicked button
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            //needsRemoval = true means only one button should be highlighted and other would ben normal
            if(needsRemoval){
                let alreadyActive = false;

                //if currently clicked button is already active
                if(button.classList.contains("active")){
                    alreadyActive = true;
                }

                //remove highlight from other buttons
                highlighterRemover(className);
                if(!alreadyActive){
                    //highligh clicked button
                    button.classList.add("active");
                };
            } 
            else {
                 //if other buttons can be highlighted
                 button.classList.toggle("active");
            };
        });
    });
};

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

window.onload = initializer();