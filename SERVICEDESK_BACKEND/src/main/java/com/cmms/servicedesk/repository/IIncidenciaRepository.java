package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.Incidencia;
import com.cmms.servicedesk.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface IIncidenciaRepository extends JpaRepository<Incidencia, Integer> {
    List<Incidencia> findByPersona(Persona persona);
    // examples querys
    // "SELECT * FROM incidencia WHERE CAST(f_sistema_registro AS date) BETWEEN CAST( :dateFrom AS date) AND CAST( :dateDesde AS date) AND c_usuario = :user AND c_sede = :sede order by f_fecha DESC;"
    //  @Query(value = "SELECT * FROM incidencia WHERE f_sistema_registro BETWEEN ?1 AND ?2", nativeQuery = true)

    @Query(value = "SELECT * FROM incidencia join historial_incidencia hi on incidencia.n_id_incidencia = hi.n_id_incidencia and hi.s_estado = 'A' WHERE CAST(f_sistema_registro AS date) BETWEEN CAST( :startDate as date) AND CAST( :endDate AS date) ORDER BY hi.f_sistema_actualizado DESC;", nativeQuery = true)
    List<Incidencia> findByFechaBetween(LocalDate startDate, LocalDate endDate);

    @Query(value = "SELECT * FROM incidencia join historial_incidencia hi on incidencia.n_id_incidencia = hi.n_id_incidencia and hi.s_estado = 'A' WHERE CAST(f_sistema_registro AS date) BETWEEN CAST( :startDate as date) AND CAST( :endDate AS date) AND hi.n_id_persona_asignado = :user ORDER BY hi.f_sistema_actualizado DESC;", nativeQuery = true)
    List<Incidencia> findByFechaBetweenForUserTecnico(LocalDate startDate, LocalDate endDate, Integer user);

    @Query(value = "SELECT * FROM incidencia i join historial_incidencia hi on i.n_id_incidencia = hi.n_id_incidencia and hi.s_estado = 'A' WHERE CAST(f_sistema_registro AS date) BETWEEN CAST( :startDate as date) AND CAST( :endDate AS date) AND i.n_id_persona = :user ORDER BY hi.f_sistema_actualizado DESC;", nativeQuery = true)
    List<Incidencia> findByFechaBetweenForUserComun(LocalDate startDate, LocalDate endDate, Integer user);

    @Query(value = "SELECT count(*) FROM incidencia i LEFT JOIN historial_incidencia hi ON hi.n_id_incidencia = i.n_id_incidencia AND hi.s_estado = 'A' AND (hi.s_estado_incidencia = 'P' OR hi.s_estado_incidencia = 'T') WHERE hi.n_id_persona_asignado = :idTecnicoAsignado" , nativeQuery = true)
    String findCountIncidencias(@Param("idTecnicoAsignado") Integer idTecnicoAsignado);

}
