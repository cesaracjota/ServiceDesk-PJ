package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Sede;

import java.util.List;
import java.util.Optional;

public interface ISedeService {

    List<Sede> findAll();

    Optional<Sede> findById(Integer id);

    Sede create(Sede sede);

    Sede update(Sede sede);

    void delete(Integer id);

    List<Sede> findByActive();
}
