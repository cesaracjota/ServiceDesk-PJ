package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.EstadoTecnico;
import com.cmms.servicedesk.model.Persona;
import com.cmms.servicedesk.repository.IEstadoTecnicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class EstadoTecnicoService implements IEstadoTecnicoService<EstadoTecnico> {

    @Autowired
    private IEstadoTecnicoRepository estadoTecnicoRepository;

    @Override
    public List<EstadoTecnico> findAll() {
        return estadoTecnicoRepository.findAll();
    }

    @Override
    public Optional<EstadoTecnico> findById(Integer id) {
        return estadoTecnicoRepository.findById(id);
    }

    @Override
    public EstadoTecnico create(EstadoTecnico estadoTecnico) {
        return estadoTecnicoRepository.save(estadoTecnico);
    }

    @Override
    public EstadoTecnico update(EstadoTecnico estadoTecnico) {
        return estadoTecnicoRepository.save(estadoTecnico);
    }

    @Override
    public void delete(Integer id) {
        estadoTecnicoRepository.deleteById(id);
    }

    @Override
    public List<EstadoTecnico> findByPersona(Persona persona) {
        return estadoTecnicoRepository.findByPersona(persona);
    }

    @Override
    public List<EstadoTecnico> findByActivo(char activo) {
        return estadoTecnicoRepository.findByActivo(activo);
    }

    @Override
    public List<EstadoTecnico> findByPersonaAndActivo(Persona persona, char activo) {
        return estadoTecnicoRepository.findByPersonaAndActivo(persona,activo);
    }
}

