const MenuBtnId = "vkMemesMenuBtn";

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


function ClearInput() {
    console.log("Input clear: " + imgMeme);
    let str = input.textContent;
    str = str.replace(imgMeme, "");
    str = str.replace(str.split("!")[1], "");
    str = str.replace("!", "");
    input.textContent = str.trim();
}

function hideElement(element) {
    element.style.display = "none";
}

function showElement(element, displayStyle) {
    element.style.display = displayStyle;
}

function CreateMemeButton(img) {
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

const attachementChangeCallback = function(mustationList, observer) {
    ClearInput();
    observer.disconnect();
};

const inputChangeCallback = function() {
    console.log("Input changed");
    let str = input.textContent;
    if (str.includes("!")) {
        memeTag = str.split("!")[1];
        if (memeTag != "") {
            chrome.runtime.sendMessage({ tag: memeTag }, response => {
                console.log("Response from server");
                CleanMenu();
                for (let i = 0; i < response.memesList.length; i++) {
                    const meme = response.memesList[i];
                    CreateMemeButton(meme.imageSource);
                }
                showElement(menuWrap, "flex");
            });
        } else {
            console.log("There are no symbols after !");
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

    CreateMemeButton("https://sun1-14.userapi.com/c856016/v856016030/24aaaf/w9KelYIAdqw.jpg");
}

//Checking if page changed and if it is now on messages
const obsPage = new MutationObserver(pageChangedCallback);
obsPage.observe(body, obsConfig);