package com.harpiaCrud.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harpiaCrud.backend.dto.request.RequestOrderDTO;
import com.harpiaCrud.backend.dto.response.ResponseOrderDTO;
import com.harpiaCrud.backend.service.OrderService;

@RestController
@RequestMapping("/api/order")
public class OrderController {
      
    @Autowired
    private OrderService orderService;

    @PostMapping("/new")
    public ResponseEntity<ResponseOrderDTO> save(@RequestBody RequestOrderDTO request){
        return orderService.save(request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id){
        orderService.delete(id);
    }

     @GetMapping("/listAll")
     public ResponseEntity<List<ResponseOrderDTO>> listAll(){
         return orderService.listAll();
     }

     @GetMapping("/{id}")
     public ResponseEntity<ResponseOrderDTO> listById(@PathVariable String id){
         return orderService.listById(id);
     }
}
