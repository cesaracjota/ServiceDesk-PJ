package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Incidencia;
import com.cmms.servicedesk.model.Oficina;
import com.cmms.servicedesk.model.Persona;
import com.cmms.servicedesk.model.Sede;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface IIncidenciaService {
    List<Incidencia> findAll();

    Optional<Incidencia> findById(Integer id);

    Incidencia create(Incidencia incidencia);

    Incidencia update(Incidencia incidencia);
    List<Incidencia> findByPersona(Persona persona);

    String getClientIp(HttpServletRequest request);

    void delete(Integer id);

    List<Incidencia> findByAllDataBetween(Date startDate, Date endDate );

//    List<Incidencia> findByPersona_asignado(Persona persona);
//
//    List<Incidencia> findByPersona_asignadoIsNull();
//
//    List<Incidencia> findByPersona_asignadoIsNotNull();

}
