package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.Cargo;
import com.cmms.servicedesk.service.CargoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/cargos")
public class CargoController {
    @Autowired
    private CargoService cargoService;

    @GetMapping
    public ResponseEntity<List<Cargo>> findAll(){
        return ResponseEntity.ok(cargoService.findAll());
    }

    @GetMapping(path = "listall/{id}")
    public ResponseEntity<Cargo> findById(@PathVariable("id") Integer idCargo){
        return cargoService.findById(idCargo)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Cargo> create(@Valid @RequestBody Cargo cargo){
        return new ResponseEntity<>(cargoService.create(cargo), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Cargo> update(@Valid @RequestBody Cargo cargo){
        return cargoService.findById(cargo.getIdCargo())
                .map(o -> ResponseEntity.ok(cargoService.update(cargo)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Cargo> updateActivo(@PathVariable("id") Integer idCargo){
        return cargoService.findById(idCargo)
                .map(o -> {
                    char activo = o.getActivo();
                    if(activo == 'S'){
                        o.setActivo('N');
                    }else {o.setActivo('S');}
                    cargoService.update(o);
                    return ResponseEntity.ok(o);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
