package com.harpiaCrud.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harpiaCrud.backend.dto.request.RequestClientDTO;
import com.harpiaCrud.backend.dto.response.ResponseClientDTO;
import com.harpiaCrud.backend.service.ClientService;

@RestController
@RequestMapping("/api/client")
public class ClientController {
    
    @Autowired
    private ClientService clientService;

    @PostMapping("/new")
    public ResponseEntity<ResponseClientDTO> save(@RequestBody RequestClientDTO request){
        return clientService.save(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseClientDTO> update(@RequestBody RequestClientDTO request, @PathVariable String id){
        return clientService.update(request, id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id){
        clientService.delete(id);
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<ResponseClientDTO>> listAll(){
        return clientService.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseClientDTO> listById(@PathVariable String id){
        return clientService.listById(id);
    }
}
