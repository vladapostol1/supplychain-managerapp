package com.vladapostol1.supplychainmanager;

import com.vladapostol1.supplychainmanager.model.Supplier;
import com.vladapostol1.supplychainmanager.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supplier")
public class SupplierResource {
    private final SupplierService supplierService;

    @Autowired
    public SupplierResource(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Supplier>> getAllSuppliers() {
        List<Supplier> suppliers = supplierService.findAllSuppliers();
        return new ResponseEntity<>(suppliers, HttpStatus.OK);
    }

    @GetMapping("/find/{supplierID}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable("supplierID") int supplierID) {
        Supplier supplier = supplierService.findSupplierById(supplierID);
        return new ResponseEntity<>(supplier, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Supplier> addSupplier(@RequestBody Supplier supplier) {
        Supplier newSupplier = supplierService.addSupplier(supplier);
        return new ResponseEntity<>(newSupplier, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Supplier> updateSupplier(@RequestBody Supplier supplier) {
        Supplier updatedSupplier = supplierService.updateSupplier(supplier);
        return new ResponseEntity<>(updatedSupplier, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{supplierID}")
    public ResponseEntity<?> deleteSupplier(@PathVariable("supplierID") int supplierID) {
        supplierService.deleteSupplier(supplierID);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}