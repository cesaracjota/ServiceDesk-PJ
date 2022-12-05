package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.*;
import com.cmms.servicedesk.service.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reporte/incidencia")
@AllArgsConstructor
public class ReporteController {

    @Autowired
    private IncidenciaService incidenciaService;

    @Autowired
    private EstadoTecnicoService estadoTecnicoService;

    @Autowired
    private HistorialIncidenciaService historialIncidenciaService;

    @Autowired
    private EstadoUsuarioComunService estadoUsuarioComunService;

    @Autowired
    private HistorialPersonaService historialPersonaService;

    @PostMapping("/tecnico")
    public ResponseEntity<List<ReporteTecnico>> getTecnico(@RequestBody ReporteTecnicoBody reporteTecnicoBody) {
        List<Incidencia> incidencias = incidenciaService.findByAllDataBetween(reporteTecnicoBody.getStartDate(), reporteTecnicoBody.getEndDate());
        List<Incidencia> incidencias2 = new ArrayList<>();
        incidencias.forEach(incidencia -> {
            List<HistorialIncidencia> historialIncidencia = new ArrayList<>();
            historialIncidencia.add(historialIncidenciaService.findByIncidenciaAndEstado(incidencia, 'A'));
            historialIncidencia.get(0).setIncidencia(null);
            incidencia.setHistorialIncidencia(historialIncidencia);
            reporteTecnicoBody.getSede().forEach(sede -> {
                if (incidencia.getOficina().getOrgano().getSede().getIdSede() == sede.getIdSede()){
                    incidencias2.add(incidencia);
                }
            });
        });

        List<ReporteTecnico> reporteTecnicos = new ArrayList<ReporteTecnico> ();

        List<EstadoTecnico> listaTecnico = estadoTecnicoService.findAll();

        incidencias2.forEach(getIncidencia -> {
            if(getIncidencia.getHistorialIncidencia().get(0).getPersona_asignado() != null){
                ReporteTecnico reporteTecnico = new ReporteTecnico(getIncidencia.getHistorialIncidencia().get(0).getPersona_asignado(), 0  , 0  , 0 ,  0);
                reporteTecnicos.add(reporteTecnico);
            }
        });

//        for (EstadoTecnico estadoTecnico : listaTecnico) {
//            ReporteTecnico reporteTecnico = new ReporteTecnico(estadoTecnico.getPersona(), 0  , 0  , 0 ,  0);
//            reporteTecnicos.add(reporteTecnico);
//        }

        for (ReporteTecnico reporteTecnico : reporteTecnicos) {
            for (Incidencia incidencia : incidencias2) {
                if (incidencia.getHistorialIncidencia().get(0).getPersona_asignado() != null && incidencia.getHistorialIncidencia().get(0).getPersona_asignado() == reporteTecnico.getUsuario()){
                    reporteTecnico.setTotal(reporteTecnico.getTotal() + 1);
                    if (incidencia.getHistorialIncidencia().get(0).getEstadoIncidencia() == 'P' ){
                        reporteTecnico.setPendientes(reporteTecnico.getPendientes() + 1);
                    }
                    if (incidencia.getHistorialIncidencia().get(0).getEstadoIncidencia() == 'A'){
                        reporteTecnico.setAtendidas(reporteTecnico.getAtendidas() + 1);
                    }
                    if (incidencia.getHistorialIncidencia().get(0).getEstadoIncidencia() == 'T'){
                        reporteTecnico.setTramitadas(reporteTecnico.getTramitadas() + 1);
                    }
                }
            }
        }

        return  ResponseEntity.ok(reporteTecnicos);
    }

