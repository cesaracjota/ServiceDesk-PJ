package com.cmms.servicedesk.securityfilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.User;
import com.cmms.servicedesk.model.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.cmms.servicedesk.model.PerfilPersona;
import com.cmms.servicedesk.model.Persona;
import com.cmms.servicedesk.service.PersonaService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Slf4j
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager){
        System.out.print("CustomAuthenticationFilter");
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String dni=request.getParameter( "dni");
        String password=request.getParameter( "password");
        UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(dni, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        User user = (User)authentication.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        String access_token= JWT.create()
                .withSubject(user.getUsername())
                .withIssuer(request.getRequestURL().toString())
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
        String refresh_token=JWT.create()
                .withSubject(user.getUsername())
//                .withExpiresAt(new Date(System.currentTimeMillis()+30*60*1000))
                .withIssuer (request.getRequestURL().toString())
                .sign(algorithm);
        /*response.setHeader("access_token", access_token);
        response.setHeader("refresh_token", refresh_token);*/
        Map<String, String> tokens=new HashMap<>();
        tokens.put("access_token", access_token);
        tokens.put("refresh_token", refresh_token);
        tokens.put("rol", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()).toString());
        tokens.put("nombres", user.getNombres());
        tokens.put("apellidos", user.getApellidos());
        tokens.put("identificador", user.getId().toString());
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }
}

