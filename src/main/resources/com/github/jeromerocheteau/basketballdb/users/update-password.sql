update `users`
set `password` = md5(?)
where `username` = ?;