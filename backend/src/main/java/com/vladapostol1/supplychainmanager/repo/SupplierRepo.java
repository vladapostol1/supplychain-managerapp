package com.vladapostol1.supplychainmanager.repo;

import com.vladapostol1.supplychainmanager.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SupplierRepo extends JpaRepository<Supplier, Long> {
    void deleteSupplierById(Long id);

    Optional<Supplier> findSupplierById(Long id);
}
