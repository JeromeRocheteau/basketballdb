package com.github.jeromerocheteau.basketballdb.drills;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

public class SelectUserScoreDrills extends SelectAllDrills {

	private static final long serialVersionUID = 202209271310001L;
	
	private DateFormat formatter;
	
	@Override 
	public void init() throws ServletException {
		super.init();
		formatter = new SimpleDateFormat("yyyy-MM-dd");
	}
	
	@Override
	public void doFill(PreparedStatement statement, HttpServletRequest request) throws Exception {
		String username = request.getUserPrincipal().getName();
		String startString = request.getParameter("start");
		String stopString = request.getParameter("stop");
		Date start = new Date(formatter.parse(startString).getTime());
		Date stop = new Date(formatter.parse(stopString).getTime());
		statement.setString(1, username);
		statement.setDate(2, start);
		statement.setDate(3, stop);
	}

}
