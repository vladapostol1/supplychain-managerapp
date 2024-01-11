package com.vladapostol1.supplychainmanager.repo;

import com.vladapostol1.supplychainmanager.model.OrderDetail;
import com.vladapostol1.supplychainmanager.model.Supplier;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface OrderDetailRepo extends JpaRepository<OrderDetail, Integer> {
    void deleteOrderDetailByOrderDetailID(int orderDetailID);

    Optional<OrderDetail> findOrderDetailByOrderDetailID(int orderDetailID);
}

