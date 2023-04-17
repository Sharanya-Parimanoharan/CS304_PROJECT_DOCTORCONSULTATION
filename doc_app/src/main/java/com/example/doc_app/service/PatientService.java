package com.example.doc_app.service;

import com.example.doc_app.entity.Doctor;
import com.example.doc_app.entity.Patient;


import java.util.List;
import java.util.Optional;

public interface PatientService {

    Patient savePatient(Patient patient);

    List<Patient> fetchPatientList();
    Patient fetchPatientById(int id);
    List<Patient> deletePatientById (int id);

    Patient updatePatient(Patient patient, int patientId);


    Patient findUser(int id);
}
