package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Mensaje;
import com.cmms.servicedesk.repository.IMensajeRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MensajeService implements IMensajeService{

    @Autowired
    private IMensajeRespository mensajeRespository;

    @Override
    public List<Mensaje> findAll() {
        return mensajeRespository.findAll();
    }

    @Override
    public Optional<Mensaje> findById(Integer id) {
        return mensajeRespository.findById(id);
    }

    @Override
    public Mensaje create(Mensaje mensaje) {
        return mensajeRespository.save(mensaje);
    }

    @Override
    public Mensaje update(Mensaje mensaje) {
        return mensajeRespository.save(mensaje);
    }

    @Override
    public void delete(Integer id) {
        mensajeRespository.deleteById(id);
    }
}
