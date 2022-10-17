package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.OrigenIncidencia;

import java.util.List;
import java.util.Optional;

public interface IOrigenIncidenciaService {

    List<OrigenIncidencia> findAll();

    Optional<OrigenIncidencia> findById(Integer id);

    OrigenIncidencia create(OrigenIncidencia origenIncidencia);

    OrigenIncidencia update(OrigenIncidencia origenIncidencia);

    void delete(Integer id);
}
