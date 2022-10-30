package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Mensaje;

import java.util.List;
import java.util.Optional;

public interface IMensajeService {

    List<Mensaje> findAll();

    Optional<Mensaje> findById(Integer id);

    Mensaje create(Mensaje mensaje);

    Mensaje update(Mensaje mensaje);

    void delete(Integer id);

}
