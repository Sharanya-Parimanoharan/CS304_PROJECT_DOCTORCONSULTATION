package com.example.doc_app.service;

import com.example.doc_app.entity.Doctor;
import com.example.doc_app.entity.Patient;
import com.example.doc_app.entity.Schedule;
import com.example.doc_app.entity.Users;

import java.util.List;
import java.util.Optional;

public interface UserService {

    Users saveUser(Users user);

    List<Users> fetchUserList();

    Users fetchUser(Users user);

    Users updateUser(Users patient, int patientId);

    Users fetch(Users user);

    List<Users> deleteUserById(int id);

}
