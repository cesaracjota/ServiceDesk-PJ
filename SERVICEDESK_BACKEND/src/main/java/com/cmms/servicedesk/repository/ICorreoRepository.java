package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.Correo;
import com.cmms.servicedesk.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ICorreoRepository extends JpaRepository<Correo, Integer> {

    @Query(value = "SELECT * FROM correo WHERE n_id_persona_to = ?1", nativeQuery = true)
    List<Correo> findByPersonaTo(Persona persona);

    @Query(value = "SELECT * FROM correo WHERE n_id_persona_from = ?1", nativeQuery = true)
    List<Correo> findByPersonaFrom(Persona persona);
    List<Correo> findByActivo(char activo);

}