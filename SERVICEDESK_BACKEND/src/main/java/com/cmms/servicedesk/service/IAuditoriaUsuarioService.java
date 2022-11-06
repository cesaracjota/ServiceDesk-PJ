package com.cmms.servicedesk.service;

import com.cmms.servicedesk.model.AuditoriaUsuarios;

import javax.servlet.http.HttpServletRequest;

public interface IAuditoriaUsuarioService {
    AuditoriaUsuarios create(AuditoriaUsuarios auditoriaUsuarios);

    String getClientIp(HttpServletRequest request);
}
