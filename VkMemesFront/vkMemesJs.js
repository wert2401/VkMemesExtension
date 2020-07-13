const MenuBtnId = "vkMemesMenuBtn";
const ErrorImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRALb0GFZBEAJQ-OMQ5tv-v5icl3YtKbW6aYg&usqp=CAU";

const obsConfig = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
};

let body = document.getElementById("page_body");
let input;
let menuWrap;
let menu;
let attachements;
let buttons;

let imgMeme;
let timerId;

function сlearInput() {
    let str = input.textContent;
    strToRemove = str.split("!")[1].trim();
    str = str.replace("!" + strToRemove, "");
    input.textContent = str.trim();
}

function hideElement(element) {
    element.style.display = "none";
}

function showElement(element, displayStyle) {
    element.style.display = displayStyle;
}

function сreateMemeButton(img) {
    let menuBtn = document.createElement("label");
    menuBtn.id = MenuBtnId;
    menuBtn.style.backgroundImage = "url(" + img + ")";
    menuBtn.addEventListener("click", function() {
        input.textContent += " " + img;
        input.focus();
        imgMeme = img;
        const obsAttach = new MutationObserver(attachementChangeCallback);
        obsAttach.observe(attachements, obsConfig);
    });

    menu.appendChild(menuBtn);
}

function CleanMenu() {
    menu.innerHTML = "";
}

const attachementChangeCallback = function(mutationList, observer) {
    сlearInput();
    hideElement(menuWrap);
    observer.disconnect();
};

//Need to refactor
const inputChangeCallback = function(mutationList, observer) {
    console.log("Input changed");
    let str = input.textContent;
    if (str.includes("https://")) return;
    if (str.includes("!")) {
        memeTag = str.split("!")[1];
        if (memeTag != "" && memeTag != undefined) {
            if (timerId != null) {
                console.log("Clear timer");
                clearTimeout(timerId);
            }
            console.log("Set timer");
            timerId = setTimeout(() => {
                str = input.textContent;
                memeTag = str.split("!")[1].trim();
                console.log(memeTag);
                chrome.runtime.sendMessage({ tag: memeTag }, response => {
                    console.log(response);
                    CleanMenu();
                    if (response.memeList.length > 0) {
                        for (let i = 0; i < response.memeList.length; i++) {
                            const meme = response.memeList[i];
                            сreateMemeButton(meme.imageSource);
                        }
                    } else {
                        сreateMemeButton(ErrorImage);
                    }
                    showElement(menuWrap, "flex");
                });
            }, 2000);
        }
    } else {
        hideElement(menuWrap);
    }
};

const pageChangedCallback = function() {
    buttons = document.getElementsByClassName("im_chat-input--buttons")[0];
    let btn = document.getElementById(MenuBtnId);

    if (buttons == undefined || btn != undefined) return;

    input = document.getElementsByClassName("im_editable im-chat-input--text _im_text")[0];
    attachements = document.getElementsByClassName("im-chat-input--scroll")[0];

    //Create menu
    menuWrap = document.createElement("div");
    menuWrap.className = "vkMemesWrap";
    buttons.parentElement.appendChild(menuWrap);

    let closePanel = document.createElement("div");
    closePanel.className = "vkMemesClosePanel";
    menuWrap.appendChild(closePanel);

    let labelClose = document.createElement("img");
    labelClose.className = "vkMemesCloseLabel";
    labelClose.setAttribute("src", chrome.extension.getURL("Icons/close.png"));
    labelClose.addEventListener("click", () => {
        hideElement(menuWrap);
    })
    closePanel.appendChild(labelClose);

    menu = document.createElement("div");
    menu.className = "vkMemesMenu";
    menuWrap.appendChild(menu);

    //Event on changing input for opening menu
    const obsInput = new MutationObserver(inputChangeCallback);
    obsInput.observe(input, obsConfig);

    сreateMemeButton(ErrorImage);
    hideElement(menuWrap);
}

//Checking if page changed and if it is now on messages
const obsPage = new MutationObserver(pageChangedCallback);
obsPage.observe(body, obsConfig);