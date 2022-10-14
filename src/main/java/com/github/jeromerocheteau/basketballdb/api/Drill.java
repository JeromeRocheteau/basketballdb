package com.github.jeromerocheteau.basketballdb.api;

import java.sql.Time;

public class Drill {

	private Integer id;
	
	private String name;
	
	private String desc;
	
	private Time duration;
	
	private Integer min;
	
	private Integer max;
	
	private User owner;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public Time getDuration() {
		return duration;
	}

	public void setDuration(Time duration) {
		this.duration = duration;
	}

	public Integer getMin() {
		return min;
	}

	public void setMin(Integer min) {
		this.min = min;
	}

	public Integer getMax() {
		return max;
	}

	public void setMax(Integer max) {
		this.max = max;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public Drill(Integer id, String name, String desc, Time duration, Integer min, Integer max, User owner) {
		super();
		this.id = id;
		this.name = name;
		this.desc = desc;
		this.duration = duration;
		this.min = min;
		this.max = max;
		this.owner = owner;
	}
	
}