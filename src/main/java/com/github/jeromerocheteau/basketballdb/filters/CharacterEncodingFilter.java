package com.github.jeromerocheteau.basketballdb.filters;

import java.io.IOException;
import java.nio.charset.Charset;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class CharacterEncodingFilter implements Filter {

	private final String REQUEST_CHARACTER_ENCODING = "request-character-encoding";
	
	private final String RESPONSE_CHARACTER_ENCODING = "response-character-encoding";
	
	private Charset requestCharacterEncoding;
	
	private Charset responseCharacterEncoding;
	
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    	String requestEncoding = filterConfig.getInitParameter(REQUEST_CHARACTER_ENCODING);
    	String responseEncoding = filterConfig.getInitParameter(RESPONSE_CHARACTER_ENCODING);
		requestCharacterEncoding = Charset.forName(requestEncoding);
		responseCharacterEncoding = Charset.forName(responseEncoding);
    }
	
	@Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		request.setCharacterEncoding(requestCharacterEncoding.name());
        response.setCharacterEncoding(responseCharacterEncoding.name());
        chain.doFilter(request, response);
    }

	@Override
	public void destroy() { }
	
}
