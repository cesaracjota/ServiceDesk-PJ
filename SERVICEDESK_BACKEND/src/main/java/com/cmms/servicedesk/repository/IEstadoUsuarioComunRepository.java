package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.EstadoTecnico;
import com.cmms.servicedesk.model.EstadoUsuarioComun;
import com.cmms.servicedesk.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IEstadoUsuarioComunRepository extends JpaRepository<EstadoUsuarioComun, Integer> {

    List<EstadoUsuarioComun> findByPersona(Persona persona);

    List<EstadoUsuarioComun> findByActivo(char activo);

    List<EstadoUsuarioComun> findByPersonaAndActivo(Persona persona, char activo);
}

