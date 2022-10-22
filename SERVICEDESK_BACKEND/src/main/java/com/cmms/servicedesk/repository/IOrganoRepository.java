package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.Organo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOrganoRepository extends JpaRepository<Organo, Integer> {
    Organo findBySedeIdSede(int id);

    List<Organo> findByActivo(char activo);
}
