package com.vladapostol1.supplychainmanager.model;

import jakarta.persistence.*;
import org.springframework.lang.NonNull;

import java.io.Serializable;

@Entity
public class Supplier implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private int SupplierID;
    @Column(nullable = false)
    private String Name;
    @Column(nullable = false, unique = true)
    private String ContactEmail;
    @Column(nullable = false)
    private String Address;
    @Column(nullable = false, unique = true)
    private String Phone;

    public Supplier() {}

    public Supplier(String Name, String ContactEmail, String Address, String Phone) {
        this.Name = Name;
        this.ContactEmail = ContactEmail;
        this.Address = Address;
        this.Phone = Phone;
    }

    public int getSupplierID(){
        return this.SupplierID;
    }

    public String getName(){
        return this.Name;
    }

    public String getContactEmail(){
        return this.ContactEmail;
    }

    public String getAddress(){
        return this.Address;
    }

    public String getPhone(){
        return this.Phone;
    }

    public void setName(String name){
        this.Name = name;
    }

    public void setContactEmail(String email){
        this.ContactEmail = email;
    }

    public void setAddress(String address){
        this.Address = address;
    }

    public void setPhone(String phone){
        this.Phone = phone;
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
