package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.Oficina;
import com.cmms.servicedesk.model.Organo;
import com.cmms.servicedesk.service.OficinaService;
import com.cmms.servicedesk.service.OrganoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/oficinas")
public class OficinaController {
    @Autowired
    private OficinaService oficinaService;

    @Autowired
    private OrganoService organoService;


    @GetMapping
    public ResponseEntity<List<Oficina>> findAll(){
        return ResponseEntity.ok(oficinaService.findAll());
    }

    @GetMapping(path = "listall/{id}")
    public ResponseEntity<Oficina> findById(@PathVariable("id") Integer idOficina){
        return oficinaService.findById(idOficina)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Oficina> create(@Valid @RequestBody Oficina oficina){
        return new ResponseEntity<>(oficinaService.create(oficina), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Oficina> update(@Valid @RequestBody Oficina oficina){
        return oficinaService.findById(oficina.getIdOficina())
                .map(o -> ResponseEntity.ok(oficinaService.update(oficina)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Oficina> updateActivo(@PathVariable("id") Integer idOficina){
        return oficinaService.findById(idOficina)
                .map(o -> {
                    char activo = o.getActivo();
                    if(activo == 'S'){
                        o.setActivo('N');
                    }else {o.setActivo('S');}
                    oficinaService.update(o);
                    return ResponseEntity.ok(o);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping(path = "listall/active")
    public ResponseEntity<List<Oficina>> findByActivo(){
        return ResponseEntity.ok(oficinaService.findByActivo());
    }
}
