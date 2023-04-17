package com.example.doc_app.service;

import com.example.doc_app.entity.Admin;
import com.example.doc_app.entity.Patient;
import com.example.doc_app.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class AdminServicesImpl implements  AdminService {
    @Autowired
    AdminRepository adminRepository;

    @Override
    public Admin saveAdmin(Admin admin)
    {
        //  Patient pat=new Patient(patient.getName(),patient.getEmail(),patient.getMobile(),this.encoder.encode(patient.getPassword()),patient.getFeedBack());
        return adminRepository.save(admin);
    }

    @Override
    public Admin fetchAdminById(int id){

        return adminRepository.findById(id).get();
    }

    // Read operation
    @Override
    public List<Admin> fetchAdminList()
    {
        return
                adminRepository.findAll();
    }





    // Delete operation
    @Override
    public List<Admin> deleteAdminById(int id)
    {
        adminRepository.deleteById(id);
        return adminRepository.findAll();
    }



    public Admin updateAdmin(Admin admin ,int patientId){
        Admin adminDB
                = adminRepository.findById(patientId)
                .get();

        if (Objects.nonNull(admin.getName())
                && !"".equalsIgnoreCase(
                admin.getName())) {
            adminDB.setName(
                    admin.getName());
        }

        if (Objects.nonNull(
                admin.getEmail())
                && !"".equalsIgnoreCase(
                admin.getEmail())) {
            adminDB.setEmail(
                    admin.getEmail());
        }
        if (Objects.nonNull(
                admin.getPassword())
                && !"".equalsIgnoreCase(
                admin.getPassword())) {
            adminDB.setPassword(
                    admin.getPassword());
        }
        if (Objects.nonNull(admin.getMobile())
                && !"".equals(
                admin.getMobile())) {
            adminDB.setMobile(
                    admin.getMobile());
        }

        return adminRepository.save(adminDB);
    }

    public Admin findUser(int id){
        Admin p=adminRepository.findByUsers(id);
        return p;
    }
}
