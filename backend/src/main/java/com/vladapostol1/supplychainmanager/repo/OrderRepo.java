package com.vladapostol1.supplychainmanager.repo;

import com.vladapostol1.supplychainmanager.model.Order;
import com.vladapostol1.supplychainmanager.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepo extends JpaRepository<Order, Integer> {
    void deleteOrderByOrderID(int orderID);

    Optional<Order> findOrderByOrderID(int orderID);
}
