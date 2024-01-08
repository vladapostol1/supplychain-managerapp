package com.vladapostol1.supplychainmanager.service;

import com.vladapostol1.supplychainmanager.exception.ResourceNotFoundException;
import com.vladapostol1.supplychainmanager.model.OrderDetail;
import com.vladapostol1.supplychainmanager.repo.OrderDetailRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailService {
    private final OrderDetailRepo orderDetailRepo;

    @Autowired
    public OrderDetailService(OrderDetailRepo orderDetailRepo) {
        this.orderDetailRepo = orderDetailRepo;
    }

    public OrderDetail addOrderDetail(OrderDetail orderDetail) {
        return orderDetailRepo.save(orderDetail);
    }

    public List<OrderDetail> findAllOrderDetails() {
        return orderDetailRepo.findAll();
    }

    public OrderDetail updateOrderDetail(OrderDetail orderDetail){
        return orderDetailRepo.save(orderDetail);
    }

    public OrderDetail findOrderDetailById(int orderDetailID) {
        return orderDetailRepo.findOrderDetailByOrderDetailID(orderDetailID)
                .orElseThrow(() -> new ResourceNotFoundException("OrderDetail by ID " + orderDetailID + " was not found."));
    }

    public void deleteOrderDetail(int orderDetailID) {
        orderDetailRepo.deleteOrderDetailByOrderDetailID(orderDetailID);
    }
}
