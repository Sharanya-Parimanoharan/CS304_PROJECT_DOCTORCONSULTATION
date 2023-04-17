package com.example.doc_app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalTimeSerializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="doctor_schedule")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false,name="schedule_id")
    private int id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name="schedule_date")
    private LocalDate date;   //LocalDate

   // @JsonFormat(shape=JsonFormat.Shape.STRING,pattern = "HH:mm:ss.SSSZ" )
   // @JsonSerialize(using = LocalTimeSerializer.class)
    //@JsonDeserialize(using = LocalTimeDeserializer.class)
    @Column(name="schedule_start_time")
    private String stime;

    @Column(name="schedule_end_time")
    @JsonFormat(pattern = "hh:mm:ss")
    private String etime;

    @Column(name="average_consultation_time")
    @JsonFormat(pattern = "hh:mm:ss")
    private String atime;

    @Column(name="home_visit")
    private boolean homevisit;

    @ManyToMany(mappedBy = "schedule",fetch = FetchType.LAZY)
//    @JsonBackReference
    @JsonIgnore
   private List<Doctor> doctor;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getStime() {
        return stime;
    }

    public void setStime(String stime) {
        this.stime = stime;
    }

    public String getAtime() {
        return this.atime;
    }
    public String getEtime() {
        return this.etime;
    }

}
