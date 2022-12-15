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
import java.util.List;

@RestController
@RequestMapping("/api/reporte/incidencia")
@AllArgsConstructor
public class ReporteController {

    @Autowired
    private IncidenciaService incidenciaService;

    @Autowired
    private HistorialIncidenciaService historialIncidenciaService;

    @PostMapping("/tecnico")
    public ResponseEntity<List<ReporteTecnico>> getTecnico(@RequestBody ReporteTecnicoBody reporteTecnicoBody) {
        try {
            List<Incidencia> incidencias = incidenciaService.findByAllDataBetween(reporteTecnicoBody.getStartDate(), reporteTecnicoBody.getEndDate());
            List<Incidencia> incidencias2 = new ArrayList<>();
            List<HistorialIncidencia> historialIncidencia = new ArrayList<>();
            List<ReporteTecnico> reporteTecnicos = new ArrayList<> ();
            // hace un recorrido del array incidencia y va agregando su historial en un nuevo array
            incidencias.forEach(incidencia -> {
                historialIncidencia.add(historialIncidenciaService.findByIncidenciaAndEstado(incidencia, 'A'));
                incidencia.setHistorialIncidencia(historialIncidencia);
                //  compara las sedes seleccionadas desde frontend con sedes de cada incidencia.
                reporteTecnicoBody.getSede().forEach(sede -> {
                    if (incidencia.getOficina().getOrgano().getSede().getIdSede().equals(sede.getIdSede())){
                        incidencias2.add(incidencia);
                        historialIncidencia.forEach(hi -> {
                            if(hi.getPersona_asignado() != null && incidencia.getIdIncidencia() == hi.getIncidencia().getIdIncidencia()){
                                ReporteTecnico reporteTecnico = new ReporteTecnico(hi.getPersona_asignado(), 0  , 0  , 0 ,  0);
                                reporteTecnicos.add(reporteTecnico);
                            }
                        });
                    }
                });


            });

            for (ReporteTecnico reporteTecnico : reporteTecnicos) {
                for (Incidencia incidencia : incidencias2) {
                    for(HistorialIncidencia hi : historialIncidencia){
                        if(hi.getPersona_asignado() != null){
                            if(hi.getPersona_asignado().getIdpersona() == reporteTecnico.getUsuario().getIdpersona() && incidencia.getIdIncidencia() == hi.getIncidencia().getIdIncidencia()){
                                reporteTecnico.setTotal(reporteTecnico.getTotal() + 1);
                                if (hi.getEstadoIncidencia() == 'P' ){
                                    reporteTecnico.setPendientes(reporteTecnico.getPendientes() + 1);
                                }
                                if (hi.getEstadoIncidencia() == 'A'){
                                    reporteTecnico.setAtendidas(reporteTecnico.getAtendidas() + 1);
                                }
                                if (hi.getEstadoIncidencia() == 'T'){
                                    reporteTecnico.setTramitadas(reporteTecnico.getTramitadas() + 1);
                                }
                            }
                        }

                    }
                }
            }
            return  ResponseEntity.ok(reporteTecnicos);

        } catch (Exception exception){
            System.out.println(exception.getMessage());
        }

        return ResponseEntity.ok().build();

    }

