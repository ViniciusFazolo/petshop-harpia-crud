package com.harpiaCrud.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.harpiaCrud.backend.model.Animal;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, String>{
    
}
