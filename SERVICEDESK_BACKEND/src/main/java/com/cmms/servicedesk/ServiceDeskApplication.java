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
//            PerfilPersona perfil4 = new PerfilPersona(4, "USUARIO COMUN", "1", 'S');

//            perfilService.create(perfil1);
//            perfilService.create(perfil2);
//            perfilService.create(perfil3);
//            perfilService.create(perfil4);

//            personaService.create(new Persona(1, "CESAR AUGUSTO0", "ACJOTA MERMA", "71499915", "71499915", "cocacola", "cesaracjota@gmail.com", "+51942035890", "123654", "654123", null, 'M', 'S', perfil1));

        };
    }
}
