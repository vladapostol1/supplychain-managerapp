package com.vladapostol1.supplychainmanager.service;

import com.vladapostol1.supplychainmanager.exception.ResourceNotFoundException;
import com.vladapostol1.supplychainmanager.model.Product;
import com.vladapostol1.supplychainmanager.repo.ProductRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepo productRepo;

    @Autowired
    public ProductService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    public Product addProduct(Product product) {
        return productRepo.save(product);
    }

    public List<Product> findAllProducts() {
        return productRepo.findAll();
    }

    public Product updateProduct(Product product){
        return productRepo.save(product);
    }

    public Product findProductById(int productID) {
        return productRepo.findProductByProductID(productID)
                .orElseThrow(() -> new ResourceNotFoundException("Product by ID " + productID + " was not found."));
    }

    @Transactional
    public void deleteProduct(int productID) {
        productRepo.deleteProductByProductID(productID);
    }
}
