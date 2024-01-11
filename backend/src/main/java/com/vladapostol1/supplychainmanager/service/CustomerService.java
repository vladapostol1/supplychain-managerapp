package com.vladapostol1.supplychainmanager.service;

import com.vladapostol1.supplychainmanager.exception.ResourceNotFoundException;
import com.vladapostol1.supplychainmanager.model.Customer;
import com.vladapostol1.supplychainmanager.repo.CustomerRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    private final CustomerRepo customerRepo;

    @Autowired
    public CustomerService(CustomerRepo customerRepo) {
        this.customerRepo = customerRepo;
    }

    public Customer addCustomer(Customer customer) {
        return customerRepo.save(customer);
    }

    public List<Customer> findAllCustomers() {
        return customerRepo.findAll();
    }

    public Customer updateCustomer(Customer customer){
        return customerRepo.save(customer);
    }

    public Customer findCustomerById(int customerID) {
        return customerRepo.findCustomerByCustomerID(customerID)
                .orElseThrow(() -> new ResourceNotFoundException("Customer by ID " + customerID + " was not found."));
    }

    @Transactional
    public void deleteCustomer(int customerID) {
        customerRepo.deleteCustomerByCustomerID(customerID);
    }
}
