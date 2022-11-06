package com.cmms.servicedesk.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.cmms.servicedesk.model.*;
import com.cmms.servicedesk.service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api")
public class PersonaController {
    @Autowired
    private PersonaService personaService;
    @Autowired
    private EstadoTecnicoService estadoTecnicoService;

    @Autowired
    private PerfilPersonaService perfilPersonaService;

    @Autowired
    private PersonaOrganoService personaOrganoService;

    @Autowired
    private AuditoriaUsuarioService auditoriaUsuarioService;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private EstadoUsuarioComunService estadoUsuarioComunService;

    @GetMapping("/personas")
    public ResponseEntity<List<Persona>> findAll(){
        return ResponseEntity.ok(personaService.findAll());
    }

    @GetMapping("/personas/{id}")
    public ResponseEntity<Persona> findById(@PathVariable("id") Integer idPersona){
        return personaService.findById(idPersona)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/personas/dni/{dni}")
    public ResponseEntity<Persona> findByDni(@PathVariable("dni") String dni){
        return personaService.findByDni(dni)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("personas/buscar/apellido")
    public ResponseEntity<List<Persona>> getPersonaByApellido (@RequestParam String apellido) {
        return ResponseEntity.ok(personaService.findByApellido(apellido));
    }

    @PostMapping("/personas")
    public ResponseEntity<Persona> create(@Valid @RequestBody Persona persona){
        Persona persona1 = personaService.create(persona);
        // boolean esTecnico = perfilPersonaService.findById(persona.getPerfilPersona().getIdPerfilPersona()).get().getPerfil().equals("SOPORTE TECNICO");
        boolean esUsuario = perfilPersonaService.findById(persona.getPerfilPersona().getIdPerfilPersona()).get().getPerfil().equals("USUARIO COMUN");
        if (esUsuario) {
            EstadoUsuarioComun estadoUsuarioComun = new EstadoUsuarioComun(null,persona1,'S');
            estadoUsuarioComunService.create(estadoUsuarioComun);
        }else{
            EstadoTecnico estadoTecnico = new EstadoTecnico(null,persona1,'S');
            estadoTecnicoService.create(estadoTecnico);
        }
        return new ResponseEntity<>(persona1, HttpStatus.CREATED);
    }

    @PostMapping("/personas/register")
    public ResponseEntity<Persona> register(@Valid @RequestBody Persona persona){
        Persona persona1 = personaService.create(persona);
        if (perfilPersonaService.findById(persona.getPerfilPersona().getIdPerfilPersona()).get().getPerfil().equals("USUARIO COMUN")){
            EstadoUsuarioComun estadoUsuarioComun = new EstadoUsuarioComun(null,persona1,'S');
            estadoUsuarioComunService.create(estadoUsuarioComun);
        }else{
            EstadoTecnico estadoTecnico = new EstadoTecnico(null,persona1,'S');
            estadoTecnicoService.create(estadoTecnico);
        }
        return new ResponseEntity<>(persona1, HttpStatus.CREATED);
    }

    @PutMapping("/personas")
    public ResponseEntity<Persona> update(@Valid @RequestBody Persona persona){
        return personaService.findById(persona.getIdpersona())
                .map(c -> {
                    if (perfilPersonaService.findById(persona.getPerfilPersona().getIdPerfilPersona()).get().getPerfil().equals("SOPORTE TECNICO")) {
                        if (estadoTecnicoService.findByPersona(c).size() == 0) {
                            EstadoTecnico estadoTecnico = new EstadoTecnico(null,c,'S');
                            estadoTecnicoService.create(estadoTecnico);
                        }
                        if (estadoUsuarioComunService.findByPersona(c).size() == 1) {
                            estadoUsuarioComunService.delete(estadoUsuarioComunService.findByPersona(c).get(0).getIdEstadoUsuarioComun());
                        }
                    } else if (perfilPersonaService.findById(persona.getPerfilPersona().getIdPerfilPersona()).get().getPerfil().equals("USUARIO COMUN")) {
                        if (estadoUsuarioComunService.findByPersona(c).size() == 0) {
                            EstadoUsuarioComun estadoUsuarioComun = new EstadoUsuarioComun(null,c,'S');
                            estadoUsuarioComunService.create(estadoUsuarioComun);
                            if (estadoTecnicoService.findByPersona(c).size() == 1) {
                                estadoTecnicoService.delete(estadoTecnicoService.findByPersona(c).get(0).getIdEstadoTecnico());
                                if (personaOrganoService.findByPersona(c).size() > 0) {
                                    personaOrganoService.deleteByPersona(c);
                                }
                            }
                        }
                    }else{
                        if (estadoTecnicoService.findByPersona(c).size() == 0) {
                            EstadoTecnico estadoTecnico = new EstadoTecnico(null,c,'S');
                            estadoTecnicoService.create(estadoTecnico);
                        }
                        if (estadoUsuarioComunService.findByPersona(c).size() == 1) {
                            estadoUsuarioComunService.delete(estadoUsuarioComunService.findByPersona(c).get(0).getIdEstadoUsuarioComun());
                        }
                    }
                    return ResponseEntity.ok(personaService.update(persona, false));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/personas/update")
    public ResponseEntity<Persona> updatePersona(@Valid @RequestBody Persona persona){
        return personaService.findById(persona.getIdpersona())
                .map(c -> {
                            String IP = auditoriaUsuarioService.getClientIp(request);
                            AuditoriaUsuarios auditoriaUsuarios = new AuditoriaUsuarios(null, persona.getDni(), ZonedDateTime.now(), IP);
                            auditoriaUsuarioService.create(auditoriaUsuarios);
                            return ResponseEntity.ok(personaService.update(persona, false));
                        })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/personas/{id}")
    public ResponseEntity<Persona> updateActivo(@PathVariable("id") Integer idPersona){
        return personaService.findById(idPersona)
                .map(c -> {
                    char activo = c.getActivo();
                    if(activo == 'S'){
                        c.setActivo('N');
                        if (estadoTecnicoService.findByPersona(c).size() == 1) {
                            estadoTecnicoService.delete(estadoTecnicoService.findByPersona(c).get(0).getIdEstadoTecnico());
                            if (personaOrganoService.findByPersona(c).size() > 0) {
                                personaOrganoService.deleteByPersona(c);
                            }
                        }
                    }else {
                        c.setActivo('S');
                        EstadoTecnico estadoTecnico = new EstadoTecnico(null,c,'S');
                        estadoTecnicoService.create(estadoTecnico);
                    }
                    personaService.update(c, true);
                    return ResponseEntity.ok(c);
                })
                .orElseGet(()-> ResponseEntity.notFound().build());
    }
    /*@PostMapping("/register-persona/usuario-comun")
    public void registerPerson(@Valid @RequestBody Persona persona,
                               HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        personaService.create(persona);
        User user = (User)authentication.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        String access_token= JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt (new Date(System.currentTimeMillis()+60*60*1000))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
        String refresh_token=JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+30*60*1000))
                .withIssuer (request.getRequestURL().toString())
                .sign(algorithm);
        response.setHeader("access_token", access_token);
        response.setHeader("refresh_token", refresh_token);
        Map<String, String> tokens=new HashMap<>();
        tokens.put("access_token", access_token);
        tokens.put("refresh_token", refresh_token);
        tokens.put("rol", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()).toString());
        tokens.put("name", user.getNombre());
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }*/
    @GetMapping("/refreshtoken")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String dni = decodedJWT.getSubject();
                Persona usuario = personaService.findByDni(dni).get();
                Collection<PerfilPersona> perfilPersonas = new ArrayList<>();
                perfilPersonas.add(usuario.getPerfilPersona());
                String access_token=JWT.create()
                        .withSubject(usuario.getDni())
//                        .withExpiresAt(new Date(System.currentTimeMillis()+10*60*1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles",perfilPersonas.stream().map(PerfilPersona::getPerfil).collect(Collectors.toList()))
                        .sign(algorithm);
                Map<String, String> tokens=new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                tokens.put("rol", perfilPersonas.stream().map(PerfilPersona::getPerfil).collect(Collectors.toList()).toString());
                tokens.put("nombres", usuario.getNombre());
                tokens.put("apellidos",usuario.getApellido());
                tokens.put("identificador", usuario.getIdpersona().toString());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);

            } catch (Exception exception) {
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                Map<String, String> error=new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        }else {
            throw new RuntimeException("Refresh token is missing");
        }
    }
}
