var content = {};

content.display = false;

rivets.bind($('#content'), content);

rivets.formatters.date = function(value) {
	return moment(value).format('YYYY-MM-DD');
};

rivets.formatters.time = function(value) {
	return moment(value).format('HH:mm');
};

rivets.formatters.float = function(value) {
	return value.toFixed(2);
}

/* users */

content.users = {};
content.users.role = false;

var getUserPrincipal = function() {
	basketballdb.users.name(function onSuccess(response) {
		content.users.principal = response;
		basketballdb.users.role(function onSuccess(response) {
			content.users.role = response;
		}, function onError(response) {
			content.users.role = false;
		});
	}, function onError(response) {
		content.users.principal = null;
	});
};

/* scores */

var chart = null;
var drillChart = null;
var minimum = 0;
var maximum = 20;

content.colors = {};
content.scores = {};

content.groups = {};
content.stats = {};

content.parameters = {};
content.parameters.mode = 1;
content.parameters.options = [{ value: 1, code: "average", text: "average" }, { value: 2, code: "max", text: "maximum" }, { value: 3, code: "min", text: "minimum" }, { value: 4, code: "count", text: "count" }];

var doEmpty = function(container) {
	for (var i in container) {
		var scores = container[i];
		if (Array.isArray(scores['average'])) {
			while (scores['average'].length > 0) {
				scores['average'].pop();
			}
		};
		if (Array.isArray(scores['max'])) {
			while (scores['max'].length > 0) {
				scores['max'].pop();
			}
		};
		if (Array.isArray(scores['min'])) {
			while (scores['min'].length > 0) {
				scores['min'].pop();
			}
		};
		if (Array.isArray(scores['count'])) {
			while (scores['count'].length > 0) {
				scores['count'].pop();
			}
		};
	}
};

var setValues = function(container, items) {
	doEmpty(container);
	for (var i = 0; i < items.length; i++) {
		try {
			var item = items[i];
			var drill = item.drill.name;
			// var player = item.user;
			var date = moment(item.date);
			if (container[drill]) {
			} else {
				container[drill] = {};
			}
			if (container[drill]['average']) {
				container[drill]['average'].push({ x: date, y: parseInt(item.average) });
			} else {
				container[drill]['average'] = [];
				container[drill]['average'].push({ x: date, y: parseInt(item.average) });
			}
			if (container[drill]['max']) {
				container[drill]['max'].push({ x: date, y: parseInt(item.max) });
			} else {
				container[drill]['max'] = [];
				container[drill]['max'].push({ x: date, y: parseInt(item.max) });
			}
			if (container[drill]['min']) {
				container[drill]['min'].push({ x: date, y: parseInt(item.min) });
			} else {
				container[drill]['min'] = [];
				container[drill]['min'].push({ x: date, y: parseInt(item.min) });
			}
			if (container[drill]['count']) {
				container[drill]['count'].push({ x: date, y: parseInt(item.count) });
			} else {
				container[drill]['count'] = [];
				container[drill]['count'].push({ x: date, y: parseInt(item.count) });
			}
			if (content.colors[drill]) {
			} else {
				content.colors[drill] = item.drill.color;
			}
			/* FIXME
			if (score < minimum) {
				minimum = score - 1;
			}
			if (maximum < score) {
				maximum = score + 1;
			}
			*/
		} catch (error) {
			console.log(error);
		}
	}
};

var getMode = function() {
	if (content.parameters.mode == 1) {
		return "average";
	} else if (content.parameters.mode == 2) {
		return "max";
	} else if (content.parameters.mode == 3) {
		return "min";
	} else if (content.parameters.mode == 4) {
		return "count";
	} else {
		return null;
	}
};

var getDatasets = function() {
	var mode = getMode();
	var datasets = [];
	for (var i = 0; i < content.groups.statsByDrill.length; i++) {
		var item = content.groups.statsByDrill[i];
		var name = item.drill.name;
		var scores = content.scores[name][mode];
		var color = "#555555";
		if (content.colors[name]) {
			color = content.colors[name];
		}
		if (Array.isArray(scores)) {
			var dataset = { label: name, fill: false, tension: 0.4, backgroundColor: color, borderColor: color, data: scores };
			datasets.push(dataset);
		}
	}
	for (var i = 0; i < content.groups.statsByDrill.length; i++) {
		var item = content.groups.statsByDrill[i];
		var name = item.drill.name;
		var scores = content.stats[name][mode];
		var color = "#555555";
		if (content.colors[name]) {
			color = content.colors[name];
		}
		color = color + "50";
		if (Array.isArray(scores)) {
			var dataset = { label: name + " (overall)", fill: false, tension: 0.4, hidden : true, backgroundColor: color, borderColor: color, data: scores };
			datasets.push(dataset);
		}
	}
	return datasets;
};

var setChart = function() {
	var label = content.users.principal.firstname + " " + content.users.principal.lastname;
	var datasets = getDatasets();
	var context = document.getElementById('player-chart').getContext('2d');
	var payload = {
		type: 'line',
		data: { datasets: datasets },
		options: {
			plugins: { title: { display: true, text: label } },
			scales: {
				x: { type: 'time', time: { unit: 'day', displayFormats: { day: 'YYYY-MM-DD' } }, min: content.parameters.start, max: content.parameters.stop },
				y: { type: 'linear', beginAtZero: true, suggestedMin: minimum, suggestedMax: maximum }
			}
		}
	};
	if (chart) {
		chart.destroy();
	}
	chart = new Chart(context, payload);
	chart.update();
};

var getDrillName = function() {
	if (content.parameters.drill) {
		return content.parameters.drill.name;
	} else {
		return null;
	}
};

