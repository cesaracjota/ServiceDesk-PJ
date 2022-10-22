package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.HistorialPersona;
import com.cmms.servicedesk.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IHistoriaPersonaRepository extends JpaRepository<HistorialPersona, Integer> {
    HistorialPersona findByPersona(Persona persona);
    Optional<HistorialPersona> findByPersonaAndActivo(Persona persona, char activo);
}
