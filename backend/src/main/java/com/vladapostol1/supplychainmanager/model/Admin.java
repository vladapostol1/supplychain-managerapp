package com.vladapostol1.supplychainmanager.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ADMINS")
public class Admin {

    @Id
    @Column(name = "ID")
    private int id;

    @Column(name = "FIRSTNAME", nullable = false, length = 100)
    private String firstName;

    @Column(name = "LASTNAME", nullable = false, length = 100)
    private String lastName;

    @Column(name = "EMAIL", nullable = false, length = 100, unique = true)
    private String email;

    @Column(name = "PASSWORD", nullable = false, length = 100)
    private String password;
}