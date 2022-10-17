package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DescripcionIncidencia {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "n_id_descripcion_incidencia")
    private Integer idDescripcionIncidencia;

    @Column(name = "s_descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @OneToOne
    @JoinColumn(name = "n_id_incidencia", nullable = false , unique = true)
    private Incidencia incidencia;

    @ManyToOne
    @JoinColumn(name = "n_id_incidencia_archivos", nullable = true)
    private IncidenciaArchivos incidenciaArchivos;

}
