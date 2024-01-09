package com.vladapostol1.supplychainmanager;

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

    @GetMapping("/find/{email}/{pass}")
    public ResponseEntity<Admin> getOrderById(@PathVariable("email") String email,@PathVariable("pass") String password ) {
        Admin admin = adminService.findAdminByEmailAndPassword(email, password);
        return new ResponseEntity<>(admin, HttpStatus.OK);
    }
}
