package com.github.jeromerocheteau.basketballdb.drills;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Time;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.github.jeromerocheteau.basketballdb.api.Drill;
import com.github.jeromerocheteau.basketballdb.commons.SelectAll;

public class SelectSomeDrills extends SelectAll<Drill> {

	private static final long serialVersionUID = 202209161310002L;
	
	@Override
	protected void doFill(PreparedStatement statement, HttpServletRequest request) throws Exception {
		String username = request.getUserPrincipal().getName();
		Integer offset = Integer.valueOf(request.getParameter("offset"));
		Integer length = Integer.valueOf(request.getParameter("length"));
		statement.setString(1, username);
		statement.setInt(2, offset);
		statement.setInt(3, length);
	}
	
	@Override
	protected List<Drill> doMap(HttpServletRequest request, ResultSet resultSet) throws Exception {
		List<Drill> drills = new LinkedList<Drill>();
		while (resultSet.next()) {
			Integer id = resultSet.getInt("id");
			String name = resultSet.getString("name");
			String desc = resultSet.getString("desc");
			Time duration = resultSet.getTime("duration");
			Integer min = resultSet.getInt("min");
			Integer max = resultSet.getInt("max");
			Drill drill = new Drill(id, name, desc, duration, min, max, null);
			drills.add(drill);
		}
		return drills;
	}

}
