package com.harpiaCrud.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product_Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private int qt;

    @ManyToOne
    private Product product;

    @JsonIgnore
    @ManyToOne
    private Order order;
}
