package com.harpiaCrud.backend.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.harpiaCrud.backend.dto.request.RequestOrderDTO;
import com.harpiaCrud.backend.dto.response.ResponseOrderDTO;
import com.harpiaCrud.backend.model.Order;
import com.harpiaCrud.backend.model.Product_Order;
import com.harpiaCrud.backend.repository.OrderRepository;
import com.harpiaCrud.backend.repository.ProductOrderRepository;


@Service
public class OrderService {
      
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductOrderRepository productOrderRepository;

    public ResponseEntity<ResponseOrderDTO> save(RequestOrderDTO request){
        Order obj = new Order(null, request.client(), request.totalPrice());
        Order order = orderRepository.save(obj);

        List<Product_Order> products_order = new ArrayList<Product_Order>();

        for(Product_Order product_order : request.products()){
            product_order.setOrder(order);
            product_order.setProduct(product_order.getProduct());
            product_order.setQt(product_order.getQt());

            product_order = productOrderRepository.save(product_order);
            products_order.add(product_order);
        }

        ResponseOrderDTO responseOrderDTO = new ResponseOrderDTO(obj.getId(), obj.getClient(), products_order, obj.getTotalPrice());

        return ResponseEntity.ok().body(responseOrderDTO);
    }

    public void delete(String id){
        orderRepository.findById(id).ifPresent((order) -> {
            List<Product_Order> productsOrder = productOrderRepository.findByOrder(order);

            productOrderRepository.deleteAll(productsOrder);
            orderRepository.deleteById(id);
        });
    }

     public ResponseEntity<List<ResponseOrderDTO>> listAll(){
         List<Order> objs = orderRepository.findAll();

         List<ResponseOrderDTO> objDtos = objs.stream()
             .map(obj -> {
                 List<Product_Order> products = productOrderRepository.findByOrder(obj);
                 return new ResponseOrderDTO(obj.getId(), obj.getClient(), products, obj.getTotalPrice());
             })
             .toList();

         return ResponseEntity.ok().body(objDtos);
     }

     public ResponseEntity<ResponseOrderDTO> listById(String id){
         Order obj = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

         List<Product_Order> products = productOrderRepository.findByOrder(obj);

         ResponseOrderDTO ResponseOrderDTO = new ResponseOrderDTO(obj.getId(), obj.getClient(), products, obj.getTotalPrice());

         return ResponseEntity.ok().body(ResponseOrderDTO);
     }
}
