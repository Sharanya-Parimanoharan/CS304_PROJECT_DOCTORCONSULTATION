package com.example.doc_app.service;

import com.example.doc_app.entity.Doctor;
import com.example.doc_app.entity.Schedule;
import com.example.doc_app.entity.Users;
import com.example.doc_app.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service

public class DoctorServiceImpl implements DoctorService{

    @Autowired
    private DoctorRepository doctorRepository;

    // Save operation
    @Override
    public Doctor saveDoctor(Doctor doctor)
    {
        return doctorRepository.save(doctor);
    }

    // Read operation
    @Override
    public List<Doctor> fetchDoctorList()
    {
        return
                doctorRepository.findAll();
    }

    @Override
    public Optional<Doctor> fetchDoctorById(int id){
        if(doctorRepository.findById(id)==null){
            return null;
        }
        return doctorRepository.findById(id);
    }

    @Override
    public Doctor fetchDoctor(String id,Doctor d){
        if(Objects.nonNull(id)){
            Doctor user= doctorRepository.findByEmaill(id);
            if(user==null){
                return null;
            }
            else {
             updateDoctor(d,user.getDoctor_id());
            }

        }
        return null;
    }

    // Delete operation
    @Override
    public List<Doctor> deleteDoctorById(int doctorId)
    {
        doctorRepository.deleteById(doctorId);
        return doctorRepository.findAll();
    }
    @Override
    public Doctor updateDoctor(Doctor doctor ,int doctorId){
        Doctor docDB
                = doctorRepository.findById(doctorId)
                .get();

        if (Objects.nonNull(doctor.getDoctor_name())
                && !"".equalsIgnoreCase(
                doctor.getDoctor_name())) {
            docDB.setDoctor_name(
                    doctor.getDoctor_name());
        }
        if (Objects.nonNull(
                doctor.getDoctor_password())
                && !"".equalsIgnoreCase(
                doctor.getDoctor_password())) {
            docDB.setDoctor_password(
                    doctor.getDoctor_password());
        }

        if (Objects.nonNull(
                doctor.getDoctor_email())
                && !"".equalsIgnoreCase(
                doctor.getDoctor_email())) {
            docDB.setDoctor_email(
                    doctor.getDoctor_email());
        }
        if (Objects.nonNull(doctor.getDoctor_qualification())
                && !"".equalsIgnoreCase(
                doctor.getDoctor_qualification())) {
            docDB.setDoctor_qualification(
                    doctor.getDoctor_qualification());
        }
        if (Objects.nonNull(doctor.getDoctor_speciality())
                && !"".equalsIgnoreCase(
                doctor.getDoctor_speciality())) {
            docDB.setDoctor_speciality(
                    doctor.getDoctor_speciality());
        }

        if (Objects.nonNull(doctor.getDoctor_mobile())
                && !"".equals(
                doctor.getDoctor_mobile())) {
            docDB.setDoctor_mobile(
                    doctor.getDoctor_mobile());
        }
        if (Objects.nonNull(doctor.getSchedule())
                && !"".equals(
                doctor.getSchedule())) {
            for (Schedule s : doctor.getSchedule()) {
                docDB.getSchedule().add(s);
            }
        }
        return doctorRepository.save(docDB);
    }

    public Doctor findUser(int id){
        Doctor p=doctorRepository.findByUsers(id);
        return p;
    }

    public List<Doctor> findBySpec(String spec){
        if(doctorRepository.findBySpec(spec)==null){
            return null;
        }
        return doctorRepository.findBySpec(spec);
    }
}
