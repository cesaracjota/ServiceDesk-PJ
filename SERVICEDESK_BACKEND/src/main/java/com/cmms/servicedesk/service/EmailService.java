package com.cmms.servicedesk.service;

import com.cmms.servicedesk.securityfilter.configuration.MailConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@Import({MailConfiguration.class})
public class EmailService implements IEmailService {
	
	@Autowired
    private JavaMailSender emailSender;
    
    @Autowired
    private TemplateEngine templateEngine;
    
    @Autowired
    private CorreoCredencialesService correoCredencialesService;

    @Override
    @Async
    public void sendEmail(String initialValue, String subject, String origen, String motivo, String persona_registro, String fecha_registro, String correo) {
        try {
            Context context = new Context();
            context.setVariable("initialValue", initialValue);
            context.setVariable("motivo", motivo);
            context.setVariable("origen", origen);
            context.setVariable("persona_registro", persona_registro);
            context.setVariable("fecha_registro", fecha_registro);
            String htmlContent = templateEngine.process("index", context);
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper message = null;
            message = new MimeMessageHelper(mimeMessage, true , "UTF-8");
            message.setTo(correo);
            message.setFrom(correoCredencialesService.findByActive().get(0).getCorreo());
            message.setSubject(subject);
//        message.setSentDate(new Date());
            message.setText(htmlContent, true);
            this.emailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

}

