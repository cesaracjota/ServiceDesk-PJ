package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICargoRepository extends JpaRepository<Cargo, Integer> {

    Cargo findByCargo(String nombre);
}
