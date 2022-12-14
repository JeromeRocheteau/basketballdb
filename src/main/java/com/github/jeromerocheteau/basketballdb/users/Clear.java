package com.github.jeromerocheteau.basketballdb.users;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Clear extends HttpServlet {

	private static final long serialVersionUID = 202209091250001L;

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		request.getSession().invalidate();
		response.sendRedirect(response.encodeRedirectURL(request.getContextPath()));
	}

}
