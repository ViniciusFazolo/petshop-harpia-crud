package com.harpiaCrud.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.harpiaCrud.backend.dto.request.RequestClientDTO;
import com.harpiaCrud.backend.dto.response.ResponseClientDTO;
import com.harpiaCrud.backend.model.Client;
import com.harpiaCrud.backend.repository.ClientRepository;

@Service
public class ClientService {
    
    @Autowired
    private ClientRepository clientRepository;

    public ResponseEntity<ResponseClientDTO> save(RequestClientDTO request){
        Client client = new Client();
        client.setName(request.name());

        client = clientRepository.save(client);

        ResponseClientDTO responseClientDTO = new ResponseClientDTO(client.getId(), client.getName());

        return ResponseEntity.ok().body(responseClientDTO);
    }

    public ResponseEntity<ResponseClientDTO> update(RequestClientDTO request, String id){
        return clientRepository.findById(id).map(client -> {
            client.setName(request.name());

            Client clientUpdate = clientRepository.save(client);
            ResponseClientDTO responseClientDTO = new ResponseClientDTO(clientUpdate.getId(), clientUpdate.getName());

            return ResponseEntity.ok().body(responseClientDTO);

        }).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }

    public void delete(String id){
        if(clientRepository.existsById(id)){
            clientRepository.deleteById(id);
        }else{
            throw new RuntimeException("Cliente não encontrado");
        }
    }

    public ResponseEntity<List<ResponseClientDTO>> listAll(){
        List<Client> clients = clientRepository.findAll();

        List<ResponseClientDTO> clientsDtos = clients.stream()
        .map(client -> new ResponseClientDTO(client.getId(), client.getName()))
        .toList();

        return ResponseEntity.ok().body(clientsDtos);
    }

    public ResponseEntity<ResponseClientDTO> listById(String id){
        Client client = clientRepository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        ResponseClientDTO responseClientDTO = new ResponseClientDTO(client.getId(), client.getName());

        return ResponseEntity.ok().body(responseClientDTO);
    }
}
