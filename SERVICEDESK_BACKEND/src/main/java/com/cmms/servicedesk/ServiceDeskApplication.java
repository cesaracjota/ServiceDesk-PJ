package com.cmms.servicedesk;

import com.cmms.servicedesk.model.PerfilPersona;
import com.cmms.servicedesk.model.Persona;
import com.cmms.servicedesk.service.PerfilPersonaService;
import com.cmms.servicedesk.service.PersonaService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableAsync
public class ServiceDeskApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(ServiceDeskApplication.class, args);
    }


    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner run(PerfilPersonaService perfilService, PersonaService personaService) {
        return args -> {

//            PerfilPersona perfil1 = new PerfilPersona(1, "COORDINADOR INFORMATICO", "1", 'S');
//            PerfilPersona perfil2 = new PerfilPersona(2, "ASISTENTE INFORMATICO", "1", 'S');
//            PerfilPersona perfil3 = new PerfilPersona(3, "SOPORTE TECNICO", "1", 'S');
//            PerfilPersona perfil4 = new PerfilPersona(4, "USUARIO COMUN", "1", 'N');
//
//            perfilService.create(perfil1);
//            perfilService.create(perfil2);
//            perfilService.create(perfil3);
//            perfilService.create(perfil4);

//            personaService.update(new Persona(1, "Juan","apellido","73824465", "73824465", "cocacola", "usuario@gmail.com","942035699",null,'M','A',perfil1),false);
//            personaService.create(new Persona(null, "Roberto","apellido","83824465","83824465","cocacola","juan@gmail.com","942035690",null,'M','A',perfil2));
//            personaService.create(new Persona(null, "Gabriel","apellido","93824465","93824465","cocacola","carlos@gmail.com","942035691",null,'M','A',perfil3));
//            personaService.create(new Persona(null, "Carlos","apellido","13824465","13824465","cocacola","gabriel@gmail.com","942035693",null,'M','A',perfil4));

        };
    }
}
