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

content.colors = {};
// FIXME
content.colors['Johannès'] = "#0000ff";
content.colors['Batum'] = "#00ff00";
content.colors['Fournier'] = "#ff0000";
content.colors['Gruda'] = "#000000";

content.scores = {};

content.statistics = {};

var doEmpty = function() {
	for (var i in content.scores) {
		var scores = content.scores[i];
		if (Array.isArray(scores)) {
			while (scores.length > 0) {
				scores.pop();
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
		    var average = parseInt(item.average);
			if (content.scores[drill]) {
				content.scores[drill].push({x : date, y: average});
			} else {
				content.scores[drill] = [];
				content.scores[drill].push({x : date, y: average});	
			}
		} catch (error) {
		    console.log(error);
		}
    }
};

var getDatasets = function() {
	var datasets = [];
	for (var name in content.scores) {
		var scores = content.scores[name];
		var color = "#757575";
		if (content.colors[name]) {
			color = content.colors[name];
		}
		if (Array.isArray(scores)) {
			var dataset = { label: name, fill: false, tension : 0.4, backgroundColor: color, borderColor: color, data: scores };
			datasets.push(dataset);
		};	
	}
	return datasets;
}

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
				x: { type : 'time', time : {unit: 'day', displayFormats: { day: 'YYYY-MM-DD' }}, min: content.statistics.start, max: content.statistics.stop},
				y : { type : 'linear', beginAtZero: true, suggestedMin : 0, suggestedMax: 25} // FIXME
		    }
		}
    };
    if (chart) {
		chart.destroy();
    } 
    chart = new Chart(context, payload);
    chart.update();
};

var getUserScores = function() {
	basketballdb.users.scores(content.statistics.start, content.statistics.stop, function onSuccess(response) {
		content.users.scores = response;
	}, function onError(response) {
		content.users.scores = [];
		console.log(response);
	});
};

var getUserStatsBySession = function() {
	basketballdb.users.statsBySession(content.statistics.start, content.statistics.stop, function onSuccess(response) {
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
	basketballdb.users.statsByDrill(content.statistics.start, content.statistics.stop, function onSuccess(response) {
		content.users.statsByDrill = response;
	}, function onError(response) {
		content.users.statsByDrill = [];
		console.log(response);
	});
};

content.statistics.doReset = function() {
	content.statistics.start = moment().startOf('year').format('YYYY-MM-DD');
	content.statistics.stop = moment().endOf('year').format('YYYY-MM-DD');
	content.statistics.doUpdate();
};

content.statistics.doClear = function() {
	content.users.scores = null;
};

content.statistics.doUpdate = function() {
	getUserStatsByDrill();
	getUserStatsBySession();
};

content.statistics.doSelect = function(event, item) {
	content.statistics.drill = item.stats.drill;
	basketballdb.users.scores(content.statistics.drill.id, content.statistics.start, content.statistics.stop, function onSuccess(response) {
		content.users.scores = response;
	}, function onError(response) {
		content.users.scores = [];
		console.log(response);
	});	
};

/* init */

var doInit = function () {
	getUserPrincipal();
	content.statistics.doReset();
}

document.addEventListener("DOMContentLoaded", doInit);