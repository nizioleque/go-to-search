function optionsClick(e) {
    chrome.tabs.create({
        url: 'chrome://extensions/shortcuts'
    });
}

document.querySelector('#keyboard-settings').addEventListener('click', optionsClick);