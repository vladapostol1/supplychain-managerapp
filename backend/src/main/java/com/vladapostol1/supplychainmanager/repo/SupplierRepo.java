package com.vladapostol1.supplychainmanager.repo;

import com.vladapostol1.supplychainmanager.model.Supplier;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SupplierRepo extends JpaRepository<Supplier, Integer> {

    @Transactional
    @Modifying
    @Query("delete from Supplier s where s.id = :supplierID")
    void deleteSupplierBySupplierID(int supplierID);

    Optional<Supplier> findSupplierBySupplierID(int supplierID);
}
