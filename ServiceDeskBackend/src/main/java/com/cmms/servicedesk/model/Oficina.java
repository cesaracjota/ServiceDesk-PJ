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
public class Oficina {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "n_id_oficina", columnDefinition = "serial2")
    private Integer idOficina;

    @ManyToOne
    @JoinColumn(name = "n_id_organo")
    private Organo organo;

    @NotBlank(message = "La oficina debe tener un nombre")
    @Column(name = "s_oficina", length = 120)
    private String oficina;

    @NotNull(message = "La oficina debe tener un estado")
    @Column(name = "s_activo", length = 1, columnDefinition = "char(1)")
    private char activo;
}
