var content = {};

rivets.bind($('#content'), content);

rivets.formatters.duration = function(value){
  return moment(value, 'HH:mm:ss').format('HH:mm:ss')
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

/* drills */

content.drills = {};
content.drills.offset = 0;
content.drills.length = 5;
content.drills.isCreating = false;
content.drills.isUpdating = false;

var getDrillCount = function() {
	basketballdb.drills.count(function onSuccess(response) {
		content.drills.count = response;
	}, function onError(response) {
		content.drills.count = 0;
	});
};

var getDrillItems = function() {
	basketballdb.drills.select(content.drills.offset, content.drills.length, function onSuccess(response) {
		content.drills.items = response;
	}, function onError(response) {
		content.drills.items = [];
	});
};

content.drills.doFirst = function() {
	if (content.drills.offset > 0) {
		content.drills.offset = 0;
		getDrillItems();		
	}
};

content.drills.doPrev = function() {
	if (content.drills.length <= content.drills.offset) {
		content.drills.offset -= content.drills.length;
		getDrillItems();
	}
};

content.drills.doNext = function() {
	if ((content.drills.offset + content.drills.length) < content.drills.count) {
		content.drills.offset += content.drills.length;
		getDrillItems();
	}
};

content.drills.doLast = function() {
	var last = Math.floor(content.drills.count / content.drills.length);
	if (content.drills.offset < last * content.drills.length) {
		content.drills.offset = last * content.drills.length;
		getDrillItems();		
	}
};

content.drills.doSelect = function(event, item) {
	content.drills.item = item.drill;
	content.drills.isCreating = false;
	content.drills.isUpdating = true;
};

content.drills.doClear = function() {
	content.drills.item = null;
	content.drills.isCreating = false;
	content.drills.isUpdating = false;
};

content.drills.doCreate = function() {
	content.drills.item = {};
	content.drills.isCreating = true;
	content.drills.isUpdating = false;
};

content.drills.doInsert = function() {
	basketballdb.drills.insert(content.drills.item, function onSuccess(response) {
		content.drills.item = null;
		getDrillCount();
		getDrillItems();
	}, function onError(response) {
		console.log(response);
	});
};

content.drills.doDelete = function() {
	basketballdb.drills.delete(content.drills.item, function onSuccess(response) {
		content.drills.item = null;
		getDrillCount();
		getDrillItems();
	}, function onError(response) {
		console.log(response);
	});
};

content.drills.doUpdate = function() {
	basketballdb.drills.update(content.drills.item, function onSuccess(response) {
		content.drills.item = null;
	}, function onError(response) {
		console.log(response);
	});
};

/* init */

var doInit = function () {
	getUserPrincipal();
	getDrillCount();
	getDrillItems();
}

document.addEventListener("DOMContentLoaded", doInit);