package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.ZonedDateTime;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Incidencia {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "n_id_incidencia")
    private Integer idIncidencia;

    @NotBlank(message = "La incidencia debe tener una descripcion")
    @Column(name = "s_descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "n_id_origen", nullable = false)
    private OrigenIncidencia origen;

    @ManyToOne
    @JoinColumn(name = "n_id_persona", nullable = false)
    private Persona persona;

    @ManyToOne
    @JoinColumn(name = "n_id_oficina", nullable = true, columnDefinition = "smallint")
    private Oficina oficina;

    @ManyToOne
    @JoinColumn(name = "n_id_motivo", nullable = false)
    private Motivo motivo;

    @Column(name = "f_sistema_registro", nullable = false)
    private ZonedDateTime fecha;

    @Transient
    private List<HistorialIncidencia> historialIncidencia;

    @Transient
    private DescripcionIncidencia descripcionIncidencia = null;

    @ManyToOne
    @JoinColumn(name = "n_id_incidencia_archivos", nullable = true)
    private IncidenciaArchivos incidenciaArchivos;

}
