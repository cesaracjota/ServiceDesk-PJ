package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.IncidenciaArchivos;
import com.cmms.servicedesk.service.IncidenciaArchivosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incidenciaArchivo")
public class IncidenciaArchivosController {
    @Autowired
    private IncidenciaArchivosService incidenciaArchivosService;

    @GetMapping("/listAll")
    public ResponseEntity<List<IncidenciaArchivos>> findAll() {
        return ResponseEntity.ok(incidenciaArchivosService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<IncidenciaArchivos> findById(@PathVariable("id") Integer idIncidenciaArchivo){
        return incidenciaArchivosService.findById(idIncidenciaArchivo)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
