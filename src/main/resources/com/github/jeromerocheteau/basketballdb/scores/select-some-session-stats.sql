select
  date(s.`date`) as `day`,
  count(s.`value`) as `count`,
  avg(s.`value`) as `average`,
  min(s.`value`) as `min`,
  max(s.`value`) as `max`,
  d.`id` as `drill_id`,
  d.`name` as `drill_name`,
  d.`desc` as `drill_desc`,
  d.`duration` as `drill_duration`,
  d.`min` as `drill_min`,
  d.`max` as `drill_max`,
  d.`color` as `drill_color`
from `scores` as s
inner join `drills` as d on d.`id` = s.`drill`
where ? <= s.`date` and s.`date` <= ?
group by `day`, `drill_id`
order by `day`, `drill_id`;