package com.harpiaCrud.backend.dto.response;

import com.harpiaCrud.backend.model.Client;

public record ResponseAnimalDTO(String id, String name, Client client) {
    
}
