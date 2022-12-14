package com.github.jeromerocheteau.basketballdb.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class NoCacheFilter implements Filter {

	private final String CACHE_CONTROL = "Cache-Control";
	
	private final String EXPIRES = "Expires";
	
    @Override
    public void init(FilterConfig filterConfig) throws ServletException { }
	
	@Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.setHeader(CACHE_CONTROL, "no-cache, no-store");
        httpResponse.setDateHeader(EXPIRES, 0L);
        chain.doFilter(request, response);
    }

	@Override
	public void destroy() { }
	
}
