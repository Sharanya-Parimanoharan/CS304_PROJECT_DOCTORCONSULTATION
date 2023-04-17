package com.example.doc_app.controller;

import com.example.doc_app.entity.Appointment;
import com.example.doc_app.entity.Mail;
import com.example.doc_app.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class EmailController {

    @Autowired
    private EmailService emailService;

    // Sending a simple Email
    @PostMapping("/sendMail")
    public String
    sendMail(@RequestBody Mail details)
    {
        String status
                = emailService.sendSimpleMail(details);

        return status;
    }

    @PostMapping("/sendConfirmation")
    public String send(@RequestBody Appointment appointment){
        String status=emailService.sendMail(appointment);
        return status;
    }
    @PostMapping("/sendConfirmationdoctor/{address}")
    public String sendd(@RequestBody Appointment appointment,@PathVariable("address") String address){
        String status=emailService.sendDoctorMail(appointment,address);
        return status;
    }
    @PostMapping("/cancelled")
    public String sendcancel(@RequestBody Appointment appointment){
        String status=emailService.cancelAppointment(appointment);
        return status;
    }
    @PostMapping("/homevisit")
    public String sendhomecancel(@RequestBody Appointment appointment){
        String status=emailService.cancelHomevisitDoc((appointment));
        return  status;
    }
    // Sending email with attachment
    @PostMapping("/sendMailWithAttachment")
    public String sendMailWithAttachment(
            @RequestBody Mail details)
    {
        String status
                = emailService.sendMailWithAttachment(details);

        return status;
    }
}
