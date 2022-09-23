package com.github.jeromerocheteau.basketballdb.api;

import java.sql.Date;

public class Stats {
	
	private Integer count;

	private Float average;

	private Integer max;
	
	private Integer min;
	
	private Drill drill;
	
	private User user;
	
	private Date date;

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public Float getAverage() {
		return average;
	}

	public void setAverage(Float average) {
		this.average = average;
	}

	public Integer getMax() {
		return max;
	}

	public void setMax(Integer max) {
		this.max = max;
	}

	public Integer getMin() {
		return min;
	}

	public void setMin(Integer min) {
		this.min = min;
	}

	public Drill getDrill() {
		return drill;
	}

	public void setDrill(Drill drill) {
		this.drill = drill;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Stats(Date date, Integer count, Float average, Integer min, Integer max, Drill drill, User user) {
		super();
		this.date = date;
		this.count = count;
		this.average = average;
		this.max = max;
		this.min = min;
		this.drill = drill;
		this.user = user;
	}
	
}