package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.Organo;
import com.cmms.servicedesk.service.OrganoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/organos")
public class OrganoController {

    @Autowired
    private OrganoService organoService;

    @GetMapping
    public ResponseEntity<List<Organo>> findAll(){
        return ResponseEntity.ok(organoService.findAll());
    }

    @GetMapping(path = "listall/{id}")
    public ResponseEntity<Organo> findById(@PathVariable("id") Integer idOrgano){
        return organoService.findById(idOrgano)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Organo> create(@Valid @RequestBody Organo organo){
        return new ResponseEntity<>(organoService.create(organo), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Organo> update(@Valid @RequestBody Organo organo){
        return organoService.findById(organo.getIdOrgano())
                .map(o -> ResponseEntity.ok(organoService.update(organo)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Organo> updateActivo(@PathVariable("id") Integer idOrgano){
        return organoService.findById(idOrgano)
                .map(o -> {
                    char activo = o.getActivo();
                    if(activo == 'S'){
                        o.setActivo('N');
                    }else {o.setActivo('S');}
                    organoService.update(o);
                    return ResponseEntity.ok(o);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping(path = "listall/active")
    public ResponseEntity<List<Organo>> findByActive(){
        return ResponseEntity.ok(organoService.findByActive());
    }
}
