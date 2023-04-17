package com.example.doc_app.controller;

import com.example.doc_app.entity.Appointment;
import com.example.doc_app.entity.Doctor;
import com.example.doc_app.entity.Patient;
import com.example.doc_app.entity.Schedule;
import com.example.doc_app.service.AppointmentService;
import com.example.doc_app.service.PatientService;
import com.example.doc_app.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class AppointmentController {


        // Annotation
        @Autowired
        private AppointmentService appointmentService;

        @Autowired
        private  ScheduleService scheduleService;

        @Autowired
        private PatientService patientService;
        // Save operation
        @PostMapping("/appointment")
        public String saveAppointment(
                @RequestBody Appointment appointment)
        {
            appointmentService.saveAppointment(appointment);
            return " Appointment added";
        }

        // Read operation
        @GetMapping("/appointments")
        public List<Appointment> fetchAppointmentList()
        {
            return appointmentService.fetchAppointmentList();
        }

        @GetMapping("/appointments/{id}")
       public List<Appointment> fetchAppointment(@PathVariable("id") int id){
            return appointmentService.findByPatientid(id);
        }

    @GetMapping("/appointments/doctor/{id}")
    public List<Appointment> fetchAppointmentByDoc(@PathVariable("id") int id){
        return appointmentService.findDoctorid(id);
    }
        @PostMapping("/booking/{id}/{id1}")
        public  Appointment bookAppointment(@PathVariable("id") int id,@PathVariable("id1") int pid,@RequestBody Doctor doctor){

           List<Appointment> appointment=appointmentService.findBySchedid(id);
            Schedule sched=scheduleService.fetchScheduleById(id);
            Patient pat=patientService.fetchPatientById(pid);
            Appointment app=new Appointment();

               LocalTime stime= LocalTime.parse(sched.getStime());
               LocalTime atime= LocalTime.parse(sched.getAtime());
               LocalTime etime= LocalTime.parse(sched.getEtime());
               LocalTime t=stime;
                List<LocalTime> c=new ArrayList<>();
               for(Appointment appoint :appointment){

                   if (LocalTime.parse(appoint.getTime()).compareTo(t) == 0 && t.isBefore((etime))) {
                           t = t.plusMinutes(atime.getMinute());
                       if(t.compareTo(etime)==0){
                           return null;
                       }
                   }
                   else if(LocalTime.parse(appoint.getTime()).isAfter(t)){
                        c.add(LocalTime.parse(appoint.getTime()));
                       continue;
                   }
                   else if (t.isAfter((etime)) || LocalTime.parse(appoint.getTime()).isBefore((t))){
                       return null;
                   }
                   else{
                       break;
                   }
               }
                for(LocalTime p:c){
                    if(p.compareTo(t)==0) {
                    return null;
                }
            }
                   app.setDate(sched.getDate());
                   app.setTime((String.valueOf(t)));
                   app.setDoctor(doctor);
                   app.setSchedule(sched);
                   app.setPatient(pat);
                   appointmentService.saveAppointment(app);
                   return app;

           }
        //    return  app;


        // Delete operation
        @DeleteMapping("/appointments/{id}")
        public List<Appointment> deleteAppointment(@PathVariable("id")
                                             int id)
        {
            return appointmentService.deleteAppointmentById(
                    id);
            // return "Deleted Successfully";
        }

}
