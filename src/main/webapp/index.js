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

content.scores = {};

// FIXME
content.scores['Johannès'] = [];
content.scores['Batum'] = [];
content.scores['Fournier'] = [];
content.scores['Gruda'] = [];

var doEmpty = function() {
	// FIXME
	while (content.scores['Johannès'].length > 0) {content.scores['Johannès'].pop()};
	while (content.scores['Batum'].length > 0) {content.scores['Batum'].pop()};
	while (content.scores['Fournier'].length > 0) {content.scores['Fournier'].pop()};
	while (content.scores['Gruda'].length > 0) {content.scores['Gruda'].pop()};
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
		    content.scores[drill].push({x : date, y: average});
		} catch (error) {
		    console.log(error);
		}
    }
};

var setChart = function() {
    var label = content.users.principal.firstname + " " + content.users.principal.lastname;

    // FIXME
    rgbJohannes = 'rgb(0,0,255)';
    rgbBatum = 'rgb(0,255,0)';
    rgbFournier = 'rgb(255,0,0)';
    rgbGruda = 'rgb(0,0,0)';

    var context = document.getElementById('player-chart').getContext('2d');
    var payload = {
		type: 'line',
		data: { datasets: [
			// FIXME
		    { label: "Johannès", fill: false, tension : 0.4, backgroundColor: rgbJohannes, borderColor: rgbJohannes, data: content.scores['Johannès'] },	
		    { label: "Batum", fill: false, tension : 0.4, backgroundColor: rgbBatum, borderColor: rgbBatum, data: content.scores['Batum'] },
		    { label: "Fournier", fill: false, tension : 0.4, backgroundColor: rgbFournier, borderColor: rgbFournier, data: content.scores['Fournier'] },
		    { label: "Gruda", fill: false, tension : 0.4, backgroundColor: rgbGruda, borderColor: rgbGruda, data: content.scores['Gruda'] }
		] },
		options : {
		    plugins : { title : { display : true, text: label}},
		    scales : {
				x: { type : 'time', time : {unit: 'day', displayFormats: { day: 'YYYY-MM-DD' }}, min: content.scores.start, max: content.scores.stop},
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
	basketballdb.users.scores(content.scores.start, content.scores.stop, function onSuccess(response) {
		content.users.scores = response;
	}, function onError(response) {
		content.users.scores = [];
		console.log(response);
	});
};

var getUserStatsBySession = function() {
	basketballdb.users.statsBySession(content.scores.start, content.scores.stop, function onSuccess(response) {
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
	basketballdb.users.statsByDrill(content.scores.start, content.scores.stop, function onSuccess(response) {
		content.users.statsByDrill = response;
	}, function onError(response) {
		content.users.statsByDrill = [];
		console.log(response);
	});
};

content.scores.doReset = function() {
	content.scores.start = moment().startOf('month').format('YYYY-MM-DD');
	content.scores.stop = moment().endOf('month').format('YYYY-MM-DD');
	content.scores.doUpdate();
};

content.scores.doClear = function() {
	content.users.scores = null;
};

content.scores.doUpdate = function() {
	getUserStatsByDrill();
	getUserStatsBySession();
};

content.scores.doSelect = function(event, item) {
	console.log(item);
	console.log(item.stats.drill);
	content.scores.drill = item.stats.drill;
	basketballdb.users.scores(content.scores.drill.id, content.scores.start, content.scores.stop, function onSuccess(response) {
		content.users.scores = response;
	}, function onError(response) {
		content.users.scores = [];
		console.log(response);
	});	
};

/* init */

var doInit = function () {
	getUserPrincipal();
	content.scores.doReset();
}

document.addEventListener("DOMContentLoaded", doInit);