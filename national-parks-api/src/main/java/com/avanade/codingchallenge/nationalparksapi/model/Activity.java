package com.avanade.codingchallenge.nationalparksapi.model;

import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="activities")
public class Activity {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int activityId;

    @Column(name= "name")
    private String name;

    @ManyToMany(fetch = FetchType.LAZY,
        cascade = { CascadeType.PERSIST, CascadeType.MERGE },
        mappedBy = "activities"
        )
    @JsonIgnore
    private Set<Park> parks = new HashSet<>();

    public Activity() {}

    public Activity(String name) {
        this.name = name;
    }

    public int getId(){
        return activityId;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public Set<Park> getParks() {
        return parks;
    }

    public void setParks(Set<Park> parks)
    {
        this.parks = parks;
    }

}