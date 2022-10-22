package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.Motivo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IMotivoRepository extends JpaRepository<Motivo, Integer> {
}
