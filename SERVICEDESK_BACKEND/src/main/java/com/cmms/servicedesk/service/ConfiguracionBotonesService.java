package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.ConfiguracionBotones;
import com.cmms.servicedesk.repository.IConfiguracionBotonesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConfiguracionBotonesService implements IConfiguracionBotonesService {

    @Autowired
    IConfiguracionBotonesRepository configuracionBotonesRepository;

    @Override
    public List<ConfiguracionBotones> findAll() {
        return configuracionBotonesRepository.findAll();
    }

    @Override
    public Optional<ConfiguracionBotones> findById(Integer id) {
        return configuracionBotonesRepository.findById(id);
    }

    public ConfiguracionBotones update(ConfiguracionBotones configuracionBotones) {
        return configuracionBotonesRepository.save(configuracionBotones);
    }

}
