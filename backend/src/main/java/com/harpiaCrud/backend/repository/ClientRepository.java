package com.harpiaCrud.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.harpiaCrud.backend.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, String>{
    
}
