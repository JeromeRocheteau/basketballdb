select
  count(u.`username`) as `count`
from `users` as u
where u.`username` <> ?;