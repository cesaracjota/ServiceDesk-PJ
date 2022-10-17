package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cargo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "n_id_cargo",columnDefinition = "serial2")
    private Integer idCargo;

    @NotBlank(message = "El cargo debe tener un nombre")
    @Column(name = "s_cargo", length = 80)
    private String cargo;

    @Column(name = "s_activo", nullable = false, columnDefinition = "char(1)", length = 1)
    private char activo;
}
