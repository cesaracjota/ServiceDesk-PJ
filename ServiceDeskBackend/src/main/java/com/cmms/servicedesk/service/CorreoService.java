package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Correo;
import com.cmms.servicedesk.model.Persona;
import com.cmms.servicedesk.repository.ICorreoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CorreoService implements ICorreoService<Correo> {

    @Autowired
    private ICorreoRepository correoRepository;

    @Override
    public List<Correo> findAll() {
        return correoRepository.findAll();
    }

    @Override
    public Optional<Correo> findById(Integer id) {
        return correoRepository.findById(id);
    }

    @Override
    public Correo create(Correo correo) {
        return correoRepository.save(correo);
    }

    @Override
    public Correo update(Correo correo) {
        return correoRepository.save(correo);
    }

    @Override
    public void delete(Integer id) {
        correoRepository.deleteById(id);
    }

    @Override
    public List<Correo> findByPersonaTo(Persona persona) {
        return correoRepository.findByPersonaTo(persona);
    }

    @Override
    public List<Correo> findByPersonaFrom(Persona persona) {
        return correoRepository.findByPersonaFrom(persona);
    }

    @Override
    public List<Correo> findByActivo(char activo) {
        return null;
    }

}
