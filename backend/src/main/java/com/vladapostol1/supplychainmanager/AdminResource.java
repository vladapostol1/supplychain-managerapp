package com.vladapostol1.supplychainmanager;

import com.vladapostol1.supplychainmanager.dto.AdminLoginDTO;
import com.vladapostol1.supplychainmanager.model.Admin;
import com.vladapostol1.supplychainmanager.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminResource {
    private final AdminService adminService;

    @Autowired
    public AdminResource(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<Admin> login(@RequestBody AdminLoginDTO loginDto) {
        Admin admin = adminService.findAdminByEmailAndPassword(loginDto.getEmail(), loginDto.getPassword());

        if (admin != null) {
            return new ResponseEntity<>(admin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
