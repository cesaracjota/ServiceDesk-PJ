package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.CorreoCredenciales;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ICorreoCredencialesRepository extends JpaRepository<CorreoCredenciales, Integer> {
    List<CorreoCredenciales> findByActivo(char activo);
}
