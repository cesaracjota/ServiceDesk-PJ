package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PerfilPersona {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO )
    @Column(name = "n_id_perfil",columnDefinition = "serial2")
    private Integer idPerfilPersona;

    @Column(name = "s_perfil", length = 30)
    private String perfil;

    @NotBlank(message = "Debe indicar la descripcion")
    @Column(name = "s_descripcion" , length = 120)
    private String descripcion;

    @NotNull(message = "El campo estado no puede ser null")
    @Column(name = "s_activo", length = 1, columnDefinition = "char(1)")
    private char activo;


}
