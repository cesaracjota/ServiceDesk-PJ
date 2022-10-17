package com.cmms.servicedesk.repository;

import com.cmms.servicedesk.model.Ftp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFtpRepository extends JpaRepository<Ftp, Integer> {
}
