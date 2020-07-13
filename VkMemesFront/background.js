chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.tag != null || request.tag != "") {
        fetch("https://localhost:5001/api/memes/" + request.tag)
            .then(response => response.json())
            .then(json => sendResponse({ memeList: json }))
            .catch(error => sendResponse({ error: error }));
        return true;
    }
});