$(document).ready(function() {
	freetab.getAllTabGroups().then(function(tabgroups) {
		$.each(tabgroups, function(i, tg) {

			$tabgroup = $("<section>").addClass("tabgroup")
				.append($("<h2>")
					.text(chrome.i18n.getMessage("num_tabs", tg.count.toString()) + " ")
					.append($("<small>").text(tg.created)))
				.append($("<ul>"))

			$.each(tg.tabs, function(i, tab) {
				$tabgroup.find("ul").append($("<li>").text(tab.title))
			})

			$("#tabgroups").append($tabgroup)

		})
	}, function() {
		console.log("There was an error")
	})
})