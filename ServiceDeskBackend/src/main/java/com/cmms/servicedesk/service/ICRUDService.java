package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Organo;

import java.util.List;
import java.util.Optional;

public interface ICRUDService<T> {

    List<T> findAll();

    Optional<T> findById(Integer id);

    T create(T model);

    T update(T model);

    void delete(Integer id);

    List<T> findByActivo();

}
