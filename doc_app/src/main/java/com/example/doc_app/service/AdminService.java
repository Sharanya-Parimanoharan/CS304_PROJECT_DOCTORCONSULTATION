package com.example.doc_app.service;

import com.example.doc_app.entity.Admin;
import com.example.doc_app.entity.Patient;

import java.util.List;

public interface AdminService {

    Admin saveAdmin(Admin admin);

    List<Admin> fetchAdminList();
    Admin fetchAdminById(int id);
    List<Admin> deleteAdminById (int id);

    Admin updateAdmin(Admin admin, int adminId);

    Admin findUser(int id);
}
