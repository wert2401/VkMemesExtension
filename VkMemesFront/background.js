chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.tag != null) {
        //Make request to a server
        sendResponse({
            memesList: [{
                    imageSource: "https://meduza.io/image/attachments/images/002/526/884/large/a9jobmDDvAwNrWr8DzVdOg.jpg",
                    tags: ["dog", "meme"]
                },
                {
                    imageSource: "https://meduza.io/image/attachments/images/002/526/218/large/9rhaxT2iQ0LrWFYJAh_aBA.jpg",
                    tags: ["dog", "meme"]
                },
                {
                    imageSource: "https://pbs.twimg.com/media/DogSMPSXUAYHDx4.jpg",
                    tags: ["dog", "meme"]
                }
            ]
        });
    }
});