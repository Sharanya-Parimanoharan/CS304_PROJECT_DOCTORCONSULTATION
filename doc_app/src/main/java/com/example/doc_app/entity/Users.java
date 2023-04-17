package com.example.doc_app.entity;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Table(name="users")

public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "userid",nullable = false)
    private int userid;

    @Column(name = "email")
    private String email;

       @Column(name = "password")
    private String password;

    @Column(name = "roleid",nullable = false)
    private int id;
    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }


    //// @OneToOne(mappedBy = "users")
    //@JoinColumn(name="users_userid")
  // @JoinColumn(referencedColumnName = "patient_id",name="p_id")
   // @JoinColumn(name = "patient_patient_id",referencedColumnName = "patient_id")

   //private Patient patient;


}
