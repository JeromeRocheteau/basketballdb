package com.github.jeromerocheteau.basketballdb.scores;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import com.github.jeromerocheteau.basketballdb.api.Drill;
import com.github.jeromerocheteau.basketballdb.api.Stats;
import com.github.jeromerocheteau.basketballdb.commons.SelectAll;

public class SelectSomeStats extends SelectAll<Stats> {

	private static final long serialVersionUID = 202209220940001L;
	
	private DateFormat formatter;
	
	@Override 
	public void init() throws ServletException {
		super.init();
		formatter = new SimpleDateFormat("yyyy-MM-dd");
	}

	@Override
	public void doFill(PreparedStatement statement, HttpServletRequest request) throws Exception {
		String startString = request.getParameter("start");
		String stopString = request.getParameter("stop");
		Date start = new Date(formatter.parse(startString).getTime());
		Date stop = new Date(formatter.parse(stopString).getTime());
		statement.setDate(1, start);
		statement.setDate(2, stop);
	}
	
	@Override
	protected List<Stats> doMap(HttpServletRequest request, ResultSet resultSet) throws Exception {
		List<Stats> stats = new LinkedList<Stats>();
		while (resultSet.next()) {
			Date date = resultSet.getDate("day");
			Integer count = resultSet.getInt("count");
			Float average = resultSet.getFloat("average");
			Integer min = resultSet.getInt("min");
			Integer max = resultSet.getInt("max");
			Integer drillId = resultSet.getInt("drill_id");
			String drillName = resultSet.getString("drill_name");
			String drillDesc = resultSet.getString("drill_desc");
			Time drillDuration = resultSet.getTime("drill_duration");
			Integer drillMin = resultSet.getInt("drill_min");
			Integer drillMax = resultSet.getInt("drill_max");
			String drillColor = resultSet.getString("drill_color");
			Drill drill = new Drill(drillId, drillName, drillDesc, drillDuration, drillMin, drillMax, drillColor, null);
			Stats stat = new Stats(date, count, average, min, max, drill, null);
			stats.add(stat);
		}
		return stats;
	}

}
