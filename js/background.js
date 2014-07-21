// When button is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
	
	// construct tabs query
	tabsToGet = {
		windowId: chrome.windows.WINDOW_ID_CURRENT,
		pinned : false // TODO this will be an option some day
	}

	Promise.all([freetab.getTabs(tabsToGet), freetab.getOrCreateFreeTabPage()]).then(function(results) {
		allTabs = results[0]
		freeTabPage = results[1]
		tabsInGroup = allTabs.filter(function(tab) {return tab != freeTabPage})
		tg = new freetab.TabGroup(tabsInGroup)
		return tg.save()
	}).then(function(tabs) {
		chrome.tabs.remove(tabs.map(function(tab) {return tab.id}))
	})

});

