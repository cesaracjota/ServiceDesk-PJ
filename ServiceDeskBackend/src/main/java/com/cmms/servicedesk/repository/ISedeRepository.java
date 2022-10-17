package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.Sede;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ISedeRepository extends JpaRepository<Sede, Integer> {

    List<Sede> findByActivo(char activo);
}
