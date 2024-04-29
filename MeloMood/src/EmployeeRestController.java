package com.student.MeloMood.rest;


import com.student.MeloMood.dto.AuthenticationRequest;
import com.student.MeloMood.dto.RegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EmployeeRestController {

    @Autowired
    private UserDetailsManager userDetailsManager;

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
        System.out.println("IN Request>>>" +  request);
        UserDetails userDetails = userDetailsManager.loadUserByUsername(request.getUsername());
        System.out.println("userDetails.getUsername" +  userDetails.getUsername());
        System.out.println("getPassword()" +  userDetails.getPassword());
        System.out.println("request.getUsername()" +  request.getUsername());
        System.out.println("request.getPassword()" +  request.getPassword());
        if (userDetails != null && request.getPassword().equals(userDetails.getPassword())) {
            return ResponseEntity.ok(userDetails);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        }
    }

    @PostMapping("/register")

    }













