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

import com.harpiaCrud.backend.dto.request.RequestProductDTO;
import com.harpiaCrud.backend.dto.response.ResponseProductDTO;
import com.harpiaCrud.backend.service.ProductService;

@RestController
@RequestMapping("/api/product")
public class ProductController {
        
    @Autowired
    private ProductService productService;

    @PostMapping("/new")
    public ResponseEntity<ResponseProductDTO> save(@RequestBody RequestProductDTO request){
        return productService.save(request);
    }

    @PostMapping("/{id}")
    public ResponseEntity<ResponseProductDTO> update(@RequestBody RequestProductDTO request, @PathVariable String id){
        return productService.update(request, id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id){
        productService.delete(id);
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<ResponseProductDTO>> listAll(){
        return productService.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseProductDTO> listById(@PathVariable String id){
        return productService.listById(id);
    }
}
