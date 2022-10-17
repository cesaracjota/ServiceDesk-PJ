package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.PerfilPersona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface IPerfilPersonaRepository extends JpaRepository<PerfilPersona, Integer> {

    @Query(value = "SELECT * FROM perfil_persona WHERE s_perfil = ?1", nativeQuery = true)
    Optional<PerfilPersona> findByPerfil(String perfil);
}
