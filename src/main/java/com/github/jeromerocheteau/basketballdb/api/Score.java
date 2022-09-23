package com.github.jeromerocheteau.basketballdb.api;

import java.sql.Timestamp;

public class Score {
	
	private Long id;
	
	private Timestamp date;
	
	private Drill drill;
	
	private User user;

	private Integer value;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
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

	public Integer getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}

	public Score(Long id, Timestamp date, Drill drill, User user, Integer value) {
		super();
		this.id = id;
		this.date = date;
		this.drill = drill;
		this.user = user;
		this.value = value;
	}
	
}