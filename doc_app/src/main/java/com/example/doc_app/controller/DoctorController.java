package com.example.doc_app.controller;

import com.example.doc_app.entity.Doctor;
import com.example.doc_app.entity.Patient;
import com.example.doc_app.entity.Schedule;
import com.example.doc_app.service.DoctorService;
import com.example.doc_app.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin()
@RestController
public class DoctorController {

    // Annotation
    @Autowired
    private DoctorService doctorService;


    // Save operation
    @PostMapping("/doctor")
    public String saveDoctor(
            @RequestBody Doctor doctor) {
        doctorService.saveDoctor(doctor);
        return " doctor added";
    }

    // Read operation
    @GetMapping("/doctors")
    public List<Doctor> fetchDoctorList() {
        return doctorService.fetchDoctorList();
    }

    @GetMapping("/doctor/{id}")
    public Optional<Doctor> fetchDoctorById(@PathVariable("id") int id) {

        return doctorService.fetchDoctorById(id);
    }
    @GetMapping("/doctors/speciality/{spec}")
    public List<Doctor> fetchBySpec(@PathVariable("spec") String spec){
        return doctorService.findBySpec(spec);
    }

    // Update operation
    @PutMapping("/doctors/update/{id}")
    public Doctor
    updateDoctor(@RequestBody Doctor doctor,
                 @PathVariable("id") int doctorId) {
        return doctorService.updateDoctor(
                doctor, doctorId);
    }

    // Delete operation
    @DeleteMapping("/doctors/{id}")
    public List<Doctor> deleteDoctorById(@PathVariable("id")
                                         int doctorId) {
        return doctorService.deleteDoctorById(
                doctorId);
        // return "Deleted Successfully";
    }

    @GetMapping("/doctor/user/{id}")
    public Doctor find(@PathVariable("id") int id){
        return  doctorService.findUser(id);
        // return null;
    }
    @PutMapping("/doctor/schedule/{email}")
    public Doctor addschedule(@PathVariable("email") String email,@RequestBody Doctor d){
        return doctorService.fetchDoctor(email,d);
    }
}