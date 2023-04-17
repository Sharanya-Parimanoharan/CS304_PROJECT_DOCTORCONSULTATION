package com.example.doc_app.controller;

import com.example.doc_app.entity.Doctor;
import com.example.doc_app.entity.Patient;


import com.example.doc_app.repository.PatientRepository;

import com.example.doc_app.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin()
public class PatientController {

    @Autowired
    private PatientService patientService;

    // Save operation
    @PostMapping("/patient")
    public String savePatient(
            @RequestBody Patient patient)
    {
        patientService.savePatient(patient);
        return " patient added";
    }


    @PutMapping("/patients/update/{id}")
    public Patient
    updatePatient(@RequestBody Patient patient,
                 @PathVariable("id") int patientId)
    {
        return patientService.updatePatient(
                patient, patientId);
    }

    // Read operation
    @GetMapping("/patients")
    public List<Patient> fetchPatientList()
    {
        return patientService.fetchPatientList();
    }

    @GetMapping("/patient/{id}")
    public Patient fetchPatientById(@PathVariable("id") int id){

        return patientService.fetchPatientById(id);
    }

    @DeleteMapping("/patients/{id}")
    public List<Patient> deletePatientById(@PathVariable("id")
                                   int id)
    {
        return patientService.deletePatientById(
                id);
      //  return "Deleted Successfully";
    }
    @GetMapping("/patient/user/{id}")
    public Patient find(@PathVariable("id") int id){
       return  patientService.findUser(id);
       // return null;
    }
}
