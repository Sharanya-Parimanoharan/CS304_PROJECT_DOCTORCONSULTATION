package com.example.doc_app.repository;

import com.example.doc_app.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users,Integer> {

    Users findByEmail(String email);
}
