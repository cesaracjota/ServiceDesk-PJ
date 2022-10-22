package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.EstadoTecnico;
import com.cmms.servicedesk.service.EstadoTecnicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tecnico")
public class EstadoTecnicoController {
    @Autowired
    private EstadoTecnicoService estadoTecnicoService;

    @GetMapping
    public ResponseEntity<List<EstadoTecnico>> findAll() {
        return ResponseEntity.ok(estadoTecnicoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EstadoTecnico> findById(@PathVariable("id") Integer idEstadoTecnico){
        return estadoTecnicoService.findById(idEstadoTecnico)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/disponibilidad")
    public ResponseEntity<List<EstadoTecnico>> findDisponibilidad(){
        List<EstadoTecnico> estadoTecnico = estadoTecnicoService.findByActivo('S');
        return ResponseEntity.ok(estadoTecnico);
    }

}
