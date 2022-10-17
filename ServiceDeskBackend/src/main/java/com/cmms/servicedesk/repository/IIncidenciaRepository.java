package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.Incidencia;
import com.cmms.servicedesk.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Date;
import java.util.List;

public interface IIncidenciaRepository extends JpaRepository<Incidencia, Integer> {
    List<Incidencia> findByPersona(Persona persona);

    @Query(value = "SELECT * FROM incidencia WHERE f_sistema_registro BETWEEN ?1 AND ?2", nativeQuery = true)
    List<Incidencia> findByFechaBetween(Date startDate, Date endDate);

}