    @PostMapping("/usuario")
    public ResponseEntity<List<ReporteTecnico>> getUsuarioComun(@RequestBody ReporteTecnicoBody reporteTecnicoBody) {
        try {
            List<Incidencia> incidencias = incidenciaService.findByAllDataBetween(reporteTecnicoBody.getStartDate() , reporteTecnicoBody.getEndDate());
            List<Incidencia> incidencias2 = new ArrayList<>();
            List<HistorialIncidencia> historialIncidencia = new ArrayList<>();
            List<ReporteTecnico> reporteTecnicos = new ArrayList<>();

            incidencias.forEach(incidencia -> {
                historialIncidencia.add(historialIncidenciaService.findByIncidenciaAndEstado(incidencia, 'A'));
                //  historialIncidencia.get(0).setIncidencia(null);
                incidencia.setHistorialIncidencia(historialIncidencia);
                reporteTecnicoBody.getSede().forEach(sede -> {
                    if ( incidencia.getOficina().getOrgano().getSede().getIdSede().equals(sede.getIdSede())){
                        incidencias2.add(incidencia);
                        historialIncidencia.forEach(hi -> {
                            if(incidencia.getIdIncidencia() == hi.getIncidencia().getIdIncidencia() && incidencia.getPersona() != null){
                                ReporteTecnico reporteTecnico = new ReporteTecnico(incidencia.getPersona(), 0  , 0  , 0 ,  0);
                                reporteTecnicos.add(reporteTecnico);
                            }
                        });
                    }
                });
            });

            for (ReporteTecnico reporteTecnico : reporteTecnicos) {
                for (Incidencia incidencia : incidencias2) {
                    for(HistorialIncidencia hi : historialIncidencia){
                        if (incidencia.getPersona().getIdpersona() == reporteTecnico.getUsuario().getIdpersona() && incidencia.getIdIncidencia() == hi.getIncidencia().getIdIncidencia()){
                            reporteTecnico.setTotal(reporteTecnico.getTotal() + 1);
                            if (hi.getEstadoIncidencia() == 'P' ){
                                reporteTecnico.setPendientes(reporteTecnico.getPendientes() + 1);
                            }
                            if (hi.getEstadoIncidencia() == 'A'){
                                reporteTecnico.setAtendidas(reporteTecnico.getAtendidas() + 1);
                            }
                            if (hi.getEstadoIncidencia() == 'T'){
                                reporteTecnico.setTramitadas(reporteTecnico.getTramitadas() + 1);
                            }
                        }
                    }
                }
            }

            return  ResponseEntity.ok(reporteTecnicos);

        }catch (Exception exception){
            System.out.println(exception.getMessage());
        }

        return ResponseEntity.ok().build();

    }

    @PostMapping("/tiempo")
    public ResponseEntity<List<ReporteFecha>> getIncidenciaFecha(@RequestBody ReporteTecnicoBody reporteTecnicoBody){
        try{
            List<Incidencia> incidencias = incidenciaService.findByAllDataBetween(reporteTecnicoBody.getStartDate() , reporteTecnicoBody.getEndDate());
            List<ReporteFecha> reporteFechas = new ArrayList<>();
            incidencias.forEach(incidencia -> {
                List<HistorialIncidencia> historialIncidencia = historialIncidenciaService.findByIncidencia(incidencia);
                reporteTecnicoBody.getSede().forEach(sede -> {
                    if (incidencia.getOficina().getOrgano().getSede().getIdSede().equals(sede.getIdSede())){
                        ZonedDateTime fechaTranscurrido = null, fechaAtendido = null;
                        Duration fechaPendienteTranscurrido = null, fechaTranscurrdioAtendido = null;
                        for (HistorialIncidencia hi : historialIncidencia) {
                            if (hi.getEstadoIncidencia() == 'T'){
                                fechaTranscurrido = hi.getFecha();
                            }
                            if (hi.getEstadoIncidencia() == 'A'){
                                fechaAtendido = hi.getFecha();
                            }
                            hi.setIncidencia(null);
                        }
                        if (fechaTranscurrido != null ){
                            if(incidencia.getFecha() != null){
                                fechaPendienteTranscurrido = Duration.between(fechaTranscurrido, incidencia.getFecha());
                            }
                        }

                        if (fechaAtendido != null && fechaTranscurrido != null){
                            fechaTranscurrdioAtendido = Duration.between(fechaAtendido, fechaTranscurrido);
                        }
                        Persona tecnicoAsignado = historialIncidenciaService.findByIncidenciaAndEstado(incidencia, 'A').getPersona_asignado();
                        ReporteFecha reporteFecha = new ReporteFecha(incidencia.getPersona(), tecnicoAsignado, incidencia.getFecha() , fechaPendienteTranscurrido , fechaTranscurrido, fechaTranscurrdioAtendido , fechaAtendido);
                        reporteFechas.add(reporteFecha);
                    }

                });

            });

            return ResponseEntity.ok(reporteFechas);

        }catch (Exception exception){
            System.out.println(exception.getMessage());
        }
        return ResponseEntity.ok().build();
    }

}
