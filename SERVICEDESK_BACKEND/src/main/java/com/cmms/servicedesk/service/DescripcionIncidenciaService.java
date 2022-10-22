package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.DescripcionIncidencia;
import com.cmms.servicedesk.model.Incidencia;
import com.cmms.servicedesk.repository.IDescripcionIncidenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DescripcionIncidenciaService implements IDescripcionIncidenciaService {

    @Autowired
    private IDescripcionIncidenciaRepository repository;

    @Override
    public List<DescripcionIncidencia> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<DescripcionIncidencia> findById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public DescripcionIncidencia create(DescripcionIncidencia model) {
        return repository.save(model);
    }

    @Override
    public DescripcionIncidencia update(DescripcionIncidencia model) {
        return repository.save(model);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<DescripcionIncidencia> findByIncidencia(Incidencia incidencia) {
        return repository.findByIncidencia(incidencia);
    }

}

