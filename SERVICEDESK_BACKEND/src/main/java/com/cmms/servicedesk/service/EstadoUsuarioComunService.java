package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.EstadoUsuarioComun;
import com.cmms.servicedesk.model.Persona;
import com.cmms.servicedesk.repository.IEstadoUsuarioComunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class EstadoUsuarioComunService implements IEstadoUsuarioComunService<EstadoUsuarioComun>{

    @Autowired
    private IEstadoUsuarioComunRepository estadoUsuarioComunRepository;

    @Override
    public List<EstadoUsuarioComun> findAll() {
        return estadoUsuarioComunRepository.findAll();
    }

    @Override
    public Optional<EstadoUsuarioComun> findById(Integer id) {
        return estadoUsuarioComunRepository.findById(id);
    }

    @Override
    public EstadoUsuarioComun create(EstadoUsuarioComun estadoUsuarioComun) {
        return estadoUsuarioComunRepository.save(estadoUsuarioComun);
    }

    @Override
    public EstadoUsuarioComun update(EstadoUsuarioComun estadoUsuarioComun) {
        return estadoUsuarioComunRepository.save(estadoUsuarioComun);
    }

    @Override
    public void delete(Integer id) {
        estadoUsuarioComunRepository.deleteById(id);
    }

    @Override
    public List<EstadoUsuarioComun> findByPersona(Persona persona) {
        return estadoUsuarioComunRepository.findByPersona(persona);
    }

    @Override
    public List<EstadoUsuarioComun> findByActivo(char activo) {
        return estadoUsuarioComunRepository.findByActivo(activo);
    }

    @Override
    public List<EstadoUsuarioComun> findByPersonaAndActivo(Persona persona, char activo) {
        return estadoUsuarioComunRepository.findByPersonaAndActivo(persona,activo);
    }
}
