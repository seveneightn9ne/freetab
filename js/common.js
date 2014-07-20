var freetab = freetab || {}

// TabGroup
freetab.TabGroup = function(tabs) {
	// tabs is an Array of Tabs
	this.tabs = tabs.sort(function(a,b) {a.index-b.index});
	this.created = (new Date()).toUTCString();

	this.save = function() {
		// Save to synced datastore as a new tab group. 
		// Returns a Promise which resolves when the save finishes
		tg = this
		return new Promise(function(resolve, reject) {
			chrome.storage.local.get({'tabgroups': []}, function(data) {
				tabgroups = data.tabgroups;
				tabgroups.push(tg)
				chrome.storage.local.set({'tabgroups': tabgroups}, function() {
					resolve()
				})
			})
		})
	}

	this.count = tabs.length
}
freetab.getAllTabGroups = function() {
	return new Promise(function(resolve, reject) {
		chrome.storage.local.get({'tabgroups': []}, function(data) {
			// console.log(chrome.runtime.lastError)
			resolve(data.tabgroups)
		})
	})
}
