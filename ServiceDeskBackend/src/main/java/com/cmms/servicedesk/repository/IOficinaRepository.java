package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.Oficina;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOficinaRepository extends JpaRepository<Oficina, Integer> {

    List<Oficina> findByActivo(char activo);

}
