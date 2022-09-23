var content = {};

rivets.bind($('#content'), content);

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

content.users.doSelectProfile = function() {
	content.users.item = Object.assign({}, content.users.principal);
	content.users.password = null;
};

content.users.doSelectPassword = function() {
	content.users.password = {};
	content.users.item = null;
};

content.users.doClear = function() {
	content.users.item = null;
	content.users.password = null;
};

content.users.doProfile = function() {
	basketballdb.users.profile(content.users.item, function onSuccess(response) {
		content.users.item = null;
		getUserPrincipal();
	}, function onError(response) {
		console.log(response);
	});
};

content.users.doPassword = function() {
	if (content.users.password  && content.users.password.orig && content.users.password.confirm) {
		if (content.users.password.orig == content.users.password.confirm) {
			basketballdb.users.password(content.users.password.orig, function onSuccess(response) {
				content.users.password = null;
			}, function onError(response) {
				console.log(response);
			});			
		}
	}
};

/* init */

var doInit = function () {
	getUserPrincipal();
}

document.addEventListener("DOMContentLoaded", doInit);