package com.student.MeloMood.dto;

public class RegistrationRequest {

    private String username;
    private String password;
    // additional fields if needed

    private Boolean enabled;
    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
// Getters and setters for additional fields
}
