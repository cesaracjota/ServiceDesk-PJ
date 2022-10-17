package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Ftp;

import java.util.List;
import java.util.Optional;

public interface IFtpService {
    List<Ftp> findAll();

    Optional<Ftp> findById(Integer id);

    Ftp create(Ftp ftp);

    Ftp update(Ftp ftp);

    void delete(Integer id);
}
