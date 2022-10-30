package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConfiguracionBotones {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "n_id_configuracion_boton", columnDefinition = "serial2")
    private Integer idConfigucacionBoton;

    @Column(name = "s_nombre")
    private String nombre;

    @Column(name = "s_slug")
    private String slug;

    @Column(name = "s_activo", nullable = false, columnDefinition = "char(1)", length = 1)
    private char activo;

}
