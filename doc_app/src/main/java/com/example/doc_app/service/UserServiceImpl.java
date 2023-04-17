package com.example.doc_app.service;

import com.example.doc_app.entity.Doctor;
import com.example.doc_app.entity.Patient;
import com.example.doc_app.entity.Users;
import com.example.doc_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    public Users updateUser(Users user ,int patientId) {
        Users patientDB
                = userRepository.findById(patientId)
                .get();

        if (Objects.nonNull(user.getPassword())
                && !"".equalsIgnoreCase(
                user.getPassword())) {
            patientDB.setPassword(
                    user.getPassword());
        }
        if (Objects.nonNull(
                user.getEmail())
                && !"".equalsIgnoreCase(
                user.getEmail())) {
            patientDB.setEmail(
                    user.getEmail());
        }
        return userRepository.save(patientDB);

    }

    // Save operation
    @Override
    public Users saveUser(Users user)
    {
        return userRepository.save(user);
    }

    // Read operation
    @Override
    public List<Users> fetchUserList()
    {
        return
                userRepository.findAll();
    }

    @Override
    public Users fetchUser(Users id){
        if(Objects.nonNull(id)){
          Users user= userRepository.findByEmail(id.getEmail());
          if(user==null){
              return null;
          }
          else {
              if (Objects.nonNull(id.getPassword())
                      && user.getPassword().equalsIgnoreCase(
                      id.getPassword())) {
                  return user;
              }
              return null;
          }

        }
        return null;
    }

    // Delete operation
    @Override
    public List<Users> deleteUserById(int doctorId)
    {
        userRepository.deleteById(doctorId);
        return userRepository.findAll();
    }

    @Override
    public Users fetch(Users user){
        Users u=userRepository.findByEmail(user.getEmail());
        return u;
    }
}
