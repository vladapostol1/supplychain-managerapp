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
@Table(name = "PRODUCTS")
public class Product {

    @Id
    @Column(name = "PRODUCTID")
    private int productID;

    @Column(name = "NAME", nullable = false, length = 100)
    private String name;

    @Column(name = "DESCRIPTION", nullable = false, length = 300)
    private String description;

    @Column(name = "PRICE", nullable = false)
    private BigDecimal price;

    @Column(name = "STOCKQUANTITY", nullable = false)
    private int stockQuantity;

    @ManyToOne
    @JoinColumn(name = "SUPPLIERID", nullable = false)
    private Supplier supplier;
}