var getDrillDatasets = function() {
	var name = getDrillName();
	var datasets = [];
	var averageScores = content.scores[name]['average'];
	var maxScores = content.scores[name]['max'];
	var minScores = content.scores[name]['min'];
	var countScores = content.scores[name]['count'];

	var groupAverageScores = content.stats[name]['average'];
	var groupMaxScores = content.stats[name]['max'];

	var averageColor = content.colors[name];
	var maxColor = averageColor + "30";
	var minColor = averageColor + "30";

	var groupColor = "#fcf3cf";
	var groupBackgroungColor = groupColor + "50";

	var countColor = "#555555";
	if (Array.isArray(averageScores)) {
		var dataset = { label: "Average", fill: false, tension: 0.4, backgroundColor: averageColor, borderColor: averageColor, data: averageScores };
		datasets.push(dataset);
	};
	if (Array.isArray(maxScores)) {
		var dataset = { label: "Maximum", fill: false, tension: 0.4, fill: 2, backgroundColor: maxColor, borderColor: maxColor, data: maxScores };
		datasets.push(dataset);
	};
	if (Array.isArray(minScores)) {
		var dataset = { label: "Minimum", fill: false, tension: 0.4, backgroundColor: minColor, borderColor: minColor, data: minScores };
		datasets.push(dataset);
	};
	if (Array.isArray(countScores)) {
		var dataset = { label: "Count", fill: false, tension: 0.4, backgroundColor: countColor, borderColor: countColor, data: countScores };
		datasets.push(dataset);
	};
	if (Array.isArray(groupAverageScores)) {
		var dataset = { label: "Average (overall)", fill: false, tension: 0.4, fill: 5, backgroundColor: groupBackgroungColor, borderColor: groupColor, data: groupAverageScores };
		datasets.push(dataset);
	};
	if (Array.isArray(groupMaxScores)) {
		var dataset = { label: "Maximum (overall)", fill: false, tension: 0.4, backgroundColor: groupBackgroungColor, borderColor: groupColor, data: groupMaxScores };
		datasets.push(dataset);
	};
	return datasets;
};

var setDrillChart = function() {
	var label = content.users.principal.firstname + " " + content.users.principal.lastname;
	var datasets = getDrillDatasets();
	var context = document.getElementById('player-drill-chart').getContext('2d');
	var payload = {
		type: 'line',
		data: { datasets: datasets },
		options: {
			plugins: { title: { display: true, text: label } },
			scales: {
				x: { type: 'time', time: { unit: 'day', displayFormats: { day: 'YYYY-MM-DD' } }, min: content.parameters.start, max: content.parameters.stop },
				y: { type: 'linear', beginAtZero: true, suggestedMin: minimum, suggestedMax: maximum }
			}
		}
	};
	if (drillChart) {
		drillChart.destroy();
	}
	drillChart = new Chart(context, payload);
	drillChart.update();
};

var getUserScores = function() {
	basketballdb.users.scores(content.parameters.start, content.parameters.stop, function onSuccess(response) {
		content.users.scores = response;
	}, function onError(response) {
		content.users.scores = [];
		console.log(response);
	});
};

var getUserStatsBySession = function() {
	basketballdb.users.statsBySession(content.parameters.start, content.parameters.stop, function onSuccess(response) {
		content.users.statsBySession = response;
		setValues(content.scores, content.users.statsBySession);
		setChart();
		if (content.parameters.drill) {
			setDrillChart();
		}
		content.display = true;
	}, function onError(response) {
		content.users.statsBySession = [];
		console.log(response);
	});
};

var getUserStatsByDrill = function() {
	basketballdb.users.statsByDrill(content.parameters.start, content.parameters.stop, function onSuccess(response) {
		content.users.statsByDrill = response;
		getUserStatsBySession();
	}, function onError(response) {
		content.users.statsByDrill = [];
		console.log(response);
	});
};

var getStatsBySession = function() {
	basketballdb.stats.statsBySession(content.parameters.start, content.parameters.stop, function onSuccess(response) {
		content.groups.statsBySession = response;
		setValues(content.stats, content.groups.statsBySession);
		getUserStatsByDrill();
	}, function onError(response) {
		content.groups.statsBySession = [];
		console.log(response);
	});
};

var getStatsByDrill = function() {
	basketballdb.stats.statsByDrill(content.parameters.start, content.parameters.stop, function onSuccess(response) {
		content.groups.statsByDrill = response;
		getStatsBySession();
	}, function onError(response) {
		content.groups.statsByDrill = [];
		console.log(response);
	});
};

content.parameters.doReset = function() {
	content.parameters.start = moment().startOf('year').format('YYYY-MM-DD');
	content.parameters.stop = moment().endOf('year').format('YYYY-MM-DD');
	content.parameters.doUpdate();
};

content.parameters.doMode = function() {
	setChart();
};

content.parameters.doClear = function() {
	content.users.scores = null;
};

content.parameters.doUpdate = function() {
	if (content.users.role == true) {
	} else {
		getStatsByDrill();
	}
};

content.parameters.doSelect = function(event, item) {
	content.parameters.drill = item.stats.drill;
	basketballdb.users.scores(content.parameters.drill.id, content.parameters.start, content.parameters.stop, function onSuccess(response) {
		content.users.scores = response;
	}, function onError(response) {
		content.users.scores = [];
		console.log(response);
	});
};

content.parameters.doPick = function(event, item) {
	content.parameters.drill = item.stats.drill;
	setDrillChart();
};

/* init */

var doInit = function() {
	getUserPrincipal();
	content.parameters.doReset();
}

document.addEventListener("DOMContentLoaded", doInit);