package com.example.doc_app.controller;

import com.example.doc_app.entity.Doctor;
import com.example.doc_app.entity.Schedule;
import com.example.doc_app.service.DoctorService;
import com.example.doc_app.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;

@RestController
@CrossOrigin("*")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;


    // Save operation
    @PostMapping("/schedule")
    public String saveSchedule(
            @RequestBody Schedule schedule)
    {
        scheduleService.saveSchedule(schedule);
        return " schedule added";
    }

    // Read operation
    @GetMapping("/schedules")
    public List<Schedule> fetchScheduleList()
    {
        return scheduleService.fetchScheduleList();
    }

    // Update operation



    @DeleteMapping("/schedules/{id}")
    public List<Schedule> deleteScheduleById(@PathVariable("id")
                                           int id)
    {
        return scheduleService.deleteScheduleById(
                id);
        //  return "Deleted Successfully";
    }
}
