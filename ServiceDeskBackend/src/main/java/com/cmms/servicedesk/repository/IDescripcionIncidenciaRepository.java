package com.cmms.servicedesk.repository;


import com.cmms.servicedesk.model.DescripcionIncidencia;
import com.cmms.servicedesk.model.Incidencia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IDescripcionIncidenciaRepository extends JpaRepository<DescripcionIncidencia, Integer> {

    List<DescripcionIncidencia> findByIncidencia(Incidencia incidencia);

}
