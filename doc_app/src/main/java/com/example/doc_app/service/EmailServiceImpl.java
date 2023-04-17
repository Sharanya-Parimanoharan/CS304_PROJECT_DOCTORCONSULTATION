  package com.example.doc_app.service;

  import java.io.File;

  import com.example.doc_app.entity.Appointment;
  import com.example.doc_app.entity.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
  import javax.servlet.http.HttpSession;

  @Service
public class EmailServiceImpl implements EmailService{

        @Autowired
        private JavaMailSender emailSender;

//        @Value("medwebapplication3@gmail.com")
//        private String sender;

      public String sendDoctorMail(Appointment app,String add){
          try{
          sendMail(app);
          SimpleMailMessage message=new SimpleMailMessage();
          String msg=" Home Visit Appointment ! "+"\n\n"+"Patient name - "+app.getPatient().getName()+"\n"+"Appointment Date - "
                  +app.getDate()+"\n"+"Appointment Time - "+app.getTime()+"\n"+"Address - "+add+
                  "\n\n"+"Thank You";
          message.setFrom("medwebapplication3@gmail.com");
          message.setTo(app.getDoctor().getDoctor_email());
          message.setSubject("Home Visit Appointment");
          message.setText(msg);
          emailSender.send((message));
          return "successful";}
          catch (Exception e){
              return "error";
          }

      }
      public String cancelHomevisitDoc(Appointment app){
          SimpleMailMessage message=new SimpleMailMessage();
          String msg=" Home visit appointment to attend  patient "+app.getPatient().getName()+" on "+app.getDate()+" at "+app.getTime()+" has been cancelled."
                  +"\n\n"+"Apologies for the inconvenience caused"+"\n"+"MedWeb";
          message.setFrom("medwebapplication3@gmail.com");
          message.setTo(app.getDoctor().getDoctor_email());
          message.setSubject("Appointment Cancelled");
          message.setText(msg);
          emailSender.send(message);
          return "successful";
      }

      public String cancelAppointment(Appointment app){
          SimpleMailMessage message=new SimpleMailMessage();
          String msg="Your appointment for doctor "+app.getDoctor().getDoctor_name()+" on "+app.getDate()+" at "+app.getTime()+" has been cancelled."
                  +"\n\n"+"Appologies for the inconvenience caused"+"\n"+"MedWeb";
          message.setFrom("medwebapplication3@gmail.com");
          message.setTo(app.getPatient().getEmail());
          message.setSubject("Appointment Cancelled");
          message.setText(msg);
          emailSender.send(message);
          return "successful";

      }
        public String sendMail(Appointment app){
            try{
                SimpleMailMessage message=new SimpleMailMessage();
                String msg="MEDWEB Online Booking Confirmation! "+"\n\n"+"Doctor name - "+app.getDoctor().getDoctor_name()+"\n"+"Appointment Date - "
                        +app.getDate()+"\n"+"Appointment Time - "+app.getTime()+"\n\n"+"Thank You for choosing MedWeb";
                message.setFrom("medwebapplication3@gmail.com");
                message.setTo(app.getPatient().getEmail());
                message.setSubject("Booking Confirmed");
                message.setText(msg);
                emailSender.send((message));
                return "successful";
            }catch (Exception e){
                return "error";
            }
        }
        public String sendOTP(String mail,String otp){
            try {

                SimpleMailMessage message = new SimpleMailMessage();
                String msg="This is the OTP to verify your account !"+"\n\n"+otp;
                message.setFrom("medwebapplication3@gmail.com");
                message.setTo(mail);
                message.setSubject("OTP!");
                message.setText(msg);
                emailSender.send(message);
                return "OTP sent successfully";
            } catch (Exception e) {
                return "Error in sending OTP";
            }
        }
        public String sendSimpleMail(
                Mail details) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("medwebapplication3@gmail.com");
                message.setTo(details.getRecipient());
                message.setSubject(details.getSubject());
                message.setText(details.getMsgBody());
                emailSender.send(message);
                return "Mail sent successfully";
            } catch (Exception e) {
                return "Error in sending mail";
            }
        }

    public String
    sendMailWithAttachment(Mail details) {
        // Creating a mime message
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {

            // Setting multipart as true for attachments to
            // be send
            mimeMessageHelper
                    = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom("medwebapplication3@gmail.com");
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody());
            mimeMessageHelper.setSubject(
                    details.getSubject());

            // Adding the attachment
            FileSystemResource file
                    = new FileSystemResource(
                    new File(details.getAttachment()));

            mimeMessageHelper.addAttachment(
                    file.getFilename(), file);

            // Sending the mail
            emailSender.send(mimeMessage);
            return "Mail sent Successfully";
        }

        // Catch block to handle MessagingException
        catch (MessagingException e) {

            // Display message when exception occurred
            return "Error while sending mail!!!";
        }
    }
  }
