package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Persona;

import java.util.List;
import java.util.Optional;

public interface ICorreoService<Correo> {
    List<Correo> findAll();
    Optional<Correo> findById(Integer id);
    Correo create(Correo correo);
    Correo update(Correo correo);
    void delete(Integer id);
    List<Correo> findByPersonaTo(Persona persona);
    List<Correo> findByPersonaFrom(Persona persona);
    List<Correo> findByActivo(char activo);

}

