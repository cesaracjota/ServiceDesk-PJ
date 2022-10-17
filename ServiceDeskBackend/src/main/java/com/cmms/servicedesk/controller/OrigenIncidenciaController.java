package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.OrigenIncidencia;
import com.cmms.servicedesk.service.OrigenIncidenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/origenincidencia")
public class OrigenIncidenciaController {
    @Autowired
    private OrigenIncidenciaService origenIncidenciaService;

    @GetMapping("/listAll")
    public ResponseEntity<List<OrigenIncidencia>> findAll(){
        return ResponseEntity.ok(origenIncidenciaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrigenIncidencia> findById(@PathVariable("id") Integer idOrigen){
        return origenIncidenciaService.findById(idOrigen)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<OrigenIncidencia> create(@Valid @RequestBody OrigenIncidencia origenIncidencia){
        return new ResponseEntity<>(origenIncidenciaService.create(origenIncidencia), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<OrigenIncidencia> update(@Valid @RequestBody OrigenIncidencia origenIncidencia){
        return origenIncidenciaService.findById(origenIncidencia.getIdOrigen())
                .map(s -> ResponseEntity.ok(origenIncidenciaService.update(origenIncidencia)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<OrigenIncidencia> delete(@PathVariable("id") Integer idOrigen){
        return origenIncidenciaService.findById(idOrigen)
                .map(c -> {
                    OrigenIncidencia origenIncidencia = c;
                    origenIncidenciaService.delete(idOrigen);
                    return ResponseEntity.ok(origenIncidencia);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
