package com.example.doc_app.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor()
@AllArgsConstructor()
@Entity
@Getter
@Setter
@Table(name="doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    @Column(nullable = false,name = "doctor_id")
    private int doctorId;



   @Column(nullable = false,name = "doctor_name",length = 45)
    private String doctor_name;

    @Column(nullable = false , name= "doctor_email",length = 45)
    private String doctor_email;

    @Column(nullable = false,name = "doctor_moblie")
    private int doctor_mobile;

    @Column(nullable = false,name = "doctor_speciality" ,length=45)
    private String doctor_speciality;

    @Column(nullable = false,name="doctor_qualification",length=45)
    private String doctor_qualification;

    @Column(nullable = true,name="doctor_password",length = 45)
    private String doctor_password;

    @ManyToMany(cascade = CascadeType.ALL,fetch =FetchType.LAZY)
    @JoinTable(name = "doc_sched",joinColumns =
            {@JoinColumn( name="doc_id",referencedColumnName = "doctor_id")}
            ,inverseJoinColumns = {@JoinColumn(name = "sched_id" ,referencedColumnName = "schedule_id")})
    //@JsonManagedReference
    private List<Schedule> schedule;

    @OneToMany(targetEntity =Appointment.class ,cascade = CascadeType.ALL)
    @JoinColumn(name="d_id",referencedColumnName = "doctor_id")
    @JsonIgnore
    private List<Appointment> appointment;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="doctor_userid",referencedColumnName="userid")
    private Users users;


    public List<Schedule> getSchedule() {
     return  schedule;
    }

 public String getDoctor_name() {
     return this.doctor_name;
 }

    public String getDoctor_email() {
        return this.doctor_email;
    }

    public int getDoctor_id() {
        return this.doctorId;
    }
}


