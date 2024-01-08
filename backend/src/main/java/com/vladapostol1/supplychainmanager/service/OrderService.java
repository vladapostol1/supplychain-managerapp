package com.vladapostol1.supplychainmanager.service;

import com.vladapostol1.supplychainmanager.exception.ResourceNotFoundException;
import com.vladapostol1.supplychainmanager.model.Order;
import com.vladapostol1.supplychainmanager.repo.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepo orderRepo;

    @Autowired
    public OrderService(OrderRepo orderRepo) {
        this.orderRepo = orderRepo;
    }

    public Order addOrder(Order order) {
        return orderRepo.save(order);
    }

    public List<Order> findAllOrders() {
        return orderRepo.findAll();
    }

    public Order updateOrder(Order order){
        return orderRepo.save(order);
    }

    public Order findOrderById(int orderID) {
        return orderRepo.findOrderByOrderID(orderID)
                .orElseThrow(() -> new ResourceNotFoundException("Order by ID " + orderID + " was not found."));
    }

    public void deleteOrder(int orderID) {
        orderRepo.deleteOrderByOrderID(orderID);
    }
}
