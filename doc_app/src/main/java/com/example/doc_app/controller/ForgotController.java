package com.example.doc_app.controller;

import com.example.doc_app.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.internal.LoadingCache;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@CrossOrigin
public class ForgotController {
    @Autowired
    EmailService emailService;

    Random random=new Random(1000);
    String o;
    private Map<String,String> hash=new HashMap<>();

    @PostMapping("/forgot")
    //body "" text type
    public String sendOtp(@RequestBody String email, HttpSession httpSession){
        //generating 4 digit
             o= Integer.toString(random.nextInt(99999999));
            String status= emailService.sendOTP(email,o);
            httpSession.setAttribute("otp",o);

            return status;
        }

    @PostMapping("/verify")
    public boolean verify(@RequestBody String otp) {
        if(o.equals(otp)){
            return true;
        }
        return false;
    }
}

