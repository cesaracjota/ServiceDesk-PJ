package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.ConfiguracionBotones;
import com.cmms.servicedesk.service.ConfiguracionBotonesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/configuraciones")
public class ConfiguracionBotonesController {
    @Autowired
    private ConfiguracionBotonesService configuracionBotonesService;

    @GetMapping
    public ResponseEntity<List<ConfiguracionBotones>> findAll(){
        return ResponseEntity.ok(configuracionBotonesService.findAll());
    }

    @PostMapping(path = "{id}")
    public ResponseEntity<ConfiguracionBotones> updateActivo(@PathVariable("id") Integer idConfiguracionBoton){
        return configuracionBotonesService.findById(idConfiguracionBoton)
                .map(o -> {
                    char activo = o.getActivo();
                    if(activo == 'S'){
                        o.setActivo('N');
                    }else{ o.setActivo('S');}
                    configuracionBotonesService.update(o);
                    return ResponseEntity.ok(o);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
