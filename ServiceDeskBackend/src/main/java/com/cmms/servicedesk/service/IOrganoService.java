package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Organo;

import java.util.List;
import java.util.Optional;

public interface IOrganoService {

    List<Organo> findAll();

    Optional<Organo> findById(Integer id);
    Organo findByIdSede(Integer id);

    Organo create(Organo sede);

    Organo update(Organo sede);

    void delete(Integer id);

    List<Organo> findByActive();

}
