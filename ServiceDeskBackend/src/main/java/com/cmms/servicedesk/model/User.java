package com.cmms.servicedesk.model;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class User extends org.springframework.security.core.userdetails.User {

    private String Nombres;
    private String Apellidos;
    private Integer Id;

    public User(String username, String password, Collection<? extends GrantedAuthority> authorities, String nombres, String apellidos, Integer id) {
        super(username, password, authorities);
        this.Nombres = nombres;
        this.Apellidos = apellidos;
        this.Id = id;
    }

    public void setNombres(String nombres) {
        Nombres = nombres;
    }

    public String getNombres() {
        return Nombres;
    }

    public String getApellidos() {
        return Apellidos;
    }

    public void setApellidos(String apellidos) {
        Apellidos = apellidos;
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }
}
