package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Motivo;

import java.util.List;
import java.util.Optional;

public interface IMotivoService {

    List<Motivo> findAll();

    Optional<Motivo> findById(Integer id);

    Motivo create(Motivo motivo);

    Motivo update(Motivo motivo);

    void delete(Integer id);

}
