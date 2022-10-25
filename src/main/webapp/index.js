var content = {};

content.display = false;

rivets.bind($('#content'), content);

rivets.formatters.date = function(value) {
	return moment(value).format('YYYY-MM-DD');
};

rivets.formatters.time = function(value) {
	return moment(value).format('HH:mm');
};

rivets.formatters.float = function(value){
  return value.toFixed(2);
}

/* colors */

var doLightenDarkenColor = function(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
};

var transparentize = function(value, opacity) {
  var alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
};

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
content.parameters = {};
content.parameters.mode = 1;
content.parameters.options = [{value:1,code:"average",text:"average"},{value:2,code:"max",text:"maximum"},{value:3,code:"min",text:"minimum"},{value:4,code:"count",text:"count"}];

var doEmpty = function() {
	for (var i in content.scores) {
		var scores = content.scores[i];
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

var setValues = function(items) {
	doEmpty();
    for (var i = 0; i < items.length; i++) {
		try {
		    var item = items[i];
		    var drill = item.drill.name;
		    // var player = item.user;
		    var date = moment(item.date);
			if (content.scores[drill]) {
			} else {
				content.scores[drill] = {};
			}
			if (content.scores[drill]['average']) {
				content.scores[drill]['average'].push({x : date, y: parseInt(item.average)});
			} else {
				content.scores[drill]['average'] = [];
				content.scores[drill]['average'].push({x : date, y: parseInt(item.average)});
			}
			if (content.scores[drill]['max']) {
				content.scores[drill]['max'].push({x : date, y: parseInt(item.max)});
			} else {
				content.scores[drill]['max'] = [];
				content.scores[drill]['max'].push({x : date, y: parseInt(item.max)});
			}
			if (content.scores[drill]['min']) {
				content.scores[drill]['min'].push({x : date, y: parseInt(item.min)});
			} else {
				content.scores[drill]['min'] = [];
				content.scores[drill]['min'].push({x : date, y: parseInt(item.min)});
			}
			if (content.scores[drill]['count']) {
				content.scores[drill]['count'].push({x : date, y: parseInt(item.count)});
			} else {
				content.scores[drill]['count'] = [];
				content.scores[drill]['count'].push({x : date, y: parseInt(item.count)});
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
	for (var name in content.scores) {
		var scores = content.scores[name][mode];
		var color = "#555555";
		if (content.colors[name]) {
			color = content.colors[name];
		}
		if (Array.isArray(scores)) {
			var dataset = { label: name, fill: false, tension : 0.4, backgroundColor: color, borderColor: color, data: scores };
			datasets.push(dataset);
		};	
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
		options : {
		    plugins : { title : { display : true, text: label}},
		    scales : {
				x: { type : 'time', time : {unit: 'day', displayFormats: { day: 'YYYY-MM-DD' }}, min: content.parameters.start, max: content.parameters.stop},
				y : { type : 'linear', beginAtZero: true, suggestedMin : minimum, suggestedMax: maximum} 
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
	var averageColor = content.colors[name];
	var maxColor = averageColor + "30";
	var minColor = averageColor + "30";
	var countColor = "#555555";
	if (Array.isArray(averageScores)) {
		var dataset = { label: "average", fill: false, tension : 0.4, backgroundColor: averageColor, borderColor: averageColor, data: averageScores };
		datasets.push(dataset);
	};
	if (Array.isArray(maxScores)) {
		var dataset = { label: "max", fill: false, tension : 0.4, fill : 2, backgroundColor: maxColor, borderColor: maxColor, data: maxScores };
		datasets.push(dataset);
	};
	if (Array.isArray(minScores)) {
		var dataset = { label: "min", fill: false, tension : 0.4, backgroundColor: minColor, borderColor: minColor, data: minScores };
		datasets.push(dataset);
	};
	if (Array.isArray(maxScores)) {
		var dataset = { label: "count", fill: false, tension : 0.4, backgroundColor: countColor, borderColor: countColor, data: countScores };
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
		options : {
		    plugins : { title : { display : true, text: label}},
		    scales : {
				x: { type : 'time', time : {unit: 'day', displayFormats: { day: 'YYYY-MM-DD' }}, min: content.parameters.start, max: content.parameters.stop},
				y : { type : 'linear', beginAtZero: true, suggestedMin : minimum, suggestedMax: maximum} 
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
		setValues(content.users.statsBySession);
		setChart();
		content.display = true;
	}, function onError(response) {
		content.users.statsBySession = [];
		console.log(response);
	});
};

var getUserStatsByDrill = function() {
	basketballdb.users.statsByDrill(content.parameters.start, content.parameters.stop, function onSuccess(response) {
		content.users.statsByDrill = response;
	}, function onError(response) {
		content.users.statsByDrill = [];
		console.log(response);
	});
};

content.parameters.doReset = function() {
	content.parameters.start = moment().startOf('year').format('YYYY-MM-DD');
	content.parameters.stop = moment().endOf('year').format('YYYY-MM-DD');
	content.parameters.doUpdate();
};

content.parameters.doClear = function() {
	content.users.scores = null;
};

content.parameters.doUpdate = function() {
	if (content.users.role == true) {
	} else {
		getUserStatsByDrill();
		getUserStatsBySession();
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
	// console.log(content.parameters.drill);
	setDrillChart();
};

/* init */

var doInit = function () {
	getUserPrincipal();
	content.parameters.doReset();
}

document.addEventListener("DOMContentLoaded", doInit);