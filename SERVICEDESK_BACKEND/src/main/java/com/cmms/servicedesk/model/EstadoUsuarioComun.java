package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstadoUsuarioComun {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "n_id_Estado_Usuario_Comun")
    private Integer idEstadoUsuarioComun;

    @ManyToOne
    @JoinColumn(name = "n_id_persona", nullable = false)
    private Persona persona;

    @Column(name = "s_activo", length = 1, columnDefinition = "char(1)")
    private char activo;
}
