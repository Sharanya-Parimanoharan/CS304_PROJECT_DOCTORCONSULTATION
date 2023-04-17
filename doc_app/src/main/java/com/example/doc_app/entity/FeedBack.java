package com.example.doc_app.entity;
import lombok.*;

import javax.persistence.*;
import java.lang.annotation.Target;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name="feedback")
public class FeedBack {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE )
    @Column(name = "feedback_id",nullable = false)
    private int feedbackId;

    @Column(name="stars",nullable = false)
    private int stars;

    @Column(name="message" ,length=100)
    private String message;

    @ManyToOne(targetEntity = Patient.class)
    @JoinColumn(name="p_id",referencedColumnName = "patient_id")
    Patient patient;
}
