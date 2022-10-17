package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.Cargo;
import com.cmms.servicedesk.model.Correo;
import com.cmms.servicedesk.model.Persona;
import com.cmms.servicedesk.repository.ICorreoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/correo")
public class CorreoController {

    @Autowired
    private ICorreoRepository correoRepository;

    @Autowired
    private PersonaController personaController;

    @RequestMapping("/listall")
    public List<Correo> findAll() {
        return correoRepository.findAll();
    }

    @RequestMapping("/listall/{id}")
    public Correo findById(@PathVariable("id") Integer idCorreo) {
        return correoRepository.findById(idCorreo).get();
    }

    @PostMapping("/create")
    public ResponseEntity<Correo>  create(@Valid @RequestBody Correo correo) {
        return new ResponseEntity<>(correoRepository.save(correo), HttpStatus.CREATED);
    }

    @RequestMapping("/listall/{id}/persona/to")
    public List<Correo> findByPersonaTo(@PathVariable("id") Integer idPersona) {
        Persona persona = personaController.findById(idPersona).getBody();
        return correoRepository.findByPersonaTo(persona);
    }

    @RequestMapping("/listall/activo")
    public List<Correo> findByActivo() {
        return correoRepository.findByActivo('A');
    }

    @RequestMapping("/listall/desactivado")
    public List<Correo> findByDesactivado() {
        return correoRepository.findByActivo('N');
    }

    @PutMapping("/leido/{id}")
    public ResponseEntity<Correo> updateLeido(@PathVariable("id") Integer idCorreo) {
        return correoRepository.findById(idCorreo)
                .map(o -> {
                    o.setActivo('N');
                    correoRepository.save(o);
                    return ResponseEntity.ok(o);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @RequestMapping("/listall/{id}/persona/from")
    public List<Correo> findByPersonaFrom(@PathVariable("id") Integer idPersona) {
        Persona persona = personaController.findById(idPersona).getBody();
        return correoRepository.findByPersonaFrom(persona);
    }



}
