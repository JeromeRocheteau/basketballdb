package com.github.jeromerocheteau.basketballdb.users;

import java.io.IOException;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.github.jeromerocheteau.JdbcUpdateServlet;

public class UpdateOneUser extends JdbcUpdateServlet<Integer> {

	private static final long serialVersionUID = 202210141440003L;
	
	private DateFormat formatter;
	
	@Override 
	public void init() throws ServletException {
		super.init();
		formatter = new SimpleDateFormat("yyyy-MM-dd");
	}
	
	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		Integer count = this.doProcess(request);
		this.doWrite(count, response.getWriter());
	}

	@Override
	public void doFill(PreparedStatement statement, HttpServletRequest request) throws Exception {
		String principal = request.getUserPrincipal().getName();
		String username = request.getParameter("username");
		String firstname = request.getParameter("firstname");
		String lastname = request.getParameter("lastname");
		Boolean gender = Boolean.valueOf(request.getParameter("gender"));
		String birthday = request.getParameter("birthday");
		statement.setString(1, firstname);
		statement.setString(2, lastname);
		statement.setBoolean(3, gender);
		if (birthday == null) {
			statement.setNull(4, Types.DATE);
		} else {
			long time = formatter.parse(birthday).getTime();
			statement.setDate(4, new Date(time));
		}
		statement.setString(5, username);
		statement.setString(6, principal);
	}
	
	@Override
	protected Integer doMap(HttpServletRequest request, int count, ResultSet resultSet) throws Exception {
		return count;
	}

}
