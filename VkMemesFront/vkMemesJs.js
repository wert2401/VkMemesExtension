const MenuBtnId = "vkMemesMenuBtn";

const obsConfig = {
    attributes: true,
    childList: true,
    subtree: true
};

let img = "https://meduza.io/image/attachments/images/002/526/218/large/9rhaxT2iQ0LrWFYJAh_aBA.jpg";
let buttons;
let input;
let attachements;
let body = document.getElementById("page_body");


function ClearInput() {
    console.log("Input clear: " + img);
    let str = input.textContent;
    str = str.replace(img, "");
    input.textContent = str.trim();
}

function hideElement(element) {
    element.style.display = "none";
}

function CreateMemeButton(menu, img, attachements) {
    let menuBtn = document.createElement("label");
    menuBtn.id = MenuBtnId;
    menuBtn.style.backgroundImage = "url(" + img + ")";
    menu.appendChild(menuBtn);
    const obsAttach = new MutationObserver(attachementCallback);

    menuBtn.addEventListener("click", function() {
        input.textContent += " " + img;
        input.focus()
        obsAttach.observe(attachements, obsConfig);
    })
}

const attachementCallback = function(mutationsList, observer) {
    ClearInput();
    observer.disconnect();
};

const pageCallback = function(mutationsList, observer) {
    buttons = document.getElementsByClassName("im_chat-input--buttons")[0];
    let btn = document.getElementById(MenuBtnId);

    if (buttons == undefined || btn != undefined) return;

    input = document.getElementsByClassName("im_editable im-chat-input--text _im_text")[0];
    attachements = document.getElementsByClassName("im-chat-input--scroll")[0];

    //Create menu
    let menuWrap = document.createElement("div");
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

    let menu = document.createElement("div");
    menu.className = "vkMemesMenu";
    menuWrap.appendChild(menu);

    //Some event on changing input for opening menu, MutationObserver mb

    //Add memes in menu
    for (i = 0; i < 10; i++) {
        CreateMemeButton(menu, img, attachements);
    }
}

const obsPage = new MutationObserver(pageCallback);
obsPage.observe(body, obsConfig);