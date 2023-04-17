package com.example.doc_app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Table(name = "patient")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    @Column(nullable = false,name = "patient_id")
    private int patientId;

    @Column(name="patient_name" )
    private String name;

    @Column(name ="patient_email")
    private String email;

    @Column(name="patient_mobile")
    private int mobile;

    @Column(name="patient_password")
    private String password;

    @OneToMany(targetEntity=FeedBack.class ,cascade = CascadeType.ALL)
    @JoinColumn(name="p_id",referencedColumnName ="patient_id")
    @JsonIgnore
    private List<FeedBack> feedBack;

    @OneToMany(targetEntity=Appointment.class ,cascade = CascadeType.ALL)
    @JoinColumn(name="p_id",referencedColumnName ="patient_id")
    @JsonIgnore
    private List<Appointment> appointment;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="users_userid",referencedColumnName="userid")
    private Users users;

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email=email;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name=name;
    }
}
