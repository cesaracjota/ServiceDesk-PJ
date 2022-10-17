package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.CorreoCredenciales;

import java.util.List;
import java.util.Optional;

public interface ICorreoCredencialesService {
    List<CorreoCredenciales> findAll();

    Optional<CorreoCredenciales> findById(Integer id);

    CorreoCredenciales create(CorreoCredenciales correoCredenciales);

    CorreoCredenciales update(CorreoCredenciales correoCredenciales);

    void delete(Integer id);

    List<CorreoCredenciales> findByActive();

}
