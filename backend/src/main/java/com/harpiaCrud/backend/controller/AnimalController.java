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

import com.harpiaCrud.backend.dto.request.RequestAnimalDTO;
import com.harpiaCrud.backend.dto.response.ResponseAnimalDTO;
import com.harpiaCrud.backend.service.AnimalService;

@RestController
@RequestMapping("/api/animal")
public class AnimalController {
     
    @Autowired
    private AnimalService animalService;

    @PostMapping("/new")
    public ResponseEntity<ResponseAnimalDTO> save(@RequestBody RequestAnimalDTO request){
        return animalService.save(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseAnimalDTO> update(@RequestBody RequestAnimalDTO request, @PathVariable String id){
        return animalService.update(request, id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id){
        animalService.delete(id);
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<ResponseAnimalDTO>> listAll(){
        return animalService.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseAnimalDTO> listById(@PathVariable String id){
        return animalService.listById(id);
    }
}
