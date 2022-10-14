select
  d.`id` as `id`,
  d.`name` as `name`,
  d.`desc` as `desc`,
  d.`duration` as `duration`,
  d.`min` as `min`,
  d.`max` as `max`,
  d.`color` as `color`
from `drills` as d
where d.`owner` = ?
limit ?,?;