package com.avanade.codingchallenge.nationalparksapi.model;

import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.*;

@Entity
@Table(name="parks")
public class Park {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int parkId;

    @Column(name= "url", columnDefinition = "NVARCHAR(1000)")
    private String url;

    @Column(name= "fullName")
    private String fullName;

    @Column(name= "parkCode")
    private String parkCode;

    @Column(name= "description", columnDefinition = "TEXT")
    private String description;

    @Column(name= "latitude")
    private String latitude;

    @Column(name= "longitude")
    private String longitude;

    @ManyToMany(fetch = FetchType.LAZY,
        cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
        })    
    @JoinTable(name = "park_activities",
        joinColumns = { @JoinColumn(name="park_id")},
        inverseJoinColumns = { @JoinColumn(name = "activity_id")})
    private Set<Activity> activities = new HashSet<>();

    public Park()
    {

    }

    public Park(String url, String fullName, String parkCode, String description, String latitude, String longitude){
        this.url = url;
        this.fullName= fullName;
        this.parkCode = parkCode;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public int getId(){
        return parkId;
    }

    public String getUrl(){
        return url;
    }

    public void setUrl(String url){
        this.url = url;
    }

    public String getFullName(){
        return fullName;
    }

    public void setFullName(String fullName){
        this.fullName = fullName;
    }

    public String getParkCode(){
        return parkCode;
    }

    public void setParkCode(String parkCode){
        this.parkCode = parkCode;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public String getLatitude(){
        return latitude;
    }

    public void setLatitude(String latitude){
        this.latitude = latitude;
    }

    public String getLongitude(){
        return longitude;
    }

    public void setLongitude(String longitude){
        this.longitude = longitude;
    }

    public void addActivity(Activity activity) {
        this.activities.add(activity);
        activity.getParks().add(this);
    }

    public void removeActivity(int activityId) {
        Activity activity = this.activities.stream().filter(a -> a.getId() == activityId).findFirst().orElse(null);
        if(activity != null) {
            this.activities.remove(activity);
            activity.getParks().remove(this);
        }
    }
}