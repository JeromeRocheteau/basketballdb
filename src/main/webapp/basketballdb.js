var basketballdb = {};

var invalid = function(value) {
	return value == null || value == undefined || value === "";
}

/* users */

basketballdb.users = {};
	    
basketballdb.users.name = function(onSuccess, onError) {
  const req = new XMLHttpRequest();
  req.onload = function(event) {
    if (this.status === 200) {
      onSuccess(JSON.parse(this.responseText));
    } else {
      onError(this.responseText);
    }
  };
  req.onerror = function(event) {
    onError(this.responseText);
  }
  req.open('GET','./users/name', true);
  req.send(null);    
};
	    
basketballdb.users.role = function(onSuccess, onError) {
  const req = new XMLHttpRequest();
  req.onload = function(event) {
    if (this.status === 200) {
      onSuccess(JSON.parse(this.responseText));
    } else {
      onError(this.responseText);
    }
  };
  req.onerror = function(event) {
    onError(this.responseText);
  }
  req.open('GET','./users/role', true);
  req.send(null);    
};
	    
basketballdb.users.password = function(password, onSuccess, onError) {
  const req = new XMLHttpRequest();
  req.onload = function(event) {
    if (this.status === 200) {
      onSuccess(JSON.parse(this.responseText));
    } else {
      onError(this.responseText);
    }
  };
  req.onerror = function(event) {
    onError(this.responseText);
  }
  const parameters = "?password=" + encodeURIComponent(password); 
  req.open('POST','./users/password' + parameters, true);
  req.send(null);    
};
	    
basketballdb.users.profile = function(data, onSuccess, onError) {
  const req = new XMLHttpRequest();
  req.onload = function(event) {
    if (this.status === 200) {
      onSuccess(JSON.parse(this.responseText));
    } else {
      onError(this.responseText);
    }
  };
  req.onerror = function(event) {
    onError(this.responseText);
  }
  const parameters = "?firstname=" + encodeURIComponent(data.firstname)
  +  "&lastname=" + encodeURIComponent(data.lastname)
  +  "&gender=" + encodeURIComponent(data.gender)
  +  "&birthday=" + encodeURIComponent(data.birthday);
  req.open('POST','./users/profile' + parameters, true);
  req.send(null);    
};

basketballdb.users.drills = function(start, stop, onSuccess, onError) {
  const req = new XMLHttpRequest();
  req.onload = function(event) {
    if (this.status === 200) {
      onSuccess(JSON.parse(this.responseText));
    } else {
      onError(this.responseText);
    }
  };
  req.onerror = function(event) {
    onError(this.responseText);
  }
  const parameters = '?start=' + start + '&stop=' + stop; 
  req.open('GET','./users/drills' + parameters, true);
  req.send(null);    
};

basketballdb.users.scores = function(drill, start, stop, onSuccess, onError) {
  const req = new XMLHttpRequest();
  req.onload = function(event) {
    if (this.status === 200) {
      onSuccess(JSON.parse(this.responseText));
    } else {
      onError(this.responseText);
    }
  };
  req.onerror = function(event) {
    onError(this.responseText);
  }
  const parameters = '?start=' + start + '&stop=' + stop + '&drill=' + drill; 
  req.open('GET','./users/scores' + parameters, true);
  req.send(null);    
};

basketballdb.users.statsBySession = function(start, stop, onSuccess, onError) {
  const req = new XMLHttpRequest();
  req.onload = function(event) {
    if (this.status === 200) {
      onSuccess(JSON.parse(this.responseText));
    } else {
      onError(this.responseText);
    }
  };
  req.onerror = function(event) {
    onError(this.responseText);
  }
  const parameters = '?start=' + start + '&stop=' + stop; 
  req.open('GET','./users/stats/session' + parameters, true);
  req.send(null);    
};

basketballdb.users.statsByDrill = function(start, stop, onSuccess, onError) {
  const req = new XMLHttpRequest();
  req.onload = function(event) {
    if (this.status === 200) {
      onSuccess(JSON.parse(this.responseText));
    } else {
      onError(this.responseText);
    }
  };
  req.onerror = function(event) {
    onError(this.responseText);
  }
  const parameters = '?start=' + start + '&stop=' + stop; 
  req.open('GET','./users/stats/drill' + parameters, true);
  req.send(null);    
};

/* drills */

basketballdb.drills = {};

basketballdb.drills.count = function(onSuccess, onError) {
  const req = new XMLHttpRequest();
  req.onload = function(event) {
    if (this.status === 200) {
      onSuccess(JSON.parse(this.responseText));
    } else {
      onError(this.responseText);
    }
  };
  req.onerror = function(event) {
    onError(this.responseText);
  }
  req.open('GET','./drills/count', true);
  req.send(null);    
};

basketballdb.drills.select = function(offset, length, onSuccess, onError) {
  const req = new XMLHttpRequest();
  req.onload = function(event) {
    if (this.status === 200) {
      onSuccess(JSON.parse(this.responseText));
    } else {
      onError(this.responseText);
    }
  };
  req.onerror = function(event) {
    onError(this.responseText);
  }
  const parameters = '?offset=' + offset + '&length=' + length; 
  req.open('GET','./drills/select' + parameters, true);
  req.send(null);    
};

basketballdb.drills.insert = function(data, onSuccess, onError) {
  const req = new XMLHttpRequest();
  req.onload = function(event) {
    if (this.status === 200) {
      onSuccess(JSON.parse(this.responseText));
    } else {
      onError(this.responseText);
    }
  };
  req.onerror = function(event) {
    onError(this.responseText);
  }
  const parameters = "?name=" + encodeURIComponent(data.name) 
  + "&desc=" + encodeURIComponent(data.desc) 
  + "&duration=" + encodeURIComponent(data.duration)
  + "&min=" + encodeURIComponent(data.min)
  + "&max=" + encodeURIComponent(data.max);
  req.open('POST','./drills/insert' + parameters, true);
  req.send(null);    
};

basketballdb.drills.update = function(data, onSuccess, onError) {
  const req = new XMLHttpRequest();
  req.onload = function(event) {
    if (this.status === 200) {
      onSuccess(JSON.parse(this.responseText));
    } else {
      onError(this.responseText);
    }
  };
  req.onerror = function(event) {
    onError(this.responseText);
  }
  const parameters = "?id=" + encodeURIComponent(data.id) 
  + "&name=" + encodeURIComponent(data.name) 
  + "&desc=" + encodeURIComponent(data.desc) 
  + "&duration=" + encodeURIComponent(data.duration)
  + "&min=" + encodeURIComponent(data.min)
  + "&max=" + encodeURIComponent(data.max);
  req.open('POST','./drills/update' + parameters, true);
  req.send(null);    
};

basketballdb.drills.delete = function(data, onSuccess, onError) {
  const req = new XMLHttpRequest();
  req.onload = function(event) {
    if (this.status === 200) {
      onSuccess(JSON.parse(this.responseText));
    } else {
      onError(this.responseText);
    }
  };
  req.onerror = function(event) {
    onError(this.responseText);
  }
  const parameters = "?id=" + encodeURIComponent(data.id);
  req.open('POST','./drills/delete' + parameters, true);
  req.send(null);    
};