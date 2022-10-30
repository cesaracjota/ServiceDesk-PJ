package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Organo;
import com.cmms.servicedesk.model.Persona;
import com.cmms.servicedesk.model.PersonaOrgano;

import java.util.List;
import java.util.Optional;

public interface IPersonaOrganoService {
    List<PersonaOrgano> findAll();

    Optional<PersonaOrgano> findById(Integer id);

    PersonaOrgano create(PersonaOrgano personaorgano);

    void delete(Integer id);

    List<PersonaOrgano> findByPersona(Persona persona);

    Optional<PersonaOrgano> findByPersonaAndOrgano(Persona persona, Organo organo);

    List<PersonaOrgano> findByOrgano(Organo organo);

    void deleteByPersona(Persona persona);

}
