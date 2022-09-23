package com.github.jeromerocheteau.basketballdb.commons;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.github.jeromerocheteau.JdbcQueryServlet;

public class Count extends JdbcQueryServlet<Integer> {

	private static final long serialVersionUID = 202209161017000L;

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		Integer count = this.doProcess(request);
		this.doWrite(count, response.getWriter());
	}
	
	@Override
	protected void doFill(PreparedStatement statement, HttpServletRequest request) throws Exception { }

	@Override
	protected Integer doMap(HttpServletRequest request, ResultSet resultSet) throws Exception {
		if (resultSet.next()) {
			Integer count = resultSet.getInt("count");
			return count;
		} else {
			return 0;
		}
	}

}
