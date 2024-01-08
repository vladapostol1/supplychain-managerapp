package com.vladapostol1.supplychainmanager.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ORDERS")
public class Order {

    @Id
    @Column(name = "ORDERID")
    private int orderID;

    @ManyToOne
    @JoinColumn(name = "CUSTOMERID", nullable = false)
    private Customer customer;

    @Column(name = "ORDERDATE", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date orderDate;

    @Column(name = "STATUS", nullable = false, length = 50)
    private String status;
}
