package com.cmms.servicedesk.model;

public class UsuarioComun {

    private Persona usuario;

    public UsuarioComun(Persona usuario) {
        this.usuario = usuario;
    }

    public UsuarioComun() {
    }

    public Persona getUsuario() {
        return usuario;
    }

    public void setUsuario(Persona usuario) {
        this.usuario = usuario;
    }
}


