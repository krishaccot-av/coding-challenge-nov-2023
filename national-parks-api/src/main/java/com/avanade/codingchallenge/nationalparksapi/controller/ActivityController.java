package com.avanade.codingchallenge.nationalparksapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.avanade.codingchallenge.nationalparksapi.model.Park;
import com.avanade.codingchallenge.nationalparksapi.model.Activity;
import com.avanade.codingchallenge.nationalparksapi.repository.ParkRepository;
import com.avanade.codingchallenge.nationalparksapi.repository.ActivityRepository;
@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ActivityController {
    @Autowired
    private ParkRepository parkRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @GetMapping("/activities")
    public ResponseEntity<List<Activity>> getAllActivities() {
        List<Activity> activities = new ArrayList<Activity>();

        activityRepository.findAll().forEach(activities::add);

        if(activities.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(activities,HttpStatus.OK);
    }

    @GetMapping("/parks/{parkId}/activities")
    public ResponseEntity<List<Activity>> getAllActivitiesByParkId(@PathVariable(value="parkId") Integer parkId) {
        if(!parkRepository.existsById(parkId))
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Activity> activities = activityRepository.findActivitiesByParksId(parkId);
        return new ResponseEntity<>(activities, HttpStatus.OK);
    }

    @GetMapping("/activities/{id}")
    public ResponseEntity<Activity> getActivityById(@PathVariable( value = "id") Integer id) {
        Optional<Activity> activity = activityRepository.findById(id);

        return new ResponseEntity<>(activity.get(),HttpStatus.OK);
    }

    @GetMapping("/activities/{activityId}/parks")
    public ResponseEntity<List<Park>> getAllParksByTagId(@PathVariable(value = "activityId") Integer activityId) {
      if (!activityRepository.existsById(activityId)) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
  
      List<Park> parks = parkRepository.findParksByActivitiesId(activityId);
      return new ResponseEntity<>(parks, HttpStatus.OK);
    }

    @PostMapping("/parks/{parkId}/activities")
    public ResponseEntity<Activity> addActivity(@PathVariable(value = "parkId") int parkId, @RequestBody Activity activityRequest) {
        Optional<Activity> activity = parkRepository.findById(parkId).map(park -> {
        int activityId = activityRequest.getId();
      
        // activity is existed
        if (activityId != 0L) {
            Activity _activity = activityRepository.findById(activityId).get();
            park.addActivity(_activity);
            parkRepository.save(park);
            return _activity;
        }
        
        // add and create new Tag
        park.addActivity(activityRequest);
        return activityRepository.save(activityRequest);
        });

        return new ResponseEntity<>(activity.get(), HttpStatus.CREATED);
    }

    @PutMapping("/activities/{id}")
    public ResponseEntity<Activity> updateActivity(@PathVariable("id") int id, @RequestBody Activity activityRequest) {
        Activity activity = activityRepository.findById(id).get();

        activity.setName(activityRequest.getName());

        return new ResponseEntity<>(activityRepository.save(activity), HttpStatus.OK);
    }

    @DeleteMapping("/parks/{parkId}/activities/{activityId}")
    public ResponseEntity<HttpStatus> deleteActivityFromPark(@PathVariable(value = "parkId") Integer parkId, @PathVariable(value = "activityId") Integer activityId) {
        Park park = parkRepository.findById(parkId).get();
        
        park.removeActivity(activityId);
        parkRepository.save(park);
        
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/tags/{id}")
    public ResponseEntity<HttpStatus> deleteActivity(@PathVariable("id") int id) {
        activityRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}