package com.cmms.servicedesk.repository;


import com.cmms.servicedesk.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IPersonaRepository extends JpaRepository<Persona, Integer> {

    Optional<Persona> findByDni(String dni);

    @Query(value = "select p from Persona p where p.apellido like %?1%")
    List<Persona> findByApellido(String apellido);

    @Query(value = "SELECT * FROM persona WHERE n_id_perfil = ?1", nativeQuery = true)
    List<Persona> findByPerfilPersona(int perfilPersonaID);

}
