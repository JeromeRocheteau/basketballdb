select
  d.`id` as `id`,
  d.`name` as `name`,
  d.`desc` as `desc`,
  d.`duration` as `duration`,
  d.`min` as `min`,
  d.`max` as `max`
from `drills` as d
where d.`id` = ?;