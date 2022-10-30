package com.cmms.servicedesk.controller;
import com.cmms.servicedesk.model.CorreoCredenciales;
import com.cmms.servicedesk.service.CorreoCredencialesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/correo_credenciales")
public class CorreoCredencialesController {
    @Autowired
    private CorreoCredencialesService correoCredencialesService;

    @GetMapping
    public ResponseEntity<List<CorreoCredenciales>> findAll(){
        return ResponseEntity.ok(correoCredencialesService.findAll());
    }

    @PostMapping
    public ResponseEntity<CorreoCredenciales> create(@Valid @RequestBody CorreoCredenciales correoCredenciales){
        List<CorreoCredenciales> correoCredenciales1 = correoCredencialesService.findByActive();
        if(correoCredenciales1.size() == 0) {
            correoCredenciales.setActivo('S');
            correoCredenciales.setFecha(ZonedDateTime.now());
            return new ResponseEntity<>(correoCredencialesService.create(correoCredenciales), HttpStatus.CREATED);
        } else {
            correoCredenciales1.get(0).setActivo('N');
            correoCredencialesService.update(correoCredenciales1.get(0));
            CorreoCredenciales correoCredenciales2 = new CorreoCredenciales();
            correoCredenciales2.setActivo('S');
            correoCredenciales2.setCorreo(correoCredenciales.getCorreo());
            correoCredenciales2.setPassword(correoCredenciales.getPassword());
            correoCredenciales2.setFecha(ZonedDateTime.now());
            correoCredencialesService.create(correoCredenciales2);
            return new ResponseEntity<>(correoCredenciales2, HttpStatus.OK);
        }
    }

    @PutMapping
    public ResponseEntity<CorreoCredenciales> update(@Valid @RequestBody CorreoCredenciales correoCredenciales){
        return correoCredencialesService.findById(correoCredenciales.getIdCorreoCredenciales())
                .map(o -> ResponseEntity.ok(correoCredencialesService.update(correoCredenciales)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CorreoCredenciales> delete(@PathVariable("id") Integer idCorreoCredencial){
        return correoCredencialesService.findById(idCorreoCredencial)
                .map(c -> {
                    CorreoCredenciales correoCredenciales = c;
                    correoCredencialesService.delete(idCorreoCredencial);
                    return ResponseEntity.ok(correoCredenciales);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
