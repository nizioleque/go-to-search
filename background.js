chrome.runtime.onInstalled.addListener(details => {
	if(details.reason === 'install') {
		chrome.storage.sync.get('tutorialDisplayed', items => {
			if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
			else if (!items.tutorialDisplayed) {
				chrome.tabs.create({
					url: chrome.runtime.getURL('welcome.html')
				});
				chrome.storage.sync.set({
					tutorialDisplayed: chrome.runtime.getManifest().version
				});
			}
		});
	}
});

chrome.action.onClicked.addListener(tab => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ['content.js']
	}, result => {
		// run functions here
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: _focus
		});
	});
});

function _focus() {
	focus()
}