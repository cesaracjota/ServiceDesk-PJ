package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Sede;
import com.cmms.servicedesk.repository.ISedeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SedeService implements ISedeService{

    @Autowired
    private ISedeRepository sedeRepository;
    @Override
    public List<Sede> findAll() {
        return sedeRepository.findAll(Sort.by(Sort.Direction.ASC, "sede"));
    }

    @Override
    public Optional<Sede> findById(Integer id) {
        return sedeRepository.findById(id);
    }

    @Override
    public Sede create(Sede sede) {
        return sedeRepository.save(sede);
    }

    @Override
    public Sede update(Sede sede) {
        return sedeRepository.save(sede);
    }

    @Override
    public void delete(Integer id) {
        sedeRepository.deleteById(id);
    }

    @Override
    public List<Sede> findByActive() {
        return sedeRepository.findByActivo('S');
    }
}
