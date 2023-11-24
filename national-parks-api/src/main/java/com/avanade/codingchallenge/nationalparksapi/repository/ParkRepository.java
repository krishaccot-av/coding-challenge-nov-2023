package com.avanade.codingchallenge.nationalparksapi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.avanade.codingchallenge.nationalparksapi.model.Park;

public interface ParkRepository extends JpaRepository<Park,Integer>{
    List<Park> findByParkCode(String parkCode);
    List<Park> findByFullNameContaining(String fullName);
    List<Park> findParksByActivitiesId(Integer activityId);
}