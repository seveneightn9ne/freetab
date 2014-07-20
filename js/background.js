var freetab = freetab || {}

// TabGroup model
freetab.TabGroup = function(tabs) {
	this.tabs = tabs; // Array of Tabs
	this.created = new Date();
}

// Initialize settings
var settings = new Store("settings", {
    "sample_setting": "This is how you use Store.js to remember values",
    "ignore_pinned_tabs": true
});

// When button is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
	alert('icon clicked')
	
	// construct tabs query
	get_tabs_query = {
		windowid: windows.WINDOW_ID_CURRENT
	}
	if (settings.get("ignore_pinned_tabs")) {
		get_tabs_query.pinned = false;
	}

	// get list of tabs
	chrome.tabs.query(get_tabs_query, function(tabs) {
		// sort by position in window
		tabs = tabs.sort(function(a,b) {a.index-b.index})
	})


});