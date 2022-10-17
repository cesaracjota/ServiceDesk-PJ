package com.cmms.servicedesk.service;

public interface IEmailService {

    void sendEmail(String initialValue, String subject, String origen, String motivo, String persona_registro,String fecha_registro, String correo);

}
