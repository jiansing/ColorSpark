// @codekit-prepend "clipboard.js";

// Variables
var characters = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
var colorHistory = new Array();
var gradientHistory = new Array();
var gradientInfoHistory = new Array();


//ClipboadJS initialization
new ClipboardJS('.clipboard-button');


// Loads dark mode's current state
document.body.classList = localStorage.getItem('activeState');

function toggleDarkMode() {
    //Toggles dark mode class
    document.body.classList.toggle("dark-mode");
    // Saves dark mode's state
    localStorage.setItem('activeState',document.body.classList);
}

// Generate Random Color
function generateColor() {
    var color = "#";
    for (i = 0; i < 6; i++) {
        color += characters[Math.floor(Math.random()*characters.length)];;
    }
    document.getElementById('generated-color').style.background = color;
    document.getElementById("color-info").innerHTML = color;
    colorHistory.unshift(color);
    document.getElementById('copy-button').setAttribute("data-clipboard-text", color);

    // Resets Copy Button
    if(document.getElementById('copy-icon').src = "assets/checkmark.svg"){
        document.getElementById('copy-tooltip').innerHTML = "Copy Hex";
        document.getElementById('copy-icon').src = "assets/copy.svg"
    };
}

// Generate random gradient
function generateGradient() {
    var direction = Math.floor(Math.random()*181);
    direction *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    var color1 = "#";
    var color2 = "#";
    for (i = 0; i < 6; i++) {
        color1 += characters[Math.floor(Math.random()*characters.length)];
        color2 += characters[Math.floor(Math.random()*characters.length)];
    }
    var gradient = "linear-gradient("+direction+'deg, '+color1+', '+color2+')'
    var gradientInfo = color1+ " &rtrif; "+color2 +"<div>"+direction+"&deg;</div>";
    document.getElementById('generated-color').style.background = gradient;
    document.getElementById("color-info").innerHTML = gradientInfo;
    document.getElementById('copy-button').setAttribute("data-clipboard-text", "background: "+gradient+";")
    gradientHistory.unshift(gradient);
    gradientInfoHistory.unshift(gradientInfo);

    // Resets Copy Button
    if(document.getElementById('copy-icon').src = "assets/checkmark.svg"){
        document.getElementById('copy-tooltip').innerHTML = "Copy CSS";
        document.getElementById('copy-icon').src = "assets/copy.svg"
    };
}

// Back button for gradients
function gradientBack() {
    if(gradientHistory.length > 1) {
        gradient = gradientHistory[1];
        gradientInfo = gradientInfoHistory[1];
        document.getElementById('generated-color').style.background = gradient;
        document.getElementById("color-info").innerHTML = gradientInfo;
        gradientHistory.splice(0, 1);
        gradientInfoHistory.splice(0, 1);
        document.getElementById('copy-button').setAttribute("data-clipboard-text", "background: "+gradient+";");
    };

    // Resets Copy Button
    if(document.getElementById('copy-icon').src = "assets/checkmark.svg"){
        document.getElementById('copy-tooltip').innerHTML = "Copy CSS";
        document.getElementById('copy-icon').src = "assets/copy.svg"
    };
}

// Back button for colors
function colorBack() {
    if(colorHistory.length > 1) {
        color = colorHistory[1];
        document.getElementById('generated-color').style.background = color;
        document.getElementById("color-info").innerHTML = color;
        colorHistory.splice(0, 1);
        document.getElementById('copy-button').setAttribute("data-clipboard-text", color)
    };

    // Resets Copy Button
    if(document.getElementById('copy-icon').src = "assets/checkmark.svg"){
        document.getElementById('copy-tooltip').innerHTML = "Copy Hex";
        document.getElementById('copy-icon').src = "assets/copy.svg"
    };
}

// Copy button success
function copy() {
    document.getElementById('copy-tooltip').innerHTML = "Copied!";
    document.getElementById('copy-icon').src = "assets/checkmark.svg";
}


// Toggles the extras menu
$("#menu-button").click(function(){
    $("#extras-menu").toggle("slide");
    $("#menu-icon-top-bar").toggleClass("top-bar-rotated");
    $("#menu-icon-bottom-bar").toggleClass("bottom-bar-rotated");
    if(window.matchMedia('(max-width: 500px)').matches) {
        $("#logo-container").fadeToggle("fast");
    };
});

