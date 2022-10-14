var content = {};

rivets.bind($('#content'), content);

rivets.formatters.date = function(value){
  return moment(value, 'yyyy-MM-dd').format('yyyy-MM-dd')
};

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

/* players */

content.players = {};
content.players.offset = 0;
content.players.length = 5;
content.players.isCreating = false;
content.players.isUpdating = false;

var getPlayerCount = function() {
	basketballdb.players.count(function onSuccess(response) {
		content.players.count = response;
	}, function onError(response) {
		content.players.count = 0;
	});
};

var getPlayerItems = function() {
	basketballdb.players.select(content.players.offset, content.players.length, function onSuccess(response) {
		content.players.items = response;
	}, function onError(response) {
		content.players.items = [];
	});
};

content.players.doFirst = function() {
	if (content.players.offset > 0) {
		content.players.offset = 0;
		getPlayerItems();		
	}
};

content.players.doPrev = function() {
	if (content.players.length <= content.players.offset) {
		content.players.offset -= content.players.length;
		getPlayerItems();
	}
};

content.players.doNext = function() {
	if ((content.players.offset + content.players.length) < content.players.count) {
		content.players.offset += content.players.length;
		getPlayerItems();
	}
};

content.players.doLast = function() {
	var last = Math.floor(content.players.count / content.players.length);
	if (content.players.offset < last * content.players.length) {
		content.players.offset = last * content.players.length;
		getPlayerItems();		
	}
};

content.players.doSelect = function(event, item) {
	console.log(item.player);
	content.players.item = item.player;
	content.players.isCreating = false;
	content.players.isUpdating = true;
};

content.players.doClear = function() {
	content.players.item = null;
	content.players.isCreating = false;
	content.players.isUpdating = false;
};

content.players.doCreate = function() {
	content.players.item = {};
	content.players.isCreating = true;
	content.players.isUpdating = false;
};

content.players.doInsert = function() {
	basketballdb.players.insert(content.players.item, function onSuccess(response) {
		content.players.item = null;
		getPlayerCount();
		getPlayerItems();
	}, function onError(response) {
		console.log(response);
	});
};

content.players.doDelete = function() {
	basketballdb.players.delete(content.players.item, function onSuccess(response) {
		content.players.item = null;
		getPlayerCount();
		getPlayerItems();
	}, function onError(response) {
		console.log(response);
	});
};

content.players.doUpdate = function() {
	basketballdb.players.update(content.players.item, function onSuccess(response) {
		content.players.item = null;
	}, function onError(response) {
		console.log(response);
	});
};

/* init */

var doInit = function () {
	getUserPrincipal();
	getPlayerCount();
	getPlayerItems();
}

document.addEventListener("DOMContentLoaded", doInit);