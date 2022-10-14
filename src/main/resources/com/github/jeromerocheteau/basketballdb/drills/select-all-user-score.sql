SELECT 
  d.`id` as `id`,
  d.`name` as `name`,
  d.`desc` as `desc`,
  d.`duration` as `duration`,
  d.`min` as `min`,
  d.`max` as `max`,
  d.`color` as `color`
from `scores` as s
inner join `users` as u on u.`username` = s.`user`
inner join `drills` as d on d.`id` = s.`drill`
where u.`username` = ?
  and ? <= s.`date` 
  and s.`date` <= ?
group by `id`;