package com.example.doc_app.controller;

import com.example.doc_app.entity.Doctor;
import com.example.doc_app.repository.DoctorRepository;
import com.example.doc_app.repository.ScheduleRepository;
import com.example.doc_app.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
public class DocSchedController {
    @Autowired
    private DoctorService doctorService;
    private ScheduleRepository scheduleRepository;

    @PostMapping("/doctor/schedule")
    private Doctor setDoctorwithSched(@RequestBody Doctor doctor){
       return doctorService.saveDoctor(doctor);
    }

    @GetMapping("/doctorsched")
    public List<Doctor> findDocSched(){
        return doctorService.fetchDoctorList();
    }
}
