package com.example.doc_app.service;

import com.example.doc_app.entity.Appointment;
import com.example.doc_app.entity.Doctor;

import java.util.List;

public interface AppointmentService {
    Appointment saveAppointment(Appointment appointment);
    // Read operation
    List<Appointment> fetchAppointmentList();

    // Update operation


    // Delete operation
    List<Appointment> deleteAppointmentById(int id);

   List<Appointment> findByPatientid(int id);

    List<Appointment> findBySchedid(int id);

    List<Appointment> findDoctorid(int id);


}
