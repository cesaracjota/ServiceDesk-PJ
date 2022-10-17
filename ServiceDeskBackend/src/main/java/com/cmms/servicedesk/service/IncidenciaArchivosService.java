package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Incidencia;
import com.cmms.servicedesk.model.IncidenciaArchivos;
import com.cmms.servicedesk.repository.IIncidenciaArchivosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class IncidenciaArchivosService implements IIncidenciaArchivosService{
    @Autowired
    private IIncidenciaArchivosRepository incidenciaArchivosRepository;

    @Override
    public List<IncidenciaArchivos> findAll() {
        return incidenciaArchivosRepository.findAll();
    }

    @Override
    public Optional<IncidenciaArchivos> findById(Integer id) {
        return incidenciaArchivosRepository.findById(id);
    }


    @Override
    public IncidenciaArchivos create(IncidenciaArchivos incidenciaArchivos) {
        return incidenciaArchivosRepository.save(incidenciaArchivos);
    }

    @Override
    public IncidenciaArchivos update(IncidenciaArchivos incidenciaArchivos) {
        return incidenciaArchivosRepository.save(incidenciaArchivos);
    }

    @Override
    public void delete(Integer id) {
        incidenciaArchivosRepository.deleteById(id);
    }

}
