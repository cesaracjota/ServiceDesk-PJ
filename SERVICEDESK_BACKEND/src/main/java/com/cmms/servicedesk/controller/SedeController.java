package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.Sede;
import com.cmms.servicedesk.service.SedeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cmms.servicedesk.service.OrganoService;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/sedes")
public class SedeController {
    @Autowired
    private SedeService sedeService;
    @Autowired
    private OrganoService organoService;

    @GetMapping
    public ResponseEntity<List<Sede>> findAll(){
        return ResponseEntity.ok(sedeService.findAll());
    }

    @GetMapping(path = "listall/active")
    public ResponseEntity<List<Sede>> findByActive(){
        return ResponseEntity.ok(sedeService.findByActive());
    }

    @GetMapping(path = "/completo")
    public Map findCompleto(){
        HashMap map = new HashMap<>();
//        List sedes = sedeService.findAll();
        HashMap nombresedes = new HashMap<>();

        HashMap organo = new HashMap<>();

        for (int i = 0; i < sedeService.findAll().size(); i++){
//            List organos = Collections.singletonList(sedeService.findById(sedeService.findAll().get(i).getIdSede()));
//            nombresedes.put(sedeService.findAll().get(i).getSede(), sedeService.findById(sedeService.findAll().get(i).getIdSede()));
            organo.put(sedeService.findAll().get(i).getSede(), organoService.findByIdSede(sedeService.findAll().get(0).getIdSede()));
        }
        map.put("data",organo);
        return map;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Sede> findById(@PathVariable("id") Integer idSede){
        return sedeService.findById(idSede)
                .map(ResponseEntity::ok)
                .orElseGet(()->ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Sede> create(@Valid @RequestBody Sede sede){
        return new ResponseEntity<>(sedeService.create(sede), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Sede> update(@Valid @RequestBody Sede sede){
        return sedeService.findById(sede.getIdSede())
                .map(s -> ResponseEntity.ok(sedeService.update(sede)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Sede> updateActivo(@PathVariable("id") Integer idSede){
        return sedeService.findById(idSede)
                .map(s -> {
                    char activo = s.getActivo();
                    if(activo == 'S'){
                        s.setActivo('N');
                    }else {s.setActivo('S');}
                    sedeService.update(s);
                    return ResponseEntity.ok(s);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
