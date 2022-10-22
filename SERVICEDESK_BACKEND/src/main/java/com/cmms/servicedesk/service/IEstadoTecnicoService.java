package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.EstadoTecnico;
import com.cmms.servicedesk.model.Persona;

import java.util.List;
import java.util.Optional;

public interface IEstadoTecnicoService<EstadoTecnico> {

    List<EstadoTecnico> findAll();

    Optional<EstadoTecnico> findById(Integer id);

    EstadoTecnico create(EstadoTecnico estadoTecnico);

    EstadoTecnico update(EstadoTecnico estadoTecnico);

    void delete(Integer id);

    List<EstadoTecnico> findByPersona(Persona persona);

    List<EstadoTecnico> findByActivo(char activo);

    List<EstadoTecnico> findByPersonaAndActivo(Persona persona, char activo);

}
