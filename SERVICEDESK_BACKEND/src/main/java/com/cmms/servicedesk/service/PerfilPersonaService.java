package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.PerfilPersona;
import com.cmms.servicedesk.repository.IPerfilPersonaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PerfilPersonaService implements IPerfilPersonaService{
    @Autowired
    private IPerfilPersonaRepository perfilPersonaRepository;

    @Override
    public List<PerfilPersona> findAll() {
        return perfilPersonaRepository.findAll();
    }
    @Override
    public Optional<PerfilPersona> findById(Integer id) {
        return perfilPersonaRepository.findById(id);
    }

    @Override
    public PerfilPersona create(PerfilPersona cliente) {
        return perfilPersonaRepository.save(cliente);
    }

    @Override
    public PerfilPersona update(PerfilPersona cliente) {
        return perfilPersonaRepository.save(cliente);
    }

    public void delete(Integer id) {
        perfilPersonaRepository.deleteById(id);
    }

    @Override
    public Optional<PerfilPersona> findByPerfil(String perfil) {
        return perfilPersonaRepository.findByPerfil(perfil);
    }
}
