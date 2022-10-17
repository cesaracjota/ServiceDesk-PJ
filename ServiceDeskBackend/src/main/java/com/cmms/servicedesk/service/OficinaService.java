package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Oficina;
import com.cmms.servicedesk.repository.IOficinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OficinaService implements ICRUDService<Oficina>{

    @Autowired
    private IOficinaRepository oficinaRepository;

    @Override
    public List<Oficina> findAll() {
        return oficinaRepository.findAll(Sort.by(Sort.Direction.ASC, "oficina"));
    }

    @Override
    public Optional<Oficina> findById(Integer id) {
        return oficinaRepository.findById(id);
    }

    @Override
    public Oficina create(Oficina model) {
        return oficinaRepository.save(model);
    }

    @Override
    public Oficina update(Oficina model) {
        return oficinaRepository.save(model);
    }

    @Override
    public void delete(Integer id) {
        oficinaRepository.deleteById(id);
    }

    @Override
    public List<Oficina> findByActivo() {
        return oficinaRepository.findByActivo('S');
    }
}
