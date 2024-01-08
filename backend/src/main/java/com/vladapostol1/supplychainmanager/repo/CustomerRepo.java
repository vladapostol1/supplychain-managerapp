package com.vladapostol1.supplychainmanager.repo;

import com.vladapostol1.supplychainmanager.model.Customer;
import com.vladapostol1.supplychainmanager.model.Order;
import com.vladapostol1.supplychainmanager.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer, Integer> {
    void deleteCustomerByCustomerID(int customerID);

    Optional<Customer> findCustomerByCustomerID(int customerID);
}