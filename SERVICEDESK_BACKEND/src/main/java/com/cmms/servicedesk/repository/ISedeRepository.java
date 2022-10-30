package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.Sede;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ISedeRepository extends JpaRepository<Sede, Integer> {

    List<Sede> findByActivo(char activo);
}
