package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.CorreoCredenciales;
import com.cmms.servicedesk.repository.ICorreoCredencialesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CorreoCredencialesService implements ICorreoCredencialesService {
    @Autowired
    private ICorreoCredencialesRepository correoCredencialesRepository;

    @Override
    public List<CorreoCredenciales> findAll() {
        return correoCredencialesRepository.findAll();
    }

    @Override
    public Optional<CorreoCredenciales> findById(Integer id) {

        return correoCredencialesRepository.findById(id);
    }

    @Override
    public CorreoCredenciales create(CorreoCredenciales correoCredenciales) {
        return correoCredencialesRepository.save(correoCredenciales);
    }

    @Override
    public CorreoCredenciales update(CorreoCredenciales correoCredenciales) {
        return correoCredencialesRepository.save(correoCredenciales);
    }

    @Override
    public void delete(Integer id) {
        correoCredencialesRepository.deleteById(id);
    }

    @Override
    public List<CorreoCredenciales> findByActive() {
        return correoCredencialesRepository.findByActivo('S');
    }
}
