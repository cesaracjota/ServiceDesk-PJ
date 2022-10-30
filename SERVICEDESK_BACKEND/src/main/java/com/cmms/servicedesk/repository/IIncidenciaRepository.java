package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.Incidencia;
import com.cmms.servicedesk.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface IIncidenciaRepository extends JpaRepository<Incidencia, Integer> {
    List<Incidencia> findByPersona(Persona persona);

    @Query(value = "SELECT * FROM incidencia WHERE f_sistema_registro BETWEEN ?1 AND ?2", nativeQuery = true)
    List<Incidencia> findByFechaBetween(Date startDate, Date endDate);

    @Query(value = "SELECT count(*) FROM incidencia i LEFT JOIN historial_incidencia hi ON hi.n_id_incidencia = i.n_id_incidencia AND hi.s_estado = 'A' AND (hi.s_estado_incidencia = 'P' OR hi.s_estado_incidencia = 'T') WHERE hi.n_id_persona_asignado = :idTecnicoAsignado" , nativeQuery = true)
    String findCountIncidencias(@Param("idTecnicoAsignado") Integer idTecnicoAsignado);

}
