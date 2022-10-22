package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sede {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO )
    @Column(name = "n_id_sede",columnDefinition = "serial2")
    private Integer idSede;

    @NotNull
    @NotBlank(message = "La sede debe tener nombre.")
    @Column(name = "s_sede", length = 80)
    private String sede;

    @NotBlank(message = "La sede debe tener direccion.")
    @Column(name = "s_direccion", length = 80)
    private String direccion;

    @NotNull(message = "La sede debe tener un estado")
    @Column(name = "s_activo", length = 1, columnDefinition = "char(1) default 'S'")
    private char activo;

}
