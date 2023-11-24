package com.avanade.codingchallenge.nationalparksapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.avanade.codingchallenge.nationalparksapi.model.Park;
import com.avanade.codingchallenge.nationalparksapi.repository.ParkRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ParkController {

    @Autowired
    ParkRepository parkRepository;

    @GetMapping("/parks")
    public ResponseEntity<List<Park>> getAllParks(@RequestParam(required = false) String fullName){
        try {
            List<Park> parks = new ArrayList<Park>();

            if(fullName == null) {
                parkRepository.findAll().forEach(parks::add);
            }
            else {
                parkRepository.findByFullNameContaining(fullName).forEach(parks::add);
            }

            if(parks.isEmpty()) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(parks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/parks/{id}")
    public ResponseEntity<Park> getParkById(@PathVariable("id") int id){
        Optional<Park> parkData = parkRepository.findById(id);
        
        if(parkData.isPresent()){
            return new ResponseEntity<>(parkData.get(),HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/parks")
    public ResponseEntity<Park> createPark(@RequestBody Park park){
        try {
            Park _park = parkRepository.save(new Park(park.getUrl(), park.getFullName(), park.getParkCode(), park.getDescription(), park.getLatitude(), park.getLongitude()));
            return new ResponseEntity<>(_park, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/parks/{id}")
    public ResponseEntity<Park> updatePark(@PathVariable("id") int id, @RequestBody Park park){
        Optional<Park> parkData = parkRepository.findById(id);

        if(parkData.isPresent()){
            Park _park = parkData.get();
            _park.setUrl(park.getUrl());
            _park.setFullName(park.getFullName());
            _park.setParkCode(park.getParkCode());
            _park.setDescription(park.getDescription());
            _park.setLatitude(park.getLatitude());
            _park.setLongitude(park.getLongitude());

            return new ResponseEntity<>(parkRepository.save(_park),HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/parks/{id}")
    public ResponseEntity<HttpStatus> deletePark(@PathVariable("id") Integer id){
        try {
            parkRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/parks")
    public ResponseEntity<HttpStatus> deleteAllParks(){
        try {
            parkRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}