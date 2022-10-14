package com.github.jeromerocheteau.basketballdb.drills;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.github.jeromerocheteau.JdbcUpdateServlet;

public class InsertOneDrill extends JdbcUpdateServlet<Integer> {

	private static final long serialVersionUID = 202209201050001L;
	
	private DateFormat formatter;
	
	@Override 
	public void init() throws ServletException {
		super.init();
		formatter = new SimpleDateFormat("HH:mm:ss");
	}
	
	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		Integer count = this.doProcess(request);
		this.doWrite(count, response.getWriter());
	}

	@Override
	public void doFill(PreparedStatement statement, HttpServletRequest request) throws Exception {
		String owner = request.getUserPrincipal().getName();
		String name = request.getParameter("name");
		String desc = request.getParameter("desc");
		String string = request.getParameter("duration");
		long duration = formatter.parse(string).getTime();
		Integer min = Integer.valueOf(request.getParameter("min"));
		Integer max = Integer.valueOf(request.getParameter("max"));
		statement.setString(1, name);
		statement.setString(2, desc);
		statement.setTime(3, new Time(duration));
		statement.setInt(4, min);
		statement.setInt(5, max);
		statement.setString(6, owner);
	}
	
	@Override
	protected Integer doMap(HttpServletRequest request, int count, ResultSet resultSet) throws Exception {
		return count;
	}

}
