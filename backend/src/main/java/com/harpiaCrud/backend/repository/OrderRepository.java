package com.harpiaCrud.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.harpiaCrud.backend.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    
}
