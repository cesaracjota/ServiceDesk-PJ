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
public class OrigenIncidencia {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO )
    @Column(name = "n_id_origen",columnDefinition = "serial2")
    private Integer idOrigen;

    @NotNull
    @NotBlank(message = "La origen debe tener datos")
    @Column(name = "s_origen", length = 200)
    private String origen;

}
