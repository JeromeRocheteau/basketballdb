package com.github.jeromerocheteau.basketballdb.users;

import java.sql.PreparedStatement;

import javax.servlet.http.HttpServletRequest;

import com.github.jeromerocheteau.basketballdb.commons.Count;

public class CountUsers extends Count {

	private static final long serialVersionUID = 202210141440006L;
	
	@Override
	protected void doFill(PreparedStatement statement, HttpServletRequest request) throws Exception {
		String username = request.getUserPrincipal().getName();
		statement.setString(1, username);
	}

}
