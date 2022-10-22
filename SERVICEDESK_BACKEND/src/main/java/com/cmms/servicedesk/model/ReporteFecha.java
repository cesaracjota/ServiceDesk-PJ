package com.cmms.servicedesk.model;

import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.Date;

public class ReporteFecha {

    private Persona usuarioComun;

    private Persona usuarioTecnico;

    private ZonedDateTime registroPendiente;

    private Duration tiempoTranscurridoPendiente;

    private ZonedDateTime registroTramitado;

    private Duration tiempoTranscurridoTramitado;

    private ZonedDateTime registroAtendido;

    public Persona getUsuarioComun() {
        return usuarioComun;
    }

    public void setUsuarioComun(Persona usuarioComun) {
        this.usuarioComun = usuarioComun;
    }

    public Persona getUsuarioTecnico() {
        return usuarioTecnico;
    }

    public void setUsuarioTecnico(Persona usuarioTecnico) {
        this.usuarioTecnico = usuarioTecnico;
    }

    public ZonedDateTime getRegistroPendiente() {
        return registroPendiente;
    }

    public void setRegistroPendiente(ZonedDateTime registroPendiente) {
        this.registroPendiente = registroPendiente;
    }

    public Duration getTiempoTranscurridoPendiente() {
        return tiempoTranscurridoPendiente;
    }

    public void setTiempoTranscurridoPendiente(Duration tiempoTranscurridoPendiente) {
        this.tiempoTranscurridoPendiente = tiempoTranscurridoPendiente;
    }

    public ZonedDateTime getRegistroTramitado() {
        return registroTramitado;
    }

    public void setRegistroTramitado(ZonedDateTime registroTramitado) {
        this.registroTramitado = registroTramitado;
    }

    public Duration getTiempoTranscurridoTramitado() {
        return tiempoTranscurridoTramitado;
    }

    public void setTiempoTranscurridoTramitado(Duration tiempoTranscurridoTramitado) {
        this.tiempoTranscurridoTramitado = tiempoTranscurridoTramitado;
    }

    public ZonedDateTime getRegistroAtendido() {
        return registroAtendido;
    }

    public void setRegistroAtendido(ZonedDateTime registroAtendido) {
        this.registroAtendido = registroAtendido;
    }

    public ReporteFecha(Persona usuarioComun, Persona usuarioTecnico, ZonedDateTime registroPendiente, Duration tiempoTranscurridoPendiente, ZonedDateTime registroTramitado, Duration tiempoTranscurridoTramitado, ZonedDateTime registroAtendido) {
        this.usuarioComun = usuarioComun;
        this.usuarioTecnico = usuarioTecnico;
        this.registroPendiente = registroPendiente;
        this.tiempoTranscurridoPendiente = tiempoTranscurridoPendiente;
        this.registroTramitado = registroTramitado;
        this.tiempoTranscurridoTramitado = tiempoTranscurridoTramitado;
        this.registroAtendido = registroAtendido;
    }

    public ReporteFecha() {
    }
}
