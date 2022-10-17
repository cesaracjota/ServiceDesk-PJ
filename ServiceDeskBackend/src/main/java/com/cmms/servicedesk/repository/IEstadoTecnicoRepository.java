package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.EstadoTecnico;
import com.cmms.servicedesk.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IEstadoTecnicoRepository  extends JpaRepository<EstadoTecnico, Integer> {

    List<EstadoTecnico> findByPersona(Persona persona);

    List<EstadoTecnico> findByActivo(char activo);

    List<EstadoTecnico> findByPersonaAndActivo(Persona persona, char activo);


}
