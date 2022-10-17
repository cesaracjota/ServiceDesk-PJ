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
public class Organo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "n_id_organo",columnDefinition = "serial2")
    private Integer idOrgano;

    @ManyToOne
    @JoinColumn(name = "n_id_sede", nullable = false, columnDefinition = "smallint")
    private Sede sede;

    @NotNull
    @NotBlank(message = "El organo debe tener un nombre.")
    @Column(name = "s_organo", length = 100)
    private String organo;

    @NotNull(message = "El organo debe tener un estado")
    @Column(name = "s_activo", length = 1, columnDefinition = "char(1)")
    private char activo;
}
