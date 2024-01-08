package com.vladapostol1.supplychainmanager.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "SUPPLIERS")
public class Supplier {

    @Id
    @Column(name = "SUPPLIERID")
    private int supplierID;

    @Column(name = "NAME", nullable = false, length = 100)
    private String name;

    @Column(name = "CONTACTEMAIL", nullable = false, length = 100, unique = true)
    private String contactEmail;

    @Column(name = "ADDRESS", nullable = false, length = 200)
    private String address;

    @Column(name = "PHONE", nullable = false, length = 20, unique = true)
    private String phone;

    @Override
    public String toString() {
        return "Supplier{"+
                "\tSupplierID = " + supplierID + "," +
                "\tName = " + name + "," +
                "\tContactEmail = " + contactEmail + "," +
                "\tAddress = " + address + "," +
                "\tPhone = " + phone + "," +
                "}";
    }

}
