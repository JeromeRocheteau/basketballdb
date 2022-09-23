package com.github.jeromerocheteau.basketballdb.commons;

import java.sql.PreparedStatement;

import javax.servlet.http.HttpServletRequest;

public abstract class SelectSome<T> extends SelectAll<T> {

	private static final long serialVersionUID = 202209161017002L;
	
	@Override
	protected void doFill(PreparedStatement statement, HttpServletRequest request) throws Exception {
		Integer offset = Integer.valueOf(request.getParameter("offset"));
		Integer length = Integer.valueOf(request.getParameter("length"));
		statement.setInt(1, offset);
		statement.setInt(2, length);
	}

}
