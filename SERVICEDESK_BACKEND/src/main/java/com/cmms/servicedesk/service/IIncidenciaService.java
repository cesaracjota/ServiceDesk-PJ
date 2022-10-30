package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Incidencia;
import com.cmms.servicedesk.model.Persona;

import javax.servlet.http.HttpServletRequest;
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

    String findCountIncidencias(Integer idTecnicoAsignado);

//    List<Incidencia> findByPersona_asignado(Persona persona);
//
//    List<Incidencia> findByPersona_asignadoIsNull();
//
//    List<Incidencia> findByPersona_asignadoIsNotNull();

}
