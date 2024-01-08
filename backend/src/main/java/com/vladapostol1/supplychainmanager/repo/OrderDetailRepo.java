package com.vladapostol1.supplychainmanager.repo;

import com.vladapostol1.supplychainmanager.model.OrderDetail;
import com.vladapostol1.supplychainmanager.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderDetailRepo extends JpaRepository<OrderDetail, Integer> {
    void deleteOrderDetailByOrderDetailID(int orderDetailID);

    Optional<OrderDetail> findOrderDetailByOrderDetailID(int orderDetailID);
}

