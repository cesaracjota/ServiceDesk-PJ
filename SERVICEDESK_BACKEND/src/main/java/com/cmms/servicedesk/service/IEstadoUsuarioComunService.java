package com.cmms.servicedesk.service;
import com.cmms.servicedesk.model.EstadoUsuarioComun;
import com.cmms.servicedesk.model.Persona;

import java.util.List;
import java.util.Optional;

public interface IEstadoUsuarioComunService<EstadoUsuarioComun> {

    List<EstadoUsuarioComun> findAll();

    Optional<EstadoUsuarioComun> findById(Integer id);

    EstadoUsuarioComun create(EstadoUsuarioComun estadoUsuarioComun);

    EstadoUsuarioComun update(EstadoUsuarioComun estadoUsuarioComun);

    void delete(Integer id);

    List<EstadoUsuarioComun> findByPersona(Persona persona);

    List<EstadoUsuarioComun> findByActivo(char activo);

    List<EstadoUsuarioComun> findByPersonaAndActivo(Persona persona, char activo);

}
