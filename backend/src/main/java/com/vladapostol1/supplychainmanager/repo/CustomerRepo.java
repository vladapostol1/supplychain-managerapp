package com.vladapostol1.supplychainmanager.repo;

import com.vladapostol1.supplychainmanager.model.Customer;
import com.vladapostol1.supplychainmanager.model.Order;
import com.vladapostol1.supplychainmanager.model.OrderDetail;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer, Integer> {

    @Transactional
    @Modifying
    @Query("delete from Customer c where c.id = :customerID")
    void deleteCustomerByCustomerID(int customerID);

    Optional<Customer> findCustomerByCustomerID(int customerID);
}