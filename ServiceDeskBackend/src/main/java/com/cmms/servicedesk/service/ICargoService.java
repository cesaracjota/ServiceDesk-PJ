package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Cargo;

import java.util.List;
import java.util.Optional;

public interface ICargoService {
    List<Cargo> findAll();

    Optional<Cargo> findById(Integer id);

    Cargo create(Cargo persona);

    Cargo update(Cargo persona);

    void delete(Integer id);
}
