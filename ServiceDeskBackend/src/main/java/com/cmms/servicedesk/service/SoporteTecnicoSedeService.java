package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.SoporteTecnicoSede;
import com.cmms.servicedesk.repository.IOficinaRepository;
import com.cmms.servicedesk.repository.ISoporteTecnicoSede;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SoporteTecnicoSedeService implements ICRUDService<SoporteTecnicoSede>{

    @Autowired
    private ISoporteTecnicoSede soporteTecnicoSede;

    @Override
    public List findAll() {
        return soporteTecnicoSede.findAll();
    }

    @Override
    public Optional<SoporteTecnicoSede> findById(Integer id) {
        return soporteTecnicoSede.findById(id);
    }

    @Override
    public SoporteTecnicoSede create(SoporteTecnicoSede model) {
        return soporteTecnicoSede.save(model);
    }

    @Override
    public SoporteTecnicoSede update(SoporteTecnicoSede model) {
        return soporteTecnicoSede.save(model);
    }

    @Override
    public void delete(Integer id) {
        soporteTecnicoSede.deleteById(id);
    }

    @Override
    public List<SoporteTecnicoSede> findByActivo() {
        return null;
    }


}
