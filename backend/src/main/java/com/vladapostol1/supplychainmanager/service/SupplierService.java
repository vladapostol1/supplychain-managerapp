package com.vladapostol1.supplychainmanager.service;

import com.vladapostol1.supplychainmanager.exception.UserNotFoundException;
import com.vladapostol1.supplychainmanager.model.Supplier;
import com.vladapostol1.supplychainmanager.repo.SupplierRepo;
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

    public Supplier findSupplierById(Long id) {
        return supplierRepo.findSupplierById(id).orElseThrow(() -> new UserNotFoundException("Supplier by id "+ id + "was not found."));
    }

    public void deleteSupplier(Long id) {
        supplierRepo.deleteSupplierById(id);
    }
}
