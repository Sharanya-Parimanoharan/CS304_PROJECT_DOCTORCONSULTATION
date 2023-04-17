package com.example.doc_app.repository;

import com.example.doc_app.entity.Doctor;
import com.example.doc_app.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor,Integer> {

    @Query("SELECT p FROM Doctor p  where p.users.userid=:id")
    Doctor findByUsers(int id);

    @Query("SELECT d FROM Doctor d  where d.doctor_speciality=:spec")
    List<Doctor> findBySpec(String spec);

    @Query("SELECT d FROM Doctor d where d.doctor_email=:email")
    Doctor findByEmaill(String email);
}
