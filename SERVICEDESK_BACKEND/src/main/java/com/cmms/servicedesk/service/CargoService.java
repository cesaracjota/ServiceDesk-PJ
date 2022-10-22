package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Cargo;
import com.cmms.servicedesk.repository.ICargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CargoService implements ICRUDService<Cargo>{
    @Autowired
    private ICargoRepository cargoRepository;

    @Override
    public List<Cargo> findAll() {
        return cargoRepository.findAll(Sort.by(Sort.Direction.ASC, "cargo"));
    }

    @Override
    public Optional<Cargo> findById(Integer id) {
        return cargoRepository.findById(id);
    }

    @Override
    public Cargo create(Cargo model) {
        return cargoRepository.save(model);
    }

    @Override
    public Cargo update(Cargo model) {
        return cargoRepository.save(model);
    }

    @Override
    public void delete(Integer id) {
        cargoRepository.deleteById(id);
    }

    @Override
    public List<Cargo> findByActivo() {
        return null;
    }
}
