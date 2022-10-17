package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Organo;
import com.cmms.servicedesk.repository.IOrganoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrganoService implements IOrganoService{

    @Autowired
    private IOrganoRepository organoRepository;

    @Override
    public List<Organo> findAll() {
        return organoRepository.findAll(Sort.by(Sort.Direction.ASC, "organo"));
    }
    @Override
    public Optional<Organo> findById(Integer id) {
        return organoRepository.findById(id);
    }

    @Override
    public Organo findByIdSede(Integer id) {
        return organoRepository.findBySedeIdSede(id);
    }

    @Override
    public Organo create(Organo model) {
        return organoRepository.save(model);
    }

    @Override
    public Organo update(Organo model) {
        return organoRepository.save(model);
    }

    @Override
    public void delete(Integer id) {
        organoRepository.deleteById(id);
    }

    @Override
    public List<Organo> findByActive() {
        return organoRepository.findByActivo('S');
    }
}
