package com.avanade.codingchallenge.nationalparksapi.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.avanade.codingchallenge.nationalparksapi.model.Activity;



public interface ActivityRepository extends JpaRepository<Activity, Integer> {
    List<Activity> findActivitiesByParksId(Integer parkId);
}