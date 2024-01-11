package com.vladapostol1.supplychainmanager.service;

import com.vladapostol1.supplychainmanager.exception.ResourceNotFoundException;
import com.vladapostol1.supplychainmanager.model.Admin;
import com.vladapostol1.supplychainmanager.repo.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.vladapostol1.supplychainmanager.utils.PasswordEncryption.encryptPasswordMD5;

@Service
public class AdminService {
    private final AdminRepo adminRepo;

    @Autowired
    public AdminService(AdminRepo adminRepo) {
        this.adminRepo = adminRepo;
    }

    public Admin findAdminByEmailAndPassword(String email, String password) {
        password = encryptPasswordMD5(password);
        return adminRepo.findAdminByEmailAndPassword(email, password)
                .orElseThrow(() -> new ResourceNotFoundException("Email or password wrong"));
    }
}
