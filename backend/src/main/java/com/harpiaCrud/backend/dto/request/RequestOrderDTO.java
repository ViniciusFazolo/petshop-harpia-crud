package com.harpiaCrud.backend.dto.request;

import java.util.List;

import com.harpiaCrud.backend.model.Client;
import com.harpiaCrud.backend.model.Product_Order;

public record RequestOrderDTO(Client client, List<Product_Order> products, double totalPrice) {
    
}
