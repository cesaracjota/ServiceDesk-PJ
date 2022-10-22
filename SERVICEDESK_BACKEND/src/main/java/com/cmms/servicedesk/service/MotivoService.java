package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Motivo;
import com.cmms.servicedesk.repository.IMotivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MotivoService implements IMotivoService{

    @Autowired
    private IMotivoRepository motivoRepository;

    @Override
    public List<Motivo> findAll() {
        return motivoRepository.findAll();
    }

    @Override
    public Optional<Motivo> findById(Integer id) {
        return motivoRepository.findById(id);
    }

    @Override
    public Motivo create(Motivo motivo) {
        return motivoRepository.save(motivo);
    }

    @Override
    public Motivo update(Motivo motivo) {
        return motivoRepository.save(motivo);
    }

    @Override
    public void delete(Integer id) {
        motivoRepository.deleteById(id);
    }
}
