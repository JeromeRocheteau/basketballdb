package com.github.jeromerocheteau.basketballdb.commons;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.github.jeromerocheteau.JdbcQueryServlet;

public abstract class SelectAll<T> extends JdbcQueryServlet<List<T>> {

	private static final long serialVersionUID = 202209161017001L;

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		List<T> items = this.doProcess(request);
		this.doWrite(items, response.getWriter());
	}
	
	@Override
	protected void doFill(PreparedStatement statement, HttpServletRequest request) throws Exception { }

}
