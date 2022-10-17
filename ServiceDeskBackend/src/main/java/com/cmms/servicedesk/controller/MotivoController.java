package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.Motivo;
import com.cmms.servicedesk.service.MotivoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/motivos")
public class MotivoController {
    @Autowired
    private MotivoService motivoService;

    @GetMapping
    public ResponseEntity<List<Motivo>> findAll() {
        return ResponseEntity.ok(motivoService.findAll());
    }

    @GetMapping("/motivos/{id}")
    public ResponseEntity<Motivo> findById(@PathVariable("id") Integer idMotivo){
        return motivoService.findById(idMotivo)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Motivo> create(@Valid @RequestBody Motivo motivo){
        return new ResponseEntity<>(motivoService.create(motivo), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Motivo> update(@Valid @RequestBody Motivo motivo){
        return motivoService.findById(motivo.getIdMotivo())
                .map(s -> ResponseEntity.ok(motivoService.update(motivo)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Motivo> delete(@PathVariable("id") Integer idMotivo){
        return motivoService.findById(idMotivo)
                .map(c -> {
                    Motivo motivo = c;
                    motivoService.delete(idMotivo);
                    return ResponseEntity.ok(motivo);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
