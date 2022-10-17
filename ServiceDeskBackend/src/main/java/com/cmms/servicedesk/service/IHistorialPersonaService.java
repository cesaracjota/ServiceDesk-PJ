package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.HistorialPersona;
import com.cmms.servicedesk.model.Persona;

import java.util.List;
import java.util.Optional;

public interface IHistorialPersonaService {

    List<HistorialPersona> findAll();

    Optional<HistorialPersona> findById(Integer id);

    HistorialPersona create(HistorialPersona historialPersona);

    HistorialPersona update(HistorialPersona historialPersona);

    void delete(Integer id);

    HistorialPersona findByPersona(Persona persona);

    Optional<HistorialPersona> findByPersonaAndActivo(Persona persona,char activo);
}
