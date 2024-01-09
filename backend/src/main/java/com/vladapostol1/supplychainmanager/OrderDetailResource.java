package com.vladapostol1.supplychainmanager;

import com.vladapostol1.supplychainmanager.model.OrderDetail;
import com.vladapostol1.supplychainmanager.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orderdetail")
public class OrderDetailResource {
    private final OrderDetailService orderDetailService;

    @Autowired
    public OrderDetailResource(OrderDetailService orderDetailService) {
        this.orderDetailService = orderDetailService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<OrderDetail>> getAllOrderDetails() {
        List<OrderDetail> orderDetails = orderDetailService.findAllOrderDetails();
        return new ResponseEntity<>(orderDetails, HttpStatus.OK);
    }

    @GetMapping("/find/{orderDetailID}")
    public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable("orderDetailID") int orderDetailID) {
        OrderDetail orderDetail = orderDetailService.findOrderDetailById(orderDetailID);
        return new ResponseEntity<>(orderDetail, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<OrderDetail> addOrderDetail(@RequestBody OrderDetail orderDetail) {
        OrderDetail newOrderDetail = orderDetailService.addOrderDetail(orderDetail);
        return new ResponseEntity<>(newOrderDetail, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<OrderDetail> updateOrderDetail(@RequestBody OrderDetail orderDetail) {
        OrderDetail updatedOrderDetail = orderDetailService.updateOrderDetail(orderDetail);
        return new ResponseEntity<>(updatedOrderDetail, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{orderDetailID}")
    public ResponseEntity<?> deleteOrderDetail(@PathVariable("orderDetailID") int orderDetailID) {
        orderDetailService.deleteOrderDetail(orderDetailID);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}