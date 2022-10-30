package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mensaje {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "n_id_mensaje")
    private Integer idMensaje;

    @NotBlank(message = "El asunto debe tener una descripcion")
    @Column(name = "s_asunto")
    private String asunto;

    @NotBlank(message = "El mensaje debe tener una descripcion")
    @Column(name = "s_mensaje", columnDefinition = "TEXT")
    private String mensaje;

    @Column(name = "d_fecha_hasta")
    private LocalDate fechaHasta;

    @Column(name = "s_activo", length = 1, columnDefinition = "char(1)")
    private char activo;
}
