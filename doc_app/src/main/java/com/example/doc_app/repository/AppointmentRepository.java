package com.example.doc_app.repository;

import com.example.doc_app.entity.Appointment;
import com.example.doc_app.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Integer> {
   @Query("SELECT p FROM Appointment p  where p.patient.patientId=:id")
  List<Appointment> findByPatientid(int id);

    @Query("SELECT p FROM Appointment p  where p.schedule.id=:id")
    List<Appointment> findBySchedid(int id);

    @Query("SELECT p FROM Appointment p  where p.doctor.doctorId=:id")
    List<Appointment> findByDoctorid(int id);
}
