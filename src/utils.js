
function get(url) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = () => {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };

        req.onerror = () => {
            reject(Error('Network Error'));
        };

        req.send();
    })
}

function getJSON(url) {
    return get(url).then(JSON.parse);
}

function getChapter(i) {
    storyPromise = storyPromise || getJSON('story.json');

    return storyPromise.then(story => getJSON(story.chapterUrls[i]));
}

