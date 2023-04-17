package com.example.doc_app.service;

import com.example.doc_app.entity.Appointment;
import com.example.doc_app.entity.Doctor;
import com.example.doc_app.repository.AppointmentRepository;
import com.example.doc_app.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class AppointmentServiceImpl implements  AppointmentService{

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Save operation
    @Override
    public Appointment saveAppointment(Appointment appointment)
    {
        return appointmentRepository.save(appointment);
    }

    // Read operation
    @Override
    public List<Appointment> fetchAppointmentList()
    {
        return
                appointmentRepository.findAll();
    }



    // Delete operation
    @Override
    public List<Appointment> deleteAppointmentById(int id)
    {
        appointmentRepository.deleteById(id);
        return appointmentRepository.findAll();
    }

    @Override
   public List<Appointment> findByPatientid(int id) {
      return appointmentRepository.findByPatientid(id);
  }

    @Override
    public List<Appointment> findDoctorid(int id) {
        return appointmentRepository.findByDoctorid(id);
    }


    @Override
    public List<Appointment> findBySchedid(int id) {
        return appointmentRepository.findBySchedid(id);
    }

}
