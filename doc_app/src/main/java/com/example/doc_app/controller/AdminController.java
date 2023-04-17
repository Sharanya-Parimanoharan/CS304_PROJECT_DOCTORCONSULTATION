package com.example.doc_app.controller;

import com.example.doc_app.entity.Admin;
import com.example.doc_app.entity.Patient;
import com.example.doc_app.service.AdminService;
import com.example.doc_app.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
public class AdminController {
    @Autowired
    private AdminService adminService;

    // Save operation
    @PostMapping("/admin")
    public String saveAdmin(
            @RequestBody Admin admin)
    {
        adminService.saveAdmin(admin);
        return " admin added";
    }


    @PutMapping("/admins/update/{id}")
    public Admin
    updateAdmin(@RequestBody Admin admin,
                  @PathVariable("id") int patientId)
    {
        return adminService.updateAdmin(
                admin, patientId);
    }

    // Read operation
    @GetMapping("/admins")
    public List<Admin> fetchAdminList()
    {
        return adminService.fetchAdminList();
    }

    @GetMapping("/admin/{id}")
    public Admin fetchAdminById(@PathVariable("id") int id){

        return adminService.fetchAdminById(id);
    }

    @DeleteMapping("/admins/{id}")
    public List<Admin> deletePatientById(@PathVariable("id")
                                           int id)
    {
        return adminService.deleteAdminById(
                id);
        //  return "Deleted Successfully";
    }
    @GetMapping("/admin/user/{id}")
    public Admin find(@PathVariable("id") int id){
        return  adminService.findUser(id);
        // return null;
    }
}
