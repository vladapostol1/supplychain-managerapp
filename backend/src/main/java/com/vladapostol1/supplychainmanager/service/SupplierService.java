package com.vladapostol1.supplychainmanager.service;

import com.vladapostol1.supplychainmanager.exception.ResourceNotFoundException;
import com.vladapostol1.supplychainmanager.model.Supplier;
import com.vladapostol1.supplychainmanager.repo.SupplierRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {
    private final SupplierRepo supplierRepo;

    @Autowired
    public SupplierService(SupplierRepo supplierRepo) {
        this.supplierRepo = supplierRepo;
    }

    public Supplier addSupplier(Supplier supplier) {
        return supplierRepo.save(supplier);
    }

    public List<Supplier> findAllSuppliers() {
        return supplierRepo.findAll();
    }

    public Supplier updateSupplier(Supplier supplier){
        return supplierRepo.save(supplier);
    }

    public Supplier findSupplierById(int supplierID) {
        return supplierRepo.findSupplierBySupplierID(supplierID)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier by ID " + supplierID + " was not found."));
    }

    @Transactional
    public void deleteSupplier(int supplierID) {
        supplierRepo.deleteSupplierBySupplierID(supplierID);
    }
}
