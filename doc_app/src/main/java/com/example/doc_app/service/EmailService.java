package com.example.doc_app.service;

import com.example.doc_app.entity.Appointment;
import com.example.doc_app.entity.Mail;

public interface EmailService {

    // Method
    // To send a simple email
    String sendSimpleMail(Mail details);
    String sendOTP(String mail,String otp);
    // Method
    // To send an email with attachment
    String sendMailWithAttachment(Mail details);

    String sendMail(Appointment appointment);

    String sendDoctorMail(Appointment appointment, String address);

    String cancelAppointment(Appointment appointment);

    String cancelHomevisitDoc(Appointment appointment);
}