    @PostMapping("/usuario")
    public ResponseEntity<List<ReporteTecnico>> getUsuarioComun(@RequestBody ReporteTecnicoBody reporteTecnicoBody) {

        List<Incidencia> incidencias = incidenciaService.findByAllDataBetween(reporteTecnicoBody.getStartDate() , reporteTecnicoBody.getEndDate());
        List<Incidencia> incidencias2 = new ArrayList<>();
        incidencias.forEach(incidencia -> {
            List<HistorialIncidencia> historialIncidencia = new ArrayList<>();
            historialIncidencia.add(historialIncidenciaService.findByIncidenciaAndEstado(incidencia, 'A'));
            historialIncidencia.get(0).setIncidencia(null);
            incidencia.setHistorialIncidencia(historialIncidencia);
            reporteTecnicoBody.getSede().forEach(sede -> {
                if ( incidencia.getOficina().getOrgano().getSede().getIdSede() == sede.getIdSede()){
                    incidencias2.add(incidencia);
                }
            });
        });

        List<ReporteTecnico> reporteTecnicos = new ArrayList<ReporteTecnico>();

//        List<UsuarioComun> usuarioComun = new ArrayList<>();
//
//        List<EstadoUsuarioComun> listaTecnico = estadoUsuarioComunService.findAll();

        incidencias2.forEach(getIncidencia -> {
            ReporteTecnico reporteTecnico = new ReporteTecnico(getIncidencia.getPersona(), 0  , 0  , 0 ,  0);
            reporteTecnicos.add(reporteTecnico);
        });

        for (ReporteTecnico reporteTecnico : reporteTecnicos) {
            for (Incidencia incidencia : incidencias2) {
                if (incidencia.getPersona() == reporteTecnico.getUsuario()){
                    reporteTecnico.setTotal(reporteTecnico.getTotal() + 1);
                    if (incidencia.getHistorialIncidencia().get(0).getEstadoIncidencia() == 'P' ){
                        reporteTecnico.setPendientes(reporteTecnico.getPendientes() + 1);
                    }
                    if (incidencia.getHistorialIncidencia().get(0).getEstadoIncidencia() == 'A'){
                        reporteTecnico.setAtendidas(reporteTecnico.getAtendidas() + 1);
                    }
                    if (incidencia.getHistorialIncidencia().get(0).getEstadoIncidencia() == 'T'){
                        reporteTecnico.setTramitadas(reporteTecnico.getTramitadas() + 1);
                    }
                }
            }
        }

        return  ResponseEntity.ok(reporteTecnicos);
    }

    @PostMapping("/tiempo")
    public ResponseEntity<List<ReporteFecha>> getIncidenciaFecha(@RequestBody ReporteTecnicoBody reporteTecnicoBody){
        List<Incidencia> incidencias = incidenciaService.findByAllDataBetween(reporteTecnicoBody.getStartDate() , reporteTecnicoBody.getEndDate());
        List<Incidencia> incidencias2 = new ArrayList<>();
        List<ReporteFecha> reporteFechas = new ArrayList<>();

        incidencias.forEach(incidencia -> {
            List<HistorialIncidencia> historialIncidencia = historialIncidenciaService.findByIncidencia(incidencia);
            incidencia.setHistorialIncidencia(historialIncidencia);
            reporteTecnicoBody.getSede().forEach(sede -> {
                if (incidencia.getOficina().getOrgano().getSede().getIdSede() == sede.getIdSede()){
                    incidencias2.add(incidencia);
                }
            });
        });

        for (Incidencia incidencia : incidencias2) {
            ZonedDateTime fechaTranscurrido = null, fechaAtendido = null;
            Duration fechaPendienteTranscurrido = null, fechaTranscurrdioAtendido = null;
            for (HistorialIncidencia historialIncidencia : incidencia.getHistorialIncidencia()) {
                if (historialIncidencia.getEstadoIncidencia() == 'T'){
                    fechaTranscurrido = historialIncidencia.getFecha();
                }
                if (historialIncidencia.getEstadoIncidencia() == 'A'){
                    fechaAtendido = historialIncidencia.getFecha();
                }
                historialIncidencia.setIncidencia(null);
            }
            if (fechaTranscurrido != null ){
                fechaPendienteTranscurrido = Duration.between(fechaTranscurrido, incidencia.getFecha());
            }
            if (fechaAtendido != null){
                fechaTranscurrdioAtendido = Duration.between(fechaAtendido, fechaTranscurrido);
            }

            ReporteFecha reporteFecha = new ReporteFecha(incidencia.getPersona() , historialIncidenciaService.findByIncidenciaAndEstado(incidencia , 'A').getPersona_asignado() , incidencia.getFecha() , fechaPendienteTranscurrido , fechaTranscurrido , fechaTranscurrdioAtendido , fechaAtendido);
            reporteFechas.add(reporteFecha);
        }

        return ResponseEntity.ok(reporteFechas);
    }

}
