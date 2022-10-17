package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.PerfilPersona;
import com.cmms.servicedesk.service.PerfilPersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/perfil")
public class PerfilPersonaController {
    @Autowired
    private PerfilPersonaService perfilPersonaService;

    @GetMapping
    public ResponseEntity<List<PerfilPersona>> findAll(){
        return ResponseEntity.ok(perfilPersonaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PerfilPersona> findById(@PathVariable("id") Integer idPerfilPersona){
        return perfilPersonaService.findById(idPerfilPersona)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PerfilPersona> create(@Valid @RequestBody PerfilPersona perfilPersona){
        return new ResponseEntity<>(perfilPersonaService.create(perfilPersona), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<PerfilPersona> update(@Valid @RequestBody PerfilPersona perfilPersona){
        return perfilPersonaService.findById(perfilPersona.getIdPerfilPersona())
                .map(c->ResponseEntity.ok(perfilPersonaService.update(perfilPersona)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PerfilPersona> updateActivo(@PathVariable("id") Integer idPerfilPersona){
        return perfilPersonaService.findById(idPerfilPersona)
                .map(p -> {
                    char activo = p.getActivo();
                    if(activo == 'S'){
                        p.setActivo('N');
                    }else {p.setActivo('S');}
                    perfilPersonaService.update(p);
                    return ResponseEntity.ok(p);
                })
                .orElseGet(()-> ResponseEntity.notFound().build());
    }
}
