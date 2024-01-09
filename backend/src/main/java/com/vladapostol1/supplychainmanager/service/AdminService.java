package com.vladapostol1.supplychainmanager.service;

import com.vladapostol1.supplychainmanager.exception.ResourceNotFoundException;
import com.vladapostol1.supplychainmanager.model.Admin;
import com.vladapostol1.supplychainmanager.model.Supplier;
import com.vladapostol1.supplychainmanager.repo.AdminRepo;
import com.vladapostol1.supplychainmanager.repo.SupplierRepo;
import com.vladapostol1.supplychainmanager.utils.PasswordEncryption;
import org.springframework.beans.factory.annotation.Autowired;

import static com.vladapostol1.supplychainmanager.utils.PasswordEncryption.encryptPasswordMD5;

public class AdminService {
    private final AdminRepo adminRepo;

    @Autowired
    public AdminService(AdminRepo adminRepo) {
        this.adminRepo = adminRepo;
    }

    public Admin findAdminByEmailAndPassword(String email, String password) {
        String encryptedPassword = encryptPasswordMD5(password);
        return adminRepo.findAdminByEmailAndPassword(email, encryptedPassword)
                .orElseThrow(() -> new ResourceNotFoundException("Email or password wrong"));
    }
}