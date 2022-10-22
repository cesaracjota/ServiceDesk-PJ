package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Correo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "n_id_Corre")
    private Integer idCorreo;

    @ManyToOne
    @JoinColumn(name = "n_id_persona_to", nullable = false)
    private Persona to;

    @ManyToOne
    @JoinColumn(name = "n_id_persona_from", nullable = false)
    private Persona from;

    @Column(name = "s_asunto", length = 80)
    private String asunto;

    @Column(name = "s_mensaje", columnDefinition = "TEXT")
    private String mensaje;

    @Column(name = "d_fecha", nullable = true)
    private LocalDate fecha;

    @Column(name = "s_activo", length = 1, columnDefinition = "char(1)")
    private char activo;

}
