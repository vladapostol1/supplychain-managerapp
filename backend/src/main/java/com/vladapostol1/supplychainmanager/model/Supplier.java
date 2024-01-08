package com.vladapostol1.supplychainmanager.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Entity
public class Supplier implements Serializable {
    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long SupplierID;
    @Getter
    @Setter
    @Column(nullable = false)
    private String Name;
    @Getter
    @Setter
    @Column(nullable = false, unique = true)
    private String ContactEmail;
    @Getter
    @Setter
    @Column(nullable = false)
    private String Address;
    @Getter
    @Setter
    @Column(nullable = false, unique = true)
    private String Phone;

    public Supplier() {}

    public Supplier(String Name, String ContactEmail, String Address, String Phone) {
        this.Name = Name;
        this.ContactEmail = ContactEmail;
        this.Address = Address;
        this.Phone = Phone;
    }

    @Override
    public String toString() {
        return "Supplier{"+
                "\tSupplierID = " + SupplierID + "," +
                "\tName = " + Name + "," +
                "\tContactEmail = " + ContactEmail + "," +
                "\tAddress = " + Address + "," +
                "\tPhone = " + Phone + "," +
                "}";
    }
}
