package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.HistorialIncidencia;
import com.cmms.servicedesk.model.Incidencia;
import com.cmms.servicedesk.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface IHistorialIncidenciaRepository extends JpaRepository<HistorialIncidencia, Integer> {


    @Query(value = "SELECT * FROM historial_incidencia WHERE n_id_incidencia = ?1 AND s_estado = ?2", nativeQuery = true)
    HistorialIncidencia findByIncidenciaAndEstado(Incidencia incidencia, char estado);

    @Query(value = "SELECT * FROM historial_incidencia WHERE n_id_incidencia = ?1", nativeQuery = true)
    List<HistorialIncidencia> findByIncidencia(Incidencia incidencia);

    @Query(value = "SELECT * FROM historial_incidencia WHERE n_id_persona_asignado = ?1 AND s_estado = 'A'", nativeQuery = true)
    List<HistorialIncidencia> findByPersonaAsignado(Persona persona);

    @Query(value = "SELECT * FROM incidencia JOIN historial_incidencia hi ON incidencia.n_id_incidencia = hi.n_id_incidencia AND hi.s_estado = 'A' WHERE CAST(f_sistema_registro AS date) BETWEEN CAST( :startDate as date) AND CAST( :endDate AS date) AND n_id_persona_asignado IS NULL ORDER BY hi.f_sistema_actualizado DESC;", nativeQuery = true)
    List<HistorialIncidencia> findByPersona_asignadoIsNull(LocalDate startDate, LocalDate endDate);

    @Query(value = "SELECT * FROM incidencia JOIN historial_incidencia hi ON incidencia.n_id_incidencia = hi.n_id_incidencia AND hi.s_estado = 'A' WHERE CAST(f_sistema_registro AS date) BETWEEN CAST( :startDate as date) AND CAST( :endDate AS date) AND n_id_persona_asignado is not null ORDER BY hi.f_sistema_actualizado DESC;", nativeQuery = true)
    List<HistorialIncidencia> findByPersona_asignadoIsNotNull(LocalDate startDate, LocalDate endDate);

    @Query(value = "SELECT * FROM historial_incidencia hi WHERE hi.n_id_incidencia = :idIncidencia AND hi.s_estado_incidencia = 'P' AND hi.s_estado = 'A' AND hi.n_id_persona_asignado IS NOT NULL",
            nativeQuery = true)
    HistorialIncidencia findByIdTecnicoAsignado(@Param("idIncidencia") Integer idIncidencia);

}

