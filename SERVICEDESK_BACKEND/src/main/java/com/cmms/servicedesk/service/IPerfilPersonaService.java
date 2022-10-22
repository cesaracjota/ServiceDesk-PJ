package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.PerfilPersona;

import java.util.List;
import java.util.Optional;

public interface IPerfilPersonaService {
    List<PerfilPersona> findAll();

    Optional<PerfilPersona> findById(Integer id);

    PerfilPersona create(PerfilPersona cliente);

    PerfilPersona update(PerfilPersona cliente);

    void delete(Integer id);

    Optional<PerfilPersona> findByPerfil(String perfil);
}
