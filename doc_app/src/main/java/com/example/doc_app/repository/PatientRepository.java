package com.example.doc_app.repository;


import com.example.doc_app.entity.Patient;
import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.From;

@Repository
public interface PatientRepository extends JpaRepository<Patient,Integer> {

     @Query("SELECT p FROM Patient p  where p.users.userid=:id")
     Patient findByUsers(int id);

}
