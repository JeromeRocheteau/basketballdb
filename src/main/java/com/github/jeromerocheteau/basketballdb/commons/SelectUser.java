package com.github.jeromerocheteau.basketballdb.commons;

import java.sql.PreparedStatement;

import javax.servlet.http.HttpServletRequest;

public abstract class SelectUser<T> extends SelectOne<T> {

	private static final long serialVersionUID = 202209161017004L;
	
	@Override
	protected void doFill(PreparedStatement statement, HttpServletRequest request) throws Exception {
		String username = request.getUserPrincipal().getName();
		statement.setString(1, username);
	}

}
