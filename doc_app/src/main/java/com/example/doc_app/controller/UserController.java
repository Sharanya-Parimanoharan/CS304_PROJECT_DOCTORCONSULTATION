package com.example.doc_app.controller;

import com.example.doc_app.entity.Doctor;
import com.example.doc_app.entity.Patient;
import com.example.doc_app.entity.Schedule;
import com.example.doc_app.entity.Users;
import com.example.doc_app.service.PatientService;
import com.example.doc_app.service.ScheduleService;
import com.example.doc_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;


    @PutMapping("/update/{id}")
    public Users
    updateUser(@RequestBody Users user,
                  @PathVariable("id") int patientId)
    {
        return userService.updateUser(
                user, patientId);
    }

    @GetMapping("/getusers")
    public List<Users> fetchUserList()
    {
        return userService.fetchUserList();
    }

    @DeleteMapping("/userdelete/{id}")
    public List<Users> deleteUserById(@PathVariable("id")
                                         int doctorId) {
        return userService.deleteUserById(
                doctorId);
        // return "Deleted Successfully";
    }

    @PostMapping("/useremail")
    public Users fetch(@RequestBody Users u){
        return userService.fetch(u);
    }

    // Read operation
    @PostMapping ("/users")
    public Users fetchById(@RequestBody Users user)
    {
        return userService.fetchUser(user);
    }

    // Update operation


}
