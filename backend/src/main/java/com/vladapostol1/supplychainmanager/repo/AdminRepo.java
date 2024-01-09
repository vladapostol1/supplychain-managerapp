package com.vladapostol1.supplychainmanager.repo;

import com.vladapostol1.supplychainmanager.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin, Integer> {
    Optional<Admin> findAdminByEmailAndPassword(String email, String password);
}