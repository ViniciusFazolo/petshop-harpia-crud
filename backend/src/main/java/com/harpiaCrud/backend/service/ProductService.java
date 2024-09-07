package com.harpiaCrud.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.harpiaCrud.backend.dto.request.RequestProductDTO;
import com.harpiaCrud.backend.dto.response.ResponseProductDTO;
import com.harpiaCrud.backend.model.Product;
import com.harpiaCrud.backend.repository.ProductRepository;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;

    public ResponseEntity<ResponseProductDTO> save(RequestProductDTO request){
        Product obj = new Product();
        obj.setName(request.name());
        obj.setPrice(request.price());

        obj = productRepository.save(obj);

        ResponseProductDTO ResponseProductDTO = new ResponseProductDTO(obj.getId(), obj.getName(), obj.getPrice());

        return ResponseEntity.ok().body(ResponseProductDTO);
    }

    public ResponseEntity<ResponseProductDTO> update(RequestProductDTO request, String id){
        return productRepository.findById(id).map(obj -> {
            obj.setName(request.name());
            obj.setPrice(request.price());

            Product objUpdate = productRepository.save(obj);
            ResponseProductDTO ResponseProductDTO = new ResponseProductDTO(objUpdate.getId(), objUpdate.getName(), objUpdate.getPrice());

            return ResponseEntity.ok().body(ResponseProductDTO);

        }).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }

    public void delete(String id){
        if(productRepository.existsById(id)){
            productRepository.deleteById(id);
        }else{
            throw new RuntimeException("Produto não encontrado");
        }
    }

    public ResponseEntity<List<ResponseProductDTO>> listAll(){
        List<Product> objs = productRepository.findAll();

        List<ResponseProductDTO> objDtos = objs.stream()
        .map(obj -> new ResponseProductDTO(obj.getId(), obj.getName(), obj.getPrice()))
        .toList();

        return ResponseEntity.ok().body(objDtos);
    }

    public ResponseEntity<ResponseProductDTO> listById(String id){
        Product obj = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        ResponseProductDTO ResponseProductDTO = new ResponseProductDTO(obj.getId(), obj.getName(), obj.getPrice());

        return ResponseEntity.ok().body(ResponseProductDTO);
    }
}
