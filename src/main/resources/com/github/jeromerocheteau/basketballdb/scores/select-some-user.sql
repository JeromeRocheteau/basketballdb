select
  s.`id` as `id`,
  s.`date` as `date`,
  s.`value` as `value`,
  d.`id` as `drill_id`,
  d.`name` as `drill_name`,
  d.`desc` as `drill_desc`,
  d.`duration` as `drill_duration`,
  d.`min` as `drill_min`,
  d.`max` as `drill_max`,
  d.`color` as `drill_color`,
  u.`username` as `user_username`,
  u.`rolename` as `user_rolename`,
  u.`firstname` as `user_firstname`,
  u.`lastname` as `user_lastname`,
  u.`gender` as `user_gender`,
  u.`birthday` as `user_birthday`
from `scores` as s
inner join `users` as u on u.`username` = s.`user`
inner join `drills` as d on d.`id` = s.`drill`
where u.`username` = ? 
  and ? <= s.`date` 
  and s.`date` <= ? 
  and d.`id` = ?;