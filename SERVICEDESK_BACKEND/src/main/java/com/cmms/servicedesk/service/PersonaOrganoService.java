package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Organo;
import com.cmms.servicedesk.model.Persona;
import com.cmms.servicedesk.model.PersonaOrgano;
import com.cmms.servicedesk.repository.IPersonaOrganoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonaOrganoService implements IPersonaOrganoService{
    @Autowired
    private IPersonaOrganoRepository personaOrganoRepository;

    @Override
    public List<PersonaOrgano> findAll() {
        return personaOrganoRepository.findAll();
    }

    @Override
    public Optional<PersonaOrgano> findById(Integer id) {
        return personaOrganoRepository.findById(id);
    }

    @Override
    public PersonaOrgano create(PersonaOrgano model) {
        return personaOrganoRepository.save(model);
    }

    @Override
    public void delete(Integer id) {
        personaOrganoRepository.deleteById(id);
    }

    @Override
    public List<PersonaOrgano> findByPersona(Persona persona) {
        return personaOrganoRepository.findByPersona(persona);
    }

    @Override
    public Optional<PersonaOrgano> findByPersonaAndOrgano(Persona persona, Organo organo) {
        return personaOrganoRepository.findByPersonaAndOrgano(persona,organo);
    }

    @Override
    public List<PersonaOrgano> findByOrgano(Organo organo) {
        return personaOrganoRepository.findByOrgano(organo);
    }

    @Override
    public void deleteByPersona(Persona persona) {
        personaOrganoRepository.deleteByPersona(persona);
    }

}
