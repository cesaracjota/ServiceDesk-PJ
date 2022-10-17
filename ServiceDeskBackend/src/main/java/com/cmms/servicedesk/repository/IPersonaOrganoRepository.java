package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.Organo;
import com.cmms.servicedesk.model.Persona;
import com.cmms.servicedesk.model.PersonaOrgano;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface IPersonaOrganoRepository extends JpaRepository<PersonaOrgano, Integer> {
    List<PersonaOrgano> findByPersona(Persona persona);

    Optional<PersonaOrgano> findByPersonaAndOrgano(Persona persona, Organo organo);

    List<PersonaOrgano> findByOrgano(Organo organo);
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "DELETE from persona_organo WHERE n_id_persona = ?1", nativeQuery = true)
    void deleteByPersona(Persona persona);
}