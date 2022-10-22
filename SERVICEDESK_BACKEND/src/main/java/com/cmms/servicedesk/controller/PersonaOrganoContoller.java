package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.Persona;
import com.cmms.servicedesk.model.PersonaOrgano;
import com.cmms.servicedesk.service.PersonaOrganoService;
import com.cmms.servicedesk.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/personaorganos")
public class PersonaOrganoContoller {
    @Autowired
    private PersonaOrganoService personaOrganoService;
    @Autowired
    private PersonaService personaService;

    @GetMapping
    public ResponseEntity<List<PersonaOrgano>> findAll(){
        return ResponseEntity.ok(personaOrganoService.findAll());
    }

    @PostMapping
    public ResponseEntity<PersonaOrgano> create(@Valid @RequestBody PersonaOrgano personaOrgano){
        if(personaOrganoService.findByPersonaAndOrgano(personaOrgano.getPersona(),personaOrgano.getOrgano()).isPresent()){
            return ResponseEntity.status(422).build();
        }else{
            return new ResponseEntity<>(personaOrganoService.create(personaOrgano), HttpStatus.CREATED);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Integer idPersonaOrgano){
        return personaOrganoService.findById(idPersonaOrgano)
                .map(c -> {
                    personaOrganoService.delete(idPersonaOrgano);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping(path = "/persona/{id}")
    public ResponseEntity<List<PersonaOrgano>> findByPersona(@PathVariable("id") Integer idPersonaOrgano){
        Persona persona = personaService.findById(idPersonaOrgano).get();
        List<PersonaOrgano> personaOrgano = personaOrganoService.findByPersona(persona);
        // System.out.println(personaOrganoService);
        if (personaOrganoService != null) {
            return ResponseEntity.ok(personaOrgano);
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
