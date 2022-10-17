package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Ftp;
import com.cmms.servicedesk.repository.IFtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class FtpService implements IFtpService {
    @Autowired
    private IFtpRepository ftpRepository;

    @Override
    public List<Ftp> findAll() {
        return ftpRepository.findAll();
    }

    @Override
    public Optional<Ftp> findById(Integer id) {
        return ftpRepository.findById(id);
    }

    @Override
    public Ftp create(Ftp ftp) {
        return ftpRepository.save(ftp);
    }

    @Override
    public Ftp update(Ftp ftp) {
        return ftpRepository.save(ftp);
    }

    public void delete(Integer id) {
        ftpRepository.deleteById(id);
    }
}
