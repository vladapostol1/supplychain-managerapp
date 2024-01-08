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
@Table(name = "Products")
public class Product {

    @Id
    @Column(name = "ProductID")
    private int productID;

    @Column(name = "Name", nullable = false, length = 100)
    private String name;

    @Column(name = "Description", nullable = false, length = 300)
    private String description;

    @Column(name = "Price", nullable = false)
    private BigDecimal price;

    @Column(name = "StockQuantity", nullable = false)
    private int stockQuantity;

    @ManyToOne
    @JoinColumn(name = "SupplierID", nullable = false)
    private Supplier supplier;
}