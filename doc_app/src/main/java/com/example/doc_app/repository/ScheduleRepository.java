package com.example.doc_app.repository;

import com.example.doc_app.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule,Integer> {
  //  @Query("SELECT s.doctor.doctor_name,s.doctor.doctor_email,s.stime,Schedule.etime,s.date from Schedule s, Doctor d where Schedule .doctor=d")
   // List<Schedule> findAllById();
}
