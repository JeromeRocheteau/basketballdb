package com.github.jeromerocheteau.basketballdb.users;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.github.jeromerocheteau.basketballdb.api.User;
import com.github.jeromerocheteau.basketballdb.commons.SelectAll;

public class SelectSomeUsers extends SelectAll<User> {

	private static final long serialVersionUID = 202210141440004L;
	
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
	protected List<User> doMap(HttpServletRequest request, ResultSet resultSet) throws Exception {
		List<User> users = new LinkedList<User>();
		while (resultSet.next()) {
			String username = resultSet.getString("username");
			String rolename = resultSet.getString("rolename");
			String firstname = resultSet.getString("firstname");
			String lastname = resultSet.getString("lastname");
			Boolean gender = resultSet.getBoolean("gender");
			Date birthday = resultSet.getDate("birthday");
			User user = new User(username, rolename, firstname, lastname, gender, birthday);
			users.add(user);
		}
		return users;
	}

}
