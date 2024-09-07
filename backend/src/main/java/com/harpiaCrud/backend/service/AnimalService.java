package com.harpiaCrud.backend.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.harpiaCrud.backend.dto.request.RequestAnimalDTO;
import com.harpiaCrud.backend.dto.response.ResponseAnimalDTO;
import com.harpiaCrud.backend.model.Animal;
import com.harpiaCrud.backend.repository.AnimalRepository;

@Service
public class AnimalService {
    
    @Autowired
    private AnimalRepository animalRepository;

    public ResponseEntity<ResponseAnimalDTO> save(RequestAnimalDTO request){
        Animal obj = new Animal(null, request.name(), request.client());

        obj = animalRepository.save(obj);

        ResponseAnimalDTO ResponseAnimalDTO = new ResponseAnimalDTO(obj.getId(), obj.getName(), obj.getClient());

        return ResponseEntity.ok().body(ResponseAnimalDTO);
    }

    public ResponseEntity<ResponseAnimalDTO> update(RequestAnimalDTO request, String id){
        return animalRepository.findById(id).map(obj -> {
            obj.setName(request.name());
            obj.setClient(request.client());

            Animal objUpdate = animalRepository.save(obj);
            ResponseAnimalDTO ResponseAnimalDTO = new ResponseAnimalDTO(objUpdate.getId(), objUpdate.getName(), objUpdate.getClient());

            return ResponseEntity.ok().body(ResponseAnimalDTO);

        }).orElseThrow(() -> new RuntimeException("Animal não encontrado"));
    }

    public void delete(String id){
        if(animalRepository.existsById(id)){
            animalRepository.deleteById(id);
        }else{
            throw new RuntimeException("Animal não encontrado");
        }
    }

    public ResponseEntity<List<ResponseAnimalDTO>> listAll(){
        List<Animal> objs = animalRepository.findAll();

        List<ResponseAnimalDTO> objDtos = objs.stream()
        .map(obj -> new ResponseAnimalDTO(obj.getId(), obj.getName(), obj.getClient()))
        .toList();

        return ResponseEntity.ok().body(objDtos);
    }

    public ResponseEntity<ResponseAnimalDTO> listById(String id){
        Animal obj = animalRepository.findById(id).orElseThrow(() -> new RuntimeException("Animal não encontrado"));

        ResponseAnimalDTO ResponseAnimalDTO = new ResponseAnimalDTO(obj.getId(), obj.getName(), obj.getClient());

        return ResponseEntity.ok().body(ResponseAnimalDTO);
    }
}
