var freetab = {

	TabGroup: function(tabs) {
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
						resolve(tg.tabs)
					})
				})
			})
		}

		this.restore = function() {
			return Promise.all(this.tabs.map(function(tab) {
					return new Promise(function(resolve, reject) {
						chrome.tabs.create({
							url: tab.url,
							pinned: tab.pinned
						}, function(tab) {
							resolve(tab)
						})
					})
			}))
		}

		this.count = tabs.length
	},

	getAllTabGroups: function() {
		return new Promise(function(resolve, reject) {
			chrome.storage.local.get({'tabgroups': []}, function(data) {
				// console.log(chrome.runtime.lastError)
				tabgroups = data.tabgroups.sort(function(a, b) {
				    a = new Date(a.created);
				    b = new Date(b.created);
				    return a > b ? -1 : a < b ? 1 : 0;
				});
				resolve(tabgroups)
			})
		})
	},

	getOrCreateFreeTabPage: function() {
		query = {
			url: "chrome-extension://" + chrome.i18n.getMessage("@@extension_id") + "/freetab.html",
			windowId: chrome.windows.WINDOW_ID_CURRENT
		}
		return new Promise(function(resolve, reject) {
			chrome.tabs.query(query, function(tabs) {
				if(tabs.length > 0) {
					resolve(tabs[0])
				} else {
					chrome.tabs.create({url: 'freetab.html'}, function(tab) {
						resolve(tab)
					})
				}
			})
		})
	},

	getTabs: function(query) {
		return new Promise(function(resolve, reject) {
			chrome.tabs.query(query, function(tabs) {
				resolve(tabs)
			})
		})
	}

}
