package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.DescripcionIncidencia;
import com.cmms.servicedesk.model.Incidencia;

import java.util.List;
import java.util.Optional;

public interface IDescripcionIncidenciaService {

    List<DescripcionIncidencia> findAll();

    Optional<DescripcionIncidencia> findById(Integer id);

    DescripcionIncidencia create(DescripcionIncidencia model);

    DescripcionIncidencia update(DescripcionIncidencia model);

    void delete(Integer id);

    List<DescripcionIncidencia> findByIncidencia(Incidencia incidencia);
}
