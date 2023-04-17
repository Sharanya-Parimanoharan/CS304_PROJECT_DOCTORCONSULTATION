package com.example.doc_app.service;



import com.example.doc_app.entity.Doctor;
import com.example.doc_app.entity.Patient;
import com.example.doc_app.entity.Users;
import com.example.doc_app.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {
    @Autowired
    private PatientRepository patientRepository;

    // Save operation
    @Override
    public Patient savePatient(Patient patient)
    {
   //  Patient pat=new Patient(patient.getName(),patient.getEmail(),patient.getMobile(),this.encoder.encode(patient.getPassword()),patient.getFeedBack());
        return patientRepository.save(patient);
    }

    @Override
    public Patient fetchPatientById(int id){

        return patientRepository.findById(id).get();
    }

    // Read operation
    @Override
    public List<Patient> fetchPatientList()
    {
        return
                patientRepository.findAll();
    }





    // Delete operation
    @Override
    public List<Patient> deletePatientById(int id)
    {
        patientRepository.deleteById(id);
        return patientRepository.findAll();
    }



    public Patient updatePatient(Patient patient ,int patientId){
        Patient patientDB
                = patientRepository.findById(patientId)
                .get();

        if (Objects.nonNull(patient.getName())
                && !"".equalsIgnoreCase(
                patient.getName())) {
            patientDB.setName(
                    patient.getName());
        }

        if (Objects.nonNull(
                patient.getEmail())
                && !"".equalsIgnoreCase(
                patient.getEmail())) {
            patientDB.setEmail(
                    patient.getEmail());
        }
        if (Objects.nonNull(
                patient.getPassword())
                && !"".equalsIgnoreCase(
                patient.getPassword())) {
            patientDB.setPassword(
                    patient.getPassword());
        }
        if (Objects.nonNull(patient.getMobile())
                && !"".equals(
                patient.getMobile())) {
            patientDB.setMobile(
                    patient.getMobile());
        }

        return patientRepository.save(patientDB);
    }

    public Patient findUser(int id){
        Patient p=patientRepository.findByUsers(id);
        return p;
    }


}
