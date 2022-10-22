package com.cmms.servicedesk.model;

import java.util.List;

public class ReporteIncidencia {

    private Incidencia incidencia;

    private DescripcionIncidencia descripcionIncidencia;

    private List<HistorialIncidencia> historialIncidencia;

    private HistorialPersona historialPersona;

    public ReporteIncidencia(Incidencia incidencia, DescripcionIncidencia descripcionIncidencia, List<HistorialIncidencia> historialIncidencia, HistorialPersona historialPersona) {
        this.incidencia = incidencia;
        this.descripcionIncidencia = descripcionIncidencia;
        this.historialIncidencia = historialIncidencia;
        this.historialPersona = historialPersona;
    }

    public Incidencia getIncidencia() {
        return incidencia;
    }

    public void setIncidencia(Incidencia incidencia) {
        this.incidencia = incidencia;
    }

    public DescripcionIncidencia getDescripcionIncidencia() {
        return descripcionIncidencia;
    }

    public void setDescripcionIncidencia(DescripcionIncidencia descripcionIncidencia) {
        this.descripcionIncidencia = descripcionIncidencia;
    }

    public List<HistorialIncidencia> getHistorialIncidencia() {
        return historialIncidencia;
    }

    public void setHistorialIncidencia(List<HistorialIncidencia> historialIncidencia) {
        this.historialIncidencia = historialIncidencia;
    }

    public HistorialPersona getHistorialPersona() {
        return historialPersona;
    }

    public void setHistorialPersona(HistorialPersona historialPersona) {
        this.historialPersona = historialPersona;
    }
}
