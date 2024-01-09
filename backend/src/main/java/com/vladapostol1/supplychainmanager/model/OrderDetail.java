package com.vladapostol1.supplychainmanager.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ORDERDETAILS")
public class OrderDetail {

    @Id
    @Column(name = "ORDERDETAILID")
    private int orderDetailID;

    @OneToOne
    @JoinColumn(name = "ORDERID", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "PRODUCTID", nullable = false)
    private Product product;

    @Column(name = "QUANTITY", nullable = false)
    private int quantity;

    @Column(name = "PRICE", nullable = false)
    private BigDecimal price;
}
