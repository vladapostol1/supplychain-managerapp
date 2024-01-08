package com.vladapostol1.supplychainmanager.repo;

import com.vladapostol1.supplychainmanager.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin, Integer> {
}