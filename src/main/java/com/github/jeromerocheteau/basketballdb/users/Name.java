package com.github.jeromerocheteau.basketballdb.users;

import java.io.IOException;
import java.sql.Date;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.github.jeromerocheteau.basketballdb.api.User;
import com.github.jeromerocheteau.basketballdb.commons.SelectUser;

public class Name extends SelectUser<User> {

	private static final long serialVersionUID = 202209091250002L;

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		User user = this.doProcess(request);
		this.doWrite(user, response.getWriter());
	}

	@Override
	protected User doMap(HttpServletRequest request, ResultSet resultSet) throws Exception {
		User user = null;
		if (resultSet.next()) {
			String username = resultSet.getString("username");
			String rolename = resultSet.getString("rolename");
			String firstname = resultSet.getString("firstname");
			String lastname = resultSet.getString("lastname");
			Boolean gender = resultSet.getBoolean("gender");
			Date birthday = resultSet.getDate("birthday");
			user = new User(username, rolename, firstname, lastname, gender, birthday);
			return user;			
		} 
		return user;
	}

}
