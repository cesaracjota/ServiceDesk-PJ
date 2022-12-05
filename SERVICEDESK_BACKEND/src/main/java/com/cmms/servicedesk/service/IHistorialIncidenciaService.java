package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.HistorialIncidencia;
import com.cmms.servicedesk.model.Incidencia;
import com.cmms.servicedesk.model.Persona;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IHistorialIncidenciaService {

    List<HistorialIncidencia> findAll();

    Optional<HistorialIncidencia> findById(Integer id);

    HistorialIncidencia create(HistorialIncidencia historialIncidencia);

    HistorialIncidencia update(HistorialIncidencia historialIncidencia);

    void delete(Integer id);

    List<HistorialIncidencia> findByPersonaAsignado(Persona persona);

    List<HistorialIncidencia> findByPersona_asignadoIsNull(LocalDate startDate, LocalDate endDate);

    List<HistorialIncidencia> findByPersona_asignadoIsNotNull(LocalDate startDate, LocalDate endDate);

    List<HistorialIncidencia> findByIncidencia(Incidencia incidencia);

    HistorialIncidencia findByIncidenciaAndEstado(Incidencia incidencia, char estado);

    HistorialIncidencia findByIdTecnicoAsignado(Integer idIncidencia);

}
