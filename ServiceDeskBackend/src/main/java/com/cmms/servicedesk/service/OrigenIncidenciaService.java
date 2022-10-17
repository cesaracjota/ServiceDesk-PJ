package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.OrigenIncidencia;
import com.cmms.servicedesk.repository.IOrigenIncidenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class OrigenIncidenciaService implements IOrigenIncidenciaService{

    @Autowired
    private IOrigenIncidenciaRepository origenIncidenciaRepository;

    @Override
    public List<OrigenIncidencia> findAll() {
        return origenIncidenciaRepository.findAll();
    }

    @Override
    public Optional<OrigenIncidencia> findById(Integer id) {
        return origenIncidenciaRepository.findById(id);
    }

    @Override
    public OrigenIncidencia create(OrigenIncidencia origenIncidencia) {
        return origenIncidenciaRepository.save(origenIncidencia);
    }

    @Override
    public OrigenIncidencia update(OrigenIncidencia origenIncidencia) {
        return origenIncidenciaRepository.save(origenIncidencia);
    }

    @Override
    public void delete(Integer id) {
        origenIncidenciaRepository.deleteById(id);
    }
}
