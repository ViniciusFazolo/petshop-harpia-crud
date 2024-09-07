package com.harpiaCrud.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.harpiaCrud.backend.model.Order;
import com.harpiaCrud.backend.model.Product_Order;

@Repository
public interface ProductOrderRepository extends JpaRepository<Product_Order, String>{
    List<Product_Order> findByOrder(Order order);
}
