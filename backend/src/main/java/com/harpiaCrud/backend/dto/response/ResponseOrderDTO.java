package com.harpiaCrud.backend.dto.response;

import java.util.List;

import com.harpiaCrud.backend.model.Client;
import com.harpiaCrud.backend.model.Product_Order;

public record ResponseOrderDTO(String id, Client client, List<Product_Order> products, double totalPrice) {
    
}
