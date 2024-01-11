package com.vladapostol1.supplychainmanager.service;

import com.vladapostol1.supplychainmanager.dto.OrderDTO;
import com.vladapostol1.supplychainmanager.exception.ResourceNotFoundException;
import com.vladapostol1.supplychainmanager.model.Customer;
import com.vladapostol1.supplychainmanager.model.Order;
import com.vladapostol1.supplychainmanager.repo.CustomerRepo;
import com.vladapostol1.supplychainmanager.repo.OrderRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepo orderRepo;
    private final CustomerRepo customerRepo;

    @Autowired
    public OrderService(OrderRepo orderRepo, CustomerRepo customerRepo) {
        this.orderRepo = orderRepo;
        this.customerRepo = customerRepo;
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

    @Transactional
    public Order createOrder(OrderDTO orderDTO) {
        Customer customer = customerRepo.findById(orderDTO.getCustomerID())
                .orElseThrow(() -> new ResourceNotFoundException("Customer with ID " + orderDTO.getCustomerID() + " not found"));

        Order order = new Order();
        order.setCustomer(customer);
        order.setOrderDate(orderDTO.getOrderDate());
        order.setStatus(orderDTO.getStatus());

        return orderRepo.save(order);
    }
}
