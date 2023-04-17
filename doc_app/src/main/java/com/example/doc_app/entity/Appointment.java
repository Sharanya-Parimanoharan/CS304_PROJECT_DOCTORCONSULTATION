package com.example.doc_app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Table(name = "appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "appointment_no")
    private int id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "appointment_time")
    @JsonFormat(pattern = "hh:mm:ss")
    private String time;

    @ManyToOne(targetEntity = Patient.class)
    @JoinColumn(name = "p_id",referencedColumnName = "patient_id")
    Patient patient;

    @ManyToOne(targetEntity = Doctor.class)
    @JoinColumn(name="d_id",referencedColumnName = "doctor_id")
    Doctor doctor;

    @ManyToOne(targetEntity = Schedule.class)
    @JoinColumn(name="sched_id",referencedColumnName = "schedule_id")
    Schedule schedule;

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setTime(String stime) {
        this.time=stime;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor=doctor;
    }

    public void setSchedule(Schedule sched) {
        this.schedule=sched;
    }

    public void setPatient(Patient p) {
        this.patient=p;
    }

    public Doctor getDoctor() {
        return this.doctor;
    }

    public Patient getPatient() {
        return this.patient;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public String getTime() {
        return this.time;
    }
}
