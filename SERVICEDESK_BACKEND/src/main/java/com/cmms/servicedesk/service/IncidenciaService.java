package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.Incidencia;
import com.cmms.servicedesk.model.Persona;
import com.cmms.servicedesk.repository.IIncidenciaRepository;
import org.springframework.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class IncidenciaService implements IIncidenciaService{

    @Autowired
    IIncidenciaRepository incidenciaRepository;

    private final String LOCALHOST_IPV4 = "127.0.0.1";
    private final String LOCALHOST_IPV6 = "0:0:0:0:0:0:0:1";

    @Override
    public List<Incidencia> findAll() {
        return incidenciaRepository.findAll();
    }

    @Override
    public Optional<Incidencia> findById(Integer id) {
        return incidenciaRepository.findById(id);
    }

    @Override
    public Incidencia create(Incidencia incidencia) {
        return incidenciaRepository.save(incidencia);
    }

    @Override
    public Incidencia update(Incidencia incidencia) {
        return incidenciaRepository.save(incidencia);
    }

    @Override
    public List<Incidencia> findByPersona(Persona persona) {
        return incidenciaRepository.findByPersona(persona);
    }

    @Override
    public String getClientIp(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }

        if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }

        if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
            if (LOCALHOST_IPV4.equals(ipAddress) || LOCALHOST_IPV6.equals(ipAddress)) {
                try {
                    InetAddress inetAddress = InetAddress.getLocalHost();
                    ipAddress = inetAddress.getHostAddress();
                } catch (UnknownHostException e) {
                    e.printStackTrace();
                }
            }
        }

        if (!StringUtils.isEmpty(ipAddress)
                && ipAddress.length() > 15
                && ipAddress.indexOf(",") > 0) {
            ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
        }

        return ipAddress;
    }

    @Override
    public void delete(Integer id) {
        incidenciaRepository.deleteById(id);
    }

    @Override
    public List<Incidencia> findByAllDataBetween(LocalDate startDate, LocalDate endDate) {
        return incidenciaRepository.findByFechaBetween(startDate, endDate);
    }

    @Override
    public List<Incidencia> findByFechaBetweenForUserTecnico(LocalDate startDate, LocalDate endDate, Integer idPersona) {
        return incidenciaRepository.findByFechaBetweenForUserTecnico(startDate, endDate, idPersona);
    }

    @Override
    public List<Incidencia> findByFechaBetweenForUserComun(LocalDate startDate, LocalDate endDate, Integer idPersona) {
        return incidenciaRepository.findByFechaBetweenForUserComun(startDate, endDate, idPersona);
    }

    @Override
    public String findCountIncidencias(Integer idTecnicoAsignado) {
        return incidenciaRepository.findCountIncidencias(idTecnicoAsignado);
    }
}
