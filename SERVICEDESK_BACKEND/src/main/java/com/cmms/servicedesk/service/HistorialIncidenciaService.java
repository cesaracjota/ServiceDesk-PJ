package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.HistorialIncidencia;
import com.cmms.servicedesk.model.Incidencia;
import com.cmms.servicedesk.model.Persona;
import com.cmms.servicedesk.repository.IHistorialIncidenciaRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class HistorialIncidenciaService implements IHistorialIncidenciaService {

    @Autowired
    IHistorialIncidenciaRepository historialIncidenciaRepository;

    @Override
    public List<HistorialIncidencia> findAll() {
        return historialIncidenciaRepository.findAll();
    }

    @Override
    public Optional<HistorialIncidencia> findById(Integer id) {
        return historialIncidenciaRepository.findById(id);
    }

    @Override
    public HistorialIncidencia create(HistorialIncidencia historialIncidencia) {

        return historialIncidenciaRepository.save(historialIncidencia);

    }

    @Override
    public HistorialIncidencia update(HistorialIncidencia historialIncidencia) {
        return historialIncidenciaRepository.save(historialIncidencia);
    }

    @Override
    public void delete(Integer id) {
        historialIncidenciaRepository.deleteById(id);
    }

    @Override
    public List<HistorialIncidencia> findByPersonaAsignado(Persona persona) {
        return historialIncidenciaRepository.findByPersonaAsignado(persona);
    }

    @Override
    public List<HistorialIncidencia> findByPersona_asignadoIsNull() {
        return historialIncidenciaRepository.findByPersona_asignadoIsNull();
    }

    @Override
    public List<HistorialIncidencia> findByPersona_asignadoIsNotNull() {
        return historialIncidenciaRepository.findByPersona_asignadoIsNotNull();
    }

    @Override
    public List<HistorialIncidencia> findByIncidencia(Incidencia incidencia) {
        return historialIncidenciaRepository.findByIncidencia(incidencia);
    }

    @Override
    public HistorialIncidencia findByIncidenciaAndEstado(Incidencia incidencia, char estado) {
        return historialIncidenciaRepository.findByIncidenciaAndEstado(incidencia, estado);
    }

}
