package com.vladapostol1.supplychainmanager.repo;

import com.vladapostol1.supplychainmanager.model.Product;
import com.vladapostol1.supplychainmanager.model.Supplier;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProductRepo extends JpaRepository<Product, Integer> {

    @Transactional
    @Modifying
    @Query("delete from Product p where p.id = :productID")
    void deleteProductByProductID(int productID);

    Optional<Product> findProductByProductID(int productID);
}
