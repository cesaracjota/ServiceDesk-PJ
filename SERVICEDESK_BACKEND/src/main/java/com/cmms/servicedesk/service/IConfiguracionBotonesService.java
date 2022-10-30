package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.ConfiguracionBotones;

import java.util.List;
import java.util.Optional;

public interface IConfiguracionBotonesService {

    List<ConfiguracionBotones> findAll();
    Optional<ConfiguracionBotones> findById(Integer id);
    ConfiguracionBotones update(ConfiguracionBotones configuracionBotones);

}
