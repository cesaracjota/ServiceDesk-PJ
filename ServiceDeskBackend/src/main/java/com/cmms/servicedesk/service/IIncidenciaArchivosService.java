package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Incidencia;
import com.cmms.servicedesk.model.IncidenciaArchivos;

import java.util.List;
import java.util.Optional;

public interface IIncidenciaArchivosService {

    List<IncidenciaArchivos> findAll();

    Optional<IncidenciaArchivos> findById(Integer id);

    IncidenciaArchivos create(IncidenciaArchivos incidenciaArchivos);

    IncidenciaArchivos update(IncidenciaArchivos incidenciaArchivos);

    void delete(Integer id);

}
