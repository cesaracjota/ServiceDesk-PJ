package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IMensajeRespository extends JpaRepository<Mensaje, Integer> {
}
