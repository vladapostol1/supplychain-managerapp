package com.vladapostol1.supplychainmanager.repo;

import com.vladapostol1.supplychainmanager.model.Product;
import com.vladapostol1.supplychainmanager.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepo extends JpaRepository<Product, Integer> {
    void deleteProductByProductID(int productID);

    Optional<Product> findProductByProductID(int productID);
}
