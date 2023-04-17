package com.example.doc_app.service;

import com.example.doc_app.entity.Doctor;

import java.util.List;
import java.util.Optional;

public interface DoctorService {

    Doctor saveDoctor(Doctor doctor);
    // Read operation
    List<Doctor> fetchDoctorList();

    Optional<Doctor> fetchDoctorById(int id);

    // Update operation
   Doctor updateDoctor(Doctor doctor, int doctorId);

    // Delete operation
    List<Doctor> deleteDoctorById(int doctor_Id);

    Doctor findUser(int id);
    List<Doctor> findBySpec(String spec);

    Doctor fetchDoctor(String email,Doctor d);
}
