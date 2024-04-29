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
    public ResponseEntity<?> addUser(@RequestBody RegistrationRequest registrationRequest) {
        System.out.println("Registration Failed" +  registrationRequest.getUsername() + registrationRequest.getPassword());

        try {
            // Create a UserDetails object from the RegistrationRequest
//            String encodedPassword = passwordEncoder.encode(registrationRequest.getPassword());
            UserDetails user = User.builder()
                    .username(registrationRequest.getUsername())
                    .password(registrationRequest.getPassword())
                    .authorities("ROLE_USER") // Or any default role you wish to assign
                    .build();

            userDetailsManager.createUser(user);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception to get more details about the error
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed");
        }
    }
    }













