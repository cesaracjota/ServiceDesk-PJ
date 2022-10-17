package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.ZonedDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistorialPersona {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "n_id_historial_persona")
    private Integer idHistorialPersona;

    @ManyToOne
    @JoinColumn(name = "n_id_persona", nullable = false)
    private Persona persona;

    @ManyToOne
    @JoinColumn(name = "n_id_cargo", nullable = false, columnDefinition = "smallint")
    private Cargo cargo;

    @ManyToOne
    @JoinColumn(name = "n_id_oficina", nullable = false, columnDefinition = "smallint")
    private Oficina oficina;

    @Column(name = "f_desde")
    private LocalDate iniciaCargo;

    @Column(name = "f_hasta", nullable = true)
    private LocalDate terminaCargo;

    @Column(name = "s_activo", nullable = false, columnDefinition = "char(1)", length = 1)
    private char activo;

    @CreatedDate
    @Column(name = "fh_fecha", updatable = false)
    private ZonedDateTime fecha;

    @Column(name = "s_ip_pc", nullable = true)
    private String IP;

}
