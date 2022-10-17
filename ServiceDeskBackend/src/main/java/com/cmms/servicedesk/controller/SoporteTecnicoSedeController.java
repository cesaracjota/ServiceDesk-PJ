package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.SoporteTecnicoSede;
import com.cmms.servicedesk.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/soporteTecnicoSede")
public class SoporteTecnicoSedeController {

    @Autowired
    private OficinaService oficinaService;

    @Autowired
    private OrganoService organoService;

    @Autowired
    private SedeService sedeService;

    @Autowired
    private  SoporteTecnicoSedeService soporteTecnicoSedeService;

    @GetMapping
    public ResponseEntity<List<SoporteTecnicoSede>> findAll(){
        return ResponseEntity.ok(soporteTecnicoSedeService.findAll());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<SoporteTecnicoSede> findById(@PathVariable("id") Integer idSoporteTecnicoSede){
        return soporteTecnicoSedeService.findById(idSoporteTecnicoSede)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SoporteTecnicoSede> create(@Valid @RequestBody SoporteTecnicoSede soporteTecnicoSede){
        return new ResponseEntity<>(soporteTecnicoSedeService.create(soporteTecnicoSede), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<SoporteTecnicoSede> update(@Valid @RequestBody SoporteTecnicoSede soporteTecnicoSede){
        return soporteTecnicoSedeService.findById(soporteTecnicoSede.getIdSoporteTecnicoSede())
                .map(o -> ResponseEntity.ok(soporteTecnicoSedeService.update(soporteTecnicoSede)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<SoporteTecnicoSede> delete(@PathVariable("id") Integer idSoporteTecnicoSede){
        return soporteTecnicoSedeService.findById(idSoporteTecnicoSede)
                .map(o -> {
                    char activo = o.getActivo();
                    if(activo == 'S'){
                        o.setActivo('N');
                    }else {o.setActivo('S');}
                    soporteTecnicoSedeService.update(o);
                    return ResponseEntity.ok(o);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
