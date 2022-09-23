insert into `users` (`username`,`password`,`rolename`,`firstname`,`lastname`,`gender`) 
values (?, md5(?), ?, ?, ?, ?);