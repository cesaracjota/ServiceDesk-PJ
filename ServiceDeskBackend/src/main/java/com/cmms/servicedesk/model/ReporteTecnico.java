package com.cmms.servicedesk.model;

import java.util.Date;

public class ReporteTecnico {

    private Persona usuario;

    private int pendientes;

    private int tramitadas;

    private int atendidas;

    private int total;

    public ReporteTecnico(Persona usuario, int pendientes, int tramitadas, int atendidas, int total) {
        this.usuario = usuario;
        this.pendientes = pendientes;
        this.tramitadas = tramitadas;
        this.atendidas = atendidas;
        this.total = total;
    }

    public ReporteTecnico() {
    }

    public Persona getUsuario() {
        return usuario;
    }

    public void setUsuario(Persona usuario) {
        this.usuario = usuario;
    }

    public int getPendientes() {
        return pendientes;
    }

    public void setPendientes(int pendientes) {
        this.pendientes = pendientes;
    }

    public int getTramitadas() {
        return tramitadas;
    }

    public void setTramitadas(int tramitadas) {
        this.tramitadas = tramitadas;
    }

    public int getAtendidas() {
        return atendidas;
    }

    public void setAtendidas(int atendidas) {
        this.atendidas = atendidas;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}


