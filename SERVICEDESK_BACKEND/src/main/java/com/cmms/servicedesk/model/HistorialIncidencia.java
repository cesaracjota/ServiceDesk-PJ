package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistorialIncidencia {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "n_id_historial_incidencia")
    private Integer idHistorialIncidencia;

    @Column(name = "s_estado_incidencia", nullable = false, columnDefinition = "char(1)", length = 1)
    private char estadoIncidencia;

    @Column(name = "s_estado", nullable = false, columnDefinition = "char(1)", length = 1)
    private char estado;

    @Column(name = "f_sistema_actualizado", nullable = false)
    private ZonedDateTime fecha;

    @Column(name = "s_ip_pc_registro", nullable = false)
    private String ip;

    @ManyToOne
    @JoinColumn(name = "n_id_persona_registro", nullable = false)
    private Persona persona_registro;

    @ManyToOne
    @JoinColumn(name = "n_id_persona_notifica", nullable = true)
    private Persona persona_notifica;

    @ManyToOne
    @JoinColumn(name = "n_id_persona_asignado", nullable = true)
    private Persona persona_asignado;

    @ManyToOne
    @JoinColumn(name = "n_id_incidencia", nullable = false)
    private Incidencia incidencia;
}
