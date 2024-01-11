package com.vladapostol1.supplychainmanager.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CUSTOMERS")
public class Customer {

    @Id
    @Column(name = "CUSTOMERID")
    private int customerID;

    @Column(name = "FIRSTNAME", nullable = false, length = 100)
    private String firstName;

    @Column(name = "LASTNAME", nullable = false, length = 100)
    private String lastName;

    @Column(name = "EMAIL", nullable = false, length = 100, unique = true)
    private String email;

    @Column(name = "ADDRESS", nullable = false, length = 200)
    private String address;

    @Column(name = "PHONE", nullable = false, length = 20, unique = true)
    private String phone;
}
