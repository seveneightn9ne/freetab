// When button is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
	
	// construct tabs query
	get_tabs_query = {
		windowId: chrome.windows.WINDOW_ID_CURRENT,
		pinned : false // TODO this will be an option some day
	}
	// get list of tabs
	chrome.tabs.query(get_tabs_query, function(tabs) {
		tg = new freetab.TabGroup(tabs)

		tg.save().then(function() {
			// open FreeTab page
			chrome.tabs.create({url: 'freetab.html'}, function(tab) {
				chrome.extension.getBackgroundPage().console.log("made a new tab")
			})
			// close all tabs
			chrome.tabs.remove(tabs.map(function(tab){return tab.id}))
		}, function() {}) // no error handling
	})


});