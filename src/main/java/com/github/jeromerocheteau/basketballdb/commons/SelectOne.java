package com.github.jeromerocheteau.basketballdb.commons;

import java.io.IOException;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.github.jeromerocheteau.JdbcQueryServlet;

public abstract class SelectOne<T> extends JdbcQueryServlet<T> {

	private static final long serialVersionUID = 202209161017003L;

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		T item = this.doProcess(request);
		this.doWrite(item, response.getWriter());
	}
	
	@Override
	protected void doFill(PreparedStatement statement, HttpServletRequest request) throws Exception { }

}
