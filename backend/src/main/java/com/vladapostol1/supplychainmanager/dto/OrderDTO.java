package com.vladapostol1.supplychainmanager.dto;

import lombok.*;

import java.util.Date;

@Data
public class OrderDTO {
    private int customerID;
    private Date orderDate;
    private String status;
}