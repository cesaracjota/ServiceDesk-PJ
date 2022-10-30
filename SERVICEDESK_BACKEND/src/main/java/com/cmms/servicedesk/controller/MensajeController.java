package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.Mensaje;
import com.cmms.servicedesk.service.MensajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/mensajes")
public class MensajeController {
    @Autowired
    private MensajeService mensajeService;

    @GetMapping
    public ResponseEntity<List<Mensaje>> findAll(){
        return ResponseEntity.ok(mensajeService.findAll());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Mensaje> findById(@PathVariable("id") Integer idMensaje){
        return mensajeService.findById(idMensaje)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Mensaje> create(@Valid @RequestBody Mensaje mensaje){
        return new ResponseEntity<>(mensajeService.create(mensaje), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Mensaje> update(@Valid @RequestBody Mensaje mensaje){
        return mensajeService.findById(mensaje.getIdMensaje())
                .map(o -> ResponseEntity.ok(mensajeService.update(mensaje)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(path = "{id}")
    public ResponseEntity<Mensaje> updateActivo(@PathVariable("id") Integer idMensaje){
        return mensajeService.findById(idMensaje)
                .map(o -> {
                    char activo = o.getActivo();
                    if(activo == 'S'){
                        o.setActivo('N');
                    }else{ o.setActivo('S');}
                    mensajeService.update(o);
                    return ResponseEntity.ok(o);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<Mensaje> delete(@PathVariable("id") Integer idMensaje){
        return mensajeService.findById(idMensaje)
                .map(c -> {
                    Mensaje mensaje = c;
                    mensajeService.delete(idMensaje);
                    return ResponseEntity.ok(mensaje);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
