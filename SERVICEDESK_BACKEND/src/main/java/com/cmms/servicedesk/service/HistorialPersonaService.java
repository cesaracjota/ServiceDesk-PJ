package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.HistorialPersona;
import com.cmms.servicedesk.model.Persona;
import com.cmms.servicedesk.repository.IHistoriaPersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HistorialPersonaService implements IHistorialPersonaService {
    @Autowired
    private IHistoriaPersonaRepository historiaPersonaRepository;

    @Override
    public List<HistorialPersona> findAll() {
        return historiaPersonaRepository.findAll();
    }

    @Override
    public Optional<HistorialPersona> findById(Integer id) {
        return historiaPersonaRepository.findById(id);
    }

    @Override
    public HistorialPersona create(HistorialPersona historialPersona) {
        return historiaPersonaRepository.save(historialPersona);
    }

    @Override
    public HistorialPersona update(HistorialPersona historialPersona) {
        return historiaPersonaRepository.save(historialPersona);
    }

    @Override
    public void delete(Integer id) {
        historiaPersonaRepository.deleteById(id);
    }

    public HistorialPersona findByPersona(Persona persona) {
        return historiaPersonaRepository.findByPersona(persona);
    }

    @Override
    public Optional<HistorialPersona> findByPersonaAndActivo(Persona persona, char activo) {
        return historiaPersonaRepository.findByPersonaAndActivo(persona,activo);
    }
}